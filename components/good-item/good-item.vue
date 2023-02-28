<template>
  <view>
    <view class="good_item">

      <!-- 左侧盒子部分 -->
      <view class="good_item_left">
        <image :src="goods.goods_small_logo||defultPic"></image>
      </view>
      <view class="good_item_right">
        <view class="good_item_name">{{goods.goods_name}}</view>
        <view class="good_item_price">
          <view class="price">￥{{goods.goods_price|toFixed}}</view>
        </view>

      </view>
    </view>
  </view>

</template>

<script>
  export default {
    name: "good-item",
    data() {
      return {
        defultPic: 'http://image3.suning.cn/uimg/b2c/newcatentries/0070061155-000000000617064184_1_200x200.jpg'
      };
    },
    props: {
      goods: {
        type: Object,
        default: {}
      }
    },
    filters: {
      toFixed(res) {
        return Number(res).toFixed(2)
      }
    }
  }
</script>

<style lang="scss">
  .goods_list {
    .good_item {
      display: flex;
      padding: 10px 5px;
      border-bottom: 1px solid #efefef;

      .good_item_left {
        image {
          width: 100px;
          height: 100px;
          margin-right: 5px;
        }
      }

      .good_item_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .good_item_name {}

        .good_item_price {
          .price {
            color: #c00;
            font-size: 17px;
          }
        }
      }
    }
  }
</style>
