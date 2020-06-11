import request from '@/utils/request'
export function menuList(params) {
    return request({
      url: '/menu/menuList',
      method:'get',
      params
    })
  }