<template>
  <div class="primary-language">
    <div
      class="primary-language__color"
      :style="{ backgroundColor: primaryLanguageColor }"
    />
    <span class="primary-language__name">
      {{ primaryLanguageName }}
    </span>
  </div>
</template>

<script>
export default {
  name: "SharedPrimaryLanguage",
  props: {
    primaryLanguage: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      primaryLanguageColor: this.primaryLanguage.color,
      primaryLanguageName: this.primaryLanguage.name,
    };
  },
};
</script>

<style
  scoped
  lang="scss"
>

.primary-language {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  color: #586069;
  margin-bottom: 0.5rem;

  &__color {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid #e1e4e8;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.5rem;
    font-weight: 600;
  }

  &__name {
    text-transform: uppercase;
  }
}
</style>
