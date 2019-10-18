<template lang="pug">
  .footer(:class='{"enable-bg": footerBg}')
    v-container
      v-footer.align-start.px-0
        v-layout(row)
          v-flex.md12.col
            img(src='/img/logo-light.png').logo
        v-layout(row wrap)
          v-flex.md3.sm6.col
            p.col__title Destination Expert, Easier than ever!
            p.col__content Get instant access to the best prices and products via one platform. Compact and simply professional.
            .social-icons
              a(href="https://www.facebook.com/Inventumglobal.Turkey" target="_blank").circle: v-icon mdi-facebook
              a(href="https://www.instagram.com/inventumglobalturkey" target="_blank").circle: v-icon mdi-instagram
              a(href="https://www.linkedin.com/company/inventumglobal" target="_blank").circle: v-icon mdi-linkedin
              a(href="https://twitter.com/inventumglobal" target="_blank").circle: v-icon mdi-twitter
              a(href="https://www.youtube.com/channel/UCQKsS-48PgdplZIOPeL7KAw" target="_blank").circle: v-icon mdi-youtube

          v-flex.md1.offset-md2.sm2.col
            p.col__title Navigation
            ul.col__content
              li: a(href='/') Homepage
              li: a(href='#') Membership
              li: a(href='/about') About
              li: a(href='/contact') Contact

          v-flex(:class='{"pl-8": !smAndDown}').md2.sm4.col
            p.col__title Get in Touch
            ul.col__content
              li: a(href='#') inventumglobal.in
              li: a(href='#') info@inventumglobal.in
              li: a(href='#') +90 242 324 11 65

          v-flex(:class='{"pl-8": !smAndDown}').md4.sm4.col
            p.col__title Copyright © 2019
            ul.col__content
              li All Rights Reserved
              li &nbsp;
              li Design by Inventum Global




</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    bg: Boolean
  },
  computed: {
    ...mapGetters({
      footerBg: 'styles/footerBg'
    }),
    smAndDown() {
      return this.$vuetify.breakpoint.smAndDown
    }
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/components/footer.sass'
</style>


