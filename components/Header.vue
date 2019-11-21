<template lang="pug">
.header
  v-container(pa-0)
    v-toolbar(flat max-height='160' :class='{darkText}').py-12
      v-toolbar-title
        nuxt-link(to='/')
          img.logo(:src='`/img/logo-${logoStyle}.png`')
      v-spacer
      v-spacer

      .menu(v-if="!smAndDown && $store.state.auth.loggedIn")
        v-btn(to='/' rounded text) Home
        v-menu(offset-y)
          template(v-slot:activator="{ on }")
            v-btn(v-on="on"  rounded text) Discover
          v-list(color='white')
            v-list-item(
              v-for="(item, index) in items"
              :key="index"
              @click="go(item.url)"
              )
              v-list-item-title {{ item.title }}

        v-btn(to='/about' rounded text) About Us
        v-btn(to='/contact' rounded text) Contact

      v-spacer

      v-dialog(v-model="dialog" v-if="$store.state.auth.loggedIn" content-class='cart-dialog' max-width='800')
        template(v-slot:activator="cartModal")
          .icons  
            template(v-if='!xs')
              //v-btn(icon)
                v-icon mdi-bell
              v-menu(offset-y open-on-hover max-width='600px')
                template(v-slot:activator='cartHotelsList')
                  v-btn(icon v-on='{...cartHotelsList.on, ...cartModal.on}')
                    v-badge(overlap left)
                      template(v-slot:badge v-if='$store.state.cart.orders.length') {{ $store.state.cart.orders.length }}
                      v-icon() mdi-cart

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
              v-list(color='grey')
                v-list-item(to='/contact')
                  v-list-item-icon.mr-4
                  v-list-item-title Contact
                v-list-item(to='/discover/antalya')
                  v-list-item-icon.mr-4
                  v-list-item-title Antalya
                v-list-item(to='/discover/bodrum')
                  v-list-item-icon.mr-4
                  v-list-item-title Bodrum
                v-list-item(to='/discover/cyprus')
                  v-list-item-icon.mr-4
                  v-list-item-title Northern Cyprus
                v-list-item(to='/about')
                  v-list-item-icon.mr-4
                  v-list-item-title About Us
                v-list-item(@click='logout')
                  v-list-item-icon.mr-4
                    v-icon mdi-logout
                  v-list-item-title Logout
                  
        cart-modal(@close='dialog = false' v-if='dialog')

</template>
<script>
import { mapGetters } from 'vuex'
import CartModal from '@/components/CartModal'

export default {
  data() {
    return {
      dialog: false,
        items: [
            { title: 'Antalya', url: 'antalya' },
            { title: 'Bodrum', url: 'bodrum' },
            { title: 'North Cyprus', url: 'cyprus' },

        ],
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    },
    go: function(url) {
        location.href = '/discover/' +url;
    }
  },
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
  },
  components: {
    CartModal,
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/components/header.sass'

</style>


