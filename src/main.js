import Vue from 'vue'
import App from './App.vue'

// 导入 ElementUI 组件库和样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入 router
import router from '@/router'
// 导入 axios
import axios from 'axios'
Vue.prototype.$http = axios

// 在全局注册 ElementUI 组件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
