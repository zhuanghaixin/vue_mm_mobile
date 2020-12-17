<template>
  <van-cell
    is-link
    center
    class="find-cell"
    :border="false"
  >
    <template #title>
      <h3 class="title">{{ title }}</h3>
    </template>
    <template #default>
      <h3 class="value" @click="goMore">查看更多</h3>
    </template>
    <template #right-icon>
      <i class="iconfont right-icon">&#xe653;</i>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'FindCell',
  props: {
    title: {
      type: String,
      required: true,
      default: '用户岗位'
    },
    pathName: {
      type: String
    }
  },
  methods: {
    goMore () {
      if (this.pathName?.includes('/')) {
        return this.$router.push(this.pathName)
      } else if (this.pathName) {
        return this.$router.push({ name: `${this.pathName}` })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.find-cell {
  height: 75px;
  padding:0px;
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 500;
    color: @color-black-1;
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
