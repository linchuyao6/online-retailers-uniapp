<template>
  <view class="address_box">
    <view class="addBtn" v-if="JSON.stringify(address) === '{}'">
      <button type="primary" size="mini" class="add_address" @click="addAddress">请选择收货地址+</button>
    </view>
    <!--地址详情页 -->
    <view class="address_info_box" v-else @click="addAddress">
      <view class="row1">
        <view class="row_left">
          <view class="row_name">收货人: </view>
          <view class="name">{{address.userName}}</view>
        </view>
        <view class="row_right">
          <view class="row_phone">电话: </view>
          <view class="phone">{{address.telNumber}}</view>
          <uni-icons type="right" size="16"></uni-icons>
        </view>
      </view>
      <view class="row2">
        <view class="row2_address">收货地址: </view>
        <view class="address">{{addStr}}</view>
      </view>
    </view>
    <image src="../../static/cart_border@2x.png" class="address_border"></image>

  </view>
</template>

<script>
  import {
    mapMutations,
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    name: "addresss-box",
    data() {
      return {

      };
    },
    computed: {
      ...mapState('my_address', ['address']),
      ...mapGetters('my_address', ['addStr'])
    },
    methods: {
      ...mapMutations('my_address', ['updateAddress']),
      async addAddress() {
        const [err, succ] = await uni.chooseAddress().catch(err => err)
        if (err === null && succ.errMsg == 'chooseAddress:ok') {
          this.updateAddress(succ)
          // if (err && err.errMsg === 'chooseAddress:fail auth deny') {
          // this.reAuth() // 调用 this.reAuth() 方法，向用户重新发起授权申请
        }
      }
    }
  }
  // async  reAuth(){
  //    const {err2,confirmResult}=await uni.showModal({
  //      content: '检测到您没打开地址权限，是否去设置打开？',
  //      confirmText: "确认",
  //      cancelText: "取消",
  //    })
  //    if(err2) return
  //    if (confirmResult.cancel) return uni.$showMsg('您取消了地址授权！')
  //    if(confirmResult.confirm) 
  //  }
</script>

<style lang="scss">
  .address_box {
    .addBtn {
      height: 90px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .address_border {
      display: block;
      width: 100%;
      height: 5px;
    }
  }

  .address_info_box {
    height: 90px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    padding: 0 5px;
    justify-content: center;

    .row1 {
      display: flex;
      justify-content: space-between;

      .row_left {
        display: flex;

        .row_name {}

        .name {
          margin-left: 5px;
        }
      }

      .row_right {
        display: flex;
        align-items: center;

        .row_phone {}

        .phone {

          margin: 0 5px;
        }

      }
    }

    .row2 {
      display: flex;
      margin-top: 10px;
      align-items: center;

      .row2_address {
        white-space: nowrap;
      }

      .address {
        margin-left: 5px;
      }
    }
  }
</style>
