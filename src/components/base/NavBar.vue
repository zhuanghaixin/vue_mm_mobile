<template>
  <div class="navbar">
    <van-nav-bar
      @click-left="onClickLeft"
    >
      <template #left>
        <i class="iconfont">&#xe637;</i>
      </template>
      <template #title>
        <h1 class="title">{{ title }}</h1>
      </template>
      <template #right></template>
    </van-nav-bar>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  props: {
    title: {
      type: String
    },
    pathName: {
      type: String
    }
  },
  created () {

  },
  methods: {
    onClickLeft () {
      // todo  封装NavBar组件
      if (this.pathName.includes('/')) {
        return this.$router.push(this.pathName)
      } else if (this.pathName) {
        return this.$router.push({ name: `${this.pathName}` })
      }
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
.navbar {
  .iconfont {
    font-size: 44px;
  }

  ::v-deep .van-nav-bar__left,
  ::v-deep .van-nav-bar__right {
    padding: 0;
  }

  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: @color-black-2;
    line-height: 50px;
    letter-spacing: 0px;
  }
}
</style>
