<template>
  <section class="container">
    <Navbar />
    <router-view> </router-view>
  </section>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
};
</script>

<style></style>
