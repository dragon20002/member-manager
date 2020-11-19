import Vue from 'vue';
import VueSession from 'vue-session';
import VueLogger from 'vuejs-logger';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

Vue.use(VueSession);
Vue.use(VueLogger, {
  logLevel: 'debug',
  showLogLevel: true,
  showConsoleColors: true,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
