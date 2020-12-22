<template>
  <div class="interview">
      <NavBar
        title="刷题"
        rightText="答题卡"
        @rightEvent="rightEvent"
      ></NavBar>
    <div class="content">
      <div class="title">
        【单选】在某个时期内，个体对某种刺激特别敏感，过了这个时期，同样的刺激则影响很小或没有影响，这个时期成为（ ）。
      </div>
      <van-tag
        class="tag"
        color="#f7f4f5"
        text-color="#c8c7ce"
      >教育培训</van-tag>
      <van-tag
        class="tag"
        color="#f7f4f5"
        text-color="#c8c7ce"
      >人文</van-tag>
      <ul class="select">
        <li class="item">A.关键期</li>
        <li class="item">A.关键期</li>
        <li class="item">A.关键期</li>
        <li class="item">A.关键期</li>
      </ul>
    </div>
    <van-row class="footer">
      <van-col span="4" class="f1">
        <div class="iconfont">&#xe649;</div>
        <div class="txt">收藏</div>
      </van-col>
      <van-col span="4" class="f1">
        <div class="iconfont">&#xe606;
        </div>
        <div class="txt">反馈</div>
      </van-col>
      <van-col class="f2" span="10">

      </van-col>
      <van-col class="f3" span="6">
        <van-button
          class="btn-submit"
          color=""
          @click="submit">
            提交
        </van-button>
        <van-button
          class="btn-submit"
          v-if="false"
          color="#f5dfe4"
            >
          提交
        </van-button>
      </van-col>
    </van-row>
  </div>

</template>

<script>
export default {
  name: 'Interview',
  data () {
    return {
      step: 0 // 表示当前在哪一步  0：读取按钮，按钮不可点击 1.选择答案，按钮可以点击
    }
  },
  // fixme 为什么这里需要重新移除active
  // mounted () {
  //   // 创建前:还不能访问data与methods
  //   document.querySelector('body').classList.remove('active')
  // },
  methods: {
    // 流程题一定要定义变量，表示当前在哪一步 按钮是关键
    // 读取题目，提交不可点击
    // 选择答案 提交可以点击
    // 提交答案
    // 如果不是最后一道 显示正确答案和答案 出现下一题
    // 如果是最后一道，显示正确答案和答案 出现结束按钮

    // todo 10-1 读取题目
    // todo 10-2 提交
    submit () {
      console.log('提交')
    },
    rightEvent () {
      console.log('1111')
    }
  }
}
</script>

<style lang="less" scoped>
.interview{
    .content{
        padding: 0 @padding-15;
      .title{
        margin-top: 24.5px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: @color-black-1;
        line-height: 22.5px;
      }
      .tag{
        margin-right: 6.5px;
      }
      .select{
        margin-top: 22.5px;
        .item{

        }
      }
    }
  .footer{
    .f1{
      .iconfont{

      }
      .txt{

      }
    }
    .f2{

    }
    .f3{
      .btn-submit{
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #ffffff;
        line-height: 22.5px;
        letter-spacing: 0px;
      }
    }
  }

}
</style>
