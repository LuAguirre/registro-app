<template>
  <b-navbar>
    <template slot="start">
      <b-navbar-item href="/permanentes">
        Usuarios Permanentes
      </b-navbar-item>
      <b-navbar-item href="/temporales">
        Usuarios Temporales
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<style scoped></style>
