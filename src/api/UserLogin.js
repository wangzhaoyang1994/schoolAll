import request from '@/utils/request'
export function userLogin(params) {
    return request({
      url: '/login/register',
      method:'get',
      params
    })
  }
export function userZc(params){
    return request({
      url:'/user/zhuce',
      method:'get',
      params
    })
}