<template lang='pug'>
  v-toolbar.py-12
    v-toolbar-title
      nuxt-link(to='/'): img.logo(src='/img/logo.png')
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser'])
    }
  }
</script>