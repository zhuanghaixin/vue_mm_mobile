<template>
  <van-cell
    class="cell"
    :border="false"
    center>
    <template #title>
      <h3 class="title">{{ title }}</h3>
    </template>
    <template #icon>
      <i class="iconfont left-icon" v-html="icon"></i>
    </template>
    <template #default>
      <img v-if="avatar" :src="imageUrl" alt="">
      <h3 v-else-if="value" class="value">{{ value }}</h3>
      <img v-else src="@/assets/logo.png" alt="">
    </template>
    <template #right-icon>
      <i class="iconfont right-icon">&#xe653;</i>
    </template>
  </van-cell>
</template>
<script>
export default {
  name: 'Cell',
  data () {
    return {
      baseUrl: process.env.VUE_APP_URL
    }
  },
  props: {
    title: {
      type: String,
      required: true,
      default: '用户岗位'

    },
    value: {
      type: String
    },
    avatar: {
      type: String
    },
    icon: {
      type: String
    }
  },
  computed: {
    imageUrl () {
      return this.baseUrl + this.avatar
    }
  }
}
</script>
<style lang="less" scoped>

.cell {
  .title {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #181a39;
    margin-left: 12px;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 8px;
  }

  .value {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: #5b5d75;
    margin-right: 4px;
  }

  .iconfont.left-icon, .iconfont.right-icon {
    font-size: 10px;
  }

}
</style>
