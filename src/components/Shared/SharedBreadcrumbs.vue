<template>
  <custom-item-wrapper
    :image="avatarUrl"
    alt="owner avatar"
  >
    <div class="shared-breadcrumbs">
      <a
        class="shared-breadcrumbs__link"
        :href="'https://github.com/' + owner"
        target="_blank"
      >
        {{ owner }}
      </a>
      /
      <a
        class="shared-breadcrumbs__link shared-breadcrumbs__link--bold"
        :href="url"
        target="_blank"
      >
        {{ repositoryName }}
      </a>
    </div>
  </custom-item-wrapper>
</template>

<script>
import CustomItemWrapper from "../UI/CustomItemWrapper.vue";

export default {
  name: "SharedBreadcrumbs",
  components: { CustomItemWrapper },
  props: {
    owner: {
      type: Object,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    repositoryName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      owner: this.owner.login,
      avatarUrl: this.owner.avatarUrl,
    };
  },
};
</script>
