<template lang="pug">
  .search-panel

    .search-group
      .search-item.text 
        v-icon mdi-airplane-landing
        v-autocomplete(v-model='from' :items="fromLocationsList" placeholder='From' solo flat hide-details)
        //- v-icon mdi-chevron-right

      .search-item.text 
        v-icon mdi-airplane-landing
        v-autocomplete(v-model='to' :items="toLocationsList" placeholder='To' solo flat hide-details)
        //- v-icon mdi-chevron-right
      
    .search-group
      v-menu(offset-y v-model="dateMenu" transition="scale-transition"  :close-on-content-click="false")
          template(v-slot:activator="{ on }")
            v-btn.search-item.button(v-on='on')
              span.label Dates
              v-icon mdi-calendar-multiple
          v-card
            v-date-picker(v-model="dates" no-title width='256' multiple :allowed-dates="allowedDates" first-day-of-week='1')
              v-spacer
              span(v-text='dateMessage[dates.length]' v-if='dates.length < 2').px-2.primary--text.body-2
              v-btn(v-else text color="primary" @click="dateMenu = false") OK
      
      
      v-menu(offset-y v-model="eventSizeMenu" transition="scale-transition"  :close-on-content-click="false")
        template(v-slot:activator="{ on }")
          v-btn.search-item.button(v-on='on')
            span.label Event size
            v-icon mdi-human-male
        v-card.event-size.white.secondary--text
          p.event-size__title Event size
          .event-size__field-group
            span.group__name Single rooms
            v-text-field(v-model='rooms.single' placeholder="0" solo hide-details flat @input="recalc").group__input
          .event-size__field-group
            span.group__name Double rooms
            v-text-field(v-model='rooms.double' placeholder="0" solo hide-details flat @input="recalc").group__input
          .event-size__field-group
            span.group__name Triple rooms
            v-text-field(v-model='rooms.triple' placeholder="0" solo hide-details flat @input="recalc").group__input
          .event-size__field-group
            span.group__name Total Pax
            v-text-field(v-model='rooms.pax' placeholder="0" solo hide-details flat @input="recalc('pax')").group__input
          
          .layout.mt-3
            v-spacer
            v-btn(text color="primary" @click="eventSizeMenu = false") OK

      v-btn.search-item.button.submit
        span.label Search
</template>

<script>
import Location from "@/models/Location";

export default {
  data() {
    return {
      from: null,
      to: null,
      dateMenu: null,
      eventSizeMenu: null,
      fromMenu: null,
      dates: [],
      dateMessage: ["Choose departure day", "Choose arrival day", ""],
      rooms: {
        single: null,
        double: null,
        triple: null,
        pax: null
      },

      fromLocations: [],
      toLocations: []
    };
  },
  async created() {
    this.fromLocations = await Location.custom("user/airports").get();
    this.toLocations = await Location.custom("user/destinations").get();
    console.log(this.toLocations);
  },
  computed: {
    fromLocationsList() {
      let list = [];

      for (let location of this.fromLocations) {
        for (let descendant of location.descendants) {
          list.push({
            text: location.name + ", " + descendant.name,
            value: descendant.id
          });
        }
      }

      return list;
    },
    toLocationsList() {
      let list = [];

      for (let location of this.toLocations) {
        for (let descendant of location.descendants) {
          list.push({
            text: location.name + ", " + descendant.name,
            value: descendant.id
          });
        }
      }

      return list;
    }
  },
  methods: {
    allowedDates(val) {
      let date = new Date(val);
      let range = 4;

      if (this.dates.length == 0) return true;

      if (this.dates.length == 1) {
        let selectedDate = new Date(this.dates[0]);
        let maxDate = new Date(selectedDate);
        let minDate = new Date(selectedDate);

        minDate.setDate(minDate.getDate() - range);
        maxDate.setDate(maxDate.getDate() + range);

        return maxDate > date && date > minDate;
      }

      if (this.dates.length == 2) {
        return val == this.dates[0] || val == this.dates[1];
      }
    },
    recalc(e) {
      if (e == "pax") {
        this.rooms.single = 0;
        this.rooms.double =
          this.rooms.pax > 0 ? Math.ceil(this.rooms.pax / 2) : 0;
        this.rooms.triple = 0;
      } else {
        this.rooms.pax =
          Number(this.rooms.single) +
          Number(this.rooms.double * 2) +
          Number(this.rooms.triple * 3);
      }
    }
  }
};
</script>
<style lang="sass">
@import '@/assets/styles/components/search-panel.sass'

</style>

