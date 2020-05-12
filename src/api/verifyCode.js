import request from '@/utils/request'

export function changVerify(params) {
    return request({
      url: '/verify/getVerify',
      method:'get',
      params
    })
  }
  export function findUser(params) {
    return request({
      url: '/user/findAll',
      method:'get',
      params
    })
  }
