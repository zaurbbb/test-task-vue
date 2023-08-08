<template>
  <main>
    <custom-input
      v-model="searchQuery"
      placeholder="search..."
      class="input__search"
    />
    <repository-list :repositories="filteredRepositories" />
  </main>
</template>

<script lang="ts">
import {
  defineComponent,
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
  methods: {
    fetchRepositories() {
      this.isLoading = true;
      watchEffect(() => {
        repositoriesStore.getRepositoriesByUsername(import.meta.env.username);
        this.repositories = repositoriesStore.data;
      });
      this.isLoading = false;
    },
    searchRepositories() {
      this.isLoading = true;
      watchEffect(() => {
        repositoriesStore.getRepositoriesByQuery(
          import.meta.env.username,
          this.searchQuery
        );
        this.repositories = repositoriesStore.data;
      });
      this.isLoading = false;
    },
  },
  mounted() {
    this.fetchRepositories();
  },
  computed: {
    filteredRepositories() {
      // this.isLoading = true;
      // watchEffect(() => {
      //   repositoriesStore.getRepositoriesByUsername(import.meta.env.VITE_GITHUB_USERNAME);
      //   this.repositories = repositoriesStore.data;
      // });
      // this.isLoading = false;
      return repositoriesStore.data;
    },
  },
});

</script>
