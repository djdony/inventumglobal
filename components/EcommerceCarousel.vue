<template lang="pug">
  div.ecommerce-carousel
    v-carousel(continuous cycle hide-delimiters ref='carousel' width='100%' height='100%').ecommerce
      v-carousel-item(v-for="img in images" :key="img.id")
        v-img(:src='img.url' alt='img.name')
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
      
      const nextButton = carousel.children[0].children[this.images.length+1].children[0]
      if(nextButton !== undefined) nextButton.click()
    },
    prev() {
      const carousel = this.$refs.carousel.$el
      const prevButton = carousel.children[0].children[this.images.length+1].children[0]
      if(prevButton !== undefined) prevButton.click()
    }
  }
}
</script>
<style lang="sass">
@import '@/assets/styles/components/ecommerce-carousel.sass'
</style>


