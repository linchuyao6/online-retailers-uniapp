export default {
  // 这里的命名空间是namespaced而不是namespace
  namespaced: true,
  // { goods_id, goods_name, goods_price, goods_count,
  // goods_small_logo, goods_state }
  state: () => ({
    cart: JSON.parse(uni.getStorageSync('cart') || '[]')
  }),
  mutations: {
    // find函数返回找到的第一个结果值
    addCart(state, good) {
      const result = state.cart.find(x => x.goods_id === good.goods_id)
      if (!result) {
        state.cart.push(good)
      } else {
        result.goods_count++
      }
      this.commit('my_cart/saveStorage')
    },
    saveStorage(state) {
      uni.setStorageSync('cart', JSON.stringify(state.cart))
    },
    changeGoodState(state, good) {
      const result = state.cart.find(x => x.goods_id === good.goods_id)
      // 因为这里返回的是一个对象，对象直接更改属性，原来的结果也改变
      if (result) {
        result.goods_state = good.goods_state
      }
      // 在组件之间调用函数要使用connit函数
      this.commit('my_cart/saveStorage')
    },
    changeGoodCount(state, good) {
      const countResult = state.cart.find(x => x.goods_id === good.goods_id)
      if (countResult) {
        countResult.goods_count = good.goods_count
      }
      this.commit('my_cart/saveStorage')
    },
    // 删除按钮
    removeGood(state, good) {
      state.cart = state.cart.filter(x => x.goods_id != good.goods_id)
      this.commit('my_cart/saveStorage')
    },
    // 全选按钮
    allCheck(state, newState) {
      state.cart.forEach(x => x.goods_state = newState)
      this.commit('my_cart/saveStorage')
    }

  },
  getters: {
    // 购物车中总商品数量
    total(state) {
      // let c = 0
      // state.cart.forEach(x => c += x.goods_count)
      // return c
      return state.cart.reduce((total, item) => total += item.goods_count, 0)
    },
    // 购物车中选中商品的数量
    checkoutCount(state) {
      return state.cart.filter(x => x.goods_state).reduce((total, item) => {
        return total += item.goods_count
      }, 0)
    },
    // 计算选中商品的总价格
    checkoutPrice(state) {
      return state.cart.filter(x=>x.goods_state).reduce((total, item) => total += item.goods_price * item.goods_count, 0)
    }
  }
}
