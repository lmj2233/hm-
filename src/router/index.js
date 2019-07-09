// 导入VueRouter
import VueRouter from 'vue-router'
// 导入Vue
import Vue from 'vue'
// 注册 VueRouter
Vue.use(VueRouter)
// 配置路由规则
const router = new VueRouter({
  routes: []
})

// 导出 router ，放到 main.js中导入使用
export default router
