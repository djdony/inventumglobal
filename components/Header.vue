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

      v-dialog(v-model="dialog" content-class='cart-dialog' max-width='1264')
        template(v-slot:activator="cartModal")
          .icons  
            template(v-if='!xs')
              v-btn(icon)
                v-icon mdi-bell
              v-menu(offset-y open-on-hover max-width='600px')
                template(v-slot:activator='cartHotelsList')
                  v-btn(icon v-on='{...cartHotelsList.on, ...cartModal.on}')
                    v-badge(overlap left)
                      template(v-slot:badge v-if='cartItems') {{ cartItems }}
                      v-icon() mdi-cart
                v-card(color='white')
                  v-list.header__cart-hotels-list
                    v-list-item
                      hotel-stars(id='9')
                      .hotels__info
                        .info__title Hotel lalala
                        .info__regions Antalya
                      v-spacer
                      v-btn(icon): v-icon mdi-close
                    v-list-item
                      hotel-stars(id='9')
                      .hotels__info
                        .info__title Hotel lalala
                        .info__regions Antalya
                      v-spacer
                      v-btn(icon): v-icon mdi-close
                    v-list-item
                      hotel-stars(id='9')
                      .hotels__info
                        .info__title Hotel lalalaasd asdas das
                        .info__regions Antalya
                      v-spacer
                      v-btn(icon): v-icon mdi-close


              
              v-menu(offset-y)
                template(v-slot:activator='userMenu')
                  v-btn(icon v-on='userMenu.on').red
                    v-icon mdi-account
                v-list(color='white')
                  v-list-item(@click='')
                    v-list-item-icon.mr-4
                      v-icon mdi-monitor-dashboard
                    v-list-item-title Cabinet
                  v-list-item(@click='')
                    v-list-item-icon.mr-4
                        v-icon mdi-account-details
                    v-list-item-title Profile
                  v-list-item(@click='logout')
                    v-list-item-icon.mr-4
                        v-icon mdi-logout
                    v-list-item-title Logout

            v-menu(v-else offset-y)
              template(v-slot:activator='mobileMenu')
                v-btn(icon v-on='mobileMenu.on')
                  v-icon mdi-menu
              v-list(color='white')
                v-list-item(v-on='cartModal.on')
                  v-list-item-icon.mr-4
                    v-badge(overlap)
                      template(v-slot:badge v-if='cartItems') {{ cartItems }}
                      v-icon mdi-cart
                  v-list-item-title Cart
                v-list-item(@click='')
                  v-list-item-icon.mr-4
                    v-icon mdi-monitor-dashboard
                  v-list-item-title Cabinet
                v-list-item(@click='')
                  v-list-item-icon.mr-4
                      v-icon mdi-account-details
                  v-list-item-title Profile
                v-list-item(@click='logout')
                  v-list-item-icon.mr-4
                      v-icon mdi-logout
                  v-list-item-title Logout
                  
        cart-modal(@close='dialog = false' v-if='dialog')

</template>
<script>
import { mapGetters } from 'vuex'
import CartModal from '@/components/CartModal'
import HotelStars from '@/components/HotelStars'

export default {
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  },
  computed: {
    cartItems() {
      return this.$store.state.cart.hotels.length
    },
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
  },
  components: {
    CartModal,
    HotelStars
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/components/header.sass'

</style>


