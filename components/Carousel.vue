<template lang="pug">
 div
  .carousel-wrapper
    .rooms__carousel(ref='carouselWrapper' @click="showGallery = true")
      v-img.mr-1(v-for="m in media" :key="m.id" :src='m.url')
        v-row(align="end" class="lightbox white--text pa-2 fill-height")
          v-col
            .subheading {{ m.name }}
    .navigation
      span(ref='prev').btn.prev: v-icon mdi-chevron-left
      span(ref='next').btn.next: v-icon mdi-chevron-right
</template>

<script>
import Gallery from '@/components/Gallery'
export default {
  components: {
    Gallery
  },
  data() {
    return {
      showGallery: false
    }
  },
  props: {
    media: {
      type: Array,
      default: []
    }
  },
  async mounted() {
    let mod = await import('@/plugins/glider')
    const Glider = mod.default
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
  methods: {
    showGal(){
    }
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
<style scoped>
  .lightbox {
    box-shadow: 0 0 25px inset rgba(0, 0, 0, 0.4);
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100px);
  }
</style>