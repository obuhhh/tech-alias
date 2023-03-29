import { createWebHistory, createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        component: () => import('../pages/Lobby.vue')
    },
    {
        path: '/round',
        component: () => import('../pages/Round.vue')
    },
    {
        path: '/scoreboard',
        component: () => import('../pages/Scoreboard.vue')
    },
    {
        path: '/round-end',
        component: () => import('../pages/RoundEnd.vue')
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})
