<template lang="pug">
  center(v-if="!logged")
    img(src="/img/logo.png" style="height: 20em")
    el-form.pl-20.pr-20.login(v-model="form" style="width: 350px" @keyup.enter.native="login")
      el-form-item(label="")
        el-input(v-model="form.username" size="medium" placeholder="Enter username or email")
          template(slot="prepend") LOGIN
      el-form-item(label="")
        el-input(v-model="form.password" type="password" size="medium" placeholder="Enter password")
          template(slot="prepend") PASSWORD
      el-form-item
        el-button(
          type="primary"
          :loading="fetching"
          plain
          @click="login"
          size="medium"
          icon="el-icon-arrow-right"
        ) {{ fetching ? 'WAIT' : 'ENTER' }}
</template>
<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      fetching: false,
      logged: false,
      user: null,
      form: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    if (window.localStorage.getItem('token')) {
      this.logged = true
      this.$router.push({ name: 'dashboard' })
    }
  },
  methods: {
    ...mapMutations({ showSnackbar: 'snackbar/showSnackbar' }),
    async login() {
      try {
        this.fetching = true

        const resp = await fetch(process.env.MIX_API_URL + '/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.form)
        })

        let content = await resp.json()

        if (content && content.hasOwnProperty('access_token')) {
          this.logged = true
          window.localStorage.setItem('token', content.access_token)
          delete content['access_token']
          window.localStorage.setItem('user', JSON.stringify(content))
          await this.$store.dispatch('setUser', content)
          window.location.reload(true)
        } else {
          this.fetching = false
          this.showSnackbar({
            message:
              'YOUR CREDENTIALS ARE INCORRECT OR YOUR ACCOUNT MIGHT BEEN SUSPENDED',
            color: 'red'
          })
        }
      } catch ({ response }) {
        this.fetching = false
        console.log(response.data.message)
        this.showSnackbar({
          message: 'An error occured while loading the data',
          color: 'red'
        })
      }
    }
  }
}
</script>
<style>
.login .el-input-group__prepend {
  width: 120px !important;
  text-align: right !important;
}
</style>