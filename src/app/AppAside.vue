<template>
  <aside class="aside">
    <img
      class="aside__logo"
      alt="Vue logo"
      src="https://i.ibb.co/YtY8yrk/Component-43-1.png"
      width="125"
      height="125"
    />

    <nav class="aside__nav">
      <RouterLink
        class="aside__link"
        to="/"
      >
        Home
      </RouterLink>
      <RouterLink
        class="aside__link"
        to="/about"
      >
        About
      </RouterLink>
    </nav>
  </aside>
</template>

<script>
export default {
  name: "AppAside",
};
</script>
