import request from '@/utils/request'
export function getPicListByPage(params) {
    return request({
      url: '/pic/picList',
      method:'get',
      params
    })
}
export function addPic(params){
    return request({
      url: '/pic/addPic',
      method:'get',
      params
    })
}
export function exportExcel(params){
  return request({
    url: '/pic/exportExcel',
    method:'get',
    params
  })
}
export function clearData(){
  return request({
    url: '/mh/picture/deleteRedis',
      method:'get'
  })
}