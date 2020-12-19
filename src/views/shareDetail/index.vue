<template>
  <div class="share-detail">
    <NavBar></NavBar>
    <div class="content">
      <h3 class="title">
        {{ info.title }}
      </h3>
      <van-row class="other">
        <van-col span="3">
          <img
            class="o1"
            v-if="info&&info.author.avatar"
            :src="$baseUrl+info.author.avatar"
            alt=""

          >
          <img v-else class="o1" src="@/assets/logo.png" alt=""/>
        </van-col>
        <van-col span="5" class="o-group">
          <div class="o2" v-if="info">{{ info.author.nickname }}</div>
          <div class="o3">{{ info.updated_at | dateFormat }}</div>
        </van-col>
      </van-row>
      <div class="txt" v-html="info.content">
      </div>
    </div>
    <div class="line"></div>
    <div class="comment">
      <h3 class="comment-title">评论 <span>{{commentTotal}}</span></h3>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="loadingEvent"
      >
       <CommentItem
         v-for="(item, index) in commentList"
         :key="index"
         :commentItem="item"
       ></CommentItem>
      </van-list>

    </div>
  </div>
</template>

<script>
import { articleShareDetail, articleComment } from '@/api/article'
import CommentItem from './CommentItem'
export default {
  name: 'shareDetail',
  components: {
    CommentItem
  },
  data () {
    return {
      id: this.$route.params.id,
      info: '',
      loading: false,
      finished: false,
      currentPage: 1,
      pageSize: 3,
      commentList: [],
      commentTotal: ''
    }
  },
  created () {
    this.getArticleDetail()
  },
  methods: {
    // todo 8-5 获取文章详情
    async getArticleDetail () {
      const res = await articleShareDetail(this.id)
      console.log(res)
      this.info = res.data
    },
    // todo 8-6 获取评论列表 上拉加载
    async loadingEvent () {
      const res = await articleComment(this.id, {
        limit: this.pageSize,
        start: (this.currentPage - 1) * this.pageSize + 1
      })
      // 得到评论列表
      this.commentList.push(...res.data.list)
      // 得到评论总数
      this.commentTotal = res.data.total
      //  当前页增加
      this.currentPage++
      console.log('res.....')
      console.log(res)
      this.loading = false
      // 判断什么时候加载完成
      if (this.commentList.length >= this.commentTotal) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.share-detail {
  .content {
    padding: 0 @padding-15;

    .title {
      margin-top: 19px;
      margin-bottom: 9px;
      height: 60px;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: @color-black-1;
      line-height: 25px;
    }

    .other {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #ccc;
      margin-bottom: 28px;

      .o-group {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 35px;
      }

      .o1 {
        width: 35px;
        height: 35px;
        border: 1px solid transparent;
        border-radius: 50%;
        object-fit: cover;
      }

      .o2 {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        color: @color-black-1;
        line-height: 17px;
        letter-spacing: 0px;
      }

      .o3 {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: @color-gray;
        line-height: 17px;
        letter-spacing: 0px;
      }

      .o5 {
        width: 25px;
        height: 25px;
      }
    }

    .txt {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: justify;
      color: #181a39;
      line-height: 27px;
      letter-spacing: 0px;
      // fixme 图片设置 属性穿透
      ::v-deep img {
        width: 100%;
      }
    }
  }

  .line {
    height: 10px;
    margin: 0 -15px;
    background-color: #f7f4f5;
  }

  .comment {
    padding: 25px @padding-15 0px;

    .comment-title {
      margin-bottom: 30px;
      display: inline-block;
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: #222222;
      line-height: 25px;
      letter-spacing: 0px;
      position: relative;

      span {
        position: absolute;
        top: -5px;
        right: -18px;
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        text-align: left;
        color: #b4b4bd;
        line-height: 17px;
        letter-spacing: 0px;
      }
    }

  }
}
</style>
