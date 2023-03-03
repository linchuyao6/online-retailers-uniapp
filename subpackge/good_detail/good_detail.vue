<template>

  <view v-if="goodInfo.goods_name">
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in goodInfo.pics" :key="i">
        <view class="swiper-item">
          <image :src="item.pics_big" @click="priview(i)"></image>
        </view>
      </swiper-item>
    </swiper>
    <!-- 内容主体区域-->
    <view class="good_info_box">
      <!-- 价格区域 -->
      <view class="price">
        ￥{{goodInfo.goods_price}}
      </view>

      <view class="good_info_body">
        <!-- 标题页面 -->
        <view class="good_name">
          {{goodInfo.goods_name}}
        </view>
        <!-- 收藏页面 -->
        <view class="favi">
          <uni-icons type="star" size="17"></uni-icons>
          <text>收藏</text>
        </view>

      </view>
      <!-- 运费页面 -->
      <view class="yf">
        快递：免运费
      </view>
    </view>
    <!-- 商品介绍 -->
    <rich-text :nodes="goodInfo.goods_introduce"></rich-text>
    <!-- 下边栏 -->
    <view class="good_nav">
      <uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
        @buttonClick="buttonClick" />
    </view>
  </view>
</template>

<script>
  import {
    mapState,
    mapMutations,
    mapGetters
  } from 'vuex'
  export default {
    computed: {
      ...mapState('my_cart', ['cart']),
      ...mapGetters('my_cart', ['total'])
    },
    watch: {
      // total(newVal) {
      //   const findResult = this.options.find((x) => x.text === '购物车')
      //   if (findResult) {
      //     // 3. 动态为购物车按钮的 info 属性赋值
      //     findResult.info = newVal
      //     console.log('tt');
      //   }
      total:{
        handler(newVal){
          const findResult = this.options.find((x) => x.text === '购物车')
            if (findResult) {
              // 3. 动态为购物车按钮的 info 属性赋值
              findResult.info = newVal
        }
      },
      immediate:true
      }
    },
    data() {
      return {
        goods_id: 0,
        goodInfo: {},
        options: [{
          icon: 'shop',
          text: '店铺',
          infoBackgroundColor: '#007aff',
          infoColor: "red"
        }, {
          icon: 'cart',
          text: '购物车',
          info: 0
        }],
        buttonGroup: [{
            text: '加入购物车',
            backgroundColor: '#ff0000',
            color: '#fff'
          },
          {
            text: '立即购买',
            backgroundColor: '#ffa200',
            color: '#fff'
          }
        ]
      };
    },
    onLoad(option) {
      this.goods_id = option.goods_id
      this.getGoodInfo()
    },
    methods: {
      // 这里要在methods中映射相关方法
      ...mapMutations('my_cart', ['addCart']),
      async getGoodInfo() {
        const {
          data: res
        } = await uni.$http.get('/goods/detail', {
          goods_id: this.goods_id
        })
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ')
          .replace(/webp/g, 'jpg')
        this.goodInfo = res.message
      },
      priview(i) {
        uni.previewImage({
          urls: this.goodInfo.pics.map(x => x.pics_big),
          current: i

        })
      },
      buttonClick(e) {
        if (e.content.text === '加入购物车') {
          const good = {
            // { goods_id, goods_name, goods_price, goods_count,
            // goods_small_logo, goods_state }
            goods_id: this.goodInfo.goods_id,
            goods_name: this.goodInfo.goods_name,
            goods_price: this.goodInfo.goods_price,
            goods_count: 1,
            goods_small_logo: this.goodInfo.goods_small_logo,
            goods_state: true
          }
          this.addCart(good)
        }
        console.log(this.cart);

      },

      onClick(e) {
        console.log(e);
        if (e.content.text === '购物车') {
          uni.switchTab({
            url: '/pages/cart/cart'
          })
        }
      }
    }

  }
</script>

<style lang="scss">
  swiper {
    height: 750rpx;

    image {
      height: 750rpx;
      width: 100%;
    }
  }

  .good_info_box {
    padding: 10px;
    padding-right: 0;

    .price {
      font-size: 18px;
      color: #c00;
      padding: 10px 0;
    }

    .good_info_body {
      display: flex;
      justify-content: space-between;

      .good_name {
        font-size: 13px;
        margin-right: 10px;
      }

      .favi {
        width: 120rpx;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border-left: 1px solid #efefef;
        color: gray;
      }
    }

    .yf {
      margin: 10px 0;
      font-size: 12px;
      color: gray;
    }
  }

  .good_nav {
    position: fixed;
    bottom: 0%;
    left: 0%;
    width: 100%;

  }
</style>
