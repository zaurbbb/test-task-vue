<template>
  <section>
    <custom-input
      v-model="searchQuery"
      placeholder="Search..."
      class="input__search"
    />
    <h3>{{ username }}'s repositories list</h3>
    <repository-list
      v-if="repositories && repositories.length > 0"
      :repositories="repositories"
    />
<!--    <h2 v-else-if="repositories && repositories.length === 0">No posts yet..</h2>-->
    <custom-loader v-else />
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watchEffect,
} from "vue";
import RepositoryList from "../components/Repository/List.vue";
import CustomInput from "../components/UI/CustomInput.vue";
import CustomLoader from "../components/UI/CustomLoader.vue";
import { useRepositoriesStore } from "../stores/repositories";

const repositoriesStore = useRepositoriesStore();
const username = import.meta.env.VITE_GITHUB_USERNAME;
export default defineComponent({
  components: {
    CustomLoader,
    RepositoryList,
    CustomInput,
  },
  data() {
    return {
      repositories: null,
      isLoading: false,
      searchQuery: "",
      username,
    };
  },
  setup() {
    const repositories = ref(null);
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
