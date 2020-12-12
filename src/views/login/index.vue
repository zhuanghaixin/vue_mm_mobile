<template>
  <div class="login">
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <i class="iconfont">&#xe637;</i>
      </template>
    </van-nav-bar>
    <div class="content">
      <h3 class="title">你好，请登录</h3>
      <van-form @submit="onSubmit" ref="form">
        <van-cell-group>
          <van-field
            v-model="form.mobile"
            :rules="rules.mobile"
            placeholder="请输入手机号"
            name="mobile"
          >
            <template #left-icon>
              <i class="iconfont">&#xe60b;</i>
            </template>
          </van-field>
          <van-field
            v-model="form.code"
            :rules="rules.code"
            placeholder="请输入验证码">
            <template #left-icon>
              <i class="iconfont">&#xe60c;</i>
            </template>
            <template #button>
              <span class="code" v-if="currentTime==totalTime" @click="getCode">获取验证码</span>
              <span class="code" v-else>倒计时:{{ currentTime }}</span>
            </template>
          </van-field>
        </van-cell-group>
        <div class="other">
          <p>登录即同意 <span>《用户使用协议》</span>和 <span>《隐私协议》</span></p>
        </div>
        <div>
          <van-button round block type="danger">
            确定
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import * as LoginAPI from '@/api/login'
// todo 3-4
import * as Token from '@/utils/token'
// todo 3-5
import { mapMutations } from 'vuex'

export default {
  name: 'index',
  data () {
    return {
      totalTime: 5, // 倒计时,时间
      currentTime: 5, // 当前时间
      form: {
        mobile: '',
        code: ''
      },
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空',
            trigger: 'onChange'
          },
          // 自定义校验
          {
            validator: (value, rule) => {
              const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
              return reg.test(value)
            },
            message: '请输入正确的手机号',
            trigger: 'onChange'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setUserInfo', 'setIsLogin']),
    onClickLeft () {

    },
    onClickRight () {

    },
    // todo 2-1 表单验证
    // 部分校验 获取验证码
    getCode () {
      this.$refs.form.validate('mobile').then(() => {
        console.log('手机验证成功')
        // todo 3-1 验证码提示
        // todo 3-2 倒计时
        this.currentTime = this.totalTime
        this.currentTime--

        const timerId = setInterval(() => {
          this.currentTime--
          if (this.currentTime <= 0) {
            clearInterval(timerId)
            this.currentTime = this.totalTime
          }
        }, 1000)

        this.$toast.loading({
          message: '获取验证码中。。。',
          duration: 0
        })
        LoginAPI.authCode({
          mobile: this.form.mobile
        }).then(res => {
          console.log('验证码')
          console.log(res)

          this.$toast.success({
            message: res.data
          })
          this.form.code = res.data
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
        console.log('手机验证失败')
      })
    },
    // 提交
    onSubmit () {
      this.$refs.form.validate().then(() => {
        console.log('验证成功了')
        // todo 3-3 登录
        LoginAPI.login(
          {
            mobile: this.form.mobile,
            code: this.form.code
          }
        ).then(res => {
          console.log('登录')
          console.log(res)
          // todo 3-8 因为我们在响应拦截中设置错误处理，所以这里不用判断200
          // todo 3-4 将token保存到本地
          Token.setLocalToken('mm_token', res.data.jwt)

          // todo 3-5 将用户信息保存到vuex
          // 异步actions不能获取在devtools查看到操作
          this.setUserInfo(res.data.user)
          // this.$store.commit('setUserInfo', res.data.user)
          // this.$store.dispatch('asyncSetUserInfo', res.data.user)

          // todo 3-6 设置用户登录状态
          this.setIsLogin(res.data.isLogin)
          // this.$store.commit('setIsLogin', true)
          // this.$store.dispatch('asyncSetIsLogin', true)

          // todo 3-7 路由跳转
          this.$router.push({ name: 'Home' })
        }).catch(() => {
          console.log('验证失败')
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .iconfont {
    font-size: 44px;
  }

  ::v-deep .van-nav-bar__left,
  ::v-deep .van-nav-bar__right {
    padding: 0;
  }

  .content {
    background: #ffffff;
    box-shadow: 0px 4px 8px 0px rgba(24, 26, 57, 0.04);
    padding: 0 @padding-15;

    .title {
      margin-top: 50px;
      margin-bottom: 63px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: #222222;
    }

    .code {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: #00b8d4;
    }

    .iconfont {
      font-size: 16px;
      margin-right: 20px;
    }

    .other {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;
      letter-spacing: 0px;
      margin-top: 22px;
      margin-bottom: 44px;

      span {
        color: #00B8D4;
      }
    }
  }
}
</style>
