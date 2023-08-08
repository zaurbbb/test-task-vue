<template>

</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "RepositoryItem",
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
});
</script>

<style scoped>

</style>
