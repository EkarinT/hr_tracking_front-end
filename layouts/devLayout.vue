<template>
  <v-app light>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'DevLayout',
  async mounted () {
    const token = localStorage.getItem('devToken')
    await this.$axios.setToken(token, 'Bearer')
  }
}
</script>
