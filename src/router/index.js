import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login/login'
import ht from '@/components/ht/ht'
import stuList from '@/components/user/stuList'
import teaList from '@/components/user/teaList'
import addPic from '@/components/mh/addPic'

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
          path: '/stuList',
          name: 'stuList',
          component: stuList
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
        }
      ]
    }
  ]
})
