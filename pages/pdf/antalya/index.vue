<template lang='pug'>
  v-content
    v-container
      p
      h1(align="center") Antalya
        v-tabs(centered grow)
          v-tab(@click="productShow(1)") M.I.C.E
          v-tab(@click="productShow(2)") Wedding

        v-row
          v-icon(style="color:orange" size="50px") mdi-chevron-double-right
          h4(style="color:orange;text-align:left") {{product.name}}
        hr(style="border:2px solid grey;margin-bottom:20px")
      v-simple-table(dense )
        tbody
          tr
            td(colspan="4" bgcolor="orange")
              h2(align="center") ITINERARIES
          tr(v-for="(item, i) in product.itineraries")
            td(
              bgcolor="lightgrey"
              :rowspan="productDays(item.day)"
              v-if="i>0? item.day!==product.itineraries[i-1].day:true"
            ) Day {{item.day}}
            td {{item.name}}
            td {{item.note}}
            td(style="text-align:center")
              span(v-if="item.start") {{item.start | formatTime}}
              span(v-if="item.end")  - {{item.end | formatTime}}
      br
      v-simple-table(dense border="1")
        tbody
          tr
            td(colspan="4" bgcolor="orange")
              h2(align="center") INCLUDED
          tr(v-for="(inc,key) in product.inclusions")
            td {{ inc.type.name}}
            td(style="text-align:center") Free
</template>

<script>
import Product from '@/models/Product'
  export default {
    data() {
      return{
        product: new Product({
          name: '',
          inclusions: [],
          itineraries: [],
        })
      }
    },
    filters: {
      formatTime: function(value) {
        if (value) {
          const parts = value.split(":");
          return +parts[0] + ":" +parts[1] ;
        }
      }
    },
    computed: {

    },
    async created(){
      this.product = await Product.where('itineraries.location_id', 2).include('itineraries','inclusions','inclusions.type','itineraries.location').where('itineraries.location_id', 2).find(1)
    },
    methods: {
      productDays: function(day){
        var array = this.product.itineraries
        var days = {},d;
        for (var i = 0,l=array.length; i < l; i++) {
          d = array[i];
          days[d.day] = (days[d.day] || 0) + 1;
        }
        return days[day]
      },
      async productShow(ref){
        this.product = await Product.include('itineraries','inclusions','inclusions.type').find(ref)
      }
    }
  }
</script>

<style scoped>
  tr { border: 1px solid; }
  td { border: 1px solid; }
</style>