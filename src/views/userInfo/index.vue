<template>
  <div class="userInfo">
    <div class="top">
      <van-row class="top-1" justify="space-between" align="center">
        <van-col span="20" class="left">
          <h2>{{ getUserInfo.nickname }}</h2>
          <p>{{ getUserInfo.intro }}</p>
        </van-col>
        <van-col span="4" class="right" @click="navToInfo">
          <img v-if="getUserInfo.avatar" :src="baseURL+getUserInfo.avatar" alt="">
          <img v-else src="@/assets/logo.png" alt="">
        </van-col>
      </van-row>
      <van-row class="top-2" justify="space-between">
        <van-col span="6" class="top-2-item">
          <h3>{{ getUserInfo.submitNum }}</h3>
          <span>累计错题</span>
        </van-col>
        <van-col span="6" class="top-2-item">
          <h3>{{ getUserInfo.collectQuestions.length }}</h3>
          <span>收藏答题</span>
        </van-col>
        <van-col span="6" class="top-2-item">
          <h3>{{ getUserInfo.errorQuestions.length }}</h3>
          <span>我的错题</span>
        </van-col>
        <van-col span="6" class="top-2-item">
          <h3>{{ rightPercent }}</h3>
          <span>正确率</span>
        </van-col>
      </van-row>
      <div class="top-3">
        <Cell
          class="job-cell"
          title="我的岗位"
          :value="getUserInfo.position"
          icon="&#xe64d;"
          @click.native="goEditInfo('position')"
        ></Cell>
      </div>

    </div>
    <div class="middle">
      <div class="interview-data">
        <van-cell>
          <template #title>
            <h3>面经数据</h3>
          </template>
          <template #label>
            <van-row justif="space-between" gutter="20" class="interview-data-content">
              <van-col span="8" class="interview-data-item">
                <div class="item-top">昨日阅读<span>+{{ getUserInfo.shareData.read.yesterday }}</span></div>
                <div class="item-middle">{{
                    getUserInfo.shareData.read.total
                  }}
                </div>
                <div class="item-bottom">
                  阅读总数
                </div>
              </van-col>
              <van-col span="8" class="interview-data-item">
                <div class="item-top">昨日获赞<span>+{{ getUserInfo.shareData.star.yesterday }}</span></div>
                <div class="item-middle">{{ getUserInfo.shareData.star.total }}</div>
                <div class="item-bottom">
                  获赞总数
                </div>
              </van-col>
              <van-col span="8" class="interview-data-item">
                <div class="item-top">昨日新增<span>+{{ getUserInfo.shareData.comment.yesterday }}</span></div>
                <div class="item-middle">{{ getUserInfo.shareData.comment.total }}</div>
                <div class="item-bottom">
                  评论总数
                </div>
              </van-col>
            </van-row>
          </template>
        </van-cell>
      </div>
      <div class="options">
        <Cell icon="&#xe655;" title="我的面经分享" value="21"></Cell>
        <Cell icon="&#xe656;" title="我的消息" value="98"></Cell>
        <Cell icon="&#xe654;" title="收藏的题库" value="29"></Cell>
        <Cell icon="&#xe64f;" title="收藏的企业" value="32"></Cell>
        <Cell icon="&#xe64f;" title="我的错题" value="123"></Cell>
        <Cell icon="&#xe611;" title="收藏的面试经验" value="32"></Cell>
      </div>
    </div>
  </div>
</template>

<script>
import Cell from '@/components/Cell'
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',
  components: { Cell },
  computed: {
    ...mapGetters(['getIsLogin', 'getUserInfo']),
    // 正确率计算
    rightPercent () {
      if (this.getUserInfo.submitNum === 0) {
        return '0%'
      } else {
        return (
          parseInt(
            ((this.getUserInfo.submitNum - this.getUserInfo.errorNum) /
              this.getUserInfo.submitNum) *
            100
          ) + '%'
        )
      }
    }
  },
  data () {
    return {
      baseURL: process.env.VUE_APP_URL // 基地址
    }
  },
  created () {

  },
  methods: {
    // todo 4-7 点击头像跳转
    navToInfo () {
      this.$router.push({ name: 'Info' })
    },
    // todo 5-3-1 跳转 编辑用户昵称
    goEditInfo (typeName) {
      this.$router.push({
        name: 'EditInfo',
        query: { type: typeName }
      })
    }
  }

}
</script>
<style lang="less" scoped>
.userInfo {
  background-color: @color-bg;
  height: calc(100% - 60px);
  .top {
    color: @color-white;
    padding: 0 @padding-15;
    background: @color-red-primary;
    height: 215.5px;
    position: relative;
    padding-top: 0.1px;
    .top-1 {
      margin-top: 31px;
      .left {
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        h2 {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
        }
        p {
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
        }
      }
      .right {
        border: 3px solid rgba(255, 255, 255, 0.38);
        height: 50px;
        width: 50px;
        border-radius: 50%;
        img {
          border-radius: 50%;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
    }
    .top-2 {
      margin-top: 31px;
      //padding: 0 @padding-15;
      .top-2-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        h3 {
          font-size: 21px;
          font-weight: 700;
          margin-bottom: 6px;
        }
        span {
          opacity: 0.7;
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
        }
      }
    }
    .top-3 {
      padding: 0 @padding-15;
      position: absolute;
      left: 0;
      width: 100%;
      bottom: -16px;
      .job-cell {
        border: 1px solid transparent;
        border-radius: 8px;
        overflow: hidden;
      }
    }
  }
  .middle {
    padding: 0 @padding-15;
    .interview-data {
      margin-top: 27px;
      border: 1px solid transparent;
      overflow: hidden;
      border-radius: 8px;
      .interview-data-content {
        .interview-data-item {
          text-align: center;
          .item-top {
            margin-top: 17px;
            font-size: 10px;
            color: @color-gray;
            margin-bottom: 10px;
            span {
              color: @color-blue;
            }
          }
          .item-middle {
            font-size: 21px;
            font-family: DINAlternate, DINAlternate-Bold;
            font-weight: 700;
            color: @color-black-1;
            text-align: center;
            margin-bottom: 6px;
          }
          .item-bottom {
            font-size: 12px;
            font-family: PingFangSC, PingFangSC-Regular;
            font-weight: 400;
            color: @color-gray-1;
          }
        }
      }
    }
    .options {
      margin-top: 11px;
      border: 1px solid transparent;
      overflow: hidden;
      border-radius: 8px;

    }
  }
}
</style>
