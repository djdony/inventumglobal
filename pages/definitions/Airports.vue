<template lang="pug">
  div(v-if="hasRole('admin')")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item Airports
    el-card(body-style="padding:0")
      el-form.pt-10(inline slot="header")
        el-form-item
          el-button(type="primary" :plain="true" @click="create") Create
      el-table(:data="airports" @row-dblclick="edit" v-loading="fetching")
        el-table-column(type="index" width="35px" align="right" class-name="text-muted")
        el-table-column(prop="name" label="Airport" :sortable="true")
        el-table-column(prop="code" label="Code" :sortable="true")
        el-table-column(prop="parent.name" label="City" :sortable="true")
    el-dialog(:visible.sync="modal" :title="airport.name" :center="true" width="800px" top="20px")
      el-row(:gutter="30")
          el-col(:span="12")
            el-form(ref="form" :model="airport" label-width="120px")
              el-divider(content-position="left") Airport
              el-form-item(label="Havalimanı")
                el-input(v-model="airport.name")
              el-form-item(label="Airport code")
                el-input(v-model="airport.code")
              el-form-item(label="City")
                el-select(v-model="airport.parent_id" placeholder="Please choose city" :filterable="true" style="width:100%")
                  el-option(v-for="sd in cities" :label="sd.name" :value="sd.id" :key="sd.id")
          el-col(:span="12")
            el-divider(content-position="left") Terminals
            el-form(inline :model="terminal")
              el-form-item
                el-button(type="primary" plain @click="createTerminal" icon="el-icon-plus") Create
            el-table(:data="terminals" @row-dblclick="editTerminal" v-loading="fetchingTerminals")
              el-table-column(prop="name" label="Terminal")
              el-table-column(prop="code" label="Code")
      span.dialog-footer(slot="footer")
        el-button(type="primary" @click="save" :disabled="!saveable" :loading="saving") Create
        el-button(@click="modal = false" :plain="true") Close
    el-dialog(:visible.sync="terminalModal" :title="terminal.name" :center="true" width="400px" top="20px")
      el-form(:model="terminal" label-width="120px")
        el-form-item(label="Terminal")
          el-input(v-model="terminal.name")
        el-form-item(label="Terminal code")
          el-input(v-model="terminal.code")
      span.dialog-footer(slot="footer")
        el-button(type="primary" @click="saveTerminal" :disabled="!terminalSaveable" :loading="savingTerminal") Create
        el-button(@click="terminalModal = false" :plain="true") Close
</template>
<script type="text/javascript">
import Location from '@/models/Location'
export default {
  name: 'airports',
  data(){
    return {
      modal: false,
      terminalModal: false,
      fetching: false,
      fetchingTerminals: false,
      saving: false,
      savingTerminal: false,
      cities: [],
      airports: [],
      airport: new Location({ name: '', code: '' }),
      terminals: [],
      terminal: new Location({
        name: '',
        code: '',
        type: 'terminal',
        parent_id: null
      })
    }
  },
  async mounted(){
    await this.fetch()
  },
  methods: {
    async fetch(){
      try{
        this.fetching = true
        let locations = await Location.whereIn('type', ['airport', 'city']).include('parent').get()
        this.airports = locations.filter(l => l.type == 'airport')
        this.cities = locations.filter(l => l.type == 'city')
        this.fetching = false
      }catch({ response }){
        this.$message.error(response.data.message)
        this.fetching = false
      }
    },
    create(){
      this.airport = new Location({ type: 'airport', name: '', code: '', parent_id: null })
      this.modal = true
    },
    async edit(row){
      this.airport = row
      await this.fetchTerminals()
      this.modal = true
    },
    async save(){
      try{
        this.saving = true
        await this.airport.save()
        this.saving = false
        this.modal = false
        await this.fetch()
      }catch({ response }){
        this.$message.error(response.data.message)
        this.saving = false
      }
    },
    async fetchTerminals(){
      this.fetchingTerminals = true
      this.terminals = await Location.where('type', 'terminal').where('parent_id', this.airport.id).get()
      this.fetchingTerminals = false
    },
    createTerminal(){
      this.terminal = new Location({
        name: '',
        code: '',
        type: 'terminal',
        parent_id: this.airport.id
      })
      this.terminalModal = true
    },
    editTerminal(row){
      this.terminal = row
      this.terminalModal = true
    },
    async saveTerminal(){
      this.savingTerminal = true
      await this.terminal.save()
      this.savingTerminal = false
      this.terminalModal = false
      await this.fetchTerminals()
    }
  },
  computed: {
    saveable: function(){
      return this.airport.name.length && this.airport.code.length && this.airport.parent_id
    },
    terminalSaveable: function(){
      return this.terminal.name.length && this.terminal.code.length && this.terminal.parent_id
    }
  }
}
</script>