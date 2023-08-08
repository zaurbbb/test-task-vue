<template>
  <section>
    <custom-input
      v-model="searchQuery"
      placeholder="Search..."
      class="input__search"
    />
    <h3>{{ username }}'s repositories list</h3>
    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{
          'current-page': currentPage === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
    <repository-list
      v-if="paginatedRepositories.length > 0"
      :repositories="paginatedRepositories"
    />
    <h2 v-else-if="isLoading">Loading...</h2>
    <h2 v-if="paginatedRepositories.length === 0">No such repositories...</h2>
    <!--    <custom-loader v-if="isLoading" />-->
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
      paginatedRepositories: null,
      isLoading: false,
      searchQuery: "",
      username,
      currentPage: 1,
      totalPages: 0,
    };
  },
  methods: {
    changePage(pageNumber: number) {
      this.currentPage = pageNumber;
      console.log("page", this.currentPage);
      repositoriesStore.paginateRepositories(pageNumber);
    },
  },
  setup() {
    const currentPage = ref(1);
    const totalPages = ref(10);
    const repositories = ref(null);
    const paginatedRepositories = ref(null);
    const searchQuery = ref("");
    const isLoading = ref(false);

    const fetchRepositories = () => {
      isLoading.value = true;
      repositoriesStore.getRepositories(username, searchQuery.value, currentPage.value);
      repositories.value = repositoriesStore.data;
      paginatedRepositories.value = repositoriesStore.paginatedData;
      totalPages.value = Math.ceil(repositoriesStore.data.length / repositoriesStore.limit);
      currentPage.value = repositoriesStore.currentPage;
      isLoading.value = false;
    };

    watchEffect(() => {
      fetchRepositories();
    });

    return {
      repositories,
      paginatedRepositories,
      currentPage,
      isLoading,
      searchQuery,
      totalPages,
    };
  },
});
</script>

<style scoped>
.page__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}

.page, .current-page {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 3rem;
  height: 3rem;

  border-radius: 10rem;

  cursor: pointer;
}
.current-page {
  background-color: #000;

  color: #fff;

}
</style>
