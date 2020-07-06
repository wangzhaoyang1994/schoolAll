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