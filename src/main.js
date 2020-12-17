import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入vant
import './plugins/vant'
// todo 1-5-1 引入 amfe-flexible
import 'amfe-flexible'
//  todo 1-5-2 引入normalize
import 'normalize.css'
// todo 1-7 引入iconfont
import '@/style/iconfont/iconfont.css'
import '@/style/common/base.css'

// import navbar from '@/components/NavBar'
// Vue.component(navbar.name, navbar)
// todo 6-2 封装公有组件 用use
import common from '@/utils/common'

Vue.use(common)

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
