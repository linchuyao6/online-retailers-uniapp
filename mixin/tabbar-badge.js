import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters('my_cart',['total'])
  },
  onShow(){
    this.getTotal()
  },
  watch:{
    total(){
      this.getTotal()
    }
  },
  methods:{
    getTotal(){
      uni.setTabBarBadge({
        index:2,
        text:this.total+''
      })
    }
  }
}