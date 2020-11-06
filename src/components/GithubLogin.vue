<template>
  <div class="github-login-btn" @click="handleClick()">
    <form id="github-login-form" method="GET" action="https://github.com/login/oauth/authorize">
      <input type="hidden" name="client_id" value="2c1347aac22bb89c84f3">
      <input type="hidden" name="redirect_uri" :value="redirectUri">
      <input type="hidden" name="state" value="aaaa">
    </form>
    <img class="logo" src="../assets/github_logo.png">
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
  mounted() {
    // Github query-string 검사
    const stateRegex = /state=([^&#/]+)/.exec(window.location.href);
    if (stateRegex && stateRegex.length > 1 && stateRegex[1] === 'aaaa') {
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

          this.$parent.$parent.axios.post('/api/login/oauth', params)
            .then((response) => {
              const { hasAuth, token, username } = response.data;

              if (hasAuth) {
                this.onSuccess({ hasAuth, token, username });
              } else {
                this.onFailure('Github 인증 실패');
              }
            }).catch((err) => {
              this.$log.debug('[GithubLogin]', err);
            });
        }
      }
    }
  },
  methods: {
    handleClick() {
      document.querySelector('#github-login-form').submit();
      // return this.onSuccess('aa');
      // return props.params.onFailure(err);
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
