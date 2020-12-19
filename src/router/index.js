import Vue from 'vue'
import VueRouter from 'vue-router'

// todo 4-1-1 导入vuex
import store from '@/store/index'
// todo 4-1-2 导入 Token

import * as Token from '@/utils/token.js'
// todo 4-1-3 导入api
import * as AuthApi from '@/api/auth.js'

// todo 4-4 路由潜在bug 当跳转相同路由时
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

// 登录页
const login = () => import('@/views/login/index')

// 首页
const home = () => import('@/views/home/index')
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
const userInfo = () => import('@/views/userInfo/index')

// 我的资料
const info = () => import('@/views/info/index')

// 编辑资料 修改职位
const editInfo = () => import('@/views/editInfo/index')

// 我的消息
const message = () => import('@/views/message/index')

// 404
const notFound = () => import('@/views/404/NotFound')
const routes = [
  {
    path: '/',
    redirect: '/home/userInfo'
  },
  {
    path: '/login',
    name: 'Login',
    component: login
  },
  // 首页 home
  {
    path: '/home',
    name: 'Home',
    component: home,
    redirect: '/home/find',
    meta: {
      isNeedLogin: false,
      isNeedTab: true
    },
    children: [
      // 公司
      {
        path: 'company',
        name: 'Company',
        component: company,
        meta: {
          isNeedLogin: false,
          isNeedTab: true
        }
      },
      // 公司详情
      {
        path: 'companyDetail/:id',
        name:
          'CompanyDetail',
        component:
        companyDetail
      },
      // 在招职位
      {
        path: 'companyPosition/:id',
        name:
          'CompanyPosition',
        component:
        companyPosition
      },
      // 职位详情
      {
        path: 'positionDetail/:id',
        name:
          'PositionDetail',
        component:
        positionDetail
      },
      // 企业面试题
      {
        path: '/interview',
        name:
          'Interview',
        component:
        interview

      },
      // 面试宝典 刷题
      {
        path: 'question',
        name: 'Question',
        component: question,
        meta: {
          isNeedLogin: true,
          isNeedTab: true
        }
      },
      // 发现页面
      {
        path: 'find',
        name: 'Find',
        component: find,
        meta: {
          isNeedLogin: false,
          isNeedTab: true
        }
      },

      // 面试技巧
      {
        path: 'technicList',
        name: 'TechnicList',
        component: technicList,
        meta: {
          isNeedLogin: true,
          isNeedTab: false
        }
      },
      // 面试技巧细节
      {
        path: 'technicDetail/:id',
        name: 'TechnicDetail',
        component: technicDetail,
        meta: {
          isNeedLogin: true,
          isNeedTab: false
        }
      },
      // 面试技巧搜索
      {
        path: 'search/:tag',
        name: 'Search',
        component: search,
        meta: {
          isNeedLogin: true,
          isNeedTab: false
        }
      },
      // 市场数据
      {
        path: 'chart',
        name: 'Chart',
        component: chart,
        meta: {
          isNeedLogin: true,
          isNeedTab: false
        }

      },
      // 面试技巧分享
      {
        path: 'shareList',
        name: 'ShareList',
        component: shareList,
        meta: {
          isNeedLogin: true,
          isNeedTab: false
        }
      },
      // 面试技巧分享详情
      {
        path: 'shareDetail/:id?',
        name: 'ShareDetail',
        component: shareDetail,
        meta: {
          isNeedLogin: true,
          isNeedTab: false
        }
      },
      // 个人中心
      {
        path: 'userInfo',
        name: 'UserInfo',
        component: userInfo,
        meta: {
          isNeedLogin: true,
          isNeedTab: true
        }
      },

      // 我的资料
      {
        path: 'info',
        name: 'Info',
        component: info,
        meta: {
          isNeedLogin: true,
          isNeedTab: false
        }
      },
      // 编辑资料-修改职位
      {
        path: 'editInfo',
        name: 'EditInfo',
        component: editInfo,
        meta: {
          isNeedLogin: true,
          isNeedTab: false
        }
      },
      // 我的消息
      {
        path: '/message',
        name:
          'Message',
        component:
        message
      }

    ]
  },

  // {
  //   path: '*',
  //   name: 'NotFound',
  //   redirect: '/404'
  // },
  {
    path: '/404',
    name: 'NotFound',
    component: notFound
  }

]

const router = new VueRouter({
  routes
})

// todo 4-1  前置守卫 登录处理
/*
* 1.判断当前页面是否需要登录
*      不需要,放行
*      需要 2.判断用户是否登录
*               登录 放行
*               未登录  3. 判断用户是否有正确的token
*                          有，   获取用户信息， 设置登录状态为true  把用户信息保存到vuex中 放行
*                          没有，跳转到登录页面 next()
*
*
* */

router.beforeEach((to, from, next) => {
  // todo 7-7-6 页面切换时取消所有接口调用
  window.cancelAxios('', true)
  if (!to.meta.isNeedLogin) {
    // 传入从哪里来的参数
    next()
  } else {
    if (store.getters.getIsLogin) {
      next()
    } else {
      if (Token.getLocalToken('mm_token')) { // token过期应该进入这里
        // fixme 获取用户信息 需要携带authorization请求头，这样比较麻烦，所以需要在请求拦截器中设置
        AuthApi.authInfo().then(res => {
          // 设置登录状态
          store.commit('setIsLogin', true)
          // 保存用户信息
          store.commit('setUserInfo', res.data)
          // 放行
          next()
        }).catch(err => {
          console.log('现在登录异常')
          console.log(err)
        })
      } else {
        // todo 4-6 当我们没有登录时，进入哪个页面，跳转至登录页，登录完成后，应该回到需要进入响应的页面
        next({
          name: 'Login',
          params: {
            toPath: to.fullPath
          }
        })
      }
    }
  }
})

export default router
