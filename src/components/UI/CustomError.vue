<template>
  <div>
    <p>
      Sorry, this repository doesn't belong to {{ username }}. <br />
    </p>
    <span>
    So, we can't load it. You can came back to the home page.
    </span>
  </div>
</template>

<script>
export default {
  name: "CustomError",
  data() {
    return {
      username: import.meta.env.VITE_GITHUB_USERNAME,
    };
  },
};
</script>

<style scoped>
p, span {
  color: #c94444;
}

p {
  font-size: 4rem;
  margin-bottom: 1rem;
}

span {
  font-size: 3rem;
}
</style>
