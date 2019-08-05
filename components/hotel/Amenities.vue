<template lang="pug">
  div
    template(v-for="type in types")
      el-divider(:key="type.id")
        | {{ type.name }}
      el-row.pl-20(v-for="a in amenities.filter(a => a.type === type.id)" :key="a.id")
        el-col(:span="3") {{ a.name }}
        el-col(:span="21")
          el-radio-group(v-model="a.included")
            el-radio(:label="null") None
            el-radio(:label="1") Included
            el-radio(:label="0") Excluded
</template>
<script type="text/javascript">
  import Hotel from '@/models/Hotel'
  export default {
    name: 'amenities',
    props: ['hotel'],
    data(){
      return {
        types: [
          { id: 'territory', name: 'TERRITORY' },
          { id: 'animation', name: 'ANIMATION' },
          { id: 'spa', name: 'SPA' },
          { id: 'kids', name: 'KIDS' }
        ],
        amenities: []
      }
    },
    methods: {
      async fetch(){
        this.amenities = await this.hotel.amenities().get()
      },
      async save(){
        let prepared = this.amenities
          .filter(a => a.included !== null)
          .map(({ id, included }) => { return { id, included }})
        await this.hotel.amenities().sync(prepared)
      }
    },
    watch: {
      'hotel.id': {
        immediate: true,
        deep: true,
        handler: async function(val){
          if(val){
            await this.fetch()
          }
        }
      }
    }
  }
</script>