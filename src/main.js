import Vue from 'vue'
import App from './App.vue'

// 导入 ElementUI 组件库和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 router
import router from '@/router'
// 导入 axios
// import axios from 'axios'
// 配置axios的基准路径和headers
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios.defaults.headers = { Authorization: 'Beaer' + JSON.parse(window.sessionStorage.getItem('hm73-tt')).token }
// 详细的axios的路径
import axios from '@/api/axios'
// 导入components
import components from '@/components'

// 引入全局样式
import '@/styles/index.less'

// 注册插件
Vue.use(components)
Vue.prototype.$http = axios

// 在全局注册 ElementUI 组件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
