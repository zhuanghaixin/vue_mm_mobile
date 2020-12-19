<template>
  <div class="shareItem">
    <h3 class="title van-ellipsis" v-html="shareItem.title">

    </h3>
    <div class="title2 van-multi-ellipsis--l2">
      {{ shareItem.content }}
    </div>
    <div class="other">
      <div class="o-group img">
        <img
          v-if="shareItem.author.avatar"
          class="o1"
          :src="$baseUrl + shareItem.author.avatar"
          alt=""
        />
        <img v-else class="o1" src="@/assets/logo.png" alt=""/>
        <div class="o2">{{ shareItem.author.nickname }}</div>
      </div>
      <div class="o3">{{ shareItem.updated_at | dateFormat }}</div>

      <div class="o-group">
        <i class="iconfont o4">&#xe65b;</i>
        <div class="o5">{{ shareItem.read }}</div>
      </div>
      <div class="o-group">
        <i class="iconfont o4">&#xe638;</i>
        <div class="o5">{{ shareItem.star }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ShareItem',
  props: ['shareItem']
}
</script>
<style lang="less" scoped>
.shareItem {
  margin-bottom: 15px;

  .title {
    font-size: 16px;
    font-family: PingFangSC, PingFangSC-Medium;
    font-weight: 600;
    text-align: left;
    color: #181a39;
    line-height: 22px;
    letter-spacing: 0px;
  }

  .title2 {
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: left;
    color: #545671;
    line-height: 18px;
    letter-spacing: 0px;
    margin: 11px 0 13px;
  }

  .other {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #ccc;
    .o-group{
      display: flex;
      align-items: center;
      margin-right: 5px;
      margin-left: 23px;
    }
    .o-group div:last-child{
      margin-left: 7px;
    }
    .o-group.img{
      flex:1;
      margin-left: 0px;
    }
    .o1 {
      width: 22px;
      height: 22px;
      border-radius: 50%;
    }

    .o2 {
      flex: 1;
      color: #000;
    }
  }
}
</style>
