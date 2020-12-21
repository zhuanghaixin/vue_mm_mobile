<template>
  <div class="company">
    <van-sticky
      :z-index="9999"
      class="sticky"
    >
      <van-nav-bar
        class="topbar"
      >
        <template #left>
          <h2 class="title">公司</h2>
        </template>
        <template #right>
          <van-search
            v-model="value"
            shape="round"
            placeholder="请输入搜索关键词"
          >
            <template #left-icon>
              <i class="iconfont icon_search">&#xe647;</i>
            </template>
          </van-search>
        </template>
      </van-nav-bar>
      <div class="filter-box" v-if="show">
        <van-cell :border="false">
          <template #title>
            <h2 class="title">距离</h2>
          </template>
        </van-cell>
        <van-row>
          <van-col span="12">
            <button
              @click="toggleDistance1"
              class="btn"
              :class="{active:distance_status&&xx_status}">
              由远及近
            </button>
          </van-col>
          <van-col span="12">
            <button
              @click="toggleDistance2"
              class="btn"
              :class="{active:!distance_status&&xx_status}">
              由近及远
            </button>
          </van-col>
        </van-row>
        <van-cell :border="false">
          <template #title>
            <h2 class="title">评分</h2>
          </template>
        </van-cell>
        <van-row>
          <van-col span="12">
            <button class="btn"
                    @click="toggleRate1"
                    :class="{active:rate_status&&yy_status&&currRateIndex===1}"
            >
              4分-5分
            </button>
          </van-col>
          <van-col span="12">
            <button class="btn"
                    @click="toggleRate2"
                    :class="{active:rate_status&&yy_status&&currRateIndex===2}"
            >
              3分-3.9分
            </button>
          </van-col>
          <van-col span="12">
            <button class="btn"
                    @click="toggleRate3"
                    :class="{active:!rate_status&&yy_status&&currRateIndex===3}"
            >
              2分-2.9分
            </button>
          </van-col>
          <van-col span="12">
            <button class="btn"
                    @click="toggleRate4"
                    :class="{active:!rate_status&&yy_status&&currRateIndex===4}"
            >
              1分-1.9分
            </button>
          </van-col>
          <van-col span="12">
            <button class="btn"
                    @click="toggleRate5"
                    :class="{active:!rate_status&&yy_status&&currRateIndex===5}"
            >
              1分以下
            </button>
          </van-col>
        </van-row>
        <van-row class="btn-operation">
          <van-col span="8">
            <van-button
              block
              color="#ffe2e9"
              size="large"
              class="btn-cancel"
            >
              清除
            </van-button>
          </van-col>
          <van-col span="15" offset="1">
            <van-button
              block
              color="#E40137"
              size="large"
              class="btn-confirm"
            >
              确定
            </van-button>
          </van-col>
        </van-row>
      </div>
      <van-swipe :autoplay="3000" class="swipper" v-if="!show">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image"/>
        </van-swipe-item>
      </van-swipe>
      <van-cell center>
        <template #title>
          <div class="operation recommend" @click="toRecommend" :class="classRecObj">推荐</div>
          <div class="operation-group" @click="toDistance" :class="classDisObj">
            <span class="operation">距离</span>
            <span class="icon-group">
            <i class="iconfont icon_xuanze_nor">&#xe64c;
            </i>
            <i class="iconfont icon_xuanze_sel">&#xe64a;
            </i>
          </span>
          </div>
          <div class="operation-group" @click="toRate" :class="classRateObj">
            <span class="operation">评分</span>
            <span class="icon-group">
            <i class="iconfont icon_xuanze_nor">&#xe64c;
            </i>
            <i class="iconfont icon_xuanze_sel i2">&#xe64a;
            </i>
          </span>
          </div>
        </template>
        <template>
          <span class="operation" @click="toFilters" :class="classFilterObj">筛选</span>
        </template>
      </van-cell>
    </van-sticky>
    <div class="content" id="content">
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
      <h1>123</h1>
    </div>
    <!--    <van-popup v-model="show" position="top" :style="{ height: '60%' }" />-->
    <van-overlay
      z-index="3000"
      :show="show" @click="closeFilterBox">
    </van-overlay>
  </div>

</template>

<script>
import Vue from 'vue'
import { Lazyload } from 'vant'

Vue.use(Lazyload)
export default {
  name: 'Company',
  data () {
    return {
      value: '', // 公司搜索关键词
      images: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ],
      rec_status: false, // 推荐自己一组  距离和评分一组 互斥
      xx_status: false, // 点击距离 使其可以切换升序或降序
      yy_status: false, // 点击评分 使其可以切换升序或降序
      distance_status: false, // 距离升序活降序的状态
      rate_status: false, // 评分升序或降序的状态
      show: false,
      filter_status: false, // 筛选的状态
      currDistanceIndex: -1, // 当前distance索引
      currRateIndex: -1 // 当前rate索引

    }
  },
  computed: {
    classRecObj () {
      return {
        active: this.rec_status
      }
    },
    classDisObj () {
      return {
        ascending_active: this.distance_status && this.xx_status,
        descending_active: !this.distance_status && this.xx_status
      }
    },
    classRateObj () {
      return {
        ascending_active: this.rate_status && this.yy_status,
        descending_active: !this.rate_status && this.yy_status
      }
    },
    classFilterObj () {
      return {
        active: this.filter_status
      }
    }
  },
  methods: {
    // 推荐
    toRecommend () {
      console.log('推荐')
      this.rec_status = true
      this.xx_status = false
      this.yy_status = false
    },
    // 距离
    toDistance () {
      console.log('距离')
      this.rec_status = false
      this.distance_status = !this.distance_status
      this.xx_status = true
    },
    // 评分
    toRate () {
      console.log('评分')
      this.rec_status = false
      this.rate_status = !this.rate_status
      this.yy_status = true
      this.currRateIndex = -1
    },
    // 筛选
    toFilters () {
      console.log('筛选')
      this.show = true
      this.filter_status = true
    },
    // 关闭筛选框
    closeFilterBox () {
      // 显示状态
      this.show = false
      // 筛选的状态
      this.filter_status = false
    },
    // 筛选框 距离 按钮
    toggleDistance1 () {
      this.currDistanceIndex = 1
      this.xx_status = true
      this.distance_status = true
    },
    toggleDistance2 () {
      this.currDistanceIndex = 2
      this.xx_status = true
      this.distance_status = false
    },
    toggleRate1 () {
      this.currRateIndex = 1
      this.yy_status = true
      this.rate_status = true
    },
    toggleRate2 () {
      this.currRateIndex = 2
      this.yy_status = true
      this.rate_status = true
    },
    toggleRate3 () {
      this.currRateIndex = 3
      this.yy_status = true
      this.rate_status = false
    },
    toggleRate4 () {
      this.currRateIndex = 4
      this.yy_status = true
      this.rate_status = false
    },
    toggleRate5 () {
      this.currRateIndex = 5
      this.yy_status = true
      this.rate_status = false
    }
  }
}
</script>

<style lang="less" scoped>
.company {
  .title {
    font-size: 18px;
    font-family: PingFangSC, PingFangSC-Semibold;
    font-weight: 600;
    text-align: left;
    color: #222222;
    line-height: 25px;
    letter-spacing: 0px;
  }

  .sticky {
    position: fixed;
    z-index: 9999;
    width: 100%;
    top: 0;
    left: 0;
    background-color: #fff;

    ::v-deep .van-nav-bar__right {
      padding: 0;
    }

    .van-search {
      width: 310px;
      height: 34px;
    }

    .swipper {
      //margin-top: 21px;
      img {
        width: 100%;
        height: 127px;
        object-fit: contain;
      }
    }

    .van-cell__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .van-cell__value {
      flex: 0 1 144.5px;
    }

    .operation-group {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
    }

    .operation {
      font-size: 14px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: @color-black-2;
      letter-spacing: 0px;
    }

    .operation.active {
      color: #d12d3d;
    }

    .operation.recommend.active {
      color: #d12d3d;
    }

    span.operation {
      margin-right: 3px;
    }

    .icon-group {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .icon_xuanze_sel {
        color: #b4bcbc;
        transform: translateY(-7px);
      }

      .icon_xuanze_nor {
        color: #b4bcbc;
        transform: rotate(180deg) translateY(-7px);
      }

      .icon_xuanze_sel.i2 {
        transform: translate(1px, -7px);
      }
    }

    .operation-group.ascending_active {
      // 升序 ascending_active
      .icon_xuanze_nor {
        color: #d12d3d;
      }
    }

    // 降序 descending_active
    .operation-group.descending_active {
      .icon_xuanze_sel {
        color: #d12d3d;
      }
    }
  }

  .content {
    margin-top: 246px;
  }

  .filter-box {
    position: fixed;
    z-index: 9999;
    width: 100%;
    top: 114px;
    left: 0;
    background-color: #fff;
    padding: 0 @padding-15;

    h2 {
      margin-bottom: 18px;
    }

    .btn {
      border: none;
      width: 166px;
      height: 32px;
      background: @color-gray-btn;
      border-radius: 4px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: @color-black-1;
      line-height: 16.5px;
      letter-spacing: 0px;
      margin-bottom: 8.5px;
    }

    .btn.active {
      background: #ffe2e9;
      border: 1px solid @color-red-1;
      color: @color-red-1;
      border-radius: 8px;
    }

    .btn-operation {
      margin-bottom: 17px;
    }

    .btn-cancel {
      color: @color-red-1;
      border-radius: 7px;
    }

    .btn-confirm {
      color: #fff;
      border-radius: 7px;
    }
  }

}
</style>
