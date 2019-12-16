import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  // 登录
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/team/teamList',
    hidden: false,
    meta: {
      title: '风控管理',
      icon: 'form'
    },
    children: [
      // 团队
      {
        path: '/team/teamList',
        name: 'teamList',
        component: () => import('@/views/team/TeamList.vue'),
        meta: {
          title: '团队列表'
        }
      },
      // 指标
      {
        path: '/indicators/IndicatorsMaintenance',
        name: 'IndicatorsMaintenance',
        component: () => import('@/views/indicators/IndicatorsMaintenance.vue'),
        meta: {
          title: '指标维护'
        }
      }
    ]
  }
]

const createRouter = () => new Router({
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
