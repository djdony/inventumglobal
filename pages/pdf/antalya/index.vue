<template lang='pug'>
  v-content
    v-container
      h1(align="center" v-for="p in productDays") Antalya
        v-row
          v-icon(style="color:orange" size="50px") mdi-chevron-double-right
          h4(style="color:orange;text-align:left") {{ p.name }}
            hr(style="border:2px solid grey")
        br
        v-simple-table(dense)
          tbody
            tr
              td(colspan="4" bgcolor="orange")
                h2(align="center") ITINERARIES
              tr(v-for="(item, i) in p.itineraries" :key="i")
                td(
                  :rowspan="2"
                ) Day {{ item.day }}
                td {{ item.name }}
                td {{ item.note }}
                td(style="text-align:center") {{ item.start }} - {{ item.end }}
        br
        v-simple-table(dense border="1")
          tbody
            tr
              td(colspan="4" bgcolor="orange")
                h2(align="center") INCLUDED
            tr(v-for="(inc,key) in p.inclusions")
              td {{ inc.type_id }}
              td(style="text-align:center") Free
</template>

<script>
import groupBy from 'lodash/groupBy'
import Product from '@/models/Product'
  export default {
    async asyncData() {
      try {
        let products = await Product.include([
          'itineraries',
          'inclusions'
        ]).get()
        return { products }
      } catch (e) {
         console.log(e)
      }
    },
    computed: {
      productDays: function(){
        return this.products.map(p => {
          p.days = [...new Set(p.itineraries.map(i => i.day))].length
          return p
        })
      }
    }
  }
</script>

<style scoped>
  tr { border: 1px solid; }
  td { border: 1px solid; }
</style>