<template lang='pug'>
  v-content
    v-container
      p
      h1(align="center") Northern Cyprus
        v-tabs(centered grow)
          v-tab(@click="productShow('mice')") M.I.C.E
          v-tab(@click="productShow('wedding')") Wedding
        v-row
          v-icon(style="color:orange" size="50px") mdi-chevron-double-right
          h4(style="color:orange;text-align:left" v-if="product == 'mice'") M.I.C.E
          h4(style="color:orange;text-align:left" v-if="product == 'wedding'") Wedding
        hr(style="border:2px solid grey;margin-bottom:20px")

          //-MICE ITINERARY
      v-simple-table(dense v-if="product == 'mice'")
        tbody
          tr
            td(colspan="4" bgcolor="orange")
              h2(align="center") ITINERARY
            tr
              td(
                rowspan="7"
                bgcolor="lightgrey"
              ) Day 1
              td Arrival at Airport
              td
              td
            tr
              td Meet and Greet at Airport
              td
              td
            tr
              td Transfer to Hotel
              td
              td
            tr
              td Welcome Cocktail
              td Exclusive Area
              td(style="text-align:center") 12:00
            tr
              td Check-in
              td
              td(style="text-align:center") 12:00-12:30
            tr
              td Lunch - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 12:30-14:30
            tr
              td Dinner - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 19:30-21:30
            tr
              td(
                rowspan="6"
                bgcolor="lightgrey"
              ) Day 2
              td Breakfast - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 07:30-10:00
            tr
              td Free Time
              td
              td(style="text-align:center") 10:00-12:30
            tr
              td Lunch - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 12:30-13:30
            tr
              td Kyrenia Tour
              td Half Day
              td(style="text-align:center") 13:30-17:30
            tr
              td Free Time
              td
              td(style="text-align:center") 17:30-19:30
            tr
              td Dinner - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 19:30-21:30
            tr
              td(
                rowspan="6"
                bgcolor="lightgrey"
              ) Day 3
              td Breakfast - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 07:30-10:00
            tr
              td Free Time
              td
              td(style="text-align:center") 10:00-12:30
            tr
              td Lunch - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 12:30-13:30
            tr
              td Nikosia Tour
              td Half Day
              td(style="text-align:center") 13:30-17:30
            tr
              td Free Time
              td
              td(style="text-align:center") 17:30-19:30
            tr
              td Dinner - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 19:30-21:30
            tr
              td(
                rowspan="3"
                bgcolor="lightgrey"
              ) Day 4
              td Breakfast - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 07:30-10:00
            tr
              td Free Time
              td
              td(style="text-align:center") 10:00-12:00
            tr
              td Departure to Airport
              td
              td(style="text-align:center") 12:00

          //-MICE INCLUDES
      p
      v-simple-table(dense v-if="product == 'mice'")
        tbody
          tr
            td(colspan="4" bgcolor="orange")
              h2(align="center") INCLUDED
          tr
            td Conferance Hall Usage
            td(style="text-align:center") Free

          tr
            td Conferance Hall Set Up
            td(style="text-align:center") Free
          tr
            td 2 Coffee Breaks Per Day
            td(style="text-align:center") Free
          tr
            td Basic Sound & Light System
            td(style="text-align:center") Free
          tr
            td Screen & Projection
            td(style="text-align:center") Free
          tr
            td Water
            td(style="text-align:center") Free
          tr
            td Candies
            td(style="text-align:center") Free
          tr
            td Pencils
            td(style="text-align:center") Free
          tr
            td Note Pads
            td(style="text-align:center") Free
          tr
            td Wi-Fi Internet
            td(style="text-align:center") Free

            //-WEDDING ITINERARY
      v-simple-table(dense v-if="product == 'wedding'")
        tbody
          tr
            td(colspan="4" bgcolor="orange")
              h2(align="center") ITINERARY
            tr
              td(
                rowspan="9"
                bgcolor="lightgrey"
              ) Day 1
              td Arrival at Airport
              td
              td
            tr
              td Meet and Greet at Airport
              td
              td
            tr
              td Transfer to Hotel
              td
              td
            tr
              td Welcome Cocktail
              td Exclusive Area
              td(style="text-align:center") 12:00
            tr
              td Check-in
              td
              td(style="text-align:center") 12:00-12:30
            tr
              td Hi-tea
              td Exclusive Area
              td(style="text-align:center") 12:30-13:00
            tr
              td Lunch - Main Restaurant
              td Including Indian Food
              td(style="text-align:center") 13:00-14:30

            tr
              td Dinner - Welcome Dinner
              td Exclusive Area
              td(style="text-align:center") 19:30-21:30
            tr
              td Supper
              td
              td(style="text-align:center") 22:30-23:00
            tr
              td(
                rowspan="6"
                bgcolor="lightgrey"
              ) Day 2
              td Breakfast - Main Restaurant
              td Non-Exclusive, Designated Area
              td(style="text-align:center") 07:30-10:00
            tr
              td Lunch - Mehndi
              td Exclusive Area
              td(style="text-align:center") 12:30-13:30
            tr
              td Hi-tea
              td
              td(style="text-align:center") 15:00-17:00
            tr
              td Free Time
              td
              td(style="text-align:center") 17:00-19:30
            tr
              td Dinner - Sangeet
              td Exclusive Area
              td(style="text-align:center") 19:30-21:30
            tr
              td Supper
              td
              td(style="text-align:center") 22:30-23:00
            tr
              td(
                rowspan="8"
                bgcolor="lightgrey"
              ) Day 3
              td Breakfast - Main Restaurant
              td Non-Exclusive, Designated Area
              td(style="text-align:center") 07:30-10:00
            tr
              td Haldi Ceremony
              td Exclusive Area
              td(style="text-align:center") 10:00-12:30
            tr
              td Lunch - Main Restaurant
              td Non-Exclusive, Designated Area
              td(style="text-align:center") 12:30-13:30
            tr
              td Baraat
              td Designated Area
              td(style="text-align:center")
            tr
              td Hi-tea
              td
              td(style="text-align:center")
            tr
              td Mandap Pheras
              td Exclusive Area
              td(style="text-align:center")
            tr
              td Dinner - Wedding Dinner
              td Exclusive Area
              td(style="text-align:center") 19:30-21:30
            tr
              td Supper
              td
              td(style="text-align:center") 22:30-23:00
            tr
              td(
                rowspan="2"
                bgcolor="lightgrey"
              ) Day 4
              td Breakfast - Main Restaurant
              td Non-Exclusive, Designated Area
              td(style="text-align:center") 07:30-10:00
            tr
              td Departure to Airport
              td
              td(style="text-align:center")

      p

          //-WEDDING INCLUDES
      v-simple-table(dense v-if="product == 'wedding'")
        tbody
          tr
            td(colspan="4" bgcolor="orange")
              h2(align="center") INCLUDED
          tr
            td Venue (Indoor and Outdoor)
            td(style="text-align:center") Free
          tr
            td Kitchen Usage for Indian Chefs
            td(style="text-align:center") Free
          tr
            td Kitchen Materials
            td(style="text-align:center") Free
          tr
            td Cooking Materials
            td(style="text-align:center") Free
          tr
            td Venue Setups (Tables, Chairs etc..)
            td(style="text-align:center") Free
          tr
            td Beverages
            td(style="text-align:center") Free
          tr
            td Premium Beverages
            td(style="text-align:center") No Corkage
          tr
            td 2-4 Buggy for Baraat Ceremony
            td(style="text-align:center") Free

      p

</template>

<script>
  export default {
      data() {
          return{
              product: 'mice',
          }
      },
      methods: {
          productShow(ref){
              return this.product=ref;
          }
      }
  }
</script>

<style scoped>
  tr { border: 1px solid; }
  td { border: 1px solid; }
</style>