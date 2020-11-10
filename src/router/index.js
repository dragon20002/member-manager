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
    component: () => import(/* webpackChunkName: "showMembers" */ '@/views/ShowMembers.vue'),
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
    component: () => import(/* webpackChunkName: "createMember" */ '@/views/CreateMember.vue'),
  },
  {
    path: '/login',
    name: '로그인',
    depth: -1,
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue'),
  },
  {
    path: '/show-member',
    name: '회원정보',
    depth: -1,
    component: () => import(/* webpackChunkName: "showMember" */ '@/views/ShowMember.vue'),
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
  mode: 'history',
  routes,
});

/**
 * 로그인이 필요한 경로
 */
const authRoutePaths = [
  '/show-members',
  '/show-member',
];

router.beforeEach((to, from, next) => {
  const fromPath = (from) ? from.path : null;
  const toPath = (to) ? to.path : null;

  // 로그인이 필요한 경로 필터
  if (authRoutePaths.indexOf(toPath) > -1) {
    if (!router.app.$session.get('token')) {
      router.app.$log.debug('[router]', 'Need login');
      next('/login');
      return;
    }
  }

  router.app.$log.debug('[router]', `Route from [${fromPath}] to [${toPath}]`);
  next();
});

export default router;
