<template lang='pug'>

  v-app(align-start :class='appClassName')
    header-component

    nuxt

    footer-component

</template>

<script>
import HeaderComponent from "@/components/Header"
import FooterComponent from "@/components/Footer"
import { mapGetters } from "vuex"

export default {
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('filters/populate')
  },
  computed: {
    ...mapGetters({
      appClassName: "styles/appClassName"
    })
  },
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="sass">
@import '@/assets/styles/layouts/default.sass'

</style>

