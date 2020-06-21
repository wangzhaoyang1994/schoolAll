import request from '@/utils/request'
export function menuList(params) {
    return request({
      url: '/menu/menuList',
      method:'get',
      params
    })
}
export function addMenu(params) {
    return request({
      url: '/menu/addMenu',
      method:'get',
      params
    })
}
export function menuListPage(params){
  return request({
    url:'/menu/menuListByPage',
    method:'get',
    params
  })
}