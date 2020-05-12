import request from '@/utils/request'
export function userLogin(params) {
    return request({
      url: '/login/register',
      method:'get',
      params
    })
  }