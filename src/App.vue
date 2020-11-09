<template>
  <div id="app">
    <div class="header">
      <div class="header-top" v-show="!hasAuth">
        <span><router-link to="/create-member" v-show="!hasAuth">회원가입</router-link></span>
        <span><router-link to="/login" v-show="!hasAuth">로그인</router-link></span>
      </div>
      <div class="header-top" v-show="hasAuth">
        <span>{{ username }} 님</span>
        <span><button class="btn btn-link" v-show="hasAuth" @click="doLogout()">로그아웃</button></span>
      </div>
      <div class="header-menu">
        <menu-item
            v-for="menu in menus"
            :key="menu.path"
            :menu="menu">
        </menu-item>
      </div>
    </div>
    <router-view/>
    <div class="footer">&copy;2020</div>
    <div class="loader-back" v-show="isLoading"/>
    <div class="loader" v-show="isLoading"/>
    <div class="popup-back" @click="closeAlertPopup"
      v-show="showAlertPopup||showConfirmPopup"></div>
    <div id="alertPopup" class="popup card" v-show="showAlertPopup">
      <div class="card-header h3">알림</div>
      <div class="card-body">{{popupMsg}}</div>
      <div class="card-footer">
        <button class="btn btn-success" @click="closeAlertPopup">닫기</button>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import MenuItem from '@/components/MenuItem.vue';
import router from '@/router';

// Router로부터 메뉴 가져옴
const menus = [];
router.options.routes.forEach((route) => {
  if (route.depth < 0) return;

  menus.push({
    path: route.path,
    name: route.name,
    depth: route.depth,
  });
});

export default {
  name: 'App',
  props: {
    menus: {
      type: Array,
      default: () => menus,
    },
  },
  components: {
    MenuItem,
  },
  data() {
    return {
      axios: null,
      hasAuth: false,
      username: '',
      isLoading: false,
      popupMsg: '',
      popupCallback: null,
      showAlertPopup: false,
      showConfirmPopup: false,
    };
  },
  methods: {
    checkAuth() {
      this.isLoading = true;
      this.axios.get('api/login/has-auth')
        .then((response) => {
          const {
            hasAuth, loginType, jws, username,
          } = response.data;

          if (hasAuth) {
            this.doLogin(loginType, { token: jws, username });
          } else {
            this.invalidateAuth();
          }
        }).finally(() => {
          this.isLoading = false;
        });
    },
    doLogin(loginType, user) {
      this.hasAuth = true;
      this.username = user.username;
      this.$session.set('login-type', loginType);
      this.$session.set('jws', user.token);
      this.$session.set('username', user.username);
      this.axios.defaults.headers.loginType = loginType;
      this.axios.defaults.headers.jws = user.token;
      if (!router.currentRoute || router.currentRoute.path !== '/') {
        router.push('/');
      }
    },
    invalidateAuth() {
      this.hasAuth = false;
      this.username = '';
      this.$session.set('login-type', null);
      this.$session.set('jws', null);
      this.$session.set('username', null);
      this.axios.defaults.headers.loginType = null;
      this.axios.defaults.headers.jws = null;
    },
    doLogout() {
      this.invalidateAuth();
      if (!router.currentRoute || router.currentRoute.path !== '/') {
        router.push('/');
      }
    },
    openAlertPopup(msg, callback) {
      this.popupMsg = msg;
      this.showAlertPopup = true;
      this.popupCallback = callback;
      $('#alertPopup').find('button.btn-success').trigger('focus');
    },
    closeAlertPopup() {
      this.showAlertPopup = false;
      if (this.popupCallback) {
        this.popupCallback();
        this.popupCallback = null;
      }
    },
  },
  mounted() {
    this.axios = axios.create({
      baseURL: this.$data.$hostname,
      timeout: 10000,
      headers: {
        type: '',
        jws: '',
      },
    });

    const loginType = this.$session.get('login-type');
    const jws = this.$session.get('jws');
    this.axios.defaults.headers.loginType = loginType;
    this.axios.defaults.headers.jws = jws;
    this.checkAuth();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header {
  padding: 30px;
}

.header-top {
  text-align: right;
}

.header-top span:not(:last-child)::after {
  content: "|";
  color: black;
  padding-left: 5px;
  padding-right: 5px;
}

.footer {
  margin-top: 100px;
  padding: 30px;
  text-align: center;
  background-color: #eeeeee;
}

.loader-back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000055;
}

.loader {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 16px solid #f3f3f3;
  border-top: 16px solid #42b983;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.popup-back {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000055;
  cursor: pointer;
  z-index: 99;
}

.popup {
  position: fixed;
  top: 40%;
  left: 50%;
  width: 400px;
  min-height: 200px;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  background-color: #ffffff;
  z-index: 99;
}
</style>
