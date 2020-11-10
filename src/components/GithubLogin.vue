<template>
  <div class="github-login-btn" @click="handleClick()">
    <form id="github-login-form" method="GET" action="https://github.com/login/oauth/authorize">
      <input type="hidden" name="client_id" :value="clientId">
      <input type="hidden" name="redirect_uri" :value="redirectUri">
      <input type="hidden" name="state" :value="state">
    </form>
    <img class="logo" src="@/assets/github_logo.png">
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'GithubLogin',
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
    // Github query-string 검사
    const stateRegex = /state=([^&#/]+)/.exec(window.location.href);
    if (stateRegex && stateRegex.length > 1 && stateRegex[1] === this.state) {
      const codeRegex = /code=([^&#/]+)/.exec(window.location.href);
      if (codeRegex) {
        if (codeRegex.length > 1) {
          const code = codeRegex[1];
          const state = stateRegex[1];

          const params = {
            loginType: 'github',
            code,
            state,
          };

          this.$parent.$parent.isLoading = true;
          this.$parent.$parent.axios.post('/api/login/oauth', params)
            .then((response) => {
              this.$log.debug('[GithubLogin]', '/api/login/oauth', response);
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
                this.onFailure('Github 인증 실패');
              }
            }).catch((err) => {
              this.$log.debug('[GithubLogin]', err);
            }).finally(() => {
              this.$parent.$parent.isLoading = false;
            });
        }
      }
    }
  },
  methods: {
    handleClick() {
      document.querySelector('#github-login-form').submit();
    },
  },
};
</script>

<style scoped>
.github-login-btn {
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

.github-login-btn:hover {
  box-shadow: 0 0 3px 3px rgba(66,133,244,.3);
}

.logo {
  width: 20px;
}
</style>
