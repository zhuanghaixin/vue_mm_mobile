<template>
  <van-cell
    class="job-cell"
    :border="false"
    center>
    <template #title>
      <h3 class="title">{{ title }}</h3>
    </template>
    <template #icon>
      <i class="iconfont left-icon" v-html="icon"></i>
    </template>
    <template #default>
      <h3 class="value" v-if="position">{{ position }}</h3>
      <h3 class="value" v-else>{{ value }}</h3>
    </template>
    <template #right-icon>
      <i class="iconfont right-icon">&#xe653;</i>
    </template>
  </van-cell>
</template>
<script>
export default {
  name: 'JobCell',
  props: {
    title: {
      type: String,
      required: true,
      default: '用户岗位'

    },
    position: {
      type: String,
      default: '产品经理'
    },
    value: {
      type: String,
      default: '10'
    },
    icon: {
      type: String,
      default: '&#xe64d'
    }
  }
}
</script>
<style lang="less" scoped>

.job-cell {
  .title {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #181a39;
    margin-left: 12px;
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
    font-size: 20px;
  }

}
</style>
