<template>
  <v-app light>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  async mounted () {
    const token = localStorage.getItem('adminToken')
    await this.$axios.setToken(token, 'Bearer')
  }
}
</script>
