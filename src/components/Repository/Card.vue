<template>
  <article class="repository-card">
    <div class="repository-card__header">
      <shared-breadcrumbs
        :url="url"
        :owner="owner"
        :repository-name="repositoryName"
      />
      <custom-repository-visibility :is-private="isPrivate" />
    </div>
    <div class="repository-card__body">
      <div class="repository-card__meta">
        <p class="repository-card__title">About</p>
        <p class="repository-card__text">{{ description }}</p>
      </div>
      <div class="repository-card__meta">
        <shared-stars :stars="stargazerCount" />
      </div>
      <div class="repository-card__meta">
        <shared-primary-language :primary-language="primaryLanguage" />
      </div>
    </div>
  </article>
</template>

<script>
import CustomItemWrapper from "../UI/CustomItemWrapper.vue";
import CustomRepositoryVisibility from "../UI/CustomVisibility.vue";
import SharedStars from "../Shared/SharedStars.vue";
import SharedBreadcrumbs from "../Shared/SharedBreadcrumbs.vue";
import SharedPrimaryLanguage from "../Shared/SharedPrimaryLanguage.vue";

export default {
  name: "RepositoryCard",
  components: { SharedPrimaryLanguage, SharedBreadcrumbs, SharedStars, CustomItemWrapper, CustomRepositoryVisibility },
  props: {
    repository: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      repositoryName: this.repository.name,
      stargazerCount: this.repository.stargazerCount,
      updatedAt: this.repository.updatedAt,
      url: this.repository.url,
      isPrivate: this.repository.isPrivate,
      owner: this.repository.owner,
      primaryLanguage: this.repository.primaryLanguage,
      description: this.repository.description || "No description provided",
    };
  },
};
</script>
