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
} from "../constants/graphql";

interface Repository {
  name: string;
  age: number;
}

interface State {
  data: Repository[];
  isLoading: boolean;
}

export const useRepositoriesStore = defineStore("repositories", {
  // useApollo()
  state: (): State => ({
    data: [],
    isLoading: false,
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
        console.log(queryString);
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
  },
});

