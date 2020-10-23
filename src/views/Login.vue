<template>
  <div class="login">
    <form onSubmit="return false;">
      <div class="input-wrap">
        <div class="label"><label for="user-id">아이디</label></div>
        <input id="user-id" name="userId" class="form-control mb-2 mr-sm-2"
          type="text" placeholder="아이디" autocomplete="off" v-model="member.userId"
          @keyup.enter="doLogin()">

        <div class="label"><label for="password">비밀번호</label></div>
        <input id="password" name="password" class="form-control mb-2 mr-sm-2"
          type="password" placeholder="비밀번호" v-model="member.password"
          @keyup.enter="doLogin()">
      </div>
      <button id="login-btn" class="btn btn-success" @click="doLogin()">로그인</button>
    </form>
    <span><router-link to="/create-member">회원가입</router-link></span>
    <span><router-link to="/">아이디 찾기</router-link></span>
    <span><router-link to="/">비밀번호 찾기</router-link></span>
  </div>
</template>

<script>
import $ from 'jquery';
import router from '@/router';

export default {
  name: 'Login',
  data() {
    return {
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
      this.$parent.axios.post(`${this.$data.$hostname}/api/login`, this.member)
        .then((response) => {
          this.$parent.hasAuth = response.data.hasAuth;
          if (this.$parent.hasAuth) {
            this.$parent.axios.defaults.headers.jws = response.data.jws;
            this.$session.set('jws', response.data.jws);
            if (!router.currentRoute || router.currentRoute.path !== '/') {
              router.push('/');
            }
          } else {
            this.$parent.openAlertPopup('계정 정보를 찾을 수 없습니다.');
          }
        }).catch(() => {
          this.$parent.openAlertPopup('계정 정보를 찾을 수 없습니다.');
        }).finally(() => {
          this.$parent.isLoading = false;
        });
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

.login #login-btn {
  width: 100%;
  margin-bottom: 10px;
}

.login a {
  color: #888888;
  text-decoration-color: black;
}

.login span:not(:last-child)::after {
  content: " | ";
}
</style>
