<template lang="pug">
  el-card
    el-form.pl-10.pt-10(slot="header" inline)
      el-form-item
        el-button(
          type="success"
          plain
          icon="el-icon-plus"
          @click="create"
        ) ADD NEW
        el-button.ml-5(
          icon="el-icon-edit"
          @click="$router.open({ name: 'roomtypes' })"
        )
        el-button(
          type="danger"
          plain
          icon="el-icon-minus"
          @click="remove"
          slot="reference"
        ) REMOVE SELECTED

    el-drawer(:visible.sync="visible" size="40%")
      el-tabs(v-model="tab" type="card" stretch)
        el-tab-pane(name="main" label="Main")
          el-form.pl-20.pr-20.pt-20(label-position="top")
            el-form-item(label="Room type")
              el-select(v-model="room.room_type_id" filterable style="width: 100%")
                el-option(
                  v-for="t in roomtypes"
                  :key="t.id"
                  :value="t.id"
                  :label="t.name"
                  :disabled="rooms.map(r => r.room_type_id).includes(t.id)"
                )
            el-form-item(label="Room area, m2")
              el-input(v-model="room.min_area" style="width: 48.1%" type="number")
              | &nbsp;&mdash;&nbsp;
              el-input(v-model="room.max_area" style="width: 48.1%" type="number")
            el-form-item(label="Total rooms")
              el-input(v-model="room.qty" type="number")
        el-tab-pane(name="amenities" label="Amenities")
          div.pt-20.pl-20
            el-row(v-for="a in amenities" :key="a.id")
              el-col(:span="5") {{ a.name }}
              el-col(:span="19")
                el-radio-group(v-model="a.included")
                  el-radio(:label="null") None
                  el-radio(:label="1") Included
                  el-radio(:label="0") Excluded
          el-tab-pane(name="media" label="Media" :disabled="!room.hasOwnProperty('id')")
            el-upload.ml-20.mt-10(
              v-if="room.hasOwnProperty('id')"
              :action="uploadUrl"
              list-type="picture-card"
              :on-preview="previewImg"
              :on-remove="removeImg"
              :with-credentials="true"
              :headers="headers"
              :file-list="room.media"
            )
            el-dialog(:visible.sync="previewModal" top="0px" append-to-body :show-close="false")
              el-image(
                :src="imgUrl"
                lazy
                :preview-src-list="room && room.media ? room.media.map(i => i.url) : []"
              )            
      center.pt-20
        el-button(@click="save" :loading="saving") SAVE

    el-table(:data="rooms" stripe @selection-change="selected = $event" @row-click="edit")
      el-table-column(type="selection" width="24px")
      el-table-column(prop="room_type.name" label="Type")
</template>
<script type="text/javascript">
  import RoomType from '@/models/RoomType'
  import HotelRoom from '@/models/HotelRoom'
  import Amenity from '@/models/Amenity'
  export default {
    props: ['value'],
    name: 'room-types',
    data(){
      return {
        room: new HotelRoom({
          hotel_id: this.value,
          room_type_id: null,
          min_area: 0,
          max_area: 0,
          qty: 0,
          amenities: []
        }),
        rooms: [],
        roomtypes: [],
        amenities: [],
        visible: false,
        tab: 'main',
        selected: [],
        modal: false,
        token: null,
        saving: false,
        fetching: false,
        previewModal: false,
        imgUrl: null
      }
    },
    async created(){
      this.roomtypes = await RoomType.select(['id', 'name']).get()
      this.amenities = await Amenity.where('type', 'room').get()
    },
    methods: {
      async fetchRooms(){
        this.rooms = await HotelRoom.include('room_type').where('hotel_id', this.value).get()
      },
      create(){
        this.room = new HotelRoom({ 
          hotel_id: this.value, 
          room_type_id: null, 
          min_area: 0,
          max_area: 0,
          qty: 0,
          amenities: []
        })
        this.visible = true
      },
      async edit({ id }){
        this.room = await HotelRoom.include('media', 'amenities').find(id)
        this.visible = true
      },
      async save(){
        this.saving = true
        await this.room.save()
        this.saving = false
        this.visible = false
        await this.fetchRooms()
      },
      async remove(){
        this.$confirm('Selected records will be deleted. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(async () => {
            await axios.delete(`/hotels/${this.value}/rooms`, { 
              params: { 
                ids: this.forRemove.map(t => t.id)
              }
            })
            await this.fetchRooms()
          })
      },
      async removeImg(file, fileList) {
        let result = await axios.delete(`/media/${file.id}`)
      },
      previewImg(file) {
        this.imgUrl = file.url;
        this.previewModal = true;
      }
    },
    computed: {
      uploadUrl: function() {
        return `${process.env.MIX_API_URL}/hotelrooms/${this.room.id}/upload`
      },
      headers: function() {
        return { 
          Authorization: `Bearer ${this.token}`
        }
      }
    },
    watch: {
      value: {
        immediate: true,
        handler: async function(val){
          if(val){
            await this.fetchRooms()
          }
        }
      }
    }
  }
</script>