<template lang="pug">
  v-carousel
    v-carousel-item(v-for="(img, i) in value" :src="img.url" :key="i")
</template>
<script type="text/javascript">
export default {
  props: ['value']
} 
</script>