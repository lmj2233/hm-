// 封装axios
import axios from 'axios'

var instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0'
//   headers: { Authorization:
//     'Beaer' + JSON.parse(window.sessionStorage.getItem('hm73-tt')).token
//   }
})

// 请求拦截器 设置headers
instance.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 获取token
  const user = window.sessionStorage.getItem('hm73-tt')
  if (user) {
    config.headers = {
      Authorization: 'Beaer' + JSON.parse(user).token
    }
  }
  //   console.log(config)
  return config
}, (error) => {
  // 创建promise对象方式 new Promise()结果可能成功可能失败
  // Promise.resolve() 创建一个成功的promise
  // Promise.reject() 创建一个失败的promise
  return Promise.reject(error)
})
// console.log(1)

// 响应拦截器
instance.interceptors.response.use((response) => {
  // 对响应数据做点什么
  return response
}, (error) => {
  // 对响应错误做点什么
  console.dir(error.response)
  //   状态码为401，拦截到登录页面
  if (error.response.status === 401) {
    //   跳转到登录页面login hash
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default instance
