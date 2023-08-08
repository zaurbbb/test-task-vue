<template>
  <section>
    <repository-card
      v-if="repository && Object.keys(repository).length > 0"
      :repository="repository"
    />
    <custom-error v-else-if="error" />
    <custom-loader v-else />
  </section>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeUnmount,
  ref,
  watchEffect,
} from "vue";
import { useRoute } from "vue-router";
import RepositoryCard from "../components/Repository/Card.vue";
import RepositoryList from "../components/Repository/List.vue";
import CustomError from "../components/UI/CustomError.vue";
import CustomInput from "../components/UI/CustomInput.vue";
import CustomLoader from "../components/UI/CustomLoader.vue";
import { useRepositoriesStore } from "../stores/repositories";

const repositoriesStore = useRepositoriesStore();

const username = import.meta.env.VITE_GITHUB_USERNAME;
repositoriesStore.getRepositoryByName(username, name.value);
export default defineComponent({
  components: {
    CustomError,
    RepositoryCard,
    CustomLoader,
    RepositoryList,
    CustomInput,
  },
  data() {
    return {
      repository: null,
      name: this.$route.params.name,
      isLoading: false,
      error: null,
    };
  },
  setup() {
    const route = useRoute();
    const repository = ref(null);
    const name = ref(route.params.name);
    const error = ref(null);
    const currentPage = ref(1);

    const fetchRepository = () => {
      repositoriesStore.getRepositoryByName(username, name.value);
      if (repositoriesStore.error?.message.includes("Could not resolve")) {
        error.value = repositoriesStore.error;
      }
      repository.value = repositoriesStore.object;
    };

    watchEffect(() => {
      if (name.value !== "" && error.value === null) {
        fetchRepository();
      }
    });

    onBeforeUnmount(() => {
      error.value = null; // Cleanup the error when the component is unmounted
    });

    const isLoading = repositoriesStore.isLoading;
    return {
      repository,
      name,
      isLoading,
      error,
    };
  },
});
</script>
