// 导入要注册的插槽
import MyBread from '@/components/my-bread.vue'
import MyChannel from '@/components/my-channel.vue'
export default {
  // 封装成插件的形式 Vue.use(插件) 执行插件的配置对象中的install函数，传入Vue对象
  install (Vue) {
    // 注册所有组件在Vue下
    Vue.component(MyBread.name, MyBread)
    Vue.component(MyChannel.name, MyChannel)
  }
}
