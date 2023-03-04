<template>
  <view>
    <view class="search-box">
      <uni-search-bar @input="input" :radius="100" cancelButton="none"></uni-search-bar>
    </view>
    <view class="sugg-list">
      <view class="sugg-item" v-for="(item,i) in searchResultList.goods" :key="i" @click="gotoDetail(item)">
        <view class="sugg">{{item.goods_name}}</view>
        <uni-icons type="right" size="17" ></uni-icons>
      </view>
    </view>
    
    <!-- 搜索历史区 -->
    <view class="history-box" v-if="searchResultList.length===0">
      <view class="history-item">
        <text>搜索历史</text>
        <uni-icons type="trash" size="17" @click="clean"></uni-icons>
      </view>
      <uni-tag :text="item" v-for="(item,i) in history" :key="i" @click="gotoGooddList(item)"></uni-tag>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        timer: null,
        wk: '',
        searchResultList: [],
        historyList:[]
      };
    },
    onLoad(){
      this.historyList=JSON.parse(uni.getStorageSync('wk')||'[]')
    },
    computed:{
      history(){
        return [...this.historyList].reverse()
      }
    },
    methods: {
      async getSearchResult() {
        if (this.wk.length === 0) {
          return this.searchResultList = []
        }
        const {
          data: res
        } = await uni.$http.get('/goods/search', {
          query: this.wk
        })
        if (res.meta.status !== 200)
          return uni.$showMsg()
          this.searchResultList=res.message
      },
      input(e) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.wk = e;
          this.getSearchResult()
          this.pushResult(this.wk)
        }, 500)

      },
      gotoDetail(item){
        console.log('item');
        uni.navigateTo({
          url:'/subpackge/good_detail/good_detail?goods_id='+item.goods_id
        })
      },
      pushResult(wk){
        const set=new Set(this.historyList)
        //这里先删除是保重新添加的数据位置保持合适
        set.delete(wk)
        set.add(wk)
        this.historyList=Array.from(set)
       uni.setStorageSync('wk',JSON.stringify(this.historyList||'[]'))
       
      },
      // 清除历史记录
      clean(){
        this.historyList=[]
        uni.setStorageSync('wk','[]')
      },
      gotoGooddList(item){
        uni.navigateTo({
          url:'/subpackge/good_list/good_list?query='+item
        })
      }

    }
    
  }
</script>

<style lang="scss">
  .search-box {
    position: sticky;
    top: 0%;
    z-index: 999;
    background-color: #c00
  }
  .sugg-list{
    padding: 0 5px;
    .sugg-item{
      display: flex;
      padding: 13px 0;
      border: 1px solid #efefef;
      align-items: center;
      justify-content: space-between;
      .sugg{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
      }
    }
  }
  .history-box{
    padding: 0 5px;
    .history-item{
      display: flex;
      justify-content: space-between;
      height: 40px;
      border-bottom: 1px solid #efefef;
      font-size: 17px;
      align-items: center;
      margin-bottom: 5px;
    }
    .uni-tag{
    
      margin-right: 5px;
    }
  }
</style>
