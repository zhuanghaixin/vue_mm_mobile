<template>
  <div class="info">
    <NavBar
      :title="title"
    ></NavBar>
    <div class="content">
      <div class="avatar">
        <Cell title="头像" :avatar="getUserInfo.avatar"></Cell>
      </div>
      <div class="personal_info">

        <Cell class="nickname" title="昵称" :value="getUserInfo.nickname"></Cell>
        <Cell title="性别" :value="genderObj[getUserInfo.gender]"></Cell>
        <Cell title="地区" :value="getUserInfo.area"></Cell>
        <Cell title="个人简介" :value="getUserInfo.intro"></Cell>
      </div>
      <van-button class="btn-logout"
                  block
                  type="default"
                  :loading="false"
                  size="large"
                  @click="logout">
        <template #default>
          <h2 class="btn-logout-text">退出登录</h2>
        </template>
      </van-button>
    </div>

  </div>

</template>

<script>
import Cell from '@/components/Cell'
import * as Token from '@/utils/token'
import area from '@/assets/js/area.js'
import { mapGetters } from 'vuex'

export default {
  name: 'Info',
  components: {
    Cell
  },
  data () {
    return {
      title: '个人资料',
      // pathName: '/home/question' // 1.可以传路径，可以传name  //如果不传的话，就返回上一页
      genderObj: {
        0: '保密',
        1: '男',
        2: '女'
      },
      area: area
    }
  },
  mounted () {
    // 创建前:还不能访问data与methods
    document.querySelector('body').classList.add('active')
  },
  beforeDestroy () {
    // 销毁前:什么都可以访问,准备销毁,往往用于做一些善后
    document.querySelector('body').classList.remove('active')
  },
  computed: {
    ...mapGetters(['getUserInfo', 'getIsLogin'])
  },
  methods: {
  // todo 4-8 退出登录
    logout () {
      this.$dialog
        .confirm({
          title: '提示',
          message: '您确定退出该网站吗?'
        })
        .then(() => {
        // 点击确定
        //  删除token
          Token.removeLocalToken('mm_token')
          //   修改登录状态
          this.$store.commit('setIsLogin', false)
          // 跳转至登录页
          this.$router.push('/login')
        })
        .catch(() => {
        // 点击取消
        })
    }
  }

}
</script>

<style lang="less" scoped>
.info {
  //background-color: #f00;
  .content {
    padding: 0 @padding-15;

    .avatar {
      border-radius: 8px;
      overflow: hidden;
      padding-top: 0.1px;
      margin-top: 18px;
    }

    .personal_info {
      overflow: hidden;
      margin-top: 10px;
      border-radius: 8px;
    }

    .btn-logout {
      margin-top: 15px;
      border-radius: 8px;

      &-text {
        color: @color-red-1;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        line-height: 45px;
        letter-spacing: 0px;
      }
    }
  }

}
</style>
