<template>
  <view class="settle">
    <label class="radio">
      <radio color="#c00" :checked="isFullCheck" @click="check"/><text>全选</text>
    </label>
    <view class="amount">
      合计:<text>￥{{checkoutPrice}}</text>
    </view>
    <view class="btn">结算({{checkoutCount}})</view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  export default {
    name: "my-settel",
    data() {
      return {

      };
    },
    computed:{
      ...mapGetters('my_cart',['checkoutCount','total','checkoutPrice']),
      isFullCheck(){
        return this.checkoutCount===this.total
      }
    },
    methods:{
      ...mapMutations('my_cart',['allCheck']),
      check(){
        this.allCheck(!this.isFullCheck)
      }
    }
  }
</script>

<style lang="scss">
.settle{
  height: 50px;
  position: fixed;
  bottom: 0%;
  left: 0%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 5px;
  font-size: 14px;
  border-top: 1px solid #efefef;
  .amount{
    text{
      color: #c00;
      font-weight: bold;
    }
  }
  .btn{
    min-width: 100px;
    line-height: 50px;
    color: white;
    background-color: #c00;
    display: flex;
    justify-content: center;
  }
}
</style>
