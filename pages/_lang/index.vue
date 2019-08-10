<template lang='pug'>

  v-content.home-page
    v-container

      //- SEARCH PART
      
      v-layout(search-part wrap)
        v-flex(xs12)
          h2.display-2.font-weight-bold Discover now,
          h2.display-2.font-weight-light Easier than ever.
        v-flex(xs12 mt-6)
          search-panel

      //- E-COMMERCE PART

      v-layout(ecommerce-part wrap align-center)
        v-flex(md5)
          .stars-wrapper
            v-icon mdi-star
            v-icon mdi-star
            v-icon mdi-star
            v-icon mdi-star
            v-icon mdi-star

          h2.display-2.font-weight-bold Titanic
          h2.display-2.font-weight-light Mardan Palace
          p.mt-4 Situated on the shores of the Turkish Riviera, Titanic Mardan Palace is one of the most luxurious all inclusive resorts in the Turkey. 
          .buttons-wrapper
            v-btn(color='primary' elevation='24').custom.mr-2
              span.price.font-weight-medium €1,295 
              span.font-weight-light.ml-1 Buy now
            v-btn(text color='secondary').custom
              v-icon mdi-cart
              span.font-weight-medium Add to Cart
              
        v-flex(md5 offset-md2)
          ecommerce-carousel

      //- STEPS PART
    
    .steps-part
      v-container
        v-layout.part-icon
          v-icon(color='primary' size='70') mdi-lightbulb-on
        v-layout.part-title
          v-flex
            h3.display-1.font-weight-light A new perspective on Destination Planning <br> with finest selection of products. 
        v-layout(wrap align-center)
          .steps-wrapper
            v-flex(md3 sm6 step)
              .step__number 1
              h4.step__title Explore
              p.step__desc Search for destinations and numerous properties with picturesque atmosphere.
            v-flex(md3 sm6 step)
              .step__number 2
              h4.step__title Find
              p.step__desc Get instant access to all information you need about products.
            v-flex(md3 sm6 step)
              .step__number 3
              h4.step__title Select
              p.step__desc Compare different options and pick your favorite venues for your events.
            v-flex(md3 sm6 step)
              .step__number 4
              h4.step__title Check
              p.step__desc Check availability of your desired choice  and start planning your voyage.
        v-layout
          v-btn(color='primary' elevation='24').custom.mt-10
            span.mr-4 Discover
            v-icon mdi-chevron-right

    //- MOBILE APP PART

    v-container 
      v-layout(align-center wrap mobile-app-part)
        v-flex(sm5 md6 mobile-app__image order-xs3 order-sm1)
          img(src='/img/home/mobile-app.png' alt='Mobile App')
        v-flex(xl4 offset-md1 md5 sm7 mobile-app__desc order-xs2)
          v-icon(color='primary' size='70').desc__icon mdi-cellphone-iphone
          h3.desc__title A new horizon in destination expertise, now it’s a heart-beat away from you.  
          p.desc__text Whether you are at the office, travelling or in a meeting with clients, you have the full and easy access to all the best rates and products.
          .desc__buttons-wrapper
            v-btn(color='primary' elevation='24').custom.mr-3.mb-3
              span.mr-2 Download App
              v-icon(size='18') mdi-apple
            v-btn(color='secondary' elevation='24').custom.mb-3
              span.mr-2 Download App
              v-icon(size='18') mdi-android
  
</template>

<script>
import EcommerceCarousel from '@/components/EcommerceCarousel'
import SearchPanel from '@/components/SearchPanel'

export default {
  data() {
    return {}
  },
  created() {
    this.$store.commit('styles/setHeaderDarkText', false)
    this.$store.commit('styles/setAppClassName', 'home-page')
  },
  components: {
    EcommerceCarousel,
    SearchPanel
  }
}
</script>
<style lang="sass" scoped>
@import '@/assets/styles/pages/home.sass'

</style>
