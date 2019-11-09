<template lang='pug'>
  v-content
    Itinerary(:region="location")
</template>

<script>
  import Itinerary from '@/components/Itinerary'
  export default {
    components:{
      Itinerary
    },
    data(){
      return {
        location:{ id: 12, name: "Bodrum"},
      }
    }
  }
</script>