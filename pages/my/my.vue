<template>
  <view class="my-container">
    
    
    <my-userinfo v-if="token"></my-userinfo>
    <my-login v-else></my-login>
  </view>
</template>

<script>
  import {mapState} from 'vuex'
  import bageMix from '@/mixin/tabbar-badge.js'
  export default {
    mixins: [bageMix],
    data() {
      return {
        
      }
    },
    computed:{
      ...mapState('my_address',['token'])
    },
    methods: {
      
    }
  }
</script>

<style lang="scss">
 page,
 .my-container{
   height: 100%;
 }
</style>
