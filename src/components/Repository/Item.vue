<template>
  <article class="repository-item">
    <div class="repository-item__header">
      <router-link
        class="repository-item__link"
        :to="'/repository/' + repository.name"
      >
        {{ repository.name }}
      </router-link>
      <custom-repository-visibility :is-private="repository.isPrivate" />
    </div>
    <div class="repository-item__body">
      <custom-item-wrapper
        image="https://icons.iconarchive.com/icons/github/octicons/256/star-24-icon.png"
        alt="github star"
      >
        {{ repository.stargazerCount }}
      </custom-item-wrapper>
      <custom-item-wrapper
        image="https://cdn-icons-png.flaticon.com/512/7182/7182235.png"
        alt="github star"
      >
        {{ updatedAt }}
      </custom-item-wrapper>
      <custom-item-wrapper
        image="https://static-00.iconduck.com/assets.00/share-icon-2048x1911-60w04qpe.png"
        alt="github link"
      >
        <a
          :href="repository.url"
          target="_blank"
        >
          Go to github
        </a>
      </custom-item-wrapper>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import CustomItemWrapper from "../UI/CustomItemWrapper.vue";
import CustomRepositoryVisibility from "../UI/CustomVisibility.vue";

export default defineComponent({
  name: "RepositoryItem",
  components: { CustomRepositoryVisibility, CustomItemWrapper },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      link: this.repository.url,
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
