<template>
  <div class="home">
    <!-- todo 7-1 keep-alive缓存组件 -->
    <keep-alive include="Find">
    <router-view></router-view>
    </keep-alive>
    <!--    <router-link to="Company">公司</router-link>-->
    <!--    <router-link to="Question">刷题</router-link>-->
    <!--    <router-link to="Find">发现</router-link>-->
    <!--    <router-link to="My">我的</router-link>-->
    <van-tabbar
      v-if="$route.meta.isNeedTab"
      route :active-color="activeColor" :inactive-color="inActiveColor" :placeholder="true">
      <van-tabbar-item :to="{name:'Company'}">
        <template #default>
          <span>公司</span>
        </template>
        <template #icon>
          <i class="iconfont">&#xe63b;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="{name:'Question'}">
        <template #default>
          <span>刷题</span>
        </template>
        <template #icon>
          <i class="iconfont">&#xe63f;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="{name:'Find'}">
        <template #default>
          <span>发现</span>
        </template>
        <template #icon>
          <i class="iconfont">&#xe646;</i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item :to="{name:'UserInfo'}">
        <template #default>
          <span>我的</span>
        </template>
        <template #icon>
          <i class="iconfont">&#xe645;</i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>

</template>

<script>

export default {
  name: 'index',
  data () {
    return {
      activeColor: '#E40137',
      inActiveColor: '#B4B4BD'
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;

  ::v-deep .van-hairline--top-bottom {
    height: 60px;
  }

  .iconfont {
    font-size: 28px;
  }
}
</style>
