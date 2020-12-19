<template>
  <div class="share-list">
    <NavBar title="面试技巧分享"></NavBar>
    <van-search v-model="value"
                class="search"
                placeholder="请输入关键字"
                show-action
                @search="search"
                @cancel="cancelEvent"
    ></van-search>
    <div class="content" v-if="showList">
      <van-list
        v-if="bol"
        v-model="loading"
        :finished="finished"
        @load="loadEvent"
        finished-text="没有数据了～"
      >
        <ShareItem
          v-for="(item, index) in shareList"
          :key="index"
          :shareItem="item"
        ></ShareItem>
      </van-list>
    </div>
    <div v-else class="search">
     <div class="search-us">
       <h3 class="title">大家都在搜</h3>
       <van-row gutter="30">
         <van-col v-for="(item,index) in hotList" :key="index">
           <van-tag
             @click="searchUs(item)"
             color="#F7F4F5" text-color="#545671
">{{ item }}
           </van-tag>
         </van-col>
       </van-row>
     </div>
      <div class="search-history">
        <van-cell
          class="cell"
          @click="clear" center>
          <template #title>
            <h3 class="title">历史搜索</h3>
          </template>
          <template #default>
            <span
              @click="clear"
              class="clear">清空</span>
          </template>
        </van-cell>
        <van-row gutter="30">
          <van-col v-for="(item,index) in historyList" :key="index">
            <van-tag
              @click="searchUs(item)"
              color="#F7F4F5" text-color="#545671
">{{ item }}
            </van-tag>
          </van-col>
        </van-row>
      </div>
    </div>

  </div>

</template>

<script>
import { articleShareList, articleShareTopSearch } from '@/api/article'
import ShareItem from '@/views/find/ShareItem'
import { getLocalToken, setLocalToken } from '@/utils/token'
export default {
  name: 'ShareList',
  components: {
    ShareItem
  },
  data () {
    return {
      shareList: [],
      value: '', // 搜索关键字
      loading: false, // 一开始自动加载
      finished: false, // 全部加载完成
      currentPage: 1, // 类比当前页码
      pageSize: 2, // 业容量
      bol: true, // 静默刷新
      showList: true, // 显示列表
      show: true,
      hotList: [], // 热搜列表
      historyList: JSON.parse(getLocalToken('history-key-words')) || [] // 搜索记录
    }
  },
  created () {

  },
  methods: {
    async getShareList () {
      const res = await articleShareList({
        start: (this.currentPage - 1) * this.pageSize,
        limit: this.pageSize,
        q: this.value
      })
      // todo 8-4-1 搜索高亮
      // 如果输入为空 就不能分割数组，否则报错
      if (this.value.trim() !== '') {
        res.data.list.forEach(item => {
          // 数组分割
          const _arr = item.title.split(this.value)
          console.log('this.value')
          console.log(this.value)
          item.title = _arr.join(`<span style="color:red">${this.value}</span>`)
        })
      }
      this.shareList.push(...res.data.list) // 数组
      this.loading = false
      this.currentPage++
      if (this.shareList.length >= res.data.total) {
        this.finished = true
      }
    },
    // todo 8-4
    // todo 7-4 下拉刷新
    loadEvent () {
      this.getShareList()
    },
    // todo 7-5 搜索
    search () {
      //
      this.showList = true
      // todo 7-5-1 还原初始值
      this.shareList = []
      this.currentPage = 1
      this.finished = false
      this.loading = false

      // todo 7-5-2 静默刷新
      this.bol = false
      this.$nextTick(() => {
        this.bol = true
      })
      // todo 8-5 搜索历史
      // 数组 搜索词为空
      if (this.value.trim() !== '') {
        this.historyList.unshift(this.value)
        // 搜索词 重复
        this.historyList = [...new Set(this.historyList)]
        console.log('this.historyList')
        console.log(this.historyList)
        // 只能去五个搜索关键词 fixme
        this.historyList.splice(5)
        console.log('this.historyList,,,,,,,')
        console.log(this.historyList)

        // 将搜索历史存储到本地 对象要变成字符串
        setLocalToken('history-key-words', JSON.stringify(this.historyList))
      }
    },
    // todo 8-1 大家都在搜
    async cancelEvent () {
      this.showList = false
      if (this.hotList.length === 0) {
        const res = await articleShareTopSearch()
        this.hotList = res.data
      }
    },
    // todo 8-2 历史搜索
    clear () {
      console.log(1111)
      this.historyList = []
      setLocalToken('history-key-words', JSON.stringify(this.historyList))
    },
    // todo 8-3 取消
    close () {
      this.show = false
    },
    // todo 8-4 点击大家都在搜的标签
    searchUs (item) {
      this.value = item
      this.close()
      this.search()
    }

  }
}
</script>

<style lang="less" scoped>
.share-list {
  .content {
    padding: 0 @padding-15;
  }

  .search {
    padding: 0 @padding-15;

    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
      text-align: left;
      color: @color-black-2;
      line-height: 25px;
      letter-spacing: 0px;
      margin-bottom: 18px;
    }

    .van-tag {
      height: 32px;
      background: @color-bg;
      border-radius: 8px;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: @color-gray-1;
    }
    .search-us{
      margin-top: 21px;
    }
    .search-history{
      margin-top: 21px;
      .cell{
        padding:0;
      }
      .clear{
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: left;
        color: @color-gray-1;
        letter-spacing: 0px;
      }
    }

  }
}
</style>
