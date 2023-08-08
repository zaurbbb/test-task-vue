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
          'current-page': page === pageNumber,
        }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
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
      page: 1,
      totalPages: 10,
      perPage: 10,
    };
  },
  methods: {
    changePage(pageNumber: number) {
      this.page = pageNumber;
    },
  },
  setup() {
    const page = ref(1);
    const perPage = ref(10);

    // const { posts, totalPage, isPostsLoading } = usePosts(10);
    // const { selectedSort, sortedPosts } = useSortedPosts(posts);
    // const { sortedAndSearchedPosts, searchQuery } = useSortedAndSearchedPosts(sortedPosts);
    // return {
    //   posts,
    //   totalPage,
    //   isPostsLoading,
    //   sortedPosts,
    //   selectedSort,
    //   searchQuery,
    //   sortedAndSearchedPosts,
    // };

    const repositories = ref(null);
    const searchQuery = ref("");

    const fetchRepositories = () => {
      repositoriesStore.getRepositoriesByUsername(username);
      repositories.value = repositoriesStore.data;
    };

    const searchAndPaginateRepositories = () => {
      repositoriesStore.getRepositoriesByQuery(username, searchQuery.value);
      repositories.value = repositoriesStore.data;
    };

    watchEffect(() => {
      if (searchQuery.value === "") {
        fetchRepositories();
      } else {
        searchAndPaginateRepositories();
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

<style scoped>
.page__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  gap: 10px;
}
.current-page {
  background-color: #000;
  color: #fff;
}
</style>
