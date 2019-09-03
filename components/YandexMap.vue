<template lang="pug">
  #ymap(:style="`width: ${width}px;height: ${height}px`")
</template>
<script>
export default {
  name: 'yandex-map',
  props: {
    center: {
      type: Array,
      required: true
    },
    zoom: {
      type: Number,
      default: 12.9
    },
    lang: {
      type: String,
      default: 'tr_TR'
    },
    width: {
      type: Number,
      default: 1024
    },
    height: { 
      type: Number,
      default: 768
    }
  },
  data() {
    return {
      ready: false,
      map: null,
      objects: []
    }
  },
  created(){ 
    if(!this.ready || !window.ymaps){
      const ymap = document.createElement('script')
      const apiKey = '870e0f82-c11b-4137-a7da-e13f2e0ca474'
      const lang = this.lang
      const version = '2.1'
      const mode = 'release'
      ymap.setAttribute('src', `https://api-maps.yandex.ru/${version}/?lang=${lang}&apikey=${apiKey}&mode=${mode}`)
      document.body.appendChild(ymap)
      ymap.onload = () => {
        if(window.hasOwnProperty('ymaps') && window.ymaps != null){
          ymaps.ready(this.initMap)
        }
      }
      ymap.onerror = () => {
        this.$message.error('Harita yüklenemedi. Lütfen sayfayı yenileyiniz')
      }
    }else{
      ymaps.ready(this.initMap)
    }
  },
  beforeDestroy(){

  },
  methods: {
    initMap(){
      this.map = new ymaps.Map("ymap", {
          center: this.center,
          zoom: this.zoom
        }, {
          searchControlProvider: 'yandex#search'
        })
      if(!this.ready){
        this.$emit('ready', true)
        this.ready = true
      }
    },
    setObjects(objects) {
      if(objects != null && objects.length && this.ready){
        objects.forEach(o => {
          let obj = new ymaps.GeoObject({
              geometry: {
                type: "Point",
                coordinates: o.coords
              },
              properties: {
                iconContent: o.content,
                hintContent: o.hint
              }
            }, {
              preset: `islands#${o.color}StretchyIcon`,
              draggable: false
          })

          this.objects.push(obj)
          this.map.geoObjects.add(obj)

          this.map.geoObjects.events.add('click', function (e) {
              console.log(e.get('target'))
          });

        })
      }
    },
    changeCoords(objects){
      if(objects != null && objects.length && this.ready){
        objects.forEach((o, i) => {
          if(this.objects[i] != null && this.objects[i].hasOwnProperty('geometry')){
            try{
              this.objects[i].geometry.setCoordinates(o.coords);
              this.objects[i].properties.set('iconContent', o.content);
              this.objects[i].properties.set('hintContent', o.hint);
            }catch(e){

            }
          }
        })
      }
    },
    removeAllObjects(){
      if(this.ready && this.map){
        this.map.geoObjects.removeAll()
      }
    }
  }
}
</script>
