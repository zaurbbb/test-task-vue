<template>
  <div class="repository-item">
    <div class="repository-item__header">
      <router-link
        class="repository-item__link"
        :to="'/repository/' + repository.id"
      >
        {{ repository.name }}
      </router-link>
      <span class="repository-item__is-private">
        {{ isPrivate }}
      </span>
    </div>
    <div class="repository-item__body">
      <div class="repository-item__wrapper">
        <img
          class="repository-item__icon"
          src="https://www.iconarchive.com/download/i134110/github/octicons/star-24.1024.png"
          alt="github star"
        >
        <span class="repository-item__info">
          {{ repository.stargazerCount }}
        </span>
      </div>
      <div class="repository-item__wrapper">
        <img
          class="repository-item__icon"
          src="https://cdn-icons-png.flaticon.com/512/7182/7182235.png"
          alt="github star"
        >
        <span class="repository-item__info">
          {{ updatedAt }}
        </span>
      </div>
      <a
        :href="repository.url"
        target="_blank"
        class="repository-item__wrapper"
      >
        <img
          class="repository-item__icon"
          src="https://static-00.iconduck.com/assets.00/share-icon-2048x1911-60w04qpe.png"
          alt="github star"
        >
        <span class="repository-item__info">
          Go to github
        </span>
      </a>
    </div>
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
  data() {
    return {
      link: this.repository.url,
      isPrivate: this.repository.isPrivate ? "Private" : "Public",
    };
  },
  computed: {
    updatedAt() {
      const dateTimeString = this.repository.updatedAt;
      const dateTime = new Date(dateTimeString);

      const year = dateTime.getFullYear();
      const month = dateTime.getMonth() + 1; // Month is 0-based, so add 1
      const day = dateTime.getDate();

      const monthString = month.toString().padStart(2, '0');
      const dayString = day.toString().padStart(2, '0');
      return `${dayString}-${monthString}-${year}`;
    },
  },
});
</script>
