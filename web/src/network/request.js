import axios from 'axios'

import NProgress from 'nprogress'

export function request(config) {
  const instance = axios.create({
    baseURL: process.env.NODE_ENV === "production"?'/api/private/v1':'http://localhost:3003/api/private/v1',
    timeout: 5000
  })
  // 拦截请求
  instance.interceptors.request.use(config => {
    NProgress.start()

    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }, err => {

  })
  // 拦截响应
  instance.interceptors.response.use(res => {
    NProgress.done()

    return res.data
  }, err => {
    console.log('服务器响应失败');
  })

  return instance(config)
}