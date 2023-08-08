<template>
  <custom-item-wrapper
    image="https://icons.iconarchive.com/icons/github/octicons/256/star-24-icon.png"
    alt="github star"
  >
    {{ stars }}
  </custom-item-wrapper>
</template>

<script>
import CustomItemWrapper from "../UI/CustomItemWrapper.vue";

export default {
  name: "SharedStars",
  components: { CustomItemWrapper },
  props: {
    stars: {
      type: Number,
      required: true,
    },
  },
};
</script>
