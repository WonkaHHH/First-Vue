// 路由文件
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'WelcomePage',
        component: () => import('../views/WelcomePage.vue')
    },
    {
      path: '/',
      name: 'MainPage',
      component: () => import('../views/MainPage.vue')
    },
    {
        path: '/',
        name: 'dragPage',
        component: () => import('../views/dragPage.vue')
      },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to,from)=>{

})

export default router;
