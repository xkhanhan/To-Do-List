import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);
const routes = [
    {
        path: '/',
        name: 'home',
        redirect: 'index',
    },
    { path: '/index', name: 'index', component: () => import('./layout/index.vue') },
    { path: '/data', name: 'data', component: () => import('@/layout/data.vue') },
    { path: '/user', name: 'user', component: () => import('@/layout/user.vue') }

]

export default new VueRouter({
    routes,
    mode: 'history'
})