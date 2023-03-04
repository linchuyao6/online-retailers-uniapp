<template>
  <view class="container">
    <view  v-if="cart.length">
      <!-- 收货地址 -->
      <view class="address">
        <addresss-box></addresss-box>
      </view>
      <view class="cart-title">
        <uni-icons type="cart" size="18" class="cart-icon"></uni-icons>
        <text class="cart-text">购物车</text>
      </view>
      <uni-swipe-action>
        <block v-for="(good,i) in cart" :key="i">
          <uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(good)">
            <good-item :goods="good" :show-radio="true" @radio-change="radioClickHandler" :showNumBox="true"
              @changeNum="changeNum"></good-item>
          </uni-swipe-action-item>
        </block>
      </uni-swipe-action>
      <!-- 结算区域 -->
      <my-settel></my-settel>
    </view>
    <view class="empty" v-else>
      <image src="@/static/cart_empty@2x.png"></image>
      <text>空空如也</text>
    </view>
  </view>
</template>

<script>
  // 注意：这里的from的模块名称都是小写，vue和vue
  import bageMix from '@/mixin/tabbar-badge.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    mixins: [bageMix],
    computed: {
      ...mapState('my_cart', ['cart'])
    },
    data() {
      return {
        options: [{
          text: '删除', // 显示的文本内容
          style: {
            backgroundColor: '#C00000' // 按钮的背景颜色
          }
        }]
      }
    },
    methods: {
      ...mapMutations('my_cart', ['changeGoodState', 'changeGoodCount', 'removeGood']),
      radioClickHandler(e) {
        this.changeGoodState(e)
      },
      changeNum(e) {
        this.changeGoodCount(e)
      },
      swipeActionClickHandler(good) {
        this.removeGood(good)
      }

    }
  }
</script>

<style lang="scss">
  .container {
    padding-bottom: 50px;
  }

  .cart-title {
    height: 40px;
    display: flex;
    padding-left: 5px;
    align-items: center;
    border: 1px solid #efefef;

    .cart-icon {}

    .cart-text {
      font-size: 13px;
      margin-left: 10px;
      
    }
  }
  .empty{
    display: flex;
    padding-top: 150px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    image{
      width:100px;
      height: 100px;
    }
    text{
      color: gray;
      font-size: 12px;
      margin-top: 15px;
    }
  }
</style>
