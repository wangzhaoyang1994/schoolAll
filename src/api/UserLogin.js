import request from '@/utils/request'
import { get } from 'jquery'
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
export function findAll(params){
    return request({
      url:'/user/findAll',
      method:'get',
      params
    })
}
export function updateUser(params){
    return request({
      url:'/user/updateUser',
      method:'get',
      params
    })
}