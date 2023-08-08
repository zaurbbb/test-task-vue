<template>
  <div v-if="repositories.length > 0">
    <h3>List of Items</h3>
    <transition-group name="post-list">
      <repository-item
        v-for="{ node } of repositories"
        :key="node.name"
        :repository="node"
      />
    </transition-group>
  </div>
  <h2 v-else>No posts yet..</h2>
  <button @click="logRepositories">aufauf</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RepositoryItem from "./Item.vue";

export default defineComponent({
  name: "RepositoryList",
  components: { RepositoryItem },
  props: {
    repositories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    logRepositories() {
      console.log(this.repositories);
    },
  },
});
</script>

<style scoped>

</style>
