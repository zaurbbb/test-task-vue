import {
  provideApolloClient,
  useQuery,
} from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { watchEffect } from "vue";
import { apolloClient } from "../api/index";
import {
  GET_REPOSITORIES_BY_QUERY,
  GET_REPOSITORY_BY_NAME,
} from "../constants/graphql";

export const useRepositoriesStore = defineStore("repositories", {
  state: (): State => ({
    data: [],
    paginatedData: [],
    object: {},
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
  }),
  actions: {
    getRepositories(
      username: string,
      query: string,
      currentPage: number,
    ) {
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
          this.totalPages = Math.ceil(this.data.length / this.limit);
          this.data = result.value?.search?.edges || [];
          this.paginatedData = this.data.slice(
            currentPage - 1,
            currentPage - 1 + this.limit,
          );
          this.currentPage = currentPage;
          this.isLoading = loading.value;
        });
      } catch (error) {
        return error;
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
    paginateRepositories(page: number) {
      this.paginatedData = this.data.slice(
        page - 1,
        page - 1 + this.limit,
      );
      this.currentPage = page;
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
