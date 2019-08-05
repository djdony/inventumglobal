<template lang='pug'>
    v-footer.py-12.align-start
      v-flex.md3.col
        p.col__title Turkey Expert, Easier than ever!
        p.col__content Get instant access to the best prices and products via one platform. Compact and simply professional.
        .social-icons
          a.circle: v-icon mdi-facebook
          a.circle: v-icon mdi-instagram
          a.circle: v-icon mdi-linkedin
          a.circle: v-icon mdi-twitter
          a.circle: v-icon mdi-youtube
          a.circle: v-icon mdi-pinterest

      v-flex.md1.offset-md2.col
        p.col__title Navigation
        ul.col__content
          li: a(href='#') Homepage
          li: a(href='#') Membership
          li: a(href='#') About
          li: a(href='#') Contact

      v-flex(:class='{"pl-8": !smAndDown}').md4.col
        p.col__title Navigation
        ul.col__content
          li: a(href='#') inventumglobal.in
          li: a(href='#') hello@inventumglobal.in
          li: a(href='#') +90 242 324 11 65
</template>

<script>
  export default {
    computed: {
      smAndDown() {
        return this.$vuetify.breakpoint.smAndDown
      }
    }
  }
</script>
