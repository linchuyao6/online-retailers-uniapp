export default {
  namespaced: true,
  state: () => ({
    address: JSON.parse(uni.getStorageSync('address') || "{}"),
    token: uni.getStorageSync('token') || '',
    userInfo: JSON.parse(uni.getStorageSync('userInfo') || '{}'),
    redirectInfo: null
  }),
  mutations: {
    updateAddress(state, address) {
      state.address = address
      this.commit('my_address/saveAddress')
    },
    saveAddress(state) {
      uni.setStorageSync('address', JSON.stringify(state.address))
    },
    updateUserInfo(state, userInfo) {
      state.userInfo = userInfo
      this.commit('my_address/saveUserInfo')
    },
    saveUserInfo(state) {
      uni.setStorageSync('userInfo', JSON.stringify(state.userInfo))
    },
    updateToken(state, token) {
      state.token = token
      this.commit('my_address/saveToken')
    },
    saveToken(state) {
      uni.setStorageSync('token', JSON.stringify(state.token))
    },
    // 重定向路径，用于返回跳转前路径
    updateRedirectInfo(state, redirect) {
      state.redirectInfo = redirect
      console.log(state.redirectInfo);
    }


  },
  getters: {
    addStr(state) {
      if (state.address.provinceName) {
        return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
      }
    }
  }
}
