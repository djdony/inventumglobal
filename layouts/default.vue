<template lang='pug'>

  v-app(align-start :class='appClassName')
    header-component

    nuxt

    footer-component

    snackbar-component



</template>

<script>
import HeaderComponent from '@/components/Header'
import FooterComponent from '@/components/Footer'
import SnackbarComponent from '@/components/Snackbar'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    this.populateFilters()
    this.initCart()
  },
  computed: {
    ...mapGetters({
      appClassName: 'styles/appClassName'
    })
  },
  methods: {
    initCart() {
      this.$store.commit('cart/INIT_CART')
    },
    populateFilters() {
      if (this.$auth.loggedIn === true) {
        this.$store.dispatch('filters/populate')
      }
    }
  },
  components: {
    HeaderComponent,
    FooterComponent,
    SnackbarComponent
  }
}
</script>

<style lang="sass">
@import '@/assets/styles/layouts/default.sass'

</style>

