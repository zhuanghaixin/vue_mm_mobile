<template>
  <div class="find">
    <NavBar title="发现" icon=""></NavBar>
    <div class="content">
      <van-skeleton title :row="5" :loading="loading1" animate>
        <div class="technic-list">
          <FindCell title="面试技巧" pathName="TechnicList"></FindCell>
          <TechnicItem
            v-for="(item,index) in technicList"
            :info="item"
            :key="index"
          ></TechnicItem>
        </div>
      </van-skeleton>
      <div class="line"></div>
      <van-skeleton title :row="5" :loading="loading2" animate>
        <div class="chart">
          <FindCell title="市场数据" pathName="Chart">
          </FindCell>
          <div class="chart-tag">
            <van-tag color="#eceaea" text-color="#545671" size="large">{{ chart.city }}</van-tag>
            <van-tag color="#eceaea" text-color="#545671" size="large">{{ chart.position }}</van-tag>
          </div>
          <div class="chart-hot-items">

            <collapse-transition>
                <ChartHotItem
                  v-for="(item,index) in chartHotList"
                  :chartHotItem="item"
                  :key="index"
                  :topSalary="chart.topSalary"
                  v-show="index<showCountCurrent"
                ></ChartHotItem>
            </collapse-transition>

<!--            <transition-group name="sub-comments">-->
<!--              <ChartHotItem-->
<!--                v-for="(item,index) in chartHotList"-->
<!--                :chartHotItem="item"-->
<!--                :key="index"-->
<!--                :topSalary="chart.topSalary"-->
<!--                v-show="index<showCountCurrent"-->
<!--              ></ChartHotItem>-->
<!--            </transition-group>-->
          </div>
        </div>
        <div class="collapse">
          <div class="folder" @click="folderHandler">
            <span v-if="showCountCurrent===showCount">展示更多</span>
            <span v-else>收起</span>
            <i class="iconfont" ref="rotate">&#xe652;</i>
          </div>
        </div>
      </van-skeleton>
      <div class="line"></div>
      <van-skeleton title :row="5" :loading="loading3" animate>
        <div class="share-list">
          <FindCell title="面试分享" pathName="ShareList"></FindCell>
          <ShareItem
            v-for="(item, index) in shareList"
            :key="index"
            :shareItem="item"
          ></ShareItem>
        </div>
      </van-skeleton>
    </div>
  </div>

</template>

<script>
import FindCell from './FindCell'
import TechnicItem from './TechnicItem'
import ChartHotItem from './ChartHotItem'
import ShareItem from './ShareItem'
import * as ArticleAPI from '@/api/article'
import * as ChartAPI from '@/api/chart'
import CollapseTransition from '@/utils/folder-animation'
export default {
  name: 'Find',
  components: {
    FindCell,
    TechnicItem,
    ChartHotItem,
    ShareItem,
    CollapseTransition
  },
  data () {
    return {
      isActive: true,
      loading1: true, // 是否显示骨架屏
      loading2: true,
      loading3: true,
      technicList: [], // 面试技巧列表
      total: '', // 返回总数
      chart: [], // 市场数据
      chartHotList: [], // 薪资数据
      shareList: [], // 面试分享列表
      showCount: 3, // 显示多少条数据
      showCountCurrent: 3 // 当前显示数量
    }
  },
  created () {
    this.getTechnicList()
    this.getChartDataHotList()
    this.getShareList()
    // todo 6-1-2 在获取完数据并渲染到页面后设置dom高度为总数据到前三个高度
    // this.$nextTick(() => {
    //   this.$refs.chart.style.height = (this.refs.chart.scrollHeight / this.chartHotList.length) * 3 + 'px'
    // })
  },
  methods: {
    async getTechnicList () {
      this.$toast.loading({
        duration: 0,
        message: '加载中',
        forbidClick: true
      })
      const res = await ArticleAPI.articleTechnicList()
      this.technicList = res.data.list
      this.total = res.data.total
      this.loading1 = false
      this.$toast.clear()
    },
    async getChartDataHotList () {
      const res = await ChartAPI.chartDataHot()
      console.log('res....')
      console.log(res)
      this.loading2 = false
      this.chart = res.data
      this.chartHotList = res.data.yearSalary.reverse()
    },
    async getShareList () {
      const res = await ArticleAPI.articleShareList({ limit: 3 })
      console.log('res..cxcx..')
      console.log(res)
      this.shareList = res.data.list
      this.loading3 = false
    },
    folderHandler () {
      this.$refs.rotate.classList.toggle('rotate')
      if (this.showCountCurrent === this.showCount) {
        this.showCountCurrent = 100
      } else {
        this.showCountCurrent = this.showCount
      }
    }
  }
}
</script>

<style lang="less" scoped>
.find {
  .content {
    padding: 0 15px;

    .chart-tag {
      display: flex;

      .van-tag {
        margin-right: 15px;
      }
    }

    .chart-hot-items {
      // todo 6-1-1 展开折叠 css设置
      margin-top: 27px;
      overflow: hidden;
    }

    .collapse {
      display: flex;
      align-items: center;
      justify-content: center;

      .folder {
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: @color-gray-1;

        i.rotate {
          display: inline-block;
          transition: all 0.5s;
          transform: rotate(180deg);
        }
      }
    }

    .line {
      height: 10px;
      margin: 0 -15px;
      background-color: #f7f4f5;
    }

    .mybox-leave-active, .mybox-enter-active {
      transition: all 1s ease;
    }

    .mybox-leave-active, .mybox-enter {
      height: 0px !important;
    }

    .mybox-leave, .mybox-enter-active {
      height: 500px;
    }
  }

}

 .sub-comments-enter-active {
  transition: max-height 0.5s ease-in;
}
.sub-comments-leave-active{
  transition: max-height 0.5s ease-out;
}

.sub-comments-enter, .sub-comments-leave-to {
  max-height: 0;
}

.sub-comments-enter-to, .sub-comments-leave {
  max-height: 4rem;
}
</style>
