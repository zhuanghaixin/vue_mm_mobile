<template>
  <div class="editInfo">
    <NavBar :title="titleObj[type]" :rightText="rightText" @rightEvent="save"></NavBar>
    <div class="content">
      <van-field
        class="input-field"
        v-model="inputValue"
        placeholder=""
      ></van-field>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import * as AuthApi from '@/api/auth'

export default {
  name: 'EditInfo',
  // todo 5-3-2 显示
  data () {
    return {
      inputValue: '',
      type: this.$route.query.type,
      titleObj: {
        nickname: '修改昵称',
        intro: '修改个人简介'
      },
      rightText: ''
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  created () {
    this.inputValue = this.getUserInfo[this.type]
  },
  // todo 5-3-4 监听保存，只有不为空和修改的值不同才可以显示保存按钮
  watch: {
    inputValue (newValue) {
      // if(newValue!==this.inputValue)
      console.log('oldValue')
      const oldValue = this.getUserInfo[this.type]
      console.log(oldValue)
      console.log('newValue')
      console.log(newValue)
      if (newValue !== oldValue && newValue !== '') {
        this.rightText = '保存'
      } else {
        this.rightText = ''
      }
    }
  },
  methods: {
    ...mapActions(['refreshUserInfo']),
    // todo 5-3-3 保存
    save () {
      this.editInfo({
        [this.type]: this.inputValue
      })
    },
    // 编辑用户信息
    async editInfo (infoObj) {
      this.$toast.loading({
        duration: 0
      })
      await AuthApi.authEdit(infoObj)
      this.$toast.success('修改资料成功')
      this.$router.go(-1)
      this.refreshUserInfo()
    }
  }
}
</script>

<style lang="less">
.editInfo {
  .content {

    padding: 0.1px @padding-15;
    margin-top: 20px;

    .input-field {
      background: @color-bg;
      border-radius: 4px;
      overflow: hidden;
    }
  }
}
</style>
