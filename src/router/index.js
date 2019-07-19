// 导入VueRouter
import VueRouter from 'vue-router'
// 导入Vue
import Vue from 'vue'
// 导入 Login 组件
import Login from '@/views/login'
import home from '@/views/home'
import welcome from '@/views/welcome'
import NotFound from '@/views/404'
import article from '@/views/article'
import image from '@/views/image'
import publish from '@/views/publish'
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
        { path: '/', name: 'welcome', component: welcome },
        { path: '/article', name: 'article', component: article },
        { path: '/image', name: 'image', component: image },
        { path: '/publish', name: 'publish', component: publish }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 注册一个全局前置守卫，解决拦截路由，没有登录过就不让登录跳回 login页面
router.beforeEach((to, from, next) => {
  // 如果是登录页就直接放行,后面就不用执行了 return next()
  // if (to.path === '/login') return next()
  // // 如果有 token 就放行，没有就跳回 登录页login
  // // 获取登录成功保存的 token
  // const user = window.sessionStorage.getItem('hm73-tt')
  // if (user) {
  //   next()
  // } else {
  //   next('/login')
  // }

  // 简化写法 地址为/login和有token就next() ;否则就跳转到登录页
  // 如果不去登录页也没有token的就跳到login页面
  const user = window.sessionStorage.getItem('hm73-tt')
  if (to.path !== '/login' && !user) return next('/login')
  next()
})

// 导出 router ，放到 main.js中导入使用
export default router
