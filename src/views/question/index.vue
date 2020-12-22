<template>
  <div class="question">
    <van-skeleton title :row="10" :loading="loading" animate>
      <van-dropdown-menu>
        <van-dropdown-item v-model="city" ref="item">
          <template #title>
            <div class="title"><h2 class="name">面试宝典</h2><span class="city">{{ city }}</span></div>
          </template>
          <van-index-bar :index-list="indexLists" highlight-color="red">
            <template #default>
              <div v-for="(value,key,index) in citys" :key="index">
                <van-index-anchor :index="key" class="index_achor">{{ key }}</van-index-anchor>
                <van-cell
                  @click="cellClick(item)"
                  v-for="(item,index2) in value"
                  :title="item" :key="index2"></van-cell>
              </div>
            </template>
          </van-index-bar>
        </van-dropdown-item>
      </van-dropdown-menu>
      <div class="tag-list">
        <van-tag
          v-for="(item,index) in cityPositions[city]"
          :key="index"
          class="tag"
          color="#f7f4f5"
          @click="currentIndex=index"
          :class="{active:currentIndex==index}"
          text-color="#8f8fa0"
        >
          {{ item.name }}
        </van-tag>
      </div>
      <div class="content">
        <div class="row">
          <div class="question-type">
            <div class="icon icon-1">
              <i class="iconfont">&#xe64f;</i>
            </div>
            <div class="question-txt">常错题库</div>
          </div>
          <div offset="14" span="5" class="question-type">
            <div class="icon icon-2">
              <i class="iconfont">&#xe654;</i>
            </div>
            <div class="question-txt">收藏题库</div>
          </div>
        </div>
        <div class="row">
          <div class="question-type">
            <div class="icon icon-3">
              <i class="iconfont">&#xe648;</i>
            </div>
            <div class="question-txt">已答题库</div>
          </div>
          <div class="question-type">
            <div class="icon icon-4">
              <i class="iconfont">
                &#xe655;
              </i>
            </div>
            <div class="question-txt">企业题库</div>
          </div>
        </div>
        <div class="question-type-main">
          <!-- van-cirlcle
              v-model:变化过程中的当前值
              rate:目标值
              speed:速度
              text:中间文本内容
              layer-color:轨道颜色
              color:进度条颜色
          -->
          <van-circle
            class="circle"
            v-model="currentRate"
            :rate="getRate(totalCount)"
            :speed="100"
            :stroke-width="60"
            layer-color="opacity"
            :color="gradientColor"

          >
            <div class="txt">
              <div>顺序刷题</div>
              <div>{{ getTotalQuestion }} / {{ totalCount }}</div>
            </div>
          </van-circle>
        </div>
      </div>
      <div class="total">
        <h3>累计收录</h3>
        <div class="total-count">{{ totalCountX }}</div>
      </div>
      <div class="btn">
        <van-button
          class="btn-interview"
          color="#00b8d4" @click="simulateInterview" block size="large">
          模拟面试
        </van-button>
      </div>
    </van-skeleton>
  </div>

</template>

<script>
import { interviewFilters } from '@/api/interview'
import { mapGetters } from 'vuex'

export default {
  name: 'Question',
  data () {
    return {
      loading: true,
      cityPositions: [],
      city: '全国',
      indexLists: [],
      citys: '',
      currentIndex: 0,
      totalCount: '',
      currentRate: 0, // 当前率
      gradientColor: {
        '0%': 'rgba(228,1,55,0.3)',
        '100%': 'rgba(228,1,66,0.7)'
      }
    }
  },
  computed: {
    ...mapGetters(['getTotalQuestion', 'getRate']),
    totalCountX () {
      return this.totalCount.toLocaleString()
    }
  },
  created () {
    this.getCityList()
  },
  // 设置背景色
  activated () {
    document.querySelector('body').classList.add('active')
  },
  mounted () {
    // 创建前:还不能访问data与methods
    document.querySelector('body').classList.add('active')
  },
  // beforeDestroy () {
  //   // 销毁前:什么都可以访问,准 备销毁,往往用于做一些善后
  // document.querySelector('body').classList.remove('active')
  //   document.body.style.backgroundColor = '#fff'
  // },
  deactivated () {
    document.querySelector('body').classList.remove('active')
  },
  methods: {
    // todo 10-1 获取城市列表
    async getCityList () {
      const res = await interviewFilters()
      console.log(res)
      this.cityPositions = res.data.cityPositions
      this.citys = res.data.citys
      this.indexLists = Object.keys(res.data.citys)
      this.totalCount = res.data.totalCount
      this.loading = false
    },
    // todo 10-2 选中城市进行切换 并关闭下拉菜单
    cellClick (item) {
      console.log(item)
      this.currentIndex = 0
      this.city = item
      this.$refs.item.toggle()
    },

    // todo 10-3 模拟面试
    simulateInterview () {
      this.$router.push({ name: 'Interview' })
    }

  }
}
</script>

<style lang="less" scoped>
.question {
  .title {
    display: flex;
    align-items: center;

    .name {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: @color-black-1;
      line-height: 25px;
      letter-spacing: 0px;
      margin-right: 5.5px;
    }

    .city {
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: @color-gray-1;
      line-height: 16.5px;
    }
  }

  .index_achor {
    background: #f7f4f5;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    line-height: 16.5px;

    ::v-deep .van-index-anchor {
      color: #939393;
    }
  }

  ::v-deep .van-dropdown-item__content {
    position: absolute;
    max-height: 100%;
  }

  ::v-deep .van-index-bar__sidebar {
    height: 100%;
    padding-top: 48px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: #181a39;
    line-height: 16.5px;
    letter-spacing: 0px;
  }

  .tag-list {
    padding: 25px @padding-15 0;
    display: flex;
    overflow: auto;
    background-color: #fff;
    box-shadow: 0px 4px 8px 0px rgba(24, 26, 57, 0.04);
    align-items: center;

    &::-webkit-scrollbar {
      width: 0 !important
    }

    .tag {
      flex: 0 0 auto;
      padding: 5.5px 13.5px;
      border-radius: 16px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      text-align: center;
      color: #545671;
      line-height: 16.5px;
      letter-spacing: 0px;
      margin-right: 15px;
    }

    .tag.active {
      background: #00b8d4 !important;
      color: #fff !important;
    }
  }

  .content {
    margin-top: 15px;
    background: #ffffff;
    position: relative;

    .row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .question-type {
        margin: 16.5px 40px;

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          margin-bottom: 6.5px;

          .iconfont {
            font-size: 24px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .icon-1 {
          background: linear-gradient(180deg, #ff8080, #ff4949);
        }

        .icon-2 {
          background: linear-gradient(180deg, #ffda05, #ffb302);
        }

        .icon-3 {
          background: linear-gradient(180deg, #00ddec, #00b8d4);
        }

        .icon-4 {
          background: linear-gradient(180deg, #3ee5b1, #1dc779);
        }

        .question-txt {
          font-size: 12px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: @color-gray-1;
          line-height: 16.5px;
          letter-spacing: 0px;
        }
      }
    }

    .question-type-main {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-image: url(~@/assets/circle@2x.png);
      width: 119px;
      height: 119px;
      background-size: 100%;
      .circle{
        padding: 10px;
        width: 100% !important;
        height: 100% !important;
        .txt {
          width: 100px;
          height: 100%;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: #ffffff;
          background: linear-gradient(180deg,#ff6f92, #e40137);
          letter-spacing: 0px;
          border-radius:50%;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
        }
      }

    }

  }

  .total {
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background: #ffffff;
    text-align: center;
    margin-top: 15px;
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    color: @color-gray-1;
    line-height: 25px;
    letter-spacing: 0px;

    .total-count {
      font-size: 30px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: @color-gray-1;
      line-height: 42px;
      letter-spacing: 1px;

    }

  }

  .btn {
    padding: 0 @padding-15;
    margin-top: 15px;

    &-interview {
      border-radius: 7px;
    }
  }
}

</style>
