<template>
  <section>
    <custom-input
      v-model="searchQuery"
      placeholder="Search..."
      class="input__search"
    />
    <h3>{{ username }}'s repositories list</h3>
    <repository-list
      v-if="paginatedRepositories.length > 0"
      :repositories="searchQuery === '' ? paginatedRepositories : repositories"
    />
    <h2 v-if="isLoading === false && paginatedRepositories.length === 0">No data...</h2>
    <custom-loader v-if="isLoading" />
    <div
      v-if="searchQuery === ''"
      class="pagination"
    >
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="pagination__item"
        :class="{
          'pagination__item--active': currentPage === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
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

export default defineComponent({
  components: {
    CustomLoader,
    RepositoryList,
    CustomInput,
  },
  setup() {
    const repositoriesStore = useRepositoriesStore();
    const repositories = ref(null);
    const paginatedRepositories = ref(null);
    const isLoading = ref(false);
    const searchQuery = ref("");
    const currentPage = ref(1);
    const totalPages = ref(0);
    const username = import.meta.env.VITE_GITHUB_USERNAME;

    const fetchRepositories = async () => {
      isLoading.value = true;

      await repositoriesStore.getRepositories(
        username,
        searchQuery.value,
        currentPage.value
      );

      repositories.value = repositoriesStore.data;
      paginatedRepositories.value = repositoriesStore.paginatedData;
      totalPages.value = repositoriesStore.totalPages;
      currentPage.value = repositoriesStore.currentPage;

      isLoading.value = false;
    };

    watchEffect(() => {
      fetchRepositories();
    });

    const changePage = (pageNumber: number) => {
      currentPage.value = pageNumber;
    };

    return {
      repositories,
      paginatedRepositories,
      isLoading,
      searchQuery,
      currentPage,
      totalPages,
      username,
      changePage,
    };
  },
});
</script>

<style
  scoped
  lang="scss"
>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;

  &__item {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 3rem;
    height: 3rem;

    border-radius: 10rem;

    cursor: pointer;

    &--active {
      background-color: #000;

      color: #fff;
    }
  }
}

</style>
