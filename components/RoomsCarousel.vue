<template lang="pug">
.carousel-wrapper
  .rooms__carousel(ref='carouselWrapper')
    img(:src='item' v-for='(item, index) in items' :key='index')
  .navigation
    span(ref='prev').btn.prev: v-icon mdi-chevron-left
    span(ref='next').btn.next: v-icon mdi-chevron-right
</template>

<script>
import Glider from '@/plugins/glider'

export default {
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  mounted() {
    let carousel = new Glider(this.$refs.carouselWrapper, {
      arrows: {
        prev: this.$refs.prev,
        next: this.$refs.next
      },
      responsive: [
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    })
  },
  computed: {}
}
</script>

<style lang="sass">
@import '@/assets/styles/glider.css'

.carousel-wrapper
  position: relative

.rooms__carousel
  margin: 30px -5px 0px -5px
  position: relative
  img
    max-height: 250px
    object-fit: cover
    margin: 0 5px
.navigation
  width: 100%
  height: 100%
  top: 0
  position: absolute
  .btn
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    z-index: 2
    color: #fff
    &.prev
      position: absolute
      bottom: calc(50% - 25px)
      left: 25px
      background-color: $secondary-color
      height: 50px
      width: 50px
    &.next
      position: absolute
      bottom: calc(50% - 25px)
      right: 25px
      background-color: $primary-color
      box-shadow: $elevation-24
      height: 50px
      width: 50px
    .v-icon
      color: #fff

@include respond-to(sm)
  .navigation
    .btn
      &.prev
        bottom: calc(50% - 20px)
        left: 10px
        height: 40px
        width: 40px
      &.next
        bottom: calc(50% - 20px)
        right: 10px
        height: 40px
        width: 40px

</style>