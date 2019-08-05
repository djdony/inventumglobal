<template lang="pug">
  div
    el-upload.ml-20.mt-10(
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="previewImg"
      :on-remove="removeImg"
      :with-credentials="true"
      :headers="headers"
      :file-list="media"
    )
    el-dialog(:visible.sync="previewModal" top="0px" append-to-body :show-close="false")
      el-image(
        :src="imgUrl" 
        lazy
        :preview-src-list="media.length ? media.map(i => i.url) : []"
      )
</template>
<script type="text/javascript">
  import Hotel from '@/models/Hotel'
  export default {
    name: 'media',
    props: ['value'],
    data(){
      return {
        media: [],
        imgUrl: null,
        previewModal: false
      }
    },
    methods: {
      async fetch(){
        let hotel = await Hotel.find(this.value)
        this.media = await hotel.media().get()
      },
      previewImg(){

      },
      removeImg(){

      }
    },
    computed: {
      uploadUrl: function() {
        return `${process.env.MIX_API_URL}/hotels/${this.value}/upload`
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