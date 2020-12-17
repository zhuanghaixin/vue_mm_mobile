<template>
  <van-row
    class="chart-hot-item" justify="space-between" align="center">
    <van-col span="4" class="year">
      <div class="year">
        {{ year }}
      </div>
    </van-col>
    <van-col span="16">
      <div class="progress-bar">
        <div class="progress" :style="{width:progressWidth+'px'}"><span>{{ salary }}</span></div>
      </div>
    </van-col>
    <van-col span="1" offset="1">
      <template v-if="Math.abs(chartHotItem.percent)">
      <i class="iconfont decrease" v-if="chartHotItem.percent<0">&#xe64e;</i>
      <i class="iconfont increase" v-else>&#xe651;</i>
      </template>
    </van-col>
    <van-col span="2" offset="1">
      <div class="percent" v-if="Math.abs(chartHotItem.percent)">{{ percent }}</div>
    </van-col>
  </van-row>
</template>

<script>
export default {
  name: 'ChartHotItem',
  props: {
    chartHotItem: {
      type: Object
    },
    topSalary: {
      type: Number
    }
  },
  computed: {
    year () {
      return parseInt(this.chartHotItem.year) + '年'
    },
    salary () {
      return `¥${this.chartHotItem.salary}`
    },
    progressWidth () {
      return ((this.chartHotItem.salary - 0) / this.topSalary * 218)
    },
    percent () {
      return Math.abs(this.chartHotItem.percent) + '%'
    }
  }
}
</script>

<style lang="less" scoped>
.chart-hot-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;

  .year {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    color: @color-gray-1;
  }

  .progress-bar {
    height: 12px;
    background: @color-gray-progress;
    border-radius: 4px;
    .progress {
      width: 100%;
      background: @color-red-progress;
      border-radius: 4px;
      font-size: 11px;
      text-align: right;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: @color-white;

      span {
        margin-right: 10px;
      }
    }
  }

  .decrease {
    color: @color-green-icon;
    display: block;
  }

  .increase {
    color: @color-red-icon;
    display: block;
  }

  .percent {
    font-size: 14px;
    font-family: PingFangSC, PingFangSC-Regular;
    font-weight: 400;
    text-align: right;
    color: @color-gray-2;
  }
}
</style>
