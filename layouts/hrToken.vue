<template>
  <v-app light>
    <nuxt />
  </v-app>
</template>

<script>
export default {
  name: 'HrTokenLayout',
  async mounted () {
    const token = localStorage.getItem('hrToken')
    await this.$axios.setToken(token, 'Bearer')
  }
}
</script>
