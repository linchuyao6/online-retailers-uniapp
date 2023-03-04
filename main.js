
// #ifndef VUE3
import { $http } from '@escook/request-miniprogram'
import Vue from 'vue'
import App from './App'
import store from './store/store.js'

uni.$http=$http
Vue.config.productionTip = false
// 请求拦截器
$http.beforeRequest=function(option){
  uni.showLoading({
    title:"正在加载",
    icon:"none"
  });
  if(option.url.indexOf('/my/')!==-1){
    option.header={
      Authorization:store.state.my_address.token
    };

  }
}
// 响应拦截器
$http.afterRequest=function(){
  uni.hideLoading()
}
// 自定义请求失败后的弹窗
uni.$showMsg=function(title='数据加载失败',duration=1500){
  uni.showToast({
    title,
    duration,
    icon:'none'
  })
}
$http.baseUrl='https://api-ugo-web.itheima.net/api/public/v1'
App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif