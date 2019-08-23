<template lang="pug">
  
    div 
      v-snackbar(v-model='snackbar' right top :timeout='timeout' :color='color') 
        span(v-html='message')

</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  created() {},
  methods: {
    ...mapMutations({
      setSnackbar: 'snackbar/SET_SNACKBAR',
      showSnackbar: 'snackbar/showSnackbar'
    })
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.state.snackbar.snackbar
      },
      set(val) {
        this.setSnackbar(val)
      }
    },
    ...mapState('snackbar', ['timeout', 'color', 'message'])
  }
}
</script>