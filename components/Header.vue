<template lang="pug">
.header
  v-container(pa-0)
    v-toolbar(flat max-height='160' :class='{darkText}').py-12
      v-toolbar-title
        nuxt-link(to='/')
          img.logo(:src='`/img/logo-${logoStyle}.png`')
      v-spacer

      .menu(v-if='!smAndDown')
        v-btn(to='/' rounded text) Home  
        v-btn(to='/search' rounded text) Discover  

      v-spacer

      .icons
        template(v-if='!xs')
          v-btn(icon)
           v-icon mdi-bell
          v-btn(icon to='/cart')
           v-icon mdi-cart
          v-btn(icon).red
            v-icon mdi-account

        v-btn(icon v-else)
          v-icon mdi-menu



</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      logoStyle: 'styles/headerLogoStyle',
      darkText: 'styles/headerDarkText'
    }),
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    },
    xs() {
      return this.$vuetify.breakpoint.xs
    }
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/components/header.sass'

</style>


