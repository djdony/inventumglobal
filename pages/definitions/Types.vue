<template lang="pug">
  div(v-if="hasRole('admin')")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item Definition Types
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10(inline)
          el-form-item
            el-button(type="primary" plain @click="create" :disabled="!can('types.create')") Create
      el-tabs(type="border-card" v-model="activeTab" tab-position="left")
        el-tab-pane(label="Categories" name="type")
          el-table(:data="types", @row-click="edit" v-loading="fetching")
            el-table-column(type="index" width="35px" align="right", class-name="text-muted")
            el-table-column(prop="id" label="Code" :sortable="true")
            el-table-column(prop="name" label="Type" :sortable="true")
            el-table-column(prop="sort_order" label="Sıra No" :sortable="true")
        el-tab-pane(v-for="category in categories" :label="category.name" :key="category.id" :name="category.id")
          el-table(:data="types", @row-click="edit" v-loading="fetching")
            el-table-column(type="index" width="35px" align="right", class-name="text-muted")
            el-table-column(prop="id" label="Code" :sortable="true")
            el-table-column(prop="name" label="Type" :sortable="true")
            el-table-column(prop="sort_order" label="Sıra No" :sortable="true")
    el-dialog(:visible.sync="modal" :title="type.id" center width="400px" top="20px")
      el-form(ref="form" :model="type" label-width="120px")
        el-form-item(label="Code")
          el-input(v-model="type.id" :disabled="editing === true")
        el-form-item(label="Type")
          el-input(v-model="type.name")
        el-form-item(label="Order no")
          el-input(type="number" v-model="type.sort_order")
      span.dialog-footer(slot="footer")
        el-button(type="primary" @click="save" :disabled="!saveable" :loading="saving") Create
        el-button(@click="modal = false" plain) Close
</template>
<script type="text/javascript">
import Type from '@/models/Type'
export default {
  name: 'types',
  data(){
    return {
      modal: false,
      fetching: false,
      saving: false,
      editing: false,
      activeTab: 'type',
      types: [],
      categories: [],
      type: new Type({ id: '', name: '', category: '' })
    }
  },
  async mounted(){
    this.categories = await Type.where('category', 'type').get()
  },
  methods: {
    async fetch(){
      try{
        this.fetching = true
        this.types = await Type.where('category', this.activeTab).get()
        this.fetching = false
      }catch({ response }){
        this.$message.error(response.data.message)
        this.fetching = false
      }
    },
    create(){
      this.type = new Type({ id: '', name: '', category: this.activeTab, sort_order: 0 })
      this.editing = false
      this.modal = true
    },
    edit(row){
      this.type = row
      this.editing = true
      this.modal = true
    },
    async save(){
      try{
        this.saving = true
        await this.type.save()
        this.saving = false
        this.editing = false
        this.modal = false
        await this.fetch()
      }catch({ response }){
        this.$message.error(response.data.message)
        this.saving = false
      }
    }
  },
  computed: {
    saveable: function(){
      return this.type.id.length && this.type.name.length && this.can('types.create')
    }
  },
  watch: {
    activeTab: {
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