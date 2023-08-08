<template>
  <main>
    <p>Loading: {{ repositoriesStore.isLoading }}</p>
    <custom-input
      v-model="searchQuery"
      placeholder="search..."
      class="input__search"
    />
      <repository-list :repositories="repositories" />
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watchEffect,
} from "vue";
import RepositoryList from "../components/Repository/List.vue";
import CustomInput from "../components/UI/CustomInput.vue";
import { useRepositoriesStore } from "../stores/repositories";

const repositoriesStore = useRepositoriesStore();
const username = import.meta.env.VITE_GITHUB_USERNAME;
export default defineComponent({
  components: {
    RepositoryList,
    CustomInput,
  },
  data() {
    return {
      repositories: [],
      isLoading: false,
      searchQuery: "",
    };
  },
  setup() {
    const repositories = ref([]);
    const searchQuery = ref("");

    const fetchRepositories = () => {
      repositoriesStore.getRepositoriesByUsername(username);
      repositories.value = repositoriesStore.data;
    };

    const searchRepositories = () => {
      repositoriesStore.getRepositoriesByQuery(username, searchQuery.value);
      repositories.value = repositoriesStore.data;
    };

    watchEffect(() => {
      if (searchQuery.value === "") {
        fetchRepositories();
      } else {
        searchRepositories();
      }
    });

    const isLoading = repositoriesStore.isLoading;
    return {
      repositories,
      isLoading,
      searchQuery,
      repositoriesStore,
    };
  },
});

</script>
