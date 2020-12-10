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

      <van-form @submit="onSubmit">
        <van-cell-group>
          <van-field v-model="phone" placeholder="请输入手机号">
            <template #left-icon>
              <i class="iconfont">&#xe60b;</i>
            </template>

          </van-field>
          <van-field v-model="code" placeholder="请输入验证码">
            <template #left-icon>
              <i class="iconfont">&#xe60c;</i>
            </template>
            <template #button>
              <span class="code">获取验证码</span>
            </template>
          </van-field>
        </van-cell-group>
      </van-form>
      <div class="other">
        <p>登录即同意 <span>《用户使用协议》</span>和 <span>《隐私协议》</span></p>
      </div>
      <div>
        <van-button round block type="danger" native-type="submit">
          提交
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      phone: '',
      code: ''
    }
  },
  methods: {
    onClickLeft () {

    },
    onClickRight () {

    },
    // 获取验证码
    getCode () {

    },
    // 提交
    onSubmit () {

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
    box-shadow: 0px 4px 8px 0px rgba(24,26,57,0.04);
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
    .iconfont{
      font-size:16px;
    }
    .other{
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: #181a39;
      letter-spacing: 0px;
      margin-top: 22px;
      margin-bottom: 44px;
      span{
        color:#00B8D4;
      }
    }
  }
}
</style>
