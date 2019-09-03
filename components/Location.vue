<template lang="pug">
  v-card(:elevation='tabMode ? 0 : 2').details__section.location
    yandex-map(
      ref="map"
      :center="[value.lat-0.0016, value.lon]"
      :height="400"
      :width="1000"
      :zoom="10"
      @ready.once="handle"
    )
    //- GmapMap(
    //-   :center="{lat: value.lat-0.0016, lng: value.lon}" 
    //-   :zoom="16"
    //-   map-type-id="satellite"
    //-   style="width: 100%; height: 450px"
    //- )
    //-   GmapMarker(
    //-     :position="{lat: value.lat, lng: value.lon}"
    //-     :clickable="false"
    //-     :draggable="false"
    //-   )
</template>

<script>
import YandexMap from './YandexMap'
export default {
  components: { YandexMap },
  props: {
    value: Object,
    tabMode: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handle(){
      this.$refs.map.removeAllObjects()
      this.$refs.map.setObjects([{
        coords: [this.value.lat, this.value.lon],
        content: this.value.name,
        hint: '',
        color: 'black'
      }])
      this.$refs.map.map.panTo([this.value.lat, this.value.lon], { delay: 100 })
    }
  }
}
</script>

<style lang="sass" scoped>
  @import '@/assets/styles/pages/details.sass'

  .location
    width: 100%
    color: #222
    .location
      &__name
        font-size: 14px
        font-weight: 400
      &__map-wrapper
        width: 100%
        iframe
          width: 100%
          height: 500px
</style>