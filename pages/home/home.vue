<template>
  <view>
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item,i) in swaperList" :key="i">
        <navigator class="swiper-item" :url="'/subpackge/good_detail/good_detail?goods_id='+item.goods_id">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <view class="nav-List">
      <view class="nav-item" v-for="(item,i) in navList" :key="i" @click="gotoTabbar(item)">
        <image :src="item.image_src"></image>
      </view>
    </view>
    <!-- 楼层标题部分 -->
    <view class="floorTitle">
      <view class="floor-item" v-for="(item,i) in floorList" :key="i">
        <image :src="item.floor_title.image_src" class="title-pic"></image>
        <!-- 楼层图片部分 -->
        <view class="floor-box">
          <view class="left-floor-box">
            <image :src="item.product_list[0].image_src" :style="{width:item.product_list[0].image_width+'rpx'}"
              mode="widthFix">
            </image>

          </view>
          <view class="right-floor-box">
            <view class="right-floor-item" v-for="(item2,index) in item.product_list" :key="index">
              <image :src="item2.image_src" v-if="index!=0" :style="{width:item2.image_width+'rpx'} " mode="widthFix"></image>
            </view>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
 import bageMix from '@/mixin/tabbar-badge.js'
 export default {
   mixins: [bageMix],
    data() {
      return {
        swaperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwaper()
      this.getNav()
      this.getFloorList()
    },
    methods: {
      async getSwaper() {
        const {
          data: res
        } = await uni.$http.get('/home/swiperdata')
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        this.swaperList = res.message
      },
      async getNav() {
        const {
          data: res
        } = await uni.$http.get('/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      gotoTabbar(item) {
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/home/floordata')
        console.log(res);
        if (res.meta.status !== 200) return uni.$showMsg()
        res.message.forEach(proc=>{
          proc.product_list.forEach(pic=>{
            pic.url="/subpackge/good_list/good_list?"+pic.navigator_url.split('?')[1]
          })
        })
        this.floorList = res.message
      },
      gotoSearch(){
        console.log('ok');
      }
    },


  }
</script>

<style lang="scss">
  .search-box{
    position: sticky;
    z-index: 999;
    top: 0;
    
  }
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      height: 100%;
      width: 100%;
    }
  }

  .nav-List {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-item image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-item {
    .title-pic {
      height: 60rpx;
      width: 100%;
      display: flex;
    }
    .floor-box{
      display: flex;
      .left-floor-box{
        padding-left: 10rpx;
      }
      .right-floor-box{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }
  }
</style>
