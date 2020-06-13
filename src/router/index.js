import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login/login'
import ht from '@/components/ht/ht'
import cdgl from '@/components/user/cdgl'
import teaList from '@/components/user/teaList'
import addPic from '@/components/mh/addPic'
import addUser from '@/components/quanxian/addUser'
import updateUser from '@/components/quanxian/updateUser'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/ht',
      name: 'ht',
      component: ht,
      children: [{
          path: '/ht/cdgl',
          name: 'cdgl',
          component: cdgl
        },
        {
          path: '/teaList',
          name: 'teaList',
          component: teaList
        },
        {
          path: '/addPic',
          name: 'addPic',
          component: addPic
        },
        {
          path:'/addUser',
          name:'addUser',
          component:addUser
        },
        {
          path:'/updateUser',
          name:'updateUser',
          component:updateUser
        }
      ]
    }
  ]
})
