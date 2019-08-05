<template lang="pug">
  el-popover.p-3(
    placement="bottom-end"
    width="400"
    trigger="click"
  )
    i.el-icon-bell(
      slot="reference"
      style="padding-bottom: 4px"
      :class="{ 'text-danger bell': unread.length > 0 }"
    )
    el-divider(v-if="unread.length === 0")
      span.text-success Bildirim yok
</template>
<script type="text/javascript">
  export default {
    name: 'notifications',
    data(){
      return {
        saving: null,
        loading: false,
        unread: []
      }
    },
    methods: {

    },
    computed: {

    }
  }
</script>
<style type="text/css">
.mb-2{
  margin-bottom: 2px;
}
.bell{
  -webkit-animation: ring 3s .7s ease-in-out infinite;
  -webkit-transform-origin: 50% 4px;
  -moz-animation: ring 3s .7s ease-in-out infinite;
  -moz-transform-origin: 50% 4px;
  animation: ring 3s .7s ease-in-out infinite;
  transform-origin: 50% 4px;
}

@-webkit-keyframes ring {
  0% { -webkit-transform: rotateZ(0); }
  10% { -webkit-transform: rotateZ(20deg); }
  15% { -webkit-transform: rotateZ(-18deg); }
  20% { -webkit-transform: rotateZ(15deg); }
  25% { -webkit-transform: rotateZ(-13deg); }
  30% { -webkit-transform: rotateZ(10deg); }
  35% { -webkit-transform: rotateZ(-8deg); }
  40% { -webkit-transform: rotateZ(5deg); }
  45% { -webkit-transform: rotateZ(-2deg); }
  50% { -webkit-transform: rotateZ(0); }
  100% { -webkit-transform: rotateZ(0); }
}

@-moz-keyframes ring {
  0% { -moz-transform: rotateZ(0); }
  10% { -moz-transform: rotateZ(20deg); }
  15% { -moz-transform: rotateZ(-18deg); }
  20% { -moz-transform: rotateZ(15deg); }
  25% { -moz-transform: rotateZ(-13deg); }
  30% { -moz-transform: rotateZ(10deg); }
  35% { -moz-transform: rotateZ(-8deg); }
  40% { -moz-transform: rotateZ(5deg); }
  45% { -moz-transform: rotateZ(-2deg); }
  50% { -moz-transform: rotateZ(0); }
  100% { -moz-transform: rotateZ(0); }
}

@keyframes ring {
  0% { transform: rotateZ(0); }
  10% { transform: rotateZ(20deg); }
  15% { transform: rotateZ(-18deg); }
  20% { transform: rotateZ(15deg); }
  25% { transform: rotateZ(-13deg); }
  30% { transform: rotateZ(10deg); }
  35% { transform: rotateZ(-8deg); }
  40% { transform: rotateZ(5deg); }
  45% { transform: rotateZ(-2deg); }
  50% { transform: rotateZ(0); }
  100% { transform: rotateZ(0); }
}
</style>