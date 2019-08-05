<template lang="pug">
  div(v-if="hasRole('admin')")
    el-breadcrumb(separator-class="el-icon-arrow-right")
      el-breadcrumb-item(:to="{ name: 'dashboard' }")
        i.icon-display
      el-breadcrumb-item(:to="{ name: 'definitions' }") SETTINGS
      el-breadcrumb-item Users
    el-card(body-style="padding: 0", shadow="hover")
      div(slot="header")
        el-form.pt-10(:inline="true", :model="filters")
          el-form-item(label="")
            el-button-group
              el-button(
                size="mini"
                type="primary"
                :plain="true"
                @click="createUser"
                icon="el-icon-plus"
                :disabled="!can('users.create')"
              ) Create
              el-button(
                @click="fetchUsers(true)"
                icon="el-icon-download"
                :plain="true"
                :loading="fetchingExcel"
              )
          el-form-item(label="Position")
            el-select(
              size="mini"
              v-model="filters.active"
              placeholder="Choose Position"
              @change="fetchUsers"
            )
              el-option(label="All", :value="null")
              el-option(label="Only active", :value="1")
              el-option(label="Only pasive", :value="0")
          el-form-item(label="Company")
            el-select(v-model="filters.company_id", placeholder="Choose company", @change="fetchUsers", size="mini")
              el-option(label="All Users", :value="null")
              el-option(v-for="c in companies", :label="c.name", :value="c.id", :key="c.id")
          el-form-item.pull-right.no-margin-right(label="")
            el-input(placeholder="Search...", v-model="search", size="mini")
              i.el-input__icon.el-icon-search(slot="suffix")
      el-table(
        :data="filteredUsers"
        @row-dblclick="editUser"
        size="mini"
        :stripe="true"
        v-loading="fetching"
      )
        el-table-column(type="index", width="35px", align="right", class-name="text-muted")
        el-table-column(prop="active", label="Active", align="center", width="80px", :sortable="true")
          template(slot-scope="props")
            el-switch(
              v-if="props.hasOwnProperty('row')"
              :value="props.row.active"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="activateUser(props.row, $event)"
            )
        el-table-column( prop="name", label="Name", :sortable="true")
        el-table-column( prop="lastname", label="Last Name", :sortable="true")
        el-table-column(prop="username", label="User adı", :sortable="true")
        el-table-column(prop="phone", label="Telefon", sortable="true")
        el-table-column(prop="email", label="Email", :sortable="true")
        el-table-column(prop="main_company.name", label="Company", sortable="true")
    el-dialog(
      :visible.sync="modal"
      :title="user.name"
      v-if="modal"
      top="15px"
      width="80%"
      :center="true"
    )
      el-alert(
        title="You dont have permission to edit User"
        v-if="!can('users.edit')"
        :closable="false"
        type="warning"
      )
      el-form.p-20(ref="form", :model="user", label-width="170px")
        el-row(:gutter="20")
          el-col(:lg="9")
            el-form-item(label="Name")
              el-input(v-model="user.name", :disabled="!can('users.edit')")
            el-form-item(label="Last Name")
              el-input(v-model="user.lastname", :disabled="!can('users.edit')")
            el-form-item(label="Login")
              el-input(v-model="user.username", :disabled="!can('users.edit')")
            el-form-item(label="Password")
              el-input(v-model="user.password" type="password" :disabled="!can('users.edit')")
            el-form-item(label="E-mail")
              el-input(v-model="user.email", :disabled="!can('users.edit')")
            el-form-item(label="Active")
              el-switch(v-model="user.active", active-color="#13ce66", inactive-color="#ff4949", :disabled="!can('users.edit')")
            el-form-item(label="Company")
              el-select(v-model="user.main_company_id" placeholder="Choose Company" :disabled="!can('users.edit')" style="width: 100%")
                el-option(v-for="c in companies" :label="c.name" :value="c.id" :key="c.id")
            el-form-item(label="Position")
              el-input(v-model="user.defaults.position" :disabled="!can('users.edit')")
            el-form-item(label="System Language")
              el-select(v-model="user.defaults.systemLanguage" placeholder="Choose Language" :disabled="!can('users.edit')" style="width: 100%")
                el-option(v-for="lang in languages" :label="lang.name" :value="lang.id" :key="lang.id")
            el-form-item(label="Regions")
              el-select(v-model="user.locationsids" multiple placeholder="Choose regions" :disabled="!can('users.edit')" style="width: 100%")
                el-option(v-for="region in regions" :label="region.name" :value="region.id" :key="region.id")
            el-form-item(label="Phone number")
              el-input(v-model="user.phone" :disabled="!can('users.edit')")
          el-col(:lg="15", v-if="can('users.permissions')")
            el-form-item(label="User groups")
              el-select(
                v-model="user.roles"
                :multiple="true"
                placeholder="Choose groups"
                :disabled="!can('users.edit')"
                style="width: 100%"
              )
                el-option(label="Administrator", value="admin")
                el-option(label="Accountant", value="accountant")
                el-option(label="Hotel guide", value="hotel-guide")
                el-option(label="Transfer guide", value="transfer-guide")
            el-form-item(
              label="User permissions"
              v-if="can('users.permissions.edit')"
            )
              el-tree(
                :data="permissionsTree"
                ref="permissionsTree"
                node-key="name"
                :default-expanded-keys="[]"
                :default-checked-keys="user.permissions"
                :props="{children: 'permissions', label: 'label'}"
                @check-change="setUserPermissions"
                :highlight-current="true"
                :default-expand-all="true"
                :show-checkbox="true"
              )
        el-upload.avatar-uploader(
          action="/users/upload"
          :data="{ user_id: user.id }"
          :auto-upload="true"
          :on-remove="handleRemove"
          :file-list="user.attachments"
          :with-credentials="true"
          :thumbnail-mode="true"
          :headers="{ 'X-CSRF-TOKEN': token }"
          ref="upload"
          list-type="picture"
          :show-file-list="true"
          v-if="user.id"
          :disabled="!can('users.edit')"
        )
          el-button(
            size="small"
            type="primary"
          ) Upload
        el-alert(
          type="warning"
          title="First create user"
          v-if="!user.id"
        )
      span.dialog-footer(slot="footer")
        el-button(
          type="primary"
          @click="saveUser"
          :disabled="!saveable || !can('users.edit')"
          :loading="saving"
        ) Create
        el-button(@click="modal = false") Close

</template>
<script>
import User from '@/models/User'
import Company from '@/models/Company'
import PermissionGroup from '@/models/PermissionGroup'
import Language from '@/models/Language'
import Location from '@/models/Location'
export default {
  name: 'users',
  data(){
    return {
      user: null,
      users: [],
      selectedUser: new User({ name: '', locationsids: []}),
      modal: false,
      fetching: false,
      fetchingExcel: false,
      saving: false,
      search: '',
      companies: [],
      permissionGroups: [],
      regions: [],
      languages: [],
      filters: {
        active: 1,
        company_id: null,
        roles: [ ]
      }
    }
  },
  async mounted () {
    this.$Progress.start()
    await this.fetchUsers()
    this.permissionGroups = await PermissionGroup.include('permissions').get()
    this.companies = await Company.where('type_id', 'company').get()
    this.regions = await Location.where('type', 'region').select('name').get()
    this.languages = await Language.get()
    this.$Progress.finish()
  },
  methods: {
    async fetchUsers(excel){
      try{
        this.$Progress.start()
        if(excel === true){
          this.fetching = false
          this.fetchingExcel = true
        }else{
          this.fetching = true
          this.fetchingExcel = false
        }
        let users = await User
          .include(['media', 'main_company'])
          .select({
            users: ['id', 'name', 'username', 'lastname', 'email', 'phone', 'defaults', 'active'],
            media: ['*'],
            main_company: ['id']
          })
          .whereIn('roles', this.filters.roles)
          .where('main_company_id', this.filters.company_id)
          .where('active', this.filters.active)
          .params({
            excel
          })
          .get()
          if(excel === true){
            window.location.href='/users.xlsx'
          }else{
            this.users = users
          }
        this.fetchingExcel = false
        this.fetching = false
        this.$Progress.finish()
      }catch({ response }){
        this.$message.error(response.data.message)
        this.fetching = false
        this.$Progress.fail()
      }
    },
    createUser(){
      this.user = new User({
        name: '',
        username: '',
        email: '',
        active: true,
        defaults: {
          passport: null,
          position: null,
          systemLanguage: null
        },
        roles: [],
        permissions: [],
        locationsids: []
      })
      this.modal = true
    },
    async editUser(row){
      try{
        this.user = await User.find(row.id)
        this.user.locationsids = this.user.locations.map(l => l.id)
        this.modal = true
      }catch({ response }){
        this.$message.error(response.data.message)
      }
    },
    async saveUser(){
      try{
        this.saving = true
        await this.user.save()
        await this.$refs.upload.submit()
        this.saving = false
        this.modal = false
        await this.fetchUsers()
      }catch({ response }){
        this.$message.error(response.data.message)
        this.saving = false
      }
    },
    setUserPermissions(company, checked, subtree){
      this.user.permissions = this.$refs.permissionsTree.getCheckedNodes().filter(n => n.hasOwnProperty('name')).map(n => n.name)
    },
    async activateUser(user, status){
      try{
        this.$Progress.start()
        user.active = status
        await axios.post(`/users/activate/${user.id}`)
        this.$message.success(status === true ? 'User active' : 'User pasive')
        this.$Progress.finish()
      }catch({ response }){
        this.$message.error(response.data.message)
        this.saving = false
        this.$Progress.finish()
      }
    },
    async handleRemove(file) {
      axios.delete('/users/deleteimage', { params: { user_id: this.user.id, id: file.id }})
        .then(({data}) => {
          this.change(['users', data])
        })
    }
  },
  computed: {
    saveable: function(){
      return this.user.name.length && this.user.roles.length && this.user.defaults.systemLanguage && this.user.username.length && this.user.email.length && this.user.main_company_id
    },
    token: function(){
      return window.axios.defaults.headers.common['X-CSRF-TOKEN']
    },
    filteredUsers: function(){
      return this.users.filter(u => u.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    permissionsTree: function(){
      return [{
        label: 'All permissions',
        permissions: this.permissionGroups
      }]
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-upload__input{
    display: none !important;
  }
</style>