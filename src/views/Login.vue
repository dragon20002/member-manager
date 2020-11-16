<template>
  <div class="login">
    <form onSubmit="return false;">
      <div class="input-wrap">
        <div class="label"><label for="user-id">아이디</label></div>
        <input id="user-id" name="userId" class="form-control mb-2 mr-sm-2"
          type="text" placeholder="아이디" maxlength="64" autocomplete="off"
          v-model="member.userId"
          @keyup.enter="doLogin()">

        <div class="label"><label for="password">비밀번호</label></div>
        <input id="password" name="password" class="form-control mb-2 mr-sm-2"
          type="password" placeholder="비밀번호" maxlength="64" v-model="member.password"
          @keyup.enter="doLogin()">
      </div>
      <button class="btn btn-success login-btn" @click="doLogin()">로그인</button>
    </form>
    <div class="login-type">
      <span class="item">
        <GoogleLogin :params="googleLogin.params"
          :renderParams="googleLogin.renderParams"
          :onSuccess="onSuccessGoogleLogin" :onFailure="onFailGoogleLogin" />
      </span>
      <span class="item">
        <GithubLogin :params="githubLogin.params"
          :renderParams="githubLogin.renderParams"
          :onSuccess="onSuccessGithubLogin" :onFailure="onFailGithubLogin" />
      </span>
      <span class="item">
        <KakaoLogin :params="kakaoLogin.params"
          :renderParams="kakaoLogin.renderParams"
          :onSuccess="onSuccessKakaoLogin" :onFailure="onFailKakaoLogin" />
      </span>
    </div>
    <div class="login-menu">
      <span class="item"><router-link to="/create-member">회원가입</router-link></span>
      <span class="item"><router-link to="/">아이디 찾기</router-link></span>
      <span class="item"><router-link to="/">비밀번호 찾기</router-link></span>
    </div>
  </div>
</template>

<script>
// import GoogleLogin from 'vue-google-login';
import GoogleLogin from '@/components/GoogleLogin.vue';
import GithubLogin from '@/components/GithubLogin.vue';
import KakaoLogin from '@/components/KakaoLogin.vue';
import $ from 'jquery';

export default {
  name: 'Login',
  components: {
    GoogleLogin,
    GithubLogin,
    KakaoLogin,
  },
  data() {
    return {
      googleLogin: {
        params: {
          // client_id: `${process.env.VUE_APP_GOOGLE_LOGIN_CLIENT_ID}`,
          clientId: `${process.env.VUE_APP_GOOGLE_LOGIN_CLIENT_ID}`,
          state: `${process.env.VUE_APP_GOOGLE_LOGIN_STATE}`,
        },
        renderParams: {
          width: 36,
        },
      },
      githubLogin: {
        params: {
          clientId: `${process.env.VUE_APP_GITHUB_LOGIN_CLIENT_ID}`,
          state: `${process.env.VUE_APP_GITHUB_LOGIN_STATE}`,
        },
      },
      kakaoLogin: {
        params: {
          clientId: `${process.env.VUE_APP_KAKAO_LOGIN_CLIENT_ID}`,
          state: `${process.env.VUE_APP_KAKAO_LOGIN_CLIENT_ID}`,
        },
      },
      member: {
        userId: '',
        password: '',
      },
    };
  },
  methods: {
    /**
     * 로그인 요청
     */
    doLogin() {
      const { userId, password } = this.member;

      if (userId.length === 0) {
        this.$parent.openAlertPopup('아이디를 입력해주세요.');
        return;
      }
      if (password.length === 0) {
        this.$parent.openAlertPopup('비밀번호를 입력해주세요.');
        return;
      }

      this.$parent.isLoading = true;
      this.$axios.post('/api/login', this.member)
        .then((response) => {
          this.$log.debug('[Login]', '/api/login', response);
          const {
            hasAuth, token, imageUrl, name,
          } = response.data;

          if (hasAuth) {
            this.$parent.doLogin(null, { token, imageUrl, name });
          } else {
            this.$parent.invalidateAuth();
            this.$parent.openAlertPopup('계정 정보를 찾을 수 없습니다.');
          }
        }).catch(() => {
          this.$parent.invalidateAuth();
          this.$parent.openAlertPopup('계정 정보를 찾을 수 없습니다.');
        }).finally(() => {
          this.$parent.isLoading = false;
        });
    },
    onSuccessGoogleLogin(googleUser) {
      this.$parent.doLogin('google', {
        // token: googleUser.getAuthResponse().id_token,
        // imageUrl: googleUser.getBasicProfile().getImageUrl(),
        // name: googleUser.getBasicProfile().getName(),
        token: googleUser.token,
        imageUrl: googleUser.imageUrl,
        name: googleUser.name,
      });
    },
    onFailGoogleLogin(e) {
      this.$log.debug('[Login]', e.error);
      this.$parent.openAlertPopup(e.error);
    },
    onSuccessGithubLogin(githubUser) {
      this.$parent.doLogin('github', {
        token: githubUser.token,
        imageUrl: githubUser.imageUrl,
        name: githubUser.name,
      });
    },
    onFailGithubLogin(e) {
      this.$log.debug('[Login]', e);
      this.$parent.openAlertPopup(e);
    },
    onSuccessKakaoLogin(kakaoUser) {
      this.$parent.doLogin('kakao', {
        token: kakaoUser.token,
        imageUrl: kakaoUser.imageUrl,
        name: kakaoUser.name,
      });
    },
    onFailKakaoLogin(e) {
      this.$log.debug('[Login]', e);
      this.$parent.openAlertPopup(e);
    },
  },
  mounted() {
    $('.login input').focus((e) => {
      const tarInput = $(e.target);
      const tarInputId = tarInput.attr('id');
      const tarPlaceholder = tarInput.attr('placeholder');
      const tarLbl = $(`.login label[for=${tarInputId}]`);

      tarInput.attr('placeholder-bak', tarPlaceholder);
      tarInput.attr('placeholder', '');
      tarInput.attr('selected', true);

      tarLbl.css('color', '#42b983');
      tarLbl.parent().slideDown(500);

      // 이전에 선택된 input 중에 자기자신이 아닌 것 선택해제
      const prevInputs = $('.login input[selected=selected]');
      for (let i = 0; i < prevInputs.length; i += 1) {
        const prevInput = prevInputs.eq(i);

        if (prevInput.attr('id') !== tarInputId) {
          const prevPlaceholder = prevInput.attr('placeholder-bak');
          const prevLbl = $(`.login label[for=${prevInput.attr('id')}]`);
          prevInput.attr('selected', false);
          prevLbl.parent().slideUp(500, () => prevInput.attr('placeholder', prevPlaceholder));
        }
      }
    });

    $('.login input').blur((e) => {
      const tarInputId = $(e.target).attr('id');
      const tarLbl = $(`.login label[for=${tarInputId}]`);
      tarLbl.css('color', '');
    });

    // 첫번째 input 선택
    $('.login input:first').trigger('focus');
  },
};
</script>

<style scoped>
.login {
  margin: auto;
  padding: 30px;
  width: 380px;
  text-align: left;
  background-color: #eeeeee;
  border-radius: 5pt;
}

.login .input-wrap {
  height: 128px;
}

.login .label {
  bottom: 0;
  display: none;
}

.login label {
  color: #888888;
  font-size: 0.8em;
  font-weight: bold;
}

.login input:focus {
  border-color: #42b983;
}

.login .login-btn {
  width: 100%;
  margin-bottom: 10px;
}

.login a {
  color: #888888;
  text-decoration-color: black;
}

.login .login-type {
  margin-bottom: 10px;
}

.login .login-type .item {
  padding: 4px;
  background-color: white;
  border: 1px solid #42b983;
  border-radius: 8px;
  display: inline-block;
  vertical-align: middle;
  margin: 1px;
}

.login .login-menu .item:not(:last-child)::after {
  content: " | ";
}
</style>
