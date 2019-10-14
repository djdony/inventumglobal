<template lang='pug'>

  v-content
    v-container
      h1(align="center" v-for="p in product") Antalya
        v-row
          v-icon(style="color:orange" size="50px") mdi-chevron-double-right
          h4(style="color:orange;text-align:left") {{p.name}}
            hr(style="border:2px solid grey")
        br
        v-simple-table(dense)
          tbody
            tr
              td(colspan="4" bgcolor="orange")
                h2(align="center") ITINERARIES
            tr(v-for="(i,key) in p.itineraries")
              td(
                :rowspan="p.itineraries.filter(i=> i.day==2).length"
                v-if="key ==0"
                ) Day {{i.day}}
              td {{i.name}}
              td {{i.note}}
              td(style="text-align:center") {{i.start}} - {{i.end}}
        br
        v-simple-table(dense border="1")
          tbody
            tr
              td(colspan="4" bgcolor="orange")
                h2(align="center") INCLUDED
            tr(v-for="(inc,key) in p.inclusions")
              td {{inc.type_id}}
              td(style="text-align:center") Free

</template>

<script>
import Product from '@/models/Product'
    export default {
        data: () => ({
            itineraries: [
                    {
                        day: '1',
                        name: 'Arrival at Airport',
                        location_id: '4',
                        note: '',
                        start: '',
                        end: '',
                    },
                    {
                        day: '1',
                        name: 'Meet and great',
                        location_id: '4',
                        note: '',
                        start: '',
                        end: '',
                    },
                    {
                        day: '2',
                        name: 'Welcome Cocktail',
                        note: 'Indian food',
                        location_id: '4',
                        start: '19:30',
                        end: '20:30',
                    },
                ],
            includes: [
                {
                    name: 'Conference Hall',
                    product: 'Mice',
                    location_id: '4',
                },
                {
                    name: 'Coffe Break',
                    product: 'Wedding',
                    location_id: '4',
                },
            ],

        }),
        computed: {
            calculatedRowspan: function(){
                return this.itineraries.filter(i=> i.day=="1").length
            }
        },

        async asyncData() {
            try {
                let product = await Product.include([
                    'itineraries',
                    'inclusions'
                ]).get()
                return {product}
            } catch (e) {
               console.log(e)
            }
        },
    }
</script>

<style scoped>
  tr { border: 1px solid; }
  td { border: 1px solid; }
</style>