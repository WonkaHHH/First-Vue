// 路由文件
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'WelcomePage',
        component: () => import('../views/WelcomePage.vue')
    },
    {
      path: '/MainPage',
      name: 'MainPage',
      component: () => import('../views/MainPage.vue')
    }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to, from) => {})

export default router
