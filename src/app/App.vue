<template>
  <app-aside />
  <main>
    <router-view />
  </main>
</template>

<script
  setup
  lang="ts"
>
import { RouterView } from "vue-router";
import AppAside from "./AppAside.vue";
</script>
