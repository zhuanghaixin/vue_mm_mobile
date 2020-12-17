<template>
  <div class="technicItem">
    <div class="left">
      <h3 class="subtitle van-multi-ellipsis--l2">{{ info.title }}</h3>
      <div class="others">
        <div class="o1">{{ info.updated_at | dateFormat }}</div>
        <div class="o-group">
          <div class="o2 iconfont">&#xe644;</div>
          <div class="o3">{{ info.read }}</div>
        </div>
        <div class="o-group">
          <div class="o2 iconfont">&#xe638;</div>
          <div class="o3">{{ info.star }}</div>
        </div>
      </div>
    </div>
    <div class="right" v-if="info.cover">
      <img :src="$baseUrl + info.cover" alt="">
    </div>
  </div>

</template>

<script>
export default {
  name: 'TechnicItem',
  props: {
    info: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.technicItem {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  height: 75px;
  justify-content: space-between;

  .left {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;

    .subtitle {
      //width: 217.5px;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      margin-bottom: 8px;
      color: @color-black-2;
    }

    .others {
      display: flex;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      color: @color-gray;
      .o1 {
        flex: 1
      }
      .o-group{
        display: flex;
        align-items: center;
        margin-left: 21px;
        margin-right: 5px;
        .o3{
          margin-left: 7px;
        }
      }

    }

  }

  .right {
    width: 113px;
    height: 75px;
    margin-left: 15px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
