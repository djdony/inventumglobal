<template lang="pug">
  div
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item(:to="{ name: 'hotels' }") HOTELS
      el-breadcrumb-item {{ hotel.name }}
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10(:inline="true")
          el-form-item
            el-button.ml-10(type="primary" @click="save" :loading="saving") SAVE
          el-form-item(label="Selected hotel")
            el-select(:value="hotel.id" filterable @change="changeHotel")
              el-option(v-for="h in $store.state.hotels" :key="h.id" :value="h.id" :label="h.name")
      el-tabs(:value="tab" type="border-card" tab-position="top" @tab-click="changeTab")
        el-tab-pane(name="main" label="General")
          el-form.pt-10.pr-10(v-model="hotel" label-width="150px")
            el-row
              el-col(:xs="24" :md="8")
                el-form-item(label="Name")
                  el-input(v-model="hotel.name" :max="100")
                el-form-item(label="Chain Group") 
                  el-select(v-model="hotel.group_id" filterable clearable style="width: 100%")
                    el-option(v-for="g in hotelgroups" :key="g.id" :value="g.id" :label="g.name")
                el-form-item(label="Type of Hotel")
                  el-select(v-model="hotel.types_ids" multiple filterable clearable style="width: 100%")
                    el-option(v-for="t in types" :key="t.id" :value="t.id" :label="t.name")
                el-form-item(label="Location")
                  el-select(v-model="hotel.location_id" filterable style="width: 100%")
                    el-option-group(v-for="l in locations" :key="l.id" :label="l.name")
                      el-option(v-for="c in l.children" :key="c.id" :value="c.id" :label="c.name")
              el-col(:xs="24" :md="5")
                el-form-item(label="Star")
                  el-select(v-model="hotel.star_id" filterable  style="width: 100%")
                    el-option(v-for="s in stars" :key="s.id" :value="s.id" :label="s.name")
                el-form-item(label="Built year")
                  el-date-picker(
                    v-model="hotel.built"
                    type="year"
                    placeholder="Year"
                    style="width: 100%"
                    format="yyyy"
                    value-format="yyyy"
                  )
                el-form-item(label="Renovation year")
                  el-date-picker(
                    v-model="hotel.renovated"
                    type="year"
                    placeholder="Year"
                    style="width: 100%"
                    format="yyyy"
                    value-format="yyyy"
                  )
                el-form-item(label="Total area, m2")
                  el-input(v-model="hotel.area" type="number" :min="0")
              el-col(:xs="24" :md="11")
                el-form-item(label="Telephone")
                  el-input(v-model="hotel.telephone")
                el-form-item(label="Email")
                  el-input(v-model="hotel.email")
                el-form-item(label="Website")
                  el-input(v-model="hotel.www")
                el-form-item(label="Facebook")
                  el-input(v-model="hotel.details.facebook")
            el-row
              el-col(:xs="24" :md="13")
                el-tabs(v-model="lang" tab-position="left")
                  el-tab-pane(v-for="l in langs" :key="l.id" :label="l.name" :name="l.id")
                    el-input(
                      v-if="hotel.description_trans"
                      type="textarea"
                      :autosize="{ minRows: 8 }"
                      placeholder="Please input"
                      v-model="hotel.description_trans[l.id]"
                    )
              el-col(:xs="24" :md="11")
                el-form-item(label="Instagram")
                  el-input(v-model="hotel.details.instagram")
                el-form-item(label="Address")
                  el-input(
                    type="textarea"
                    :autosize="{ minRows: 6}"
                    placeholder="Adress"
                    v-model="hotel.address"
                  )
        el-tab-pane(name="rooms" label="Rooms" :disabled="!hotel.hasOwnProperty('id')" lazy)
          room-types(v-model="hotel.id")
        el-tab-pane(name="meetingrooms" label="Meting rooms" :disabled="!hotel.hasOwnProperty('id')"  lazy)
          meeting-rooms(v-model="hotel.id")
        el-tab-pane(name="amenities" label="Amenities" :disabled="!hotel.hasOwnProperty('id')" lazy)
          amenities(:hotel="hotel" ref="amenities")
        el-tab-pane(name="media" label="Media" :disabled="!hotel.hasOwnProperty('id')" lazy)
          media(v-model="hotel.id")
</template>
<script type="text/javascript">
  import set from 'lodash/set'
  import Hotel from '@/models/Hotel'
  import HotelGroup from '@/models/HotelGroup'
  import Star from '@/models/Star'
  import Type from '@/models/Type'
  import Location from '@/models/Location'
  import RoomTypes from '@/components/hotel/RoomTypes'
  import MeetingRooms from '@/components/hotel/MeetingRooms'
  import Amenities from '@/components/hotel/Amenities'
  import Media from '@/components/hotel/Media'
  export default {
    name: 'hotel',
    components: {
      RoomTypes,
      MeetingRooms,
      Amenities,
      Media
    },
    data(){
      return {
        langs: [{ id: 'en', name: "English"}, { id: 'ru', name: "Russian"}],
        lang: 'en',
        types: [],
        selected: null,
        locations: [],
        hotelgroups: [],
        stars: [],
        hotel: new Hotel({ name: '', details: { star: 5 } }),
        tab: 'main',
        saving: false
      }
    },
    async created(){
      if(this.$store.state.hotels.length === 0){
        this.fetchHotels()
      }
      this.locations = await Location.select({
        locations: ['id', 'name', 'type'],
        children: ['id', 'name', 'parent_id']
      })
      .include('children')
      .where('type', 'region')
      .get()
      this.hotelgroups = await HotelGroup.get()
      this.stars = await Star.get()
      this.types = await Type.where('category', 'hotelpurpose').get()
    },
    methods: {
      async fetchHotels(){
        let hotels = await Hotel.select('id', 'name').get()
        await this.$store.dispatch('change', ['hotels', hotels])
      },
      async fetchHotel(id){
        try{
          this.loading = true
          this.hotel = await Hotel.include('types').find(id)
          this.loading = false
        }catch(e){
          this.loading = false
          this.$message.error('SORRY WE COULDN\'T GET HOTEL')
        }
      },
      async save(){
        try{
          this.saving = true
          await this.hotel.save()
          if(this.tab === 'amenities'){
            await this.$refs.amenities.save()
          }
          this.saving = false
        }catch(e){
          this.saving = false
          this.$message.error('UNABLE TO SAVE THE HOTEL')
        }
      },
      changeHotel(id){
        this.$router.push({ 
          name: 'hotel', 
          params: { id, tab: this.tab }
        })
      },
      changeTab({ name }){
        this.$router.push({ 
          name: 'hotel', 
          params: { id: this.hotel.id, tab: name }
        })
      }
    },
    watch: {
      '$route.params.id': {
        immediate: true,
        handler: async function(id, oldId){
          if(id != oldId){
            if(id !== 'new'){
              await this.fetchHotel(id)
            }else{
              this.hotel = new Hotel({
                name: '',
                location_id: null,
                star_id: null,
                group_id: null,
                types_ids: [],
                details: {facebook: null, instagram: null },
                description_trans: {
                  en: '',
                  ru: ''
                },
                www: '',
                telephone: '',
                email: '',
                build: '',
                renovated: '',
                area: '',
                address: ''
              })
            }
          }
        }
      },
      '$route.params.tab': {
        immediate: true,
        handler: function(tab){
          this.tab = tab || 'main'
        }
      }
    }
  }
</script>