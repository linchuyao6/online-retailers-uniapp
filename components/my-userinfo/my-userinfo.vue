<template>
  <view class="user-info-container">
    <view class="top-box">
      <image :src="userInfo.avatarUrl"></image>
      <view class="nickname">{{userInfo.nickName}}</view>
    </view>
    <!--   /{"nickName":"微信用户","gender":0,"language":"","city":"","province":"","country":"","avatarUrl":"https://thirdwx.qlogo.cn/mmopen/vi_32/POgEwh4mIHO4nibH0KlMECNjjGxQUq24ZEaGT4poC6icRiccVGKSyXwibcPq4BWmiaIGuG1icwxaQX6grC9VemZoJ8rg/132","is_demote":true} -->

    <!-- 详细面板部分 -->
    <view class="panel-list">
      <!-- 第一个面板 -->
      <view class="panel">
        <view class="panel-body">
          <view class="panel-item">
            <text>8</text>
            <text>收藏的店铺</text>
          </view>
          <view class="panel-item">
            <text>14</text>
            <text>收藏的商品</text>
          </view>
          <view class="panel-item">
            <text>18</text>
            <text>关注的商品</text>
          </view>
          <view class="panel-item">
            <text>84</text>
            <text>足迹</text>
          </view>
        </view>
      </view>
      <!-- 第二个面板 -->
      <view class="panel">
        <view class="panel-title">
          我的订单
        </view>
        <view class="panel-body">

          <view class="panel-item">
            <image src="../../static/my-icons/icon1.png" class="icon"></image>
            <text>待付款</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon2.png" class="icon"></image>
            <text>待收货</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon3.png" class="icon"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-item">
            <image src="../../static/my-icons/icon4.png" class="icon"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <!-- 第三个面板 -->
      <view class="panel">
        <view class="panel-list-item">
          <text>收货地址</text>
          <uni-icons type="right" size="17"></uni-icons>
        </view>
        <view class="panel-list-item">
          <text>联系客服</text>
          <uni-icons type="right" size="17"></uni-icons>
        </view>
        <view class="panel-list-item" @click="logout">
          <text>退出登录</text>
          <uni-icons type="right" size="17"></uni-icons>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import {
    mapState,
   mapMutations
  } from 'vuex'
  export default {
    name: "my-userinfo",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('my_address', ['userInfo'])
    },
    methods: {
      ...mapMutations('my_address', ['updateUserInfo', 'updateToken', 'updateAddress']),
      async logout() {
        const [err, succ] = await uni.showModal({
          title: '提示',
          content: '确定退出登录吗？'
        }).catch(err => err);
        if (succ&&succ.confirm){
          console.log('oo');
          this.updateAddress({});
          this.updateToken('');
          this.updateUserInfo({})
        }
      }
    }
  }
</script>

<style lang="scss">
  .user-info-container {
    height: 100%;
    background-color: #f4f4f4;

    .top-box {
      height: 400rpx;
      background-color: #c00;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      image {
        width: 90px;
        height: 90px;
        border-radius: 45px;
        border: 2px solid white;
        box-shadow: 0 1px 5px black;

      }

      .nickname {
        color: white;
        font-weight: bold;
        font-size: 16px;
        margin-top: 10px;
      }
    }
  }

  .panel-list {
    padding: 0 5px;

    .panel {
      position: relative;
      top: -10px;
      background-color: white;
      border-radius: 4px;
      margin-bottom: 10px;

      .panel-title {
        line-height: 40px;
        padding-left: 5px;
        font-size: 15px;
        border-bottom: 1px solid #efefef;
      }

      .panel-body {
        display: flex;
        justify-content: space-around;

        .panel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          font-size: 13px;
          padding: 10px 0;

          .icon {
            width: 45px;
            height: 45px;
          }
        }
      }
    }
  }

  .panel-list-item {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 15px;
    height: 45px;
    align-items: center;
  }
</style>
