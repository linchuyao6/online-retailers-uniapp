<template>
  <view>
    <my-search></my-search>
    <view class="scroll-box">
      <scroll-view scroll-y="true" class="left-scroll" :style="{'height': wh
+ 'px'}">
        <block v-for="(item,i) in cateList" :key="i">
          <view :class="['left-item',active===i?'active':'' ]" @click="changeActive(i)">{{item.cat_name}}</view>
        </block>

      </scroll-view>
      <scroll-view scroll-y="true" class="right-scroll" :style="{'height':wh+'px'}" :scroll-top="scrollTop">
        <view class="cate-lv2" v-for="(item2,i2) in cateLevel2" :key="i2">
          <view class="cate-lv2-item">
            /{{item2.cat_name}}/
          </view>
          <view class="cate-lv3-list">
            <view class="cate-lv3-item" v-for="(item3,i3) in item2.children " :key="i3">
              <image :src="item3.cat_icon.replace('dev','web')" class="lv3-img" @click="gotoGoodList(item3)"></image>
              <text class="lv3-text">{{item3.cat_name}}</text>
            </view>
          </view>
        </view>

      </scroll-view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        //设备可用高度
        wh: 0,
        cateList: [],
        active: 0,
        cateLevel2: [],
        scrollTop: 0
      };
    },
    onLoad() {
      const res = uni.getSystemInfoSync();
      this.wh = res.windowHeight-60;
      this.getCateList();
      
    },
    methods: {
      async getCateList() {
        const {
          data: res
        } = await uni.$http.get('/categories')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.cateList = res.message
        this.cateLevel2 = this.cateList[0].children

        console.log(res);
      },
      changeActive(i) {
        this.active = i
        this.cateLevel2 = this.cateList[i].children
        this.scrollTop = this.scrollTop === 0 ? 1 : 0
        console.log(this.scrollTop);
      },
      gotoGoodList(item3){
        uni.navigateTo({
          url:'/subpackge/good_list/good_list?cid='+item3.cat_id
        
        })
        console.log('ss');
      }
    }
  }
</script>

<style lang="scss">
  .scroll-box {
    display: flex;

    .left-scroll {
      width: 120px;

      .left-item {
        background-color: #efefef;
        line-height: 60px;
        font-size: 12px;
        text-align: center;
        position: relative;

        &.active {
          background-color: #fff;

          &::before {
            content: '';
            height: 30px;
            width: 3px;
            background-color: #c00;
            position: absolute;
            top: 50%;
            left: 0%;
            transform: translateY(-50%);
          }
        }
      }
    }
  }

  

  .cate-lv2-item {
    font-size: 12px;
    font-weight: bold;
    padding: 10px 0;
    text-align: center;
  }

  .cate-lv3-list {
    display: flex;
    flex-wrap: wrap;

    .cate-lv3-item {
      display: flex;
      flex-direction: column;
      width: 33%;
      justify-content: space-around;
      align-items: center;


      .lv3-img {
        height: 60px;
        width: 60px;

      }

      text {
        margin-top: 5px;
        font-size: 12px;
        text-align: center;
      }
    }
  }
</style>
