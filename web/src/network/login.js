import { request } from './request'

function loginReq(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export { loginReq }