<template>
  <div class="repositories-list">
    <transition-group name="repositories-list">
      <repository-item
        v-for="{ node } of repositories"
        :key="node.name"
        :repository="node"
      />
    </transition-group>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RepositoryItem from "./Item.vue";

export default defineComponent({
  name: "RepositoryList",
  components: { RepositoryItem },
  props: {
    repositories: {
      type: [
        Array,
        null,
      ],
      required: true,
    },
  },
});
</script>
