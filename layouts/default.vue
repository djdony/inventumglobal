<template lang='pug'>
  v-app(class='v-app' align-start)
    v-content
      nuxt

</template>

<script>
  import Navbar from '~/components/Navbar'
  import Footer from '~/components/Footer'
export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {}
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/layouts/default.sass'

</style>

