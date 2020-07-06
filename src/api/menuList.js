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
export function findAllMenu(params){
  return request({
    url:'/menu/findAllMenu',
    method:'get',
    params
  })
}
export function menuSure(data,role){
  return request({
    url:'/menu/menuSure/'+data+'/'+role,
    method:'post',
  })
}