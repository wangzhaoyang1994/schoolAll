import request from '@/utils/request'

export function changVerify(params) {
    return request({
      url: '/verify/getVerify',
      method:'get',
      params
    })
  }
  export function niHao(params) {
    return request({
      url: '/verify/nihao',
      method:'get',
      params
    })
  }
  export function testParam(params) {
    return request({
      url: '/verify/testParam',
      method:'get',
      params
    })
  }