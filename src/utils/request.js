import axios from 'axios'
import qs from 'qs'
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    timeout: 50000, // request timeout
    // headers: {
    //   post: {        // can be common or any other method
    //     header1: 'value1'
    //   }
    // },
    transformRequest: [function (data) {
      // data.Authorization = getToken()
      if (data instanceof FormData) {
        return data
      }
      data = qs.stringify(data)
      return data
  
    }]
  })
  service.interceptors.request.use(
    config => {
      // alert(window.sessionStorage.getItem('ldjsc_access_token'))
      // alert(window.sessionStorage.getItem('ldjsc_user_id'))
      // Do something before request is sent
      if (window.sessionStorage.getItem('ldjsc_access_token')) {
        // 让每个请求携带token-- ['X-Litemall-Admin-Token']为自定义key 请根据实际情况自行修改
        config.headers['access_token'] = 'Bearer ' + window.sessionStorage.getItem('ldjsc_access_token');
      }
      if (window.sessionStorage.getItem('ldjsc_user_id')) {
        // 让每个请求携带token-- ['X-Litemall-Admin-Token']为自定义key 请根据实际情况自行修改
        config.headers['userId'] = JSON.parse(window.sessionStorage.getItem('ldjsc_user_id'));
      }
      
  //     config.headers['access_token'] = '12'
  //     config.headers['userId'] = '142449204829443020'  //测试
  //     config.headers['userId'] = '2021545663751639'  //生产
      return config
    },
    error => {
      // Do something with request error
      console.log(error) // for debug
      Promise.reject(error)
    }
  )
  // response interceptor
service.interceptors.response.use(
    response => {
      return response
      // }
    }, error => {
      console.log('err' + error)// for debug
      return Promise.reject(error)
    })
  
  export default service