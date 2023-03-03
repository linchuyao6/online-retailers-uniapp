<template>
  <view>
    <view class="good_item">

      <!-- 左侧盒子部分 -->
      <view class="good_item_left">
        <radio  :checked="goods.goods_state" color="#c00" v-if="showRadio" @click="radioClickHandler"></radio>
        <image :src="goods.goods_small_logo||defultPic" class="good_item_image"></image>
      </view>
      <view class="good_item_right">
        <view class="good_item_name">{{goods.goods_name}}</view>
        <view class="good_item_price">
          <view class="price">￥{{goods.goods_price|toFixed}}</view>
          <uni-number-box :min="1" :value="goods.goods_count" v-if="showNumBox" @change="changeNum"></uni-number-box>
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
      },
      showNumBox:{
        type:Boolean,
        default:false
      },
      showRadio:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      radioClickHandler(){
        this.$emit('radio-change',{
          goods_id:this.goods.goods_id,
          goods_state:!this.goods.goods_state
        })
      },
      changeNum(val){
        // console.log(e);
        this.$emit('changeNum',{
          goods_count:+val,
          goods_id:this.goods.goods_id
        })
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

    .good_item {
      display: flex;
      padding: 10px 5px;
      border-bottom: 1px solid #efefef;
      width: 750rpx;
      box-sizing: border-box;
      .good_item_left {
        display: flex;
        padding-left: 5px;
        justify-content: space-between;
        align-items: center;
      }

      .good_item_right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .good_item_name {}

        .good_item_price {
          display: flex;
          flex:1;
          justify-content: space-between;
          align-items: center;
          .price {
            color: #c00;
            font-size: 17px;
          }
        }
      }
    }
  
  .good_item_image  {
         height: 100px;
         width: 100px;
          margin-right: 5px;
        }
</style>
