<template>
  <div class="interview">
    <NavBar
      title="刷题"
      rightText="答题卡"
      pathName="Question"
      @rightEvent="rightEvent"
    ></NavBar>
    <div class="content">
      <div class="question" v-if="list.length>0&&list[currentIndex].detail">
        <div class="title">
          <span>【{{ typeObj[list[currentIndex].detail.type] }}】
            {{ list[currentIndex].detail.title }}
          </span>
        </div>
        <van-tag
          class="tag"
          color="#f7f4f5"
          text-color="#c8c7ce"
          v-for="(item,index) in list[currentIndex].detail.tag"
          :key="index"
        >{{ item }}
        </van-tag>
        <!--        单选 -->
        <ul class="select" v-if="step<2&&list[currentIndex].detail.type===1">
          <li class="item"
              v-for="(item,index) in list[currentIndex].detail.option"
              :key="index"
              @click="select(index)"
              :class="{active: answerSelect[index] === answer}"
          >
            <span>{{ answerSelect[index] }}.{{ item }}</span>
          </li>
        </ul>
        <ul class="select" v-if="step===2&&list[currentIndex].detail.type===1">
          <li class="item"
              v-for="(item,index) in list[currentIndex].detail.option"
              :key="index"
              :class="answerClass(index)"
          >
            <span>{{ answerSelect[index] }}.{{ item }}</span>
            <i class="iconfont"
               v-show=" answerRight===answerSelect[index]"
            >
              &#xe604;
            </i>
            <i class="iconfont"
               v-show="answer===answerSelect[index]&&!answerDetail.isRight"
            >
              &#xe605;
            </i>
          </li>
        </ul>
        <!--        多选 -->
        <ul class="select" v-if="step<2&&list[currentIndex].detail.type===2">
          <li class="item"
              v-for="(item,index) in list[currentIndex].detail.option"
              :key="index"
              @click="selectMulti(index)"
              :class="{active:answerArr.includes(answerSelect[index])}"
          >

            <span>{{ answerSelect[index] }}.{{ item }}</span>
          </li>
        </ul>
        <ul class="select" v-if="step===2&&list[currentIndex].detail.type===2">
          <li class="item"
              v-for="(item,index) in list[currentIndex].detail.option"
              :key="index"
              :class="answerMultiClass(index)"
          >
            <span>{{ answerSelect[index] }}.{{ item }}</span>
            <i class="iconfont"
               v-show="answerMultiRight.includes(answerSelect[index])&&answerDetail.isRight"
            >
              &#xe604;
            </i>
            <i class="iconfont"
               v-show="answerArr.includes(answerSelect[index]) &&!answerDetail.isRight"
            >
              &#xe605;
            </i>
          </li>
        </ul>
        <!--        简答-->
        <div v-if="list[currentIndex].detail.type===3">
          <van-field
            class="field"
            v-model="answerFiled"
            placeholder="请输入答案"
            type="textarea"
            rows="6"
            @input="inputEvent"
            :disabled="step>1"
          >

          </van-field>
        </div>

      </div>
      <div class="line"></div>
      <div class="answer" v-if="step==2">
        <h3>答题解析</h3>
        <div class="answer-1" v-if="list[currentIndex].detail.type===1">正确答案:
          <span>{{ list[currentIndex].answer.singleAnswer }}</span></div>
        <div class="answer-1" v-if="list[currentIndex].detail.type===2">正确答案:
          <span>{{ list[currentIndex].answer.multipleAnswer.join(',') }}</span></div>
        <div class="answer-1" v-if="list[currentIndex].detail.type===3">正确答案: <span>123</span></div>
        <div class="other">
          <div class="o1">
            难度: <span>{{ difficultyObj[list[currentIndex].answer.difficulty] }}</span>
          </div>
          <div class="o2">提交次数: <span>{{ list[currentIndex].answer.submitNum }}</span></div>
          <div class="o2">正确次数: <span>{{ list[currentIndex].answer.correctNum }}</span></div>
        </div>
        <div class="answer-txt">
          {{ list[currentIndex].answer.answerAnalysis }}
        </div>
      </div>
    </div>
    <van-popup
      class="popup"
      v-model="show"
      position="bottom"
    >
      <van-nav-bar
        :fixed="true"
        @click-left="closeSheet"
      >
        <template #left>
          <i class="iconfont">&#xe637;</i>
        </template>
        <template #title>
          <h1 class="title">答题卡</h1>
        </template>
        <template #right>
          <div class="rightText">
            <span class="current-question-1">{{ currentIndex + 1 }}</span>
            /
            <span class="total-question-1">{{ list.length }}题</span>
          </div>
        </template>
      </van-nav-bar>
      <div class="top">
        <span class="top-title">
          单择题
        </span>
        <span class="top-total">
          共{{ list.length }}题
        </span>
      </div>
      <div class="bottom">
        <ul class="card-list">
          <li class="card-item"
              v-for="(item,index) in list"
              :key="index"
              :class="{
                right:item.answer&&item.answer.isRight,
                error:item.answer&&!item.answer.isRight
              }"

          >
            {{ index + 1 }}
          </li>
        </ul>
      </div>

    </van-popup>
    <van-row class="footer" type="flex" align="center" justify="space-between">
      <van-col span="3" class="f1">
        <div class="iconfont">&#xe649;</div>
        <div class="txt">收藏</div>
      </van-col>
      <van-col span="3" class="f1">
        <div class="iconfont">&#xe606;
        </div>
        <div class="txt">反馈</div>
      </van-col>
      <van-col class="f2" span="9">
        <div>
          <span class="current-question">{{ currentIndex + 1 }}</span>
          /
          <span class="total-question">{{ list.length }}题</span>
        </div>
      </van-col>
      <van-col class="f3" span="7">
        <van-button
          v-if="step<=1"
          :disabled="step == 0"
          class="btn-submit"
          color="#e40137"
          @click="submit">
          提交
        </van-button>
        <van-button
          class="btn-submit"
          v-if="step==2"
          color="#1989fa"
          @click="next"
        >
          下一题
        </van-button>
      </van-col>
    </van-row>
  </div>

</template>

<script>
import { interviewQuestion } from '@/api/interview'
import { questionSubmit, questionDetail } from '@/api/question'

export default {
  name: 'Interview',
  data () {
    return {
      step: 0, // 表示当前在哪一步  0：读取按钮，按钮不可点击 1.选择答案，按钮可以点击未点击 3:点了提交,但没点下一题   3:点了提交,但是没下一题了
      type: this.$route.query.type,
      city: this.$route.query.city,
      currentIndex: 0, // 当前操作第几题
      typeObj: {
        1: '单选',
        2: '多选',
        3: '简答'
      },
      difficultyObj: {
        0: '简单',
        1: '一般',
        2: '困难'
      },
      answerSelect: 'ABCDEFGH',
      list: [], // 所有题目，
      answer: '', // 选中的答案
      answerArr: [], // 多选的答案
      answerFiled: '', // 简答
      answerDetail: '',
      answerRight: '', // 正确答案 单选
      answerMultiRight: [], // 正确数组
      show: false // 弹窗显示状态

    }
  },
  async created () {
    console.log(this.$route.query.currentIndex)
    // if (this.$route.query.currentIndex) {
    //   this.getInterviewQuestions()
    //   this.$toast.loading({ duration: 0 })
    //   this.currentIndex = this.$route.query.currentIndex
    //   console.log(this.currentIndex, '1234')
    //   // 根据id 获取面试详情
    //   const res = await questionDetail(this.list[this.currentIndex].id)
    //   console.log('res....')
    //   console.log(res)
    //   this.$toast.clear()
    //   // 需要静默刷新
    //   this.$set(this.list[this.currentIndex], 'detail', res.data)
    // } else {
    this.getInterviewQuestions()
    // }
  },
  computed: {
    answerClass () {
      return (index) => {
        return [
          { success: this.answerRight === this.answerSelect[index] },
          { error: this.answer === this.answerSelect[index] && !this.answerDetail.isRight }
        ]
      }
    },
    answerMultiClass () {
      return (index) => {
        return [
          { success: this.answerMultiRight.includes(this.answerSelect[index]) },
          { error: (this.answerArr.filter(item => !this.answerMultiRight.includes(item))).includes(this.answerSelect[index]) && !this.answerDetail.isRight }
        ]
      }
    }
  },
  methods: {
    // 流程题一定要定义变量，表示当前在哪一步 按钮是关键
    // 读取题目，提交不可点击
    // 选择答案 提交可以点击
    // 提交答案
    // 如果不是最后一道 显示正确答案和答案 出现下一题
    // 如果是最后一道，显示正确答案和答案 出现结束按钮

    // todo 10-1 读取题目
    async getInterviewQuestions () {
      const res = await interviewQuestion({
        type: this.type,
        city: this.city
      })
      console.log('xxx')
      console.log(res)
      this.list = res.data
    },
    // todo 10-2 选择
    select (index) {
      this.answer = this.answerSelect[index]
      // 进行下一步骤
      this.step = 1
    },
    // todo 11-2 多选 选中后可以取消，可以选择多个答案
    selectMulti (index) {
      // 如果选中就取消，否则追加答案
      const _index = this.answerArr.indexOf(this.answerSelect[index])
      if (_index !== -1) {
        this.answerArr.splice(_index, 1)
      } else {
        this.answerArr.push(this.answerSelect[index])
      }
      if (this.answerArr.length === 0) {
        this.step = 0
      } else {
        this.step = 1
      }
    },
    // todo 11-3 简答  什么也没输，不能提交 step为0 输入 step为1
    inputEvent () {
      if (this.answerField.length === 0) {
        this.step = 0
      } else {
        this.step = 1
      }
    },
    // todo 10-3 提交
    async submit () {
      this.$toast.loading({
        duration: 0
      })
      const res = await questionSubmit(
        {
          id: this.list[this.currentIndex].id,
          singleAnswer: this.answer,
          multipleAnswer: this.answerArr
        }
      )
      this.$toast.clear()
      // 判断是否为最后一题
      if (this.currentIndex === this.list.length - 1) {
        this.step = 3
      } else {
        this.step = 2
      }
      // 存储答案
      console.log('qqqqqq')
      console.log(res)
      this.answerDetail = res.data
      this.list[this.currentIndex].answer = res.data
      // 正确答案 选项
      this.answerRight = this.answerDetail.singleAnswer
      this.answerMultiRight = this.answerDetail.multipleAnswer
      const answerRightIndex = this.answerSelect.indexOf(this.answerDetail.singleAnswer)
      // 错误答案
      const answerIndex = this.answerSelect.indexOf(this.answer)
      console.log(answerRightIndex)
      console.log(answerIndex)
      console.log(this.answerDetail.isRight)
    },
    // todo 11-1 下一题
    async next () {
      this.$toast.loading({ duration: 0 })
      this.currentIndex++
      this.step = 0
      this.answer = ''
      this.answerArr = []
      // 根据id 获取面试详情
      const res = await questionDetail(this.list[this.currentIndex].id)
      console.log('res....')
      console.log(res)
      this.$toast.clear()
      // 需要静默刷新
      this.$set(this.list[this.currentIndex], 'detail', res.data)
      // this.list[this.currentIndex].detail = res.data
      this.$router.push({
        name: 'Interview',
        query: {
          type: this.$route.query.type,
          city: this.$route.query.city,
          currentIndex: this.currentIndex
        }

      })
    },
    // todo 11-4  打开popup
    rightEvent () {
      this.show = true
    },
    // todo 11-5 关闭popup
    closeSheet () {
      this.show = false
    }

  }
}
</script>

<style lang="less" scoped>
.interview {
  .content {
    padding: 0 @padding-15 64px;

    .question {
      .title {
        margin-top: 24.5px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: @color-black-1;
        line-height: 22.5px;
      }

      .tag {
        margin-right: 6.5px;
      }

      .select {
        margin-top: 22.5px;

        .item {
          display: flex;
          justify-content: space-between;
          background: #ffffff;
          border: 2px solid @color-bg;
          border-radius: 4px;
          margin-bottom: 16px;
          padding: 14px 15px;
          font-size: 16px;
          font-family: PingFangSC, PingFangSC-Regular;
          font-weight: 400;
          color: @color-black-1;
          line-height: 22.5px;
        }

        .item.active {
          border: 2px solid @color-gray;
        }

        .item.success {
          background: #ddfad9;
          color: #1dc779;
        }

        .item.error {
          background: #ffefea;
        }

        .iconfont {
          font-size: 24px;
        }
      }

      .field {
        border: 2px solid #ccc;
        margin-top: 15px;
      }
    }

    .line {
      height: 1px;
      border: 1px solid #eceaea;
      transform: scaleY(0.5);
      margin-top: 32px;
    }

    .answer {
      h3 {
        margin-top: 18.5px;
        font-size: 18px;
        font-family: PingFangSC, PingFangSC-Medium;
        font-weight: 500;
        color: #222222;
        line-height: 25px;
        letter-spacing: 0px;

      }

      .answer-1 {
        margin-top: 17.5px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #1dc779;
        line-height: 22.5px;
      }

      .other {
        margin-top: 17.5px;
        background-color: #f7f4f5;
        padding: 6px 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        color: #ccc;
      }

      .answer-txt {
        margin-top: 20px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: justify;
        color: #181a39;
        line-height: 22px;
      }
    }
  }

  .popup {
    height: 100%;
    .iconfont {
      font-size: 44px;
    }

    ::v-deep .van-nav-bar__left,
    ::v-deep .van-nav-bar__right {
      padding: 0 @padding-15;
    }

    .title {
      font-size: 18px;
      font-family: PingFangSC, PingFangSC-Semibold;
      font-weight: 600;
      color: @color-black-2;
      line-height: 50px;
      letter-spacing: 0px;
    }

    .rightText {
      font-size: 16px;
      font-family: PingFangSC, PingFangSC-Regular;
      font-weight: 400;
      color: @color-black-1;
      line-height: 40px;
      letter-spacing: 0px;

      .current-question-1 {
        color: @color-red-1;
      }

      .total-question-1 {
        color: @color-gray-1;
      }
    }

    .top {
      margin-top: 46px;
      position: fixed;
      width: 100%;
      padding: 0 @padding-15;
      height: 44px;
      background: @color-bg;
      display: flex;
      align-items: center;

      .top-title, .top-total {
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Semibold;
        font-weight: 600;
        line-height: 22.5px;
        letter-spacing: 0px;
      }

      .top-title {
        color: @color-black-1;
        margin-right: 10px;

      }

      .top-total {
        color: @color-gray
      }
    }

    .bottom {
      margin-top: 90px;
      padding: 19px @padding-15;

      .card-list {
        display: flex;
        flex-wrap: wrap;
        justify-content:space-between;
      }

      .card-item {
        margin: 10px;
        width: 33px;
        height:33px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        border: 1px solid #ccc;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #181a39;
        letter-spacing: 0px;
      }
      .card-item.right{
        background: #ddfad9;
        color:#1DC779;
      }
      .card-item.error{
        background: #ffefea;
        color:#FF4949;

      }
      .card-item:last-child{
        margin-left: 15px;
        margin-right: auto;
      }
    }
  }

  .footer {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 10px @padding-15;
    color: @color-gray;

    .f1 {
      .iconfont {
        font-size: 24px;
      }

      .txt {
        font-size: 12px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        line-height: 16.5px;
        letter-spacing: 0px;
      }
    }

    .f2 {
      display: flex;
      justify-content: center;
      font-size: 20px;
      color: @color-gray-1;

      .current-question {
        font-size: 22px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: #e40137;
        line-height: 31px;
        letter-spacing: 1px;
      }

      .total-question {

      }
    }

    .f3 {
      .btn-submit {
        width: 98px;
        font-size: 16px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #ffffff;
        line-height: 22.5px;
        letter-spacing: 0px;
        border-radius: 7px;
      }

      .btn-confirm {

      }

      .btn-next {

      }
    }
  }

}
</style>
