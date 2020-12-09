<template>
  <div id="app">
    <div class="box"></div>
    <router-view></router-view>
    <van-button type="primary">主要按钮</van-button>

  </div>
</template>
<script>
export default {

}
</script>
<style lang="less">
// todo 1-3  当前设计稿是750px  所以 1rem就是屏幕宽度的十分之一 75px  fontSize就是75px
//  .rem(@height,@value){
//    @{height}:@value/75
//  }
  .box{
    //.rem(width,375);
    //.rem(height,88);

  }
</style>
