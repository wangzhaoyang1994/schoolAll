import request from '@/utils/request'

export function getPictureList(params) {
  return request({
    url: '/mh/picture/getPictureList',
    method: 'get',
    params
  })
}
export function getNoticePictureList(params) {
  return request({
    url: '/mh/picture/getNoticePictureList',
    method: 'get',
    params
  })
}
export function addSure(params) {
  return request({
    url: '/mh/newNotice/addSure',
    method: 'get',
    params
  })
}
export function getNoticeNewList(params) {
  return request({
    url: '/mh/newNotice/list',
    method: 'get',
    params
  })
}
export function getNewsList(params) {
  return request({
    url: '/mh/newList/list',
    method: 'get',
    params
  })
}
export function addNews(params) {
  return request({
    url: '/mh/newList/addNews',
    method: 'get',
    params
  })
}