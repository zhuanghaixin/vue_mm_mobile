<template>
  <div class="userInfo">
    <div class="top">
      <div class="top-1">
        <div class="left">
          <h2>{{ getUserInfo.nickname }}</h2>
          <p>{{ getUserInfo.intro }}</p>
        </div>
        <div class="right">
          <img v-if="getUserInfo.avatar" :src="baseURL+getUserInfo.avatar" alt="">
          <img v-else src="@/assets/logo.png" alt="">
        </div>
      </div>
      <div class="top-2">
        <div class="top-2-item">
          <h3>{{ getUserInfo.submitNum }}</h3>
          <span>累计错题</span>
        </div>
        <div class="top-2-item">
          <h3>{{ getUserInfo.collectQuestions.length }}</h3>
          <span>收藏答题</span>
        </div>
        <div class="top-2-item">
          <h3>{{ getUserInfo.errorQuestions.length }}</h3>
          <span>我的错题</span>
        </div>
        <div class="top-2-item">
          <h3>298</h3>
          <span>正确率</span>
        </div>
      </div>
      <div class="top-3">
        <JobCell
          class="job-cell"
          title="我的岗位"
          :position="getUserInfo.position"
          icon="&#xe64d;"
        ></JobCell>
      </div>

    </div>
    <div class="middle">
      <div class="interview-data">
        <van-cell>
          <template #title>
            <h3>面经数据</h3>
          </template>
          <template #label>
            <ul class="interview-data-content">
              <li class="interview-data-item">
                <div class="item-top">昨日阅读<span>+{{ getUserInfo.shareData.read.yesterday }}</span></div>
                <div class="item-middle">{{
                    getUserInfo.shareData.read.total
                  }}
                </div>
                <div class="item-bottom">
                  阅读总数
                </div>
              </li>
              <li class="interview-data-item">
                <div class="item-top">昨日获赞<span>+{{ getUserInfo.shareData.star.yesterday }}</span></div>
                <div class="item-middle">{{ getUserInfo.shareData.star.total }}</div>
                <div class="item-bottom">
                  获赞总数
                </div>
              </li>
              <li class="interview-data-item">
                <div class="item-top">昨日新增<span>+{{ getUserInfo.shareData.comment.yesterday }}</span></div>
                <div class="item-middle">{{ getUserInfo.shareData.comment.total }}</div>
                <div class="item-bottom">
                  评论总数
                </div>
              </li>
            </ul>
          </template>

        </van-cell>
      </div>
      <div class="options">
        <JobCell icon="&#xe655;" title="我的面经分享" value="21"></JobCell>
        <JobCell icon="&#xe656;" title="我的消息" value="98"></JobCell>
        <JobCell icon="&#xe654;" title="收藏的题库" value="29"></JobCell>
        <JobCell icon="&#xe64f;" title="收藏的企业" value="32"></JobCell>
        <JobCell icon="&#xe64f;" title="我的错题" value="123"></JobCell>
        <JobCell icon="&#xe611;" title="收藏的面试经验" value="32"></JobCell>
      </div>
    </div>

  </div>

</template>

<script>
import JobCell from '@/views/userInfo/JobCell'
import { mapGetters } from 'vuex'

export default {
  name: 'UserInfo',
  components: { JobCell },
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

  }
}
</script>

<style lang="less" scoped>
.userInfo {
  background-color: @color-bg;
  height: 100%;

  .top {
    color: @color-white;
    background: @color-red-primary;
    height: 215.5px;
    position: relative;
    padding: 0 @padding-15;
    padding-top: 0.1px;

    .top-1 {
      margin-top: 31px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .left {
        h2 {
          font-size: 21px;
          font-family: PingFangSC, PingFangSC-Semibold;
          font-weight: 600;
          margin-bottom: 6px;
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
      display: flex;
      justify-content: space-between;
      margin-top: 31px;
      padding: 0 @padding-15;

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
        display: flex;
        justify-content: space-between;

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
