import { useQuery } from "@vue/apollo-composable";
import { defineStore } from "pinia";
import { watchEffect } from "vue";
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

export const useRepositoriesStore = defineStore('repositories', {
  state: (): State => ({
    data: [],
    isLoading: false,
  }),

  actions: {
    getRepositoriesByUsername(username: string) {
      this.isLoading = true;
      try {
        const {
          result,
          loading,
        } = useQuery(GET_REPOSITORIES_BY_USERNAME, {
          username,
        });

        watchEffect(() => {
          this.data = result.value?.user?.repositories?.edges || [];
          this.isLoading = loading.value;
        });
      } catch (error) {
        return error;
      } finally {
        this.isLoading = false;
      }
    },
    getRepositoriesByQuery(
      username: string,
      query: string
    ) {
      this.isLoading = true;
      try {
        const {
          result,
          loading,
        } = useQuery(GET_REPOSITORIES_BY_QUERY, {
          query: `user:${username} ${query}`,
        });

        watchEffect(() => {
          this.data = result.value?.search?.edges || [];
          this.isLoading = loading.value;
        });
      } catch (error) {
        return error;
      } finally {
        this.isLoading = false;
      }
    }
  },
});

