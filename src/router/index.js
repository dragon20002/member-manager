import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: '메인',
    depth: 0,
    component: Home,
  },
  {
    path: '/show-members',
    name: '회원관리',
    depth: 0,
    component: () => import(/* webpackChunkName: "error" */ '@/views/ShowMembers.vue'),
  },
  {
    path: '/about',
    name: 'About',
    depth: 0,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/create-member',
    name: '회원가입',
    depth: -1,
    component: () => import(/* webpackChunkName: "error" */ '@/views/CreateMember.vue'),
  },
  {
    path: '/login',
    name: '로그인',
    depth: -1,
    component: () => import(/* webpackChunkName: "error" */ '@/views/Login.vue'),
  },
  {
    path: '/error',
    name: 'Error',
    depth: -1,
    component: () => import(/* webpackChunkName: "error" */ '@/views/Error.vue'),
  },
  {
    path: '*',
    redirect: '/',
    depth: -1,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
