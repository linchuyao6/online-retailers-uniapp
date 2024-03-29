import Vue from 'vue'
import Vuex from 'vuex'
// 1. 导入购物车的 vuex 模块
import moduleCart from './cart.js'
import moduleAddress from './user-address.js'
Vue.use(Vuex)
const store = new Vuex.Store({
// TODO：挂载 store 模块
modules: {
// 2. 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
// 购物车模块中 cart 数组的访问路径是 m_cart/cart
my_cart: moduleCart,
my_address:moduleAddress
},
})
export default store

