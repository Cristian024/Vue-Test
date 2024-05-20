import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/home',
            name: 'home',
            component: () => import("../views/homeView.vue")
        },
        {
            path: '/test',
            name: 'test',
            component: () => import("../views/testView.vue")
        },
        {
            path: '/test/:id',
            name: 'test-individual',
            component: () => import("../views/testView.vue")
        },
        {
            path: '/chat',
            name: 'chat',
            component: () => import("../views/chatView.vue")
        },
        {
            path: '/exposicion',
            name: 'exposicion',
            component: () => import("../views/expoView.vue")
        }
    ]
})

export default router;
