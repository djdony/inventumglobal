<template lang="pug">
  div.ecommerce-carousel
    v-carousel(continuous ref='carousel' cycle hide-delimiters width='100%' height='100%').ecommerce
      v-carousel-item
        v-img(src='/img/home/ecommerce.png' alt='ecommerce')
      v-carousel-item
        v-img(src='/img/home/ecommerce.png' alt='ecommerce')
    .navigation
      v-btn(@click='prev()' icon elevation='24').prev: v-icon mdi-chevron-left 
      v-btn(@click='next()' icon elevation='24').next: v-icon mdi-chevron-right 

</template>
<script>
export default {
  props: {
    images: Array
  },
  methods: {
    next() {
      const carousel = this.$refs.carousel.$el
      const nextButton = carousel.children[0].children[3].children[0]
      nextButton.click()
    },
    prev() {
      const carousel = this.$refs.carousel.$el
      const prevButton = carousel.children[0].children[2].children[0]
      prevButton.click()
    }
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/ecommerce-carousel.sass'
</style>


