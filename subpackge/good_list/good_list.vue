<template>
  <view>
    <view class="goods_list">
      <block v-for="(item,i) in goodsList" :key="i">
      <good-item :goods="item"></good-item>
      </block>
    </view>
   

  </view>
</template>

<script>
  export default {
    data() {
      return {
        obj: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10,
        },
        goodsList: [],
        total: 0,
        isLoading:false,
        
      }
    },
    onReachBottom() {
      if(this.obj.pagesize*this.obj.pagenum>this.total) return uni.$showMsg('无更多数据')
      if(this.isLoading===true) return
      this.obj.pagenum+=1
      this.getGoodList()
    },
    onLoad(option) {
      console.log(option);
      this.obj.query = option.query || '';
      this.obj.cid = option.cid || '';
      // console.log(this.obj.query+'ss');
      this.getGoodList();
    },
    onPullDownRefresh() {
      this.obj.pagenum=0;
      this.total=0;
      this.goodsList=[];
      this.isLoading=false;
      // 这里采用回调函数的形式在调用完相关函数时关闭下拉刷新。
      this.getGoodList(()=>uni.stopPullDownRefresh())
    },
    methods: {
      async getGoodList(cb) {
        this.isLoading=true
        const {
          data: res
        } = await uni.$http.get('/goods/search',this.obj)
        this.isLoading=false
        // 这里如果传入了参数，在请求完数据后立刻执行回调函数，阻止下拉刷新
        
        cb&&cb()
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        console.log(res);
        this.goodsList = [...this.goodsList,...res.message.goods]
        this.total=res.message.total
        
      }
    }
  }
</script>

<style lang="scss">
  
</style>
