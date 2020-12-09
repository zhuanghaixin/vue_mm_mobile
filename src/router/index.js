import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 登录页
const login = () => import('@/views/login/index')
// 公司页
const company = () => import('@/views/company/index')
// 公司详情页
const companyDetail = () => import('@/views/companyDetail/index')
// 在招职位
const companyPosition = () => import('@/views/companyPosition/index')
// 位置细节
const positionDetail = () => import('@/views/positionDetail/index')
// 企业面试题
const interview = () => import('@/views/interview/index')

// 面试宝典 刷题页面
const question = () => import('@/views/question/index')

// 发现页面
const find = () => import('@/views/find/index')

// 面试技巧
const technicList = () => import('@/views/technicList/index')

// 面试技巧细节
const technicDetail = () => import('@/views/technicDetail/index')

// 面试技巧-搜索
const search = () => import('@/views/search/index')
// 市场数据

const chart = () => import('@/views/chart/index')
// 面试技巧分享
const shareList = () => import('@/views/shareList/index')

// 面试技巧分享详情
const shareDetail = () => import('@/views/shareDetail/index')

// 个人中心
const my = () => import('@/views/my/index')

// 我的资料
const info = () => import('@/views/info/index')

// 编辑资料 修改职位
const editInfo = () => import('@/views/editInfo/index')

// 我的消息
const message = () => import('@/views/message/index')
const routes = [
  {
    path: '/',
    redirect: '/find'
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  // 公司
  {
    path: '/company',
    name: 'Company',
    component: company
  },
  // 公司详情
  {
    path: '/companyDetail/:id',
    name: 'CompanyDetail',
    component: companyDetail
  },
  // 在招职位
  {
    path: '/companyPosition/:id',
    name: 'CompanyPosition',
    component: companyPosition
  },
  // 职位详情
  {
    path: '/positionDetail/:id',
    name: 'PositionDetail',
    component: positionDetail
  },
  // 企业面试题
  {
    path: '/interview',
    name: 'Interview',
    component: interview

  },
  // 面试宝典 刷题
  {
    path: '/question',
    name: 'Question',
    component: question
  },
  // 发现页面
  {
    path: '/find',
    name: 'Find',
    component: find
  },

  // 面试技巧
  {
    path: '/technicList',
    name: 'TechnicList',
    component: technicList
  },
  // 面试技巧细节
  {
    path: '/technicDetail/:id',
    name: 'TechnicDetail',
    component: technicDetail
  },
  // 面试技巧搜索
  {
    path: '/search/:tag',
    name: 'Search',
    component: search
  },
  // 市场数据
  {
    path: '/chart',
    name: 'Chart',
    component: chart

  },
  // 面试技巧分享
  {
    path: '/shareList',
    name: 'ShareList',
    component: shareList
  },
  // 面试技巧分享详情
  {
    path: '/shareDetail/:id',
    name: 'ShareDetail',
    component: shareDetail
  },
  // 个人中心
  {
    path: '/userInfo',
    name: 'UserInfo',
    component: my
  },
  // 我的资料
  {
    path: '/info',
    name: 'Info',
    component: info
  },
  // 编辑资料-修改职位
  {
    path: '/editInfo',
    name: 'EditInfo',
    component: editInfo
  },
  // 我的消息
  {
    path: '/message',
    name: 'Message',
    component: message
  }

]

const router = new VueRouter({
  routes
})

export default router
