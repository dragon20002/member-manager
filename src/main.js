import Vue from 'vue';
import VueSession from 'vue-session';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.mixin({
  data() {
    return {
      $hostname: 'http://localhost:8080',
    };
  },
});

Vue.use(VueSession);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
