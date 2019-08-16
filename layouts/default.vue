<template lang='pug'>

  v-app(align-start :class='appClassName')
    header-component

    nuxt

    footer-component

</template>

<script>
import HeaderComponent from '@/components/Header'
import FooterComponent from '@/components/Footer'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {}
  },
  created() {
    this.populateFilters()
    this.initStars()
    this.initCart()
  },
  methods: {
    initCart() {
      this.$store.commit('cart/INIT_CART')
    },
    populateFilters() {
      if (this.$auth.loggedIn === true) {
        this.$store.dispatch('filters/populate')
      }
    },
    async initStars() {
      try {
        const res = await this.$axios.get('/stars')
        this.$store.commit('stars/SET_STARS', res.data)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapGetters({
      appClassName: 'styles/appClassName'
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

