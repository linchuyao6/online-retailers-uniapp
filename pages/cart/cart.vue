<template>
  <view class="container">
   <scroll-view scroll-y="true" class="ss">
     <view v-for="index of 100" >xx</view>
   </scroll-view>
   <scroll-view scroll-y="true" class="tt">
     <view v-for="index of 50">yy</view>
   </scroll-view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      
    }
  }
</script>

<style>
  .container{
    display: flex;
  }
  .ss{
    height: 100px;
  }
  .tt{
    height: 100px;
  }
</style>
