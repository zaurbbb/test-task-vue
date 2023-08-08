<template>
  <span class="custom-visibility">
    {{ visibility }}
  </span>
</template>

<script>
export default {
  name: "CustomVisibility",
  props: {
    isPrivate: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      visibility: this.isPrivate ? "Private" : "Public",
    };
  }
};
</script>
