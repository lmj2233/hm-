// 导入VueRouter
import VueRouter from 'vue-router'
// 导入Vue
import Vue from 'vue'
// 导入 Login 组件
import Login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
// 注册 VueRouter
Vue.use(VueRouter)

// 配置路由规则
const router = new VueRouter({
  routes: [
    // 配置 login 路由
    { path: '/login', name: 'login', component: Login },
    { path: '/',
      // name: 'home',
      component: home,
      children: [
        { path: '/', name: 'welcome', component: welcome }
      ]
    }
  ]
})

// 导出 router ，放到 main.js中导入使用
export default router
