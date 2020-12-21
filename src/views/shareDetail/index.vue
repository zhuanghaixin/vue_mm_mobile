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
      <h3 class="comment-title">评论 <span>{{ commentTotal }}</span></h3>
      <van-list
        v-model="loading"
        :finished="finished"
        @load="loadingEvent"
      >
        <CommentItem
          @commentEvent="commentEvent"
          v-for="(item, index) in commentList"
          :key="index"
          :commentItem="item"
        ></CommentItem>
      </van-list>
    </div>
    <div class="footer">
      <div class="send-comment">
        <div class="f1" @click="showComment">
          我来补充两句
        </div>
        <div class="f2"
             @click="collectEvent"
             :class="{active:setState('collectArticles',id)}"
        >
          <div class="iconfont" >&#xe649;</div>
          <div class="num">{{info.collect}}</div>
        </div>
        <div class="f2"
             @click="starEvent"
             :class="{active:setState('starArticles',id)}"
        >
          <div class="iconfont" >&#xe638;</div>
          <div class="num">{{info.star}}</div>
        </div>
        <div class="f2">
          <div class="iconfont">&#xe63e;</div>
          <div class="num">123</div>
        </div>
      </div>
    </div>
    <van-popup v-model="showCommentStatus" position="bottom">
      <div class="comment-txt">
        <van-field
          v-model="inputValue"
          placeholder="请评论。。。。"
          type="textarea"
          rows="4"
          maxlength="50"
        >
        </van-field>
        <div class="comment-send">
          <span class="comment-btn active" v-if="inputValue" @click="sendComment">发送</span>
          <span class="comment-btn" v-else>发送</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { articleShareDetail, articleComment, addArticleComment, articleCollect, articleStar } from '@/api/article'
import CommentItem from './CommentItem'
import { mapGetters } from 'vuex'
export default {
  name: 'shareDetail',
  components: {
    CommentItem
  },
  data () {
    return {
      inputValue: '',
      id: this.$route.params.id, // 文章i
      info: '',
      loading: false,
      finished: false,
      currentPage: 1,
      pageSize: 3,
      commentList: [],
      commentTotal: '',
      showCommentStatus: false,
      parent: '', // 评论的id
      parentObj: '' // 单独一个评论

    }
  },
  // 9-1-3 清空内容
  watch: {
    'showCommentStatus' (newValue) {
      if (!newValue) {
        this.inputValue = ''
      }
    }
  },
  computed: {
    ...mapGetters(['getUserInfo', 'setState'])
    // todo 9-9 封装setState
    // setState () {
    //   return (fn, id) => {
    //     return this.getUserInfo[fn] && this.getUserInfo[fn].includes(+id)
    //   }
    // }
  },
  created () {
    console.log('2211111')
    console.log(this.$store.state)
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
      this.loading = false
      // 判断什么时候加载完成
      if (this.commentList.length >= this.commentTotal) {
        this.finished = true
      }
    },

    // todo 9-1  评论功能实现
    // todo 9-1-1 显示评论
    showComment () {
      this.showCommentStatus = true
    },
    // todo 9-1-2 发送评论
    async sendComment () {
      const res = await addArticleComment({
        content: this.inputValue,
        article: this.id,
        parent: this.parent
      })
      console.log(res)
      if (this.parent) {
        this.parentObj.children_comments.push(res.data)
        console.log(this.parentObj.children_comments)
      } else {
        this.commentList.unshift(res.data)
      }
      // 关闭弹窗
      this.showCommentStatus = false
    },

    // todo 9-2 回复评论
    commentEvent (item, status) {
      this.parentObj = item
      this.parent = item.id
      this.showCommentStatus = status
    },
    // todo 9-7 点击收藏文章
    async collectEvent () {
      const res = await articleCollect({
        id: this.id
      })
      console.log('xxxxx')
      console.log(res)
      if (res.data.list.includes(+this.id)) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.fail('取消收藏')
      }
      // todo 9-7-2 更新收藏总数
      this.info.collect = res.data.num
      // todo 9-7-3 重新更新用户信息
      this.$store.dispatch('refreshUserInfo')
    },

    // todo9=8 点击点赞文章
    async starEvent () {
      const res = await articleStar({
        article: this.id
      })
      console.log('yyyy')
      console.log(res)
      if (res.data.list.includes(+this.id)) {
        this.$toast.success('点赞成功')
      } else {
        this.$toast.fail('取消点赞')
      }
      // todo 9-7-2 更新收藏总数
      this.info.star = res.data.num
      // todo 9-7-3 重新更新用户信息
      this.$store.dispatch('refreshUserInfo')
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

  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0 @padding-15;
    background-color: #fff;

    .send-comment {
      height: 60px;
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #ccc;

      .f1 {
        flex: 1;
        height: 34px;
        background-color: #f7f4f5;
        line-height: 34px;
        color: #bcbbc3;
        padding-left: 10px;
      }

      .f2 {
        text-align: center;
        margin-left: 23px;

        .iconfont {
          font-size: 28px;
        }
      }
      .f2.active{
        color:red;
      }
    }
  }

  .comment-txt {
    padding: 0 @padding-15;

    .van-field {
      margin-top: 25px;
      background-color: #f7f4f5;
    }

    .comment-send {
      text-align: right;
      padding-top: 10.5px;
    }

    .comment-btn {
      color: @color-gray;
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: left;
      line-height: 22.5px;
      letter-spacing: 0px;
      &.active{
        color:@color-red-1;
      }
    }

  }

}
</style>
