<template lang="pug">
  el-card
    div(slot="header")
      el-form.pt-10(inline)
        el-form-item
          el-button(type="primary" @click="add" icon="el-icon-add") ADD NEW
    el-table(:data="meetingrooms" stripe v-loading="fetching")
      el-table-column(prop="name" label="Name")
      el-table-column(prop="length" label="Length, m")
      el-table-column(prop="width" label="Width, m")
      el-table-column(prop="height" label="Height, m")
      el-table-column(prop="cocktail" label="Cocktail, pax")
      el-table-column(prop="theater" label="Theater, pax")
      el-table-column(prop="classroom" label="Classroom, pax")
      el-table-column(prop="ushape" label="U-Shape, pax")
      el-table-column(prop="boardroom" label="Boardroom, pax")
      el-table-column(prop="id" label="Actions")
        template(v-slot="props")
          el-button(icon="el-icon-edit" @click="edit(props.row)")
          el-button(type="danger" plain icon="el-icon-delete" @click="remove(props.row)")
    el-drawer(
      :visible.sync="modal"
      :title="meetingroom.name ? meetingroom.name : 'NEW MEETING ROOM'"
      size="50%"
    )
      el-form.pl-20.pr-20(label-position="top")
        el-row(:gutter="10")
          el-col(:sm="24")
            el-form-item(label="Name")
              el-input(v-model="meetingroom.name")
          el-col(:sm="24" :lg="6")
            el-form-item(label="Length, m")
              el-input(v-model="meetingroom.length" type="number")
          el-col(:sm="24" :lg="6")
            el-form-item(label="Width, m")
              el-input(v-model="meetingroom.width" type="number")
          el-col(:sm="24" :lg="6")
            el-form-item(label="Height, m")
              el-input(v-model="meetingroom.height" type="number")
          el-col(:sm="24" :lg="6")
            el-form-item(label="Cocktail, pax")
              el-input(v-model="meetingroom.cocktail" type="number")
          el-col(:sm="24" :lg="6")
            el-form-item(label="Theater, pax")
              el-input(v-model="meetingroom.theater" type="number")
          el-col(:sm="24" :lg="6")
            el-form-item(label="Classroom, pax")
              el-input(v-model="meetingroom.classroom" type="number")
          el-col(:sm="24" :lg="6")
            el-form-item(label="U-shape, pax")
              el-input(v-model="meetingroom.ushape" type="number")
          el-col(:sm="24" :lg="6")
            el-form-item(label="Boardroom, pax")
              el-input(v-model="meetingroom.boardroom" type="number")
      el-upload.ml-20.mt-10(
        v-if="meetingroom.hasOwnProperty('id')"
        :action="uploadUrl"
        list-type="picture-card"
        :on-preview="previewImg"
        :on-remove="removeImg"
        :with-credentials="true"
        :headers="headers"
        :file-list="meetingroom.media"
      )
      el-button.ml-20.mt-20(type="primary" :loading="saving" @click="save") SAVE
      el-dialog(:visible.sync="previewModal" top="0px" append-to-body :show-close="false")
        el-image(
          :src="imgUrl" 
          lazy
          :preview-src-list="meetingroom && meetingroom.media ? meetingroom.media.map(i => i.url) : []"
        )
</template>
<script type="text/javascript">
  import MeetingRoom from '@/models/MeetingRoom'
  export default {
    name: 'meeting-rooms',
    props: ['value'],
    data(){
      return {
        meetingrooms: [],
        meetingroom: new MeetingRoom({
          name: '',
          hotel_id: this.value,
          length: null,
          width: null,
          height: null,
          banquet: null,
          cocktail: null,
          theater: null,
          classroom: null,
          ushape: null,
          boardroom:null
        }),
        modal: false,
        token: null,
        saving: false,
        fetching: false,
        previewModal: false,
        imgUrl: null
      }
    },
    async mounted(){
      this.token = window.localStorage.token
    },
    methods:{
      async fetch(){
        try{
          this.fetching = true
          this.meetingrooms = await MeetingRoom.where('hotel_id', this.value).get()
          this.fetching = false
        }catch(e){
         this.fetching = false
         this.$message.error('UNABLE TO FETCH MEETING ROOMS')
        }
      },
      add() {
        this.meetingroom = new MeetingRoom({
          name: '',
          hotel_id: this.value,
          length: null,
          width: null,
          height: null,
          banquet: null,
          cocktail: null,
          theater: null,
          classroom: null,
          ushape: null,
          boardroom:null
        })
        this.modal = true
      },
      async edit(row){
        this.meetingroom = await MeetingRoom.include('media').find(row.id)
        this.modal = true
      },
      async save(){
        try{
          this.saving = true
          await this.meetingroom.save()
          this.saving = false
          this.modal = false
          await this.fetch()
        }catch(e){
          this.saving = false
          this.$message.error('UNABLE TO SAVE MEETING ROOM')
        }
      },
      async remove(meetingroom) {
        this.$confirm('Selected records will be deleted. Continue?', 'Warning', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(async () => {
            let result = await meetingroom.delete()
            await this.fetch()
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
        return `${process.env.MIX_API_URL}/meetingrooms/${this.meetingroom.id}/upload`
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
            await this.fetch()
          }
        }
      }
    }
  }
</script>