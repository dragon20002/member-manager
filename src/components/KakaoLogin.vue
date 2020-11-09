<template>
  <div class="kakao-login-btn" @click="handleClick()">
    <form id="kakao-login-form" method="GET" action="https://kauth.kakao.com/oauth/authorize">
      <input type="hidden" name="client_id" :value="clientId">
      <input type="hidden" name="redirect_uri" :value="redirectUri">
      <input type="hidden" name="response_type" value="code">
      <input type="hidden" name="state" :value="state">
    </form>
    <img class="logo" src="../assets/kakao_logo.png">
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'KakaoLogin',
  props: {
    params: Object,
    onSuccess: Function,
    onFailure: Function,
  },
  data() {
    return {
      redirectUri: `${window.location.origin}${router.currentRoute.path}`,
    };
  },
  computed: {
    clientId() {
      return this.params.clientId;
    },
    state() {
      return this.params.state;
    },
  },
  mounted() {
    // Kakao query-string 검사
    const stateRegex = /state=([^&#/]+)/.exec(window.location.href);
    if (stateRegex && stateRegex.length > 1 && stateRegex[1] === this.state) {
      const codeRegex = /code=([^&#/]+)/.exec(window.location.href);
      if (codeRegex) {
        if (codeRegex.length > 1) {
          const code = codeRegex[1];
          const state = stateRegex[1];

          const params = {
            loginType: 'kakao',
            code,
            state,
            redirectUri: this.redirectUri,
          };

          this.$parent.$parent.axios.post('/api/login/oauth', params)
            .then((response) => {
              const { hasAuth, token, username } = response.data;

              if (hasAuth) {
                this.onSuccess({ hasAuth, token, username });
              } else {
                this.onFailure('Kakao 인증 실패');
              }
            }).catch((err) => {
              this.$log.debug('[KakaoLogin]', err);
            });
        }
      }
    }
  },
  methods: {
    handleClick() {
      document.querySelector('#kakao-login-form').submit();
    },
  },
};
</script>

<style scoped>
.kakao-login-btn {
  width: 36px;
  height: 36px;
  background-color: white;
  cursor: pointer;
  border-radius: 1px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.25);
  box-sizing: border-box;
  transition: background-color .218s,border-color .218s,box-shadow .218s;
  color: #262626;
  outline: none;
}

.kakao-login-btn:hover {
  box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
}

.logo {
  width: 36px;
  height: 36px;
}
</style>
