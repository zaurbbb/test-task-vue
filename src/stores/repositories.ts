import {
  provideApolloClient,
  useQuery,
} from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { watchEffect } from "vue";
import { apolloClient } from "../api/index";
import {
  GET_REPOSITORIES_BY_QUERY,
  GET_REPOSITORIES_BY_USERNAME,
  GET_REPOSITORY_BY_NAME,
} from "../constants/graphql";

export const useRepositoriesStore = defineStore("repositories", {
  state: (): State => ({
    data: [],
    object: {},
    isLoading: false,
    error: null,
  }),
  actions: {
    getRepositoriesByUsername(username: string) {
      try {
        const {
          result,
          loading,
        } = useQuery(
          GET_REPOSITORIES_BY_USERNAME,
          { username },
        );
        watchEffect(() => {
          this.isLoading = loading.value;
          this.data = result.value?.user?.repositories?.edges || [];
          this.isLoading = loading.value;
        });
      } catch (error) {
        return error;
      }
    },
    getRepositoriesByQuery(
      username: string,
      query: string,
    ) {
      provideApolloClient(apolloClient);
      try {
        const queryString = `user:${username} ${query}`;
        const {
          result,
          loading,
        } = useQuery(
          GET_REPOSITORIES_BY_QUERY,
          { query: queryString },
        );
        watchEffect(() => {
          this.isLoading = loading.value;
          this.data = result.value?.search?.edges || [];
          this.isLoading = loading.value;
        });
      } catch (error) {
        console.log(error);
      }
    },
    getRepositoryByName(
      username: string,
      name: string,
    ) {
      provideApolloClient(apolloClient);
      try {
        const {
          result,
          loading,
          error,
        } = useQuery(
          GET_REPOSITORY_BY_NAME,
          {
            owner: username,
            name,
          },
        );
        watchEffect(() => {
          if (error.value) {
            this.error = error.value;
          console.log("ggg");
          }

          if (!error.value) {
            this.isLoading = loading.value;
            this.object = result.value?.repository || {};
          }

          this.isLoading = loading.value;
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});


interface Owner {
  login: string;
  avatarUrl: string;
}

interface PrimaryLanguage {
  color: string;
  name: string;
}

interface Repository {
  id: number;
  name: string;
  stargazerCount: number;
  updatedAt: string;
  url: string;
  isPrivate: boolean;
  owner?: Owner;
  primaryLanguage?: PrimaryLanguage;
  description?: string;
}

interface State {
  data: Repository[];
  object: Repository;
  isLoading: boolean;
}
