# member-manager

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## Start Vue Project
```
vue ui
```


## [새로운 View 추가](https://router.vuejs.org/guide/essentials/named-views.html)
### NewView.vue
```html
<template>
  <div class="newView">
    <h1>This is an newView page</h1>
  </div>
</template>
```

### index.js
```js
const routes = [
  /* ... */
  {
    path: '/newView',
    name: 'NewView',
    component: () => import(/* webpackChunkName: "newView" */ '../views/newView.vue'),
  },
];
```

### Some.vue
```html
<!-- go to newView from other view -->
<router-link to="/error">Error</router-link>
```


## [새로운 Component 추가](https://kr.vuejs.org/v2/guide/components-registration.html)
### NewComponent.vue
```html
<template>
  <div class="hello">
    <h3>{{ msg }}</h3>
    <p>
      관리자 : mw-kim<br>
      E-Mail : mw-kim@****.net<br>
      HP : 010-****-****
    </p>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
```

### Some.vue
```html
<template>
  <div class="newComponent">
    <h3>{{ msg }}</h3>
  </div>
</template>

<script>
export default {
  name: 'NewComponent',
  props: {
    msg: String,
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
</style>
```


## [폼 입력 바인딩](https://kr.vuejs.org/v2/guide/forms.html)
```html
<input v-model="message" placeholder="여기를 수정해보세요">
<p>메시지: {{ message }}</p>
```

### main.js
```js
Vue.config.productionTip = false;
Vue.prototype.$hostname = 'http://localhost:8080';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
```

## 변수 사용 범위
```js
export default {
  name: 'CreateMember',
  data() { //변수 정의
    return {
      member: {
        userId: '',
        password: '',
      },
      isMemberDup: true,
    };
  },
  methods: { //함수 정의
    /**
     * 사용자 입력 검증
     */
    validateInputs() { /* ... */ },

    /**
     * 계정 생성 요청
     */
    createMember() {
      // methods에 정의된 함수 호출
      if (!this.validateInputs()) {
        return;
      }

      // 부모의 data에 정의된 변수 호출
      this.$parent.isLoading = true;
      // Vue.mixin으로 정의한 변수 호출 (main.js 참고)
      // data에 정의된 변수 호출
      axios.post(`${this.$data.$hostname}/api/login/create-member`, this.member)
        .then((response) => {
          const isCreated = response.data;
          if (isCreated) {
            // 부모의 methods에 정의된 함수 호출
            this.$parent.openAlertPopup('계정 생성에 성공하였습니다.');
            router.push('/');
          }
        });
    },
  },
};
```

```html
<!-- {{}}로 innerText 부분에서 출력 -->
<div class="card-body">{{popupMsg}}</div>

<!-- 태그 속성에서 컴포넌트의 변수/함수에 접근 -->
<input id="email" name="email" class="form-control mb-2 mr-sm-2"
  type="text" placeholder="your-email-id@examle.com" v-model="member.email"
  @keyup.enter="createMember()">
```

##  진행상황
### 회원가입, 로그인 화면 완료
#### 주요 이슈
1. 새로운 View, Component 추가
    - Vue 문서 보면서 해결

2. data, methods에 정의한 변수/함수 접근 방식
    - data 정의 시 함수형으로 해야함
      ```js
      new Vue({
        ...,
        data() {
          return {
            message: '',
          };
        },
        methods: {
          doSomething() {},
        },
      });
      ```
    - 정의된 data, methods 접근 시 this. 붙여서 접근 가능
      ```js
      new Vue({
        ...,
        methods: {
          doSomething() {
            console.log(this.message); //자신 컴포넌트 변수 접근
            console.log(this.$parent.message); //부모 컴포넌트 변수 접근
          },
          doSomething2() {
            this.doSomething(); //자신 컴포넌트 함수 호출
            this.$parent.doSomething(); //부모 컴포넌트 함수 호출
          },
        },
      });
      ```

3. Vue.mixin 변수 정의 및 접근
    - main.js에 Vue.mixin 추가
      ```js
      Vue.config.productionTip = false;
      Vue.mixin({
        data() {
          return {
            $hostname: 'http://localhost:8080',
          };
        },
      });
      ```

    - Component에서 접근
      ```js
      // 앞에 this.$data를 붙여서 접근한다.
      axios.post(`${this.$data.$hostname}/api/login/check-member-dup`, { userId })...
      ```

4. 하나의 컴포넌트에 여러 개의 같은 컴포넌트를 자식으로 추가하기
    - input 태그로 추후 테스트 예정 [참고링크](https://stackoverflow.com/questions/54703207/vue-js-including-same-instance-of-component-multiple-times-in-page)

5. jquery 사용법
    ```js
    // import
    import $ from 'jquery';

    // mounted 된 후에 사용가능
    new Vue({
      ...,
      mounted() {
        const val = $('#some').val();
      },
    });
    ```

6. axios 사용법
    - HTTP 요청
      ```js
      // import
      import axios from 'axios';

      // 두가지 방식이 있지만, 보통 아래와 같이 .get/.post/.put/.delete 호출하는 방식으로 사용하는게 편함
      axios.post(`${this.$data.$hostname}/api/login/check-member-dup`, { userId })
              .then((response) => {
                this.isMemberDup = response.data;
                if (this.isMemberDup) {
                  this.$parent.openAlertPopup('이미 사용중인 아이디 입니다.');
                } else {
                  this.$parent.openAlertPopup('사용가능한 아이디 입니다.');
                }
              }).catch((err) => {
                console.log('err=', err.response);
              }).finally(() => {
                this.$parent.isLoading = false;
              });
      ```

    - axios 인스턴스 생성 및 Header 수정
      ```js
      const axiosInst = axios.create({
        baseURL: this.$data.$hostname,
        timeout: 10000,
        headers: {},
      });

      axiosInst.defaults.headers.token = token;
      ```

7. Vue-router 사용법
    ```js
    // 다른 것보다 가장 나중에 import 해야함
    ...
    import router from '@/router';

    // 다른 View로 이동 (App.vue의 router-view 전환)
    router.push('/'); //router/index.js에서 정의한 url을 입력한다.
    ```

8. AirBnB lint 관련된 주요에러
    - map object의 필드를 특정 변수에 바인딩 시 destructuring 에러
      ```js
      const userId = this.member.userId; //error
      const email = this.member.email; //error
      // --->
      const { userId, email } = this.member.userId;
      ```

    - 함수 선언/호출 등 되도록 축약형을 사용
      ```js
      function doSomething() { // error
        // ...
      }
      // --->
      doSomething() {
      }

      doSomething(function() { // error
        // callback
      });
      // --->
      doSomething(() => {});
      ```

    - var 대신 const/let, ++ 대신 +=, 문자열과 연산자 사이에 공백 필수
      ```js
      for (let i = 0; i < len; i++) { // error
      // --->
      for (let i = 0; i < len; i += 1) {
      ```

    - map 선언 시 마지막 항목이라도 뒤에 , 필수 (trailing comma)
      ```js
      const data = {
        message: 'hello', // , 필수
      };
      ```

    - 주석 작성 시 //와 문자열 사이에 공백 필수, 파일 마지막 eof 개행 필수
      ```js
      // 주석
      // 다음 라인 EOF

      ```
    
    - LF/CRLF 관련 규칙 (linebreak-style) 해제
      
      package.json 수정
      ```json
      "rules": {
        "linebreak-style": "off"
      },
      ```

9. VueSession 사용법
    - main.js vue-session 추가
      ```js
      import VueSession from 'vue-session';
      ...
      Vue.use(VueSession);
      ```

    - Get/Set
      ```js
      // javascript
      this.$session.set('token', token);
      this.$session.get('token');

      // router/index.js
      import router from '@/router';
      router.app.$session.get('token');
      ```

10. 환경변수
    - .env 추가
      ```yml
      VUE_APP_PORT=8081
      VUE_APP_HOST=http://localhost:8080
      VUE_APP_GOOGLE_LOGIN_CLIENT_ID=451544914380-m657ri1nr9i2b1qeq8jb8p3o3bl1o8b0.apps.googleusercontent.com
      VUE_APP_GOOGLE_LOGIN_STATE=cccc
      VUE_APP_GITHUB_LOGIN_CLIENT_ID=2c1347aac22bb89c84f3
      VUE_APP_GITHUB_LOGIN_STATE=aaaa
      VUE_APP_KAKAO_LOGIN_CLIENT_ID=edb60a1796c20a7eab7c98b12c550998
      VUE_APP_KAKAO_LOGIN_STATE=bbbb
      ```

    - 환경변수 읽기
      ```js
      axios.create({
        baseURL: `${process.env.VUE_APP_HOST}`,
        timeout: 10000,
        headers: {
          type: '',
          token: '',
        },
      });
      ```

    - 실행 script별 mode 기본값 [Vue CLI 문서]](https://cli.vuejs.org/guide/mode-and-env.html)
      ```json
      {
        ...
        "scripts": {
          "serve": "vue-cli-service serve --open --port 8081", //development
          "build": "vue-cli-service build", //production
          "test:unit": "vue-cli-service test:unit", //test
          "test:e2e": "vue-cli-service test:e2e", //production
          "lint": "vue-cli-service lint"
        },
        ...
      }
      ```