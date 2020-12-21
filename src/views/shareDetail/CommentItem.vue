<template>
  <div class="comment-item">
    <van-row class="item-top">
      <van-col span="3">
        <img
          @click="reComment()"
          v-if="commentItem.author.avatar" :src="$baseUrl+commentItem.author.avatar" alt="" class="c1">
        <img
          @click="reComment()"
          v-else src="@/assets/logo.png" class="c1" alt="">
      </van-col>
      <van-col span="5" class="c-group-1">
        <div class="c2">{{ commentItem.author.nickname }}</div>
        <div class="c3">{{ commentItem.created_at | dateFormat }}</div>
      </van-col>
      <van-col span="3"
               offset="13"
               class="c-group-2">
        <div class="c4"
             :class="{active:getUserInfo.starComments&&getUserInfo.starComments.includes(+commentItem.id)}"
        >{{ commentItem.star }}
        </div>
        <i class="iconfont c5" @click="clickStar"
           :class="{active:getUserInfo.starComments&&getUserInfo.starComments.includes(+commentItem.id)}">&#xe638;</i>
      </van-col>
    </van-row>
    <van-row class="item-content">
      <van-col offset="3"><span>{{ commentItem.content }}</span></van-col>
    </van-row>
    <van-row>
      <van-col offset="3" span="21">
        <van-row class="item-recomment" v-if="commentItem.children_comments.length>0">
          <van-col
            v-for="(item,index) in commentItem.children_comments"
            :key="index"
            class="recomment" span="24">
            <span class="rec-name">{{ item.author }}:</span>
            <div class="rec-txt">{{ item.content }}</div>
          </van-col>
        </van-row>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { artileCommentStar } from '@/api/comment'
import { mapGetters } from 'vuex'

export default {
  name: 'CommentItem',
  props: ['commentItem'],
  computed: {
    ...mapGetters(['getUserInfo'])
  },
  data () {
    return {
      showStatus: false
    }
  },
  methods: {
    // todo 9-2 回复评论
    reComment () {
      this.showStatus = true
      this.$emit('commentEvent', this.commentItem, this.showStatus)
    },
    // todo 9-8   点赞功能待完善
    async clickStar () {
      const res = await artileCommentStar({
        id: this.commentItem.id
      })
      if (res.data.list.includes(+this.commentItem.id)) {
        this.$toast.success('点赞成功')
      } else {
        this.$toast.success('取消点赞')
      }
      console.log('......')
      console.log(res)
      this.commentItem.star = res.data.num
      console.log('res....')
      console.log(res)
      this.$store.dispatch('refreshUserInfo')
    }
  }

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

    .c4.active {
      color: #e40137
    }

    .c5 {
      color: @color-gray;
    }

    .c5.active {
      color: #e40137
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
      word-wrap:break-word;
      word-break:break-all;
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
        word-wrap:break-word;
        word-break:break-all;
      }
    }

    .recomment:not(:last-child) {
      margin-bottom: 14px;
    }

  }

}
</style>
