// 路由文件
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/Home.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})


router.beforeEach((to,from)=>{

})

export default router;
