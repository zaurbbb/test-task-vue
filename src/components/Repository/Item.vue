<template>
 <div>
   {{ repository.name }}
   {{ repository.stargazerCount }}
   {{ repository.updatedAt }}
   {{ repository.url }}
 </div>
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
