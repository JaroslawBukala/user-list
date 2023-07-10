<template>
  <v-app class="background-colour">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>

<style>
  .background-colour {
    background-color: #f5f5f5;
  }
</style>
