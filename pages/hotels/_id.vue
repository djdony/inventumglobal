<template lang="pug">
  v-content
    v-card(body-style="padding:0")
      div(slot="header")
        v-form.pt-10(:inline="true")
            v-button.ml-10(type="primary" @click="save" :loading="saving") SAVE
            v-select(label="Selected hotel" :items="hotel.id" filterable @change="changeHotel")
              //v-option(v-for="h in $store.state.hotels" :key="h.id" :items="h.id" :label="h.name")
      v-tabs(:items="tab" type="border-card" tab-position="top" @tab-click="changeTab")
        v-tab(name="main") GENERAL
          //- v-model should be BOOLEAN, representing the validity of the form
          //- (previously was OBJECT `hotel`)
          //- If validation is needed, v-model should be added here
          //- Currently it is always "valid"
          v-form.pt-10.pr-10(:value="true" width="150px")
            v-row
              v-col(:xs="24" :md="8")
                  v-text-field(label="Name" v-model="hotel.name" :max="100")
                  v-select(label="Chain Group" v-model="hotel.group_id" filterable clearable style="width: 100%")
                    //v-option(v-for="g in hotelgroups" :key="g.id" :items="g.id" :label="g.name")
                  v-select(label="Type of Hotel" v-model="hotel.types_ids" multiple filterable clearable style="width: 100%")
                    //v-option(v-for="t in types" :key="t.id" :items="t.id" :label="t.name")
                  v-select(label="Location" v-model="hotel.location_id" filterable style="width: 100%")
                    //v-option-group(v-for="l in locations" :key="l.id" :label="l.name")
                      v-option(v-for="c in l.children" :key="c.id" :items="c.id" :label="c.name")
              v-col(:xs="24" :md="5")
                  v-select(label="Star" v-model="hotel.star_id" filterable  style="width: 100%")
                    //v-option(v-for="s in stars" :key="s.id" :items="s.id" :label="s.name")
                  v-date-picker(
                    label="Built year"
                    v-model="hotel.built"
                    type="year"
                    placeholder="Year"
                    style="width: 100%"
                    format="yyyy"
                    value-format="yyyy"
                  )
                  v-date-picker(
                    label="Renovation year"
                    v-model="hotel.renovated"
                    type="year"
                    placeholder="Year"
                    style="width: 100%"
                    format="yyyy"
                    value-format="yyyy"
                  )
                  v-text-field(label="Total area, m2" v-model="hotel.area" type="number" :min="0")
              v-col(:xs="24" :md="11")
                  v-text-field(label="Telephone" v-model="hotel.telephone")
                  v-text-field(v-model="hotel.email")
                  v-text-field(v-model="hotel.www")
                  v-text-field(v-model="hotel.details.facebook")
            v-row
              v-col(:xs="24" :md="13")
                v-tabs(v-model="lang" tab-position="left")
                  v-tab(v-for="l in langs" :key="l.id" :label="l.name" :name="l.id")
                    v-text-field(
                      v-if="hotel.description_trans"
                      type="textarea"
                      :autosize="{ minRows: 8 }"
                      placeholder="Please input"
                      v-model="hotel.description_trans[l.id]"
                    )
                v-col(:xs="24" :md="11")
                    v-text-field(v-model="hotel.details.instagram")
                    v-text-field(
                      type="textarea"
                      :autosize="{ minRows: 6}"
                      placeholder="Adress"
                      v-model="hotel.address"
                    )
        v-tab(name="rooms" label="Rooms" :disabled="!hotel.hasOwnProperty('id')" lazy)
          room-types(v-model="hotel.id")
        v-tab(name="meetingrooms" label="Meting rooms" :disabled="!hotel.hasOwnProperty('id')"  lazy)
          meeting-rooms(v-model="hotel.id")
        v-tab(name="amenities" label="Amenities" :disabled="!hotel.hasOwnProperty('id')" lazy)
          amenities(:hotel="hotel" ref="amenities")
        v-tab(name="media" label="Media" :disabled="!hotel.hasOwnProperty('id')" lazy)
          media(v-model="hotel.id")
</template>
<script type="text/javascript">
import set from "lodash/set";
import Hotel from "@/models/Hotel";
import HotelGroup from "@/models/HotelGroup";
import Star from "@/models/Star";
import Type from "@/models/Type";
import Location from "@/models/Location";
import RoomTypes from "@/components/hotel/RoomTypes";
import MeetingRooms from "@/components/hotel/MeetingRooms";
import Amenities from "@/components/hotel/Amenities";
import Media from "@/components/hotel/Media";
export default {
  name: "hotel",
  components: {
    RoomTypes,
    MeetingRooms,
    Amenities,
    Media
  },
  data() {
    return {
      langs: [{ id: "en", name: "English" }, { id: "ru", name: "Russian" }],
      lang: "en",
      types: [],
      selected: null,
      locations: [],
      hotelgroups: [],
      stars: [],
      hotel: new Hotel({ name: "", details: { star: 5 } }),
      tab: "main",
      saving: false
    };
  },
  async created() {
    if (this.$store.state.hotels.length === 0) {
      this.fetchHotels();
    }
    this.locations = await Location.select({
      locations: ["id", "name", "type"],
      children: ["id", "name", "parent_id"]
    })
      .include("children")
      .where("type", "region")
      .get();
    this.hotelgroups = await HotelGroup.get();
    this.stars = await Star.get();
    this.types = await Type.where("category", "hotelpurpose").get();
  },
  methods: {
    async fetchHotels() {
      let hotels = await Hotel.select("id", "name").get();
      await this.$store.dispatch("change", ["hotels", hotels]);
    },
    async fetchHotel(id) {
      try {
        this.loading = true;
        this.hotel = await Hotel.include("types").find(id);
        this.loading = false;
      } catch (e) {
        this.loading = false;
        this.$message.error("SORRY WE COULDN'T GET HOTEL");
      }
    },
    async save() {
      try {
        this.saving = true;
        await this.hotel.save();
        if (this.tab === "amenities") {
          await this.$refs.amenities.save();
        }
        this.saving = false;
      } catch (e) {
        this.saving = false;
        this.$message.error("UNABLE TO SAVE THE HOTEL");
      }
    },
    changeHotel(id) {
      this.$router.push({
        name: "hotel",
        params: { id, tab: this.tab }
      });
    },
    changeTab({ name }) {
      this.$router.push({
        name: "hotel",
        params: { id: this.hotel.id, tab: name }
      });
    }
  },
  watch: {
    "$route.params.id": {
      immediate: true,
      handler: async function(id, oldId) {
        if (id != oldId) {
          if (id !== "new") {
            await this.fetchHotel(id);
          } else {
            this.hotel = new Hotel({
              name: "",
              location_id: null,
              star_id: null,
              group_id: null,
              types_ids: [],
              details: { facebook: null, instagram: null },
              description_trans: {
                en: "",
                ru: ""
              },
              www: "",
              telephone: "",
              email: "",
              build: "",
              renovated: "",
              area: "",
              address: ""
            });
          }
        }
      }
    },
    "$route.params.tab": {
      immediate: true,
      handler: function(tab) {
        this.tab = tab || "main";
      }
    }
  }
};
</script>