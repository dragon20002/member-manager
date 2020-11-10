<template>
  <div class="create-member">
    <form onSubmit="return false;">
      <div class="input-wrap">
        <label for="user-id" class="req">아이디</label>
        <div class="input-group mb-2 mr-sm-2" v-if="isMemberDup">
          <input id="user-id" name="userId" class="form-control"
            type="text" placeholder="한글/영문 6자 이상" maxlength="64"
            v-model="member.userId">
          <div class="input-group-append">
            <div class="btn btn-success" @click="checkMemberDup()">중복확인</div>
          </div>
        </div>
        <div class="input-group mb-2 mr-sm-2" v-else>
          <input id="user-id" name="userId" class="form-control"
            type="text" placeholder="한글/영문 6자 이상" maxlength="64"
            v-model="member.userId" readonly>
          <div class="input-group-append">
            <div class="btn btn-danger" @click="clearUserId()">
              <i class="fa fa-times"></i>
            </div>
          </div>
        </div>

        <label for="password" class="req">비밀번호</label>
        <input id="password" name="password" class="form-control mb-2 mr-sm-2"
          type="password" placeholder="영문/숫자/특수문자 포함 8자 이상" maxlength="64"
          v-model="member.password">

        <label for="password-re" class="req">비밀번호 확인</label>
        <input id="password-re" class="form-control mb-2 mr-sm-2"
          type="password" placeholder="영문/숫자/특수문자 포함 8자 이상" maxlength="64"
          v-model="member.passwordRe">

        <label for="name" class="req">이름</label>
        <input id="name" name="name" class="form-control mb-2 mr-sm-2"
          type="text" v-model="member.name">

        <label for="email" class="req">이메일</label>
        <input id="email" name="email" class="form-control mb-2 mr-sm-2"
          type="text" placeholder="your-email-id@examle.com" maxlength="64"
          v-model="member.email">

        <label for="tel-no">전화번호</label>
        <input id="tel-no" name="telNo" class="form-control mb-2 mr-sm-2"
          type="text" placeholder="000-0000-0000" maxlength="64" v-model="member.telNo">

        <label for="address">주소</label>
        <input id="address" name="address" class="form-control mb-2 mr-sm-2"
          type="text" placeholder="시/도 구/군" maxlength="64" v-model="member.address">
      </div>
      <button id="create-member-btn" class="btn btn-success"
        @click="createMember()">회원가입</button>
    </form>
    <span><router-link to="/">로그인</router-link></span>
    <span><router-link to="/">아이디 찾기</router-link></span>
    <span><router-link to="/">비밀번호 찾기</router-link></span>
  </div>
</template>

<script>
import $ from 'jquery';
import router from '@/router';

export default {
  name: 'CreateMember',
  data() {
    return {
      member: {
        userId: '',
        password: '',
        passwordRe: '',
        name: '',
        email: '',
        telNo: '',
        address: '',
      },
      isMemberDup: true,
    };
  },
  methods: {
    /**
     * 사용자 입력 검증
     */
    validateInputs() {
      // 1. required 체크
      const reqLabels = $('.create-member label.req');
      for (let i = 0; i < reqLabels.length; i += 1) {
        const lbl = reqLabels.eq(i);
        const input = $(`.create-member input[id=${lbl.attr('for')}]`);
        const value = input.val();
        if (!value || value.length === 0) {
          input.addClass('error');
          this.$parent.openAlertPopup(`${lbl.text()}를 입력해주세요.`);
          return false;
        }
        input.removeClass('error');
      }

      // 2. validation 체크

      // 2.1. 아이디 중복체크 여부
      if (this.isMemberDup) {
        $('input[name=userId]').addClass('error');
        this.$parent.openAlertPopup('아이디 중복체크를 해주세요.');
        return false;
      }

      $('input[name=userId').removeClass('error');

      // 2.2.1 아이디와 다른 비밀번호 체크
      if (this.member.userId === this.member.password) {
        $('input[name=password]').addClass('error');
        this.$parent.openAlertPopup('비밀번호는 아이디와 다르게 입력해주세요.');
        return false;
      }

      // 2.2.2 비밀번호 유효성 체크
      const hasAlpha = this.member.password.match(/[A-Za-z]+/);
      const hasNum = this.member.password.match(/[0-9]+/);
      const hasChar = this.member.password.match(/[`~!@#$%^&*()\-_]+/);
      const hasInvalid = this.member.password.match(/[^A-Za-z0-9`~!@#$%^&*()\-_]+/);
      if (this.member.password.length < 8 || !hasAlpha || !hasNum || !hasChar || hasInvalid) {
        $('input[name=password]').addClass('error');
        this.$parent.openAlertPopup('비밀번호는 영문/숫자/특수문자 포함 8자 이상으로 입력해주세요.');
        return false;
      }

      // 2.2.3 비밀번호 재입력 체크
      if (this.member.password !== this.member.passwordRe) {
        $('input[name=password]').addClass('error');
        this.$parent.openAlertPopup('같은 비밀번호를 입력해주세요.');
        return false;
      }

      $('input[name=password]').removeClass('error');

      // 2.3 전화번호 유효성 체크
      const { telNo } = this.member;
      const telNoRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}$/;
      if (telNo && telNo.length > 0 && !telNo.match(telNoRegex)) {
        $('input[name=telNo]').addClass('error');
        this.$parent.openAlertPopup('올바른 전화번호를 입력해주세요.');
        return false;
      }

      $('input[name=telNo]').removeClass('error');

      return true;
    },

    /**
     * 아이디 중복체크 요청
     */
    checkMemberDup() {
      const { userId } = this.member;
      if (!userId || userId.length === 0) {
        $('input[name=userId]').addClass('error');
        this.$parent.openAlertPopup('아이디를 입력해주세요.');
        return;
      }

      const hasInvalid = userId.match(/[^A-Za-z가-힣0-9\-_]+/);
      if (userId.length < 6 || hasInvalid) {
        $('input[name=userId]').addClass('error');
        this.$parent.openAlertPopup('아이디는 한글/영문/숫자 6자 이상으로 입력해주세요.');
        return;
      }

      $('input[name=userId]').removeClass('error');

      this.$parent.isLoading = true;
      this.$parent.axios.post('/api/login/check-member-dup', { userId })
        .then((response) => {
          this.isMemberDup = response.data;
          if (this.isMemberDup) {
            this.$parent.openAlertPopup('이미 사용중인 아이디 입니다.');
          } else {
            this.$parent.openAlertPopup('사용가능한 아이디 입니다.');
          }
        }).finally(() => {
          this.$parent.isLoading = false;
        });
    },

    /*
     * 아이디 중복체크 초기화
     */
    clearUserId() {
      this.member.userId = '';
      this.isMemberDup = true;
    },

    /**
     * 계정 생성 요청
     */
    createMember() {
      if (!this.validateInputs()) {
        return;
      }

      this.$parent.isLoading = true;
      this.$parent.axios.post(`${this.$data.$hostname}/api/login/create-member`, this.member)
        .then((response) => {
          const isCreated = response.data;
          if (isCreated) {
            this.$parent.openAlertPopup('계정 생성에 성공하였습니다.');
            router.push('/');
          } else {
            this.$parent.openAlertPopup('계정 생성에 실패하였습니다. 다시 시도해 주세요.');
          }
        }).catch(() => {
          this.$parent.openAlertPopup('계정 생성에 실패하였습니다. 다시 시도해 주세요.');
        }).finally(() => {
          this.$parent.isLoading = false;
        });
    },
  },
  mounted() {
    $('.create-member input').focus((e) => { // input 포커스
      const tarInput = $(e.target);
      const tarInputId = tarInput.attr('id');
      const tarLbl = $(`.create-member label[for=${tarInputId}]`);

      tarInput.attr('selected', true);

      tarLbl.css('color', '#42b983');

      // 이전에 선택된 input 중에 자기자신이 아닌 것 선택해제
      const prevInputs = $('.create-member input[selected=selected]');
      for (let i = 0; i < prevInputs.length; i += 1) {
        const prevInput = prevInputs.eq(i);

        if (prevInput.attr('id') !== tarInputId) {
          prevInput.attr('selected', false);
        }
      }
    });

    $('.create-member input').blur((e) => { // input 포커스 해제 시
      // label 글자색 기본값으로
      const tarInputId = $(e.target).attr('id');
      const tarLbl = $(`.create-member label[for=${tarInputId}]`);
      tarLbl.css('color', '');

      // 전화번호 불필요한 문자 제거
      if (tarInputId === 'tel-no') {
        this.member.telNo = this.member.telNo.replaceAll(/[^0-9-]/gi, '');
      }
    });
  },
};
</script>

<style scoped>
.create-member {
  margin: auto;
  padding: 30px;
  width: 380px;
  text-align: left;
  background-color: #eeeeee;
  border-radius: 5pt;
}

.create-member label {
  color: #888888;
  font-size: 0.8em;
  font-weight: bold;
}

.create-member label.req::after {
  content: "*";
  color: red;
}

.create-member input::placeholder {
  font-size: 0.8em;
}

.create-member input:focus {
  border-color: #42b983;
}

.create-member input.error {
  border-color: red;
}

.create-member input.error::placeholder {
  color: red;
}

.create-member #create-member-btn {
  width: 100%;
  margin-bottom: 10px;
}

.create-member a {
  color: #aaaaaa;
  text-decoration-color: black;
}

.create-member span:not(:last-child)::after {
  content: " | ";
}
</style>
