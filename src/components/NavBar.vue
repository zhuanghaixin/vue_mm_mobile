<template>
  <div class="navbar">
    <van-nav-bar
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #left>
        <i class="iconfont" v-html="icon"></i>
      </template>
      <template #title>
        <h1 class="title">{{ title }}</h1>
      </template>
      <template #right v-if="rightText">
        <span class="rightText">{{ rightText }}</span>
      </template>
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
    },
    rightText: {
      type: String
    },
    icon: {
      type: String,
      default: '&#xe637'
    }
  },
  created () {

  },
  methods: {
    onClickLeft () {
      // todo 4-8   封装NavBar组件
      if (this.pathName === 'Question') {
        this.$dialog.confirm({
          title: '警告',
          message: '你确定离开当前界面吗？'
        })
          .then(() => {
            return this.$router.push({ name: `${this.pathName}` })
            // on confirm
          })
          .catch(() => {
            // on cancel
          })
      } else {
        this.$router.go(-1)
      }
      if (this.pathName?.includes('/')) {
        return this.$router.push(this.pathName)
      } else if (this.pathName && this.pathName !== 'Question') {
        return this.$router.push({ name: `${this.pathName}` })
      }
    },
    onClickRight () {
      this.$emit('rightEvent')
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

  .rightText {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: @color-black-1;
    line-height: 40px;
    letter-spacing: 0px;
  }
}
</style>
