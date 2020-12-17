import NavBar from '@/components/NavBar'
// todo 6-3 使用过滤器
import * as custom from '@/filters/filters'

export default {
  install (Vue) {
    Vue.component(NavBar.name, NavBar)
    Vue.prototype.$baseUrl = process.env.VUE_APP_URL
    Object.keys(custom).forEach(item => Vue.filter(item, custom[item]))
  }
}
