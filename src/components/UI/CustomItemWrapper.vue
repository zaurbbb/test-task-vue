<template>
  <div class="custom-item-wrapper">
    <img
      class="custom-item-wrapper__icon"
      :src="image"
      :alt="alt"
    >
    <span class="custom-item-wrapper__info">
       <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "CustomItemWrapper",
  props: {
    image: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      required: true,
    },
  },
};
</script>
