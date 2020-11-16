<template>
  <div class="google-login-btn" @click="handleClick()">
    <form id="google-login-form" method="GET" action="https://accounts.google.com/o/oauth2/v2/auth">
      <input type="hidden" name="redirect_uri" :value="redirectUri">
      <input type="hidden" name="response_type" value="code">
      <input type="hidden" name="access_type" value="offline">
      <input type="hidden" name="scope" :value="scope">
      <input type="hidden" name="client_id" :value="clientId">
      <input type="hidden" name="state" :value="state">
    </form>
    <img class="logo" src="@/assets/google_logo.png">
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'GoogleLogin',
  props: {
    params: Object,
    onSuccess: Function,
    onFailure: Function,
  },
  data() {
    return {
      redirectUri: `${window.location.origin}${router.currentRoute.path}`,
      scopes: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'openid',
      ],
    };
  },
  computed: {
    clientId() {
      return this.params.clientId;
    },
    state() {
      return this.params.state;
    },
    scope() {
      return this.scopes.join(' ');
    },
  },
  mounted() {
    // Github query-string 검사
    const stateRegex = /state=([^&#/]+)/.exec(window.location.href);
    if (stateRegex && stateRegex.length > 1 && stateRegex[1] === this.state) {
      const codeRegex = /code=([^&#/]+)/.exec(window.location.href);
      if (codeRegex) {
        if (codeRegex.length > 1) {
          console.log(codeRegex[1]);
          const code = decodeURIComponent(codeRegex[1]);
          console.log(code);
          const state = decodeURIComponent(stateRegex[1]);

          const params = {
            loginType: 'google',
            code,
            state,
            redirectUri: this.redirectUri,
          };

          this.$parent.$parent.isLoading = true;
          this.$axios.post('/api/login/oauth', params)
            .then((response) => {
              this.$log.debug('[GoogleLogin]', '/api/login/oauth', response);
              const {
                hasAuth,
                token,
                imageUrl,
                name,
              } = response.data;

              if (hasAuth) {
                this.onSuccess({
                  hasAuth,
                  token,
                  imageUrl,
                  name,
                });
              } else {
                this.onFailure('Google 인증 실패');
              }
            }).catch((err) => {
              this.$log.debug('[GoogleLogin]', err);
            }).finally(() => {
              this.$parent.$parent.isLoading = false;
            });
        }
      }
    }
  },
  methods: {
    handleClick() {
      document.querySelector('#google-login-form').submit();
    },
  },
};
</script>

<style scoped>
.google-login-btn {
  width: 36px;
  height: 36px;
  padding-top: 4px;
  padding-left: 8px;
  background-color: white;
  cursor: pointer;
  border-radius: 1px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.25);
  box-sizing: border-box;
  transition: background-color .218s,border-color .218s,box-shadow .218s;
  color: #262626;
  outline: none;
}

.google-login-btn:hover {
  box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
}

.logo {
  width: 20px;
}
</style>
