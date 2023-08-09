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

provideApolloClient(apolloClient);
export const useRepositoriesStore = defineStore("repositories", {
  state: (): State => ({
    data: [],
    paginatedData: [],
    object: {},
    error: null,
    currentPage: 1,
    totalPages: 0,
    limit: 10,
    searchQuery: "",
  }),
  actions: {
    getRepositories(
      username: string,
      queryString: string,
      currentPage: number,
    ) {
      provideApolloClient(apolloClient);
      try {
        const query = `user:${username} ${queryString}`;
        this.searchQuery = queryString;
        const { result } = useQuery(
          GET_REPOSITORIES_BY_QUERY,
          { query },
        );
        this.data = result.value?.search?.edges || [];
        this.totalPages = Math.ceil(this.data.length / this.limit);
        if (this.searchQuery === "") {
          this.paginateRepositories(currentPage);
        }

      } catch (error) {
        console.log(error);
      }
    },
    getRepositoryByName(
      username: string,
      name: string,
    ) {
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
            this.object = result.value?.repository || {};
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    paginateRepositories(page: number) {
      const startIndex = (page - 1) * this.limit;
      const endIndex = startIndex + this.limit;
      this.paginatedData = this.data.slice(
        startIndex,
        endIndex,
      );
      this.currentPage = page;
    },
  },
  persist: true,
});


interface Owner {
  login: string;
  avatarUrl: string;
}

interface PrimaryLanguage {
  color: string;
  name: string;
}

export interface Repository {
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
  paginatedData: Repository[];
  object: Repository;
  isLoading: boolean;
  error: null | String;
  currentPage: number;
  totalPages: number;
  limit: number;
  searchQuery: string;
}
