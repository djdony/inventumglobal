<template lang="pug">
    v-carousel(class="cara")
      v-carousel-item(v-for="(img, i) in value" :src="img.url" :key="i")
</template>
<script type="text/javascript">
    export default {
        props: ['value']
    }
</script>
<style>
  .cara, .cara .v-window__container, .cara .v-carousel__item {
    height: 100% !important;
  }
</style>