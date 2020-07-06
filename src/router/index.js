import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login/login'
import ht from '@/components/ht/ht'
import cdgl from '@/components/user/cdgl'
import yhgl from '@/components/user/yhgl'
import qxfp from '@/components/quanxian/qxfp'

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
          path: '/ht/yhgl',
          name: 'yhgl',
          component:yhgl
        },
        {
          path: '/ht/qxfp',
          name:'qxfp',
          component:qxfp
        }


        
      ]
    }
  ]
})
