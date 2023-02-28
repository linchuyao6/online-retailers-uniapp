<template>
  <view class="my-search-box" :style="{'background-color':bgc}">
    <view class="my-search-button" :style="{'border-radius':radius+'px'}" @click="gotoSearch">
      <uni-icons type="search" size="17"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
      
    props:{
      bgc:{
        type:String,
        default:'#c00'
      },
      radius:{
        type:Number,
        default:18
      }
    },
    methods:{
      gotoSearch(){
        this.$emit('click')
        uni.navigateTo({
          url:'/subpackge/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
.my-search-box{
  // background-color: #c00;
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .my-search-button{
    height: 36px;
    background-color: #fff;
    // border-radius: 18px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .search-icon{
      
      font-size: 17px;
      
    }
  }
}
</style>