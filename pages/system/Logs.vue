<template lang="pug">
  iframe(src="/logs" seamless width="100%" :height="windowHight" frameborder="0")
</template>

<script>
export default {
  name: 'logs',
  computed: {
    windowHight: function(){
      return window.innerHeight-41
    }
  }
}
</script>