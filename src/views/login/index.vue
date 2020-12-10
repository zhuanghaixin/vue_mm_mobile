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
              <span class="code" @click="getCode">获取验证码</span>
            </template>
          </van-field>
        </van-cell-group>
        <div class="other">
          <p>登录即同意 <span>《用户使用协议》</span>和 <span>《隐私协议》</span></p>
        </div>
        <div>
          <van-button round block type="danger">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
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
              console.log('value')
              console.log(value)
              console.log('rule')
              console.log(rule)
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
    onClickLeft () {

    },
    onClickRight () {

    },
    // 部分校验 获取验证码
    getCode () {
      this.$refs.form.validate('mobile').then(() => {
        console.log('手机验证成功')
      }).catch(() => {
        console.log('手机验证失败')
      })
    },
    // 提交
    onSubmit () {
      this.$refs.form.validate().then(() => {
        console.log('验证成功了')
      }).catch(() => {
        console.log('验证失败')
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
