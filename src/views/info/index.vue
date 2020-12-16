<template>
  <div class="info">
    <NavBar
      :title="title"
    ></NavBar>
    <div class="content">
      <div class="avatar">
        <Cell title="头像"
              :avatar="getUserInfo.avatar"
              @click.native="goEditInfo('avatar')"
        ></Cell>
      </div>
      <div class="personal_info">

        <Cell
          @click.native="goEditInfo('nickname')"
          class="nickname"
          title="昵称"
          :value="getUserInfo.nickname"
        ></Cell>
        <Cell title="性别" :value="genderObj[getUserInfo.gender]" @click.native="showGender"></Cell>
        <Cell title="地区" :value="area.city_list[getUserInfo.area]" @click.native="showArea"></Cell>
        <Cell title="个人简介"
              @click.native="goEditInfo('intro')"
              :value="getUserInfo.intro"
        ></Cell>
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
    <!--   todo 5-1 修改性别 -->
    <van-popup
      v-model="genderStatus"
      position="bottom"
    >
      <van-picker
        v-if="bol"
        title="修改性别"
        show-toolbar
        :columns="Object.values(genderObj)"
        @confirm="onGenderConfirm"
        @cancel="genderStatus=false"
        @change="onChange"
        :default-index="getUserInfo.gender"
      ></van-picker>
    </van-popup>

    <van-popup v-model="areaStatus" position="bottom">
      <van-area
        v-if="bol"
        :area-list="area"
        :columns-num="2"
        :value="getUserInfo.area"
        @confirm="onAreaConfirm"
        @cancel="areaStatus=false"
        @change="onChange"
      ></van-area>
    </van-popup>

  </div>

</template>

<script>
import Cell from '@/components/Cell'
import * as Token from '@/utils/token'
import area from '@/assets/js/area.js'
import { mapGetters, mapActions } from 'vuex'
import * as AuthApi from '@/api/auth'
// import * as AuthApi from '@/api/auth'
export default {
  name: 'Info',
  components: {
    Cell
  },
  data () {
    return {
      bol: true, // 静默刷新
      title: '个人资料',
      // pathName: '/home/question' // 1.可以传路径，可以传name  //如果不传的话，就返回上一页
      genderObj: {
        0: '保密',
        1: '男',
        2: '女'
      },
      area: area,
      genderStatus: false, // 显示popup
      areaStatus: false
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
  // fixme 5-1 修复点击弹出取消后不会变成初始值的问题
  watch: {
    genderStatus (newValue) {
      console.log('newValue,,,')
      console.log(newValue)
      if (!newValue) {
        this.bol = false
        this.$nextTick(() => {
          this.bol = true
        })
      }
    },
    areaStatus (newValue) {
      console.log('newValue,,,')
      console.log(newValue)
      if (!newValue) {
        this.bol = false
        this.$nextTick(() => {
          this.bol = true
        })
      }
    }
  },
  methods: {
    ...mapActions(['refreshUserInfo']),
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
    },
    // todo 5-2-1 显示性别弹出层
    showGender () {
      this.genderStatus = true
    },

    // todo 5-2 修改性别

    // todo 5-2-4 更改
    onChange (picker, value, index) {

    },
    // todo 5-2-5 确定
    onGenderConfirm (value, index) {
      // 关闭弹窗
      this.genderStatus = false
      this.editInfo(
        {
          gender: index
        }
      )
    },
    // todo 5-3-1 显示地区
    showArea () {
      this.areaStatus = true
    },
    // todo 5-3-2 确定
    onAreaConfirm (value, index) {
      this.areaStatus = false
      //
      this.editInfo(
        {
          area: value[1].code
        }
      )
    },
    // 编辑用户信息
    async editInfo (infoObj) {
      // 请提示
      this.$toast.loading({
        duration: 0
      })
      // 编辑用户接口
      try {
        await AuthApi.authEdit(infoObj)
        this.$toast.success('修改资料成功')
        // 重新加载数据 fixme 使用 action代替
        this.refreshUserInfo()
      } catch (err) {
        console.log(err)
      }
      // // 用户信息
      // const res = await AuthApi.authInfo()
      // this.$store.commit('setUserInfo', res.data)
      // this.$store.commit('setIsLogin', true)
    },
    // todo 5-3-1 跳转 编辑用户昵称
    goEditInfo (typeName) {
      this.$router.push({
        name: 'EditInfo',
        query: { type: typeName }
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
