<template>
  <div class="comment-item">
    <van-row class="item-top">
      <van-col span="3">
        <img v-if="commentItem.author.avatar" :src="$baseUrl+commentItem.author.avatar" alt=""  class="c1">
        <img v-else src="@/assets/logo.png" class="c1" alt="">
      </van-col>
      <van-col span="5" class="c-group-1">
        <div class="c2">{{ commentItem.author.nickname }}</div>
        <div class="c3">{{ commentItem.created_at | dateFormat }}</div>
      </van-col>
      <van-col span="3"
               offset="13"
               class="c-group-2">
        <div class="c4">{{ commentItem.star }}</div>
        <i class="iconfont c5">&#xe638;</i>
      </van-col>
    </van-row>
    <van-row class="item-content">
      <van-col offset="3"><span>{{ commentItem.content }}</span></van-col>
    </van-row>
    <van-row>
      <van-col offset="3" span="21">
        <van-row class="item-recomment"  v-if="commentItem.children_comments.length>0">
          <van-col
            v-for="(item,index) in commentItem.children_comments"
            :key="index"
            class="recomment" span="24">
            <span class="rec-name">{{item.author}}:</span>
            <div class="rec-txt">{{item.content}}</div>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'CommentItem',
  props: ['commentItem']
}
</script>

<style lang="less" scoped>
.comment-item {
  .item-top {
    margin-bottom: 11px;

    .c1 {
      width: 35px;
      height: 35px;
      border: 1px solid @color-gray;
      border-radius: 50%;
      object-fit: cover;
    }

    .c2 {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: @color-black-1;
      line-height: 17px;
      letter-spacing: 0px;
    }

    .c3, .c4 {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      color: @color-gray;
      line-height: 17px;
      letter-spacing: 0px;
    }

    .c5 {
      color: @color-gray;
    }

    .c-group-1 {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 35px;
    }

    .c-group-2 {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  .item-content {
    span {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: @color-black-1;
      line-height: 27px;
      letter-spacing: 0px;
    }

    margin-bottom: 20px;
  }

  .item-recomment {
    background-color: #fff;
    background: @color-gray-3;
    border-radius: 4px;
    padding: 18px 7px 22px 15px;
    margin-bottom: 30px;

    .recomment {
      display: flex;
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      text-align: left;
      color: @color-gray-1;
      line-height: 20px;
      letter-spacing: 0px;

      .rec-name {

      }

      .rec-txt {
        font-weight: 400;
      }
    }

    .recomment:not(:last-child) {
      margin-bottom: 14px;
    }

  }

}
</style>
