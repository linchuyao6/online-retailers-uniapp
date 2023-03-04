<template>
  <view class="settle">
    <label class="radio">
      <radio color="#c00" :checked="isFullCheck" @click="check" /><text>全选</text>
    </label>
    <view class="amount">
      合计:<text>￥{{checkoutPrice}}</text>
    </view>
    <view class="btn" @click="getSum">结算({{checkoutCount}})</view>
  </view>
</template>

<script>
  import {
    mapGetters,
    mapMutations,
    mapState
  } from 'vuex'
  export default {
    name: "my-settel",
    data() {
      return {
        // 登录秒数
        section: 3
      };
    },
    computed: {
      ...mapGetters('my_cart', ['checkoutCount', 'total', 'checkoutPrice']),
      ...mapState('my_cart', ['cart']),
      ...mapGetters('my_address', ['addStr']),
      ...mapState('my_address', ['token']),
      isFullCheck() {
        return this.checkoutCount === this.total
      }
    },
    methods: {
      ...mapMutations('my_cart', ['allCheck']),
      ...mapMutations('my_address', ['updateRedirectInfo']),
      check() {
        this.allCheck(!this.isFullCheck)
      },
      getSum() {
        if (!this.checkoutCount) return uni.$showMsg('请选择要结算的商品！')
        if (!this.addStr) return uni.$showMsg('请选择收货地址！')
        if (!this.token) return this.naviTo(this.section)
        this.payOrder()
      },
      async payOrder() {
        const orderInfo = {
          order_price: 0.01,
          consignee_addr: this.addStr,
          goods: this.cart.filter(x => x.goods_state).map(x => ({
            goods_id: x.goods_id,
            goods_number: x.goods_count,
            goods_price: x.goods_price
          }))
        }
        const {data:res}=await uni.$http.post('/my/orders/create',orderInfo)
        if(res.meta.status!==200) return uni.$showMsg('订单创建失败！')
        console.log(res);
        const orderNum=res.message.order_number
        const {data:res2}=await uni.$http.post('/my/orders/req_unifiedorder',{order_number:orderNum})
        console.log(res2);
      },
      showTips(n) {
        uni.showToast({
          icon: 'none',
          mask: true,
          title: '请登录后再结算！' + n + ' 秒后自动跳转到登录页',
          duration: 1500
        })
      },
      naviTo(n) {
        this.showTips(n)
        const timer = setInterval(() => {
          n--;
          if (n <= 0) {
            clearInterval(timer);
            uni.switchTab({
              url: '/pages/my/my',
              success: () => {
                this.updateRedirectInfo({
                  openType: 'switchTab',
                  from: '/pages/cart/cart'
                })
              }
            })

            return
          }
          this.showTips(n);
        }, 1000)
      }
    }
  }
</script>

<style lang="scss">
  .settle {
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
    background-color: white;

    .amount {
      text {
        color: #c00;
        font-weight: bold;
      }
    }

    .btn {
      min-width: 100px;
      line-height: 50px;
      color: white;
      background-color: #c00;
      display: flex;
      justify-content: center;
    }
  }
</style>
