<template>
  <main>
    <custom-input
      v-model="searchQuery"
      placeholder="search..."
      class="input__search"
    />
    <repository-list repositories="repositories" />
  </main>
</template>

<script lang="ts">
import CustomInput from "@/components/UI/CustomInput.vue";
import { defineComponent } from "vue";
import RepositoryList from "../components/Repository/List.vue";

export default defineComponent({
  components: { RepositoryList, CustomInput },
  data() {
    return {
      searchQuery: "",
    };
  },
});

</script>
