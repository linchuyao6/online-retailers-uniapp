<template>
  <view>
    <view class="login">
      <uni-icons type="contact" size="100"></uni-icons>
      <button type="primary" class="login-btn" @click="getUserProfile">点击登录</button>
      <text>登录享受更多权益</text>
    </view>
  </view>
</template>

<script>
  import {mapMutations,mapState} from 'vuex'
  export default {
    name: "my-login",
    data() {
      return {

      };
    },
    computed:{
      ...mapState('my_address',['redirectInfo'])
    },
    methods: {
      ...mapMutations('my_address',['updateUserInfo','updateToken','updateRedirectInfo']),
      getUserProfile() {
        uni.getUserProfile({
          desc: '你的授权信息',
          success: (res) => {
            // 将信息存到 vuex 中
            this.updateUserInfo(res.userInfo)
            // this.updateUserInfo(res.userInfo)
            this.getToken(res)
            if(this.redirectInfo&&this.redirectInfo.openType==='switchTab'){
              uni.switchTab({
                url:this.redirectInfo.from,
                success:()=>{
                  this.updateRedirectInfo(null)
                }
              })
            }
          },
          fail: (res) => {
            return uni.$showMsg('您取消了登录授权')
          }
        })
      },
     async getToken(res){
       const [err,result]=await uni.login({ }).catch(err=>err)
       // console.log(result);
       if(err||result.errMsg!=='login:ok') return uni.$showMsg('登录失败！')
        const query={
          encryptedData:res.encryptedData,
          rawData:res.rawData,
          iv:res.iv,
          signature:res.signature,
          code:result.code
        }
        // console.log(query);
        // const date=await uni.$http.post('/users/wxlogin',query)
       this.updateToken('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo')
      }
    },
  }
</script>

<style lang="scss">
  .login {
    background-color: #f8f8f8;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 750rpx;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      width: 100%;
      height: 40px;
      background-color: white;
      border-radius: 100%;
      position: absolute;
      bottom: 0%;
      left: 0%;
      transform: translateY(50%);
    }

    .login-btn {
      border-radius: 100rpx;
      width: 90%;
      background-color: #c00;
      margin-top: 15px;
    }

    text {
      margin-top: 15px;
      font-size: 12px;
      color: grey;
    }
  }
</style>
