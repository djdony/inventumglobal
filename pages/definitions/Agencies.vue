<template lang="pug">
  div
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item AGENCIES
    el-card(body-style="padding:0")
      div(slot="header")
        el-form.pt-10(inline)
          el-form-item
            el-button.ml-10(type="primary" plain @click="create") Create agency
      el-table(:data="agencies" @row-click="edit" v-loading="fetching")
        el-table-column(type="index" width="30px" class-name="text-muted" align="right")
        el-table-column(prop="name" label="Agency" :sortable="true")
        el-table-column(prop="location.name" label="Country" :sortable="true")
        el-table-column(prop="phone" label="Phone" :sortable="true")
        el-table-column(prop="website" label="Website" :sortable="true")
        el-table-column(prop="email" label="Email" :sortable="true")

    el-dialog(
      :visible.sync="modal"
      :title="agency.name"
      center
      width="50%"
      top="20px"
      @close="$router.push({ name: 'agencies' })"
      append-to-body
    )
      el-tabs(v-model="tab")
        el-tab-pane(name="main" label="General")
          el-form.pt-20(ref="form" :model="agency" label-width="120px")
            el-form-item(label="Agency name")
              el-input(v-model="agency.name")
            el-form-item(label="Phone number")
              el-input(v-model="agency.phone")
            el-form-item(label="Email address")
              el-input(v-model="agency.email")
            el-form-item(label="Website")
              el-input(v-model="agency.website")
            el-form-item(label="Country")
              el-select(v-model="agency.location_id" filterable clearable style="width: 100%")
                el-option(v-for="c in countries" :key="c.id" :value="c.id" :label="c.name")
            el-form-item(label="Sell Destinations")
              el-select(v-model="agency.locations" multiple filterable clearable style="width: 100%")
                el-option-group(v-for="c in countries.filter(c => c.id != agency.location_id)" :key="c.id" :label="c.name")
                  el-option(v-for="r in c.children" :key="r.id" :value="r.id" :label="r.name")
        el-tab-pane(name="users" label="Agency Users")
            el-button.mt-20.mb-10(type="primary" @click="createUser") Create user
            el-table(:data="users" @row-click="editUser")
              el-table-column(prop="fullname" label="Fullname")
              el-table-column(prop="username" label="Login")
              el-table-column(prop="password" label="Password")
              el-table-column(prop="email" label="Email")
              el-table-column(prop="phone" label="Phone")
      span.dialog-footer(slot="footer")
        el-button(
          type="primary"
          :plain="true"
          @click="save"
          :disabled="!agency.name.length"
          :loading="saving"
        ) Save
        el-button(@click="modal = false" :plain="true") Close
    el-dialog(
      :visible.sync="userModal"
      :title="user.name ? user.name : 'Create user'"
      top="20px"
      width="400px"
      center
    )
      el-form(label-width="120px")
        el-form-item(label="Firstname")
          el-input(v-model="user.name")
        el-form-item(label="Lastname")
          el-input(v-model="user.lastname")
        el-form-item(label="Gender")
          el-select(v-model="user.gender_id" filterable style="width: 100%")
            el-option(value="m" label="Male") 
            el-option(value="f" label="Female") 
        el-form-item(label="Username")
          el-input(v-model="user.username")
        el-form-item(label="Password")
          el-input(v-model="user.password")
        el-form-item(label="Email")
          el-input(v-model="user.email")
        el-form-item(label="Phone")
          el-input(v-model="user.phone")
      span(slot="footer")
        el-button(type="primary" @click="saveUser" :loading="savingUser") Save
        el-button(@click="userModal = false" :plain="true") Close
</template>
<script type="text/javascript">
import Location from '@/models/Location'
import Company from '@/models/Company'
import User from '@/models/User'
export default {
  name: 'agencies',
  data(){
    return {
      modal: false,
      userModal: false,
      saving: false,
      savingUser: false,
      fetching: false,
      countries: [],
      agencies: [],
      agency: new Company({ name: '' }),
      users: [],
      user: new User({ name: '' }),
      tab: 'main'
    }
  },
  async created(){
    await this.fetch()
    this.countries = await Location.include('children').where('type', 'country').get()
  },
  methods: {
    async fetch(){
      try{
        this.fetching = true
        this.agencies = await Company.include('location').where('type_id', 'agency').get()
        this.fetching = false
      }catch({ response }){
        this.$message.error(response.data.message)
        this.fetching = false
      }
    },
    create(){
      this.$router.push({
        name: 'agencies',
        params: { id: 'new' }
      })
    },
    edit(row){
      this.$router.push({
        name: 'agencies',
        params: { id: row.id }
      })
    },
    async save(){
      try{
        this.saving = true
        await this.agency.save()
        this.saving = false
        this.modal = false
        await this.fetch()
      }catch(e){
        this.saving = false
        this.$message.error('Acency not saved. Please Check details')
      }
    },
    async fetchUsers(){
      this.users = await User.where('main_company_id', this.agency.id).get()
    },
    createUser(){
      this.user = new User({ 
        name: '',
        lastname: '',
        username: '',
        gender_id: 'm',
        main_company_id: this.agency.id,
        active: true,
        phone: '',
        email: '',
        password: ''
      })
      this.userModal = true
    },
    async editUser(row){
      this.user = await User.find(row.id)
      this.userModal = true
    },
    async deleteUser(){

    },
    async saveUser(){
      try{
        this.savingUser = true
        await this.user.save()
        this.savingUser = false
        this.userModal = false
        await this.fetchUsers()
      }catch(e){
        this.savingUser = true
        this.$message.error('User not saved. Please Check details')
      }
    }
  },
  watch: {
    '$route.params.id': {
      immediate: true,
      handler: async function(val){
        if(val && val == 'new'){
          this.agency = new Company({
            name: '',
            type_id: 'agency',
            active: true,
            phone: '',
            email: '',
            website: '',
            location_id: null,
            locations: []
          })
          this.modal  = true
        }else if(val){
          this.agency = await Company.find(val)
          if(this.agency){
            await this.fetchUsers()
          }
          this.modal  = true
        }
      }
    }
  }
}
</script>