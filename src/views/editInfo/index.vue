<template>
  <div class="editInfo">
    <NavBar :title="titleObj[type]" :rightText="rightText" @rightEvent="save"></NavBar>
    <div class="content">
      <van-field
        v-if="type!=='avatar'"
        class="input-field"
        v-model="inputValue"
        placeholder=""
      ></van-field>
      <div class="uploader-container" v-else>
        <van-uploader
          v-model="list"
          max-count="1"
          :before-read="onBeforeRead"
          :after-read="onAfterRead"
          preview-size="200px"
          @delete="deleteEvent"
        >
          <template #default>
            <div class="uploader-area">
              <van-icon name="photograph" class="avatar-icon"></van-icon>
            </div>
          </template>
        </van-uploader>
      </div>
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
        intro: '修改个人简介',
        position: '修改岗位',
        avatar: '修改头像'
      },
      rightText: '',
      list: []
    }
  },
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  created () {
    this.inputValue = this.getUserInfo[this.type]
    if (this.getUserInfo.avatar) {
      this.list[0] = { url: process.env.VUE_APP_URL + this.getUserInfo.avatar }
    }
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
      this.refreshUserInfo()
      this.$toast.success('修改资料成功')
      this.$router.go(-1)
    },
    // todo 5-4-1 上传图片前
    onBeforeRead (file) {
      // 判断图片格式
      const isImage = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif'
      if (!isImage) {
        this.$toast.fail('上传头像图片只能是 JPG/PNG/GIF 格式!')
      }
      // 判断图片大小
      const isLt10M = file.size / 1024 / 1024 < 10
      if (!isLt10M) {
        this.$toast.fail('上传图片大小不能超过10M')
      }
      return isImage && isLt10M
    },
    // todo 5-4-2 上传图片后
    onAfterRead (res) {
      const _formData = new FormData()
      _formData.append('files', res.file)
      res.status = 'uploading'
      res.message = '上传中...'
      console.log(11111)
      console.log(res)
      AuthApi.upload(_formData).then((response) => {
        res.status = 'done'
        res.message = '上传成功'
        console.log(22222)
        console.log(res)
        this.inputValue = response.data[0].id
      }).catch((err) => {
        res.status = 'failed'
        res.message = '上传失败'
        console.log(err)
      })
    },
    deleteEvent () {
      this.inputValue = ''
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

    .uploader-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: calc(100vh - 200px);

      .uploader-area {
        width: 200px;
        height: 200px;
        border: 1px solid @color-black;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      img {
        border-radius: 50%;
      }
    }
  }
}
</style>
