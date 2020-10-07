<template>
<div id="preview" class="vue-question">
  <h2 class="code-line" data-line-start=0 data-line-end=1>
    <a id="Vuejs___0"></a>
    Vue.js 관련 질문</h2>
  <hr>
  <h3 class="code-line" data-line-start=2 data-line-end=3>
    <a id="Q1_What_is_Vuejs_2"></a>
    Q1. What is Vue.js?</h3>
  <ul>
    <li class="has-line-data" data-line-start="3" data-line-end="4">
      Even You(에번 유) 가 2014년도에 발표한 자바스크립트 프레임워크</li>
    <li class="has-line-data" data-line-start="4" data-line-end="6">
      동적인 사용자 인터페이스(UI) 를 만들기 위한 프레임워크</li>
  </ul>
  <h3 class="code-line" data-line-start=6 data-line-end=7>
    <a id="Q2_How_to_create_an_instance_of_Vuejs_6"></a>
    Q2. How
    to
    create an instance of Vue.js?</h3>
  <ul>
    <li class="has-line-data" data-line-start="7" data-line-end="8">
      Vue() 생성자 함수를 이용하여 생성</li>
    <li class="has-line-data" data-line-start="8" data-line-end="9">
      생성시 옵션 객체를 전달</li>
  </ul>
  <pre>
  <code class="has-line-data language-js" data-line-start="10" data-line-end="12">
  <span class="hljs-keyword">
  let</span> vm = <span class="hljs-keyword"> new</span> Vue({});
  </code>
  </pre>
  <ul>
    <li class="has-line-data" data-line-start="12" data-line-end="14">
      vue component 도 vue instance 와 동일하다.</li>
  </ul>
  <h3 class="code-line" data-line-start=14 data-line-end=15>
    <a id="Q3_Explain_the_differences_between_oneway_data_flow_and_twoway_data_binding_14">
    </a>
    Q3. Explain the
    differences between one-way data flow and two-way data binding?</h3>
  <pre>
  <code class="has-line-data language-text" data-line-start="16" data-line-end="25">
  단방향 바인딩 : 데이터 흐름이 한쪽인 경우를 의미한다.
대표적인 지시어는 v-on, v-bind, {{}} 머스태시 태그
v-on(@) 은 UI에서 데이터 모델(viewModel)을 업데이트 하거나 출력할때 사용한다.
v-bind(:) 는 데이터 모델(viewModel) 에서 업데이트 된 상태를 UI에 반영한다.
양방햔 바인딩 : 데이터 흐름이 양방향이 경우를 의미한다.
대표적인 지시어는 v-model
데이터모델(viewModel)이 변경되면, 자동으로 UI도 변경이 된다.
</code>
</pre>
  <h3 class="code-line" data-line-start=26 data-line-end=27>
    <a id="Q4_How_to_create_TwoWay_Bindings_in_Vuejs_26">
    </a>
    Q4.
    How to create Two-Way Bindings in Vue.js?</h3>
  <ul>
    <li class="has-line-data" data-line-start="27" data-line-end="29">
      v-model 지시어를 사용</li>
  </ul>
  <h3 class="code-line" data-line-start=29 data-line-end=30>
    <a id="Q5_What_are_components_props_29"></a>
    Q5. What are
    components props?</h3>
  <ul>
    <li class="has-line-data" data-line-start="30" data-line-end="31">
      props 는 상위컴포넌트에서 하위컴포넌트에게 데이터를 전달할때 사용하는 옵션
    </li>
    <li class="has-line-data" data-line-start="31" data-line-end="32">
      vue 에 데이터 흐름은 위에서 아래로 흐르기때문에 하위 컴포넌트가 상위 컴포넌트
      상태를
      직접 참조할 수 없음</li>
    <li class="has-line-data" data-line-start="32" data-line-end="34">
      props 로 상태가 전달이 되면 해당 컴포넌트에 속성이 된다</li>
  </ul>
  <h3 class="code-line" data-line-start=34 data-line-end=35>
    <a id="Q6_How_to_deploy_Vuejs_app_34"></a>
    Q6. How to
    deploy
    Vue.js app?</h3>
  <ul>
    <li class="has-line-data" data-line-start="35" data-line-end="36">
      SFC(Single File Component) 방식으로 코드를 작성했다면 웹팩
      빌드 후,
      빌드 결과물을 정적 서버에 올린다.</li>
    <li class="has-line-data" data-line-start="36" data-line-end="38">
      express-static 같은걸로 빌드 후, 서버 올리면 될듯…?</li>
  </ul>
  <h3 class="code-line" data-line-start=38 data-line-end=39>
    <a id="Q7_What_are_Components_in_Vuejs_38"></a>
    Q7. What
    are
    Components in Vue.js?</h3>
  <ul>
    <li class="has-line-data" data-line-start="39" data-line-end="40">
      vue component 는 재사용 및 확장성을 위해 코드를 캡슐화한거다.</li>
    <li class="has-line-data" data-line-start="40" data-line-end="42">
      vue component 는 vue instance 이기도 하여, 옵션 객체 사용이
      가능(root component 에서만 사용하는 옵션 제외)</li>
  </ul>
  <h3 class="code-line" data-line-start=42 data-line-end=43>
    <a id="Q8_What_is_filters_in_Vuejs_42"></a>
    Q8. What is
    filters in Vue.js?</h3>
  <ul>
    <li class="has-line-data" data-line-start="43" data-line-end="44">
      일반적인 text 형식(format)을 가공해주는 역할을 한다.</li>
    <li class="has-line-data" data-line-start="44" data-line-end="45">
      머스태시 태그와 v-bind 에서 사용 가능하며, | (파이프) 기호와 함께
      사용한다.
    </li>
    <li class="has-line-data" data-line-start="45" data-line-end="47" v-pre>
      필터 체이닝도 가능하다 (
      {{ message | filterA | filterB }}
    </li>
  </ul>
  <pre>
  <code class="has-line-data language-html" data-line-start="48" data-line-end="54" v-pre>
  <span class="hljs-comment">
  &lt;!-- in mustaches --&gt;</span>

{{ message | capitalize }} //  capitalize -&gt; filter
<span class="hljs-comment">
  &lt;!-- in v-bind --&gt;</span>
  <span class="hljs-tag">
  &lt;<span class="hljs-title">
  div</span>
 <span class="hljs-attribute">
   v-bind:id</span>
=<span class="hljs-value">
  "rawId | formatId"</span>
&gt;</span>
<span class="hljs-tag">
  &lt;/<span class="hljs-title">
  div</span>
&gt;</span>
 //  formatId -&gt; filter
</code>
</pre>
  <h3 class="code-line" data-line-start=55 data-line-end=56>
    <a id="Q9_How_can_you_redirect_to_another_page_in_Vuejs_55">
    </a>
    Q9. How can you redirect to another page in
    Vue.js?
  </h3>
  <ul>
    <li class="has-line-data" data-line-start="56" data-line-end="58">
      vue-router 모듈을 이용하여 routing 기능을 구현할 수 있다.<br>
      (라우팅이란 출발지부터 목적지까지의 경로를 설정하는것을 의미한다.)</li>
    <li class="has-line-data" data-line-start="58" data-line-end="60">
      $router.push();</li>
  </ul>
  <h3 class="code-line" data-line-start=60 data-line-end=61>
    <a id="Q10_Explain_the_basic_logical_Vuejs_app_organisation_60">
    </a>
    Q10. Explain the basic logical Vue.js app
    organisation</h3>
  <ul>
    <li class="has-line-data" data-line-start="61" data-line-end="62">
      vue 는 루트 컴포넌트(root instance)를 생성하고 루트 컴포넌트가
      최상위를
      기준으로 자식컴포넌트들이 tree 구조로 구성됩니다.</li>
  </ul>
  <pre>
  <code class="has-line-data language-r" data-line-start="63" data-line-end="69">
  root component
  ㄴ header component
  ㄴ body component
  ㄴ main component
  ㄴ footer component
</code>
</pre>
  <h3 class="code-line" data-line-start=70 data-line-end=71>
    <a id="Q11_What_is_Vuex_70"></a>
    Q11. What is Vuex?</h3>
  <ul>
    <li class="has-line-data" data-line-start="71" data-line-end="72">
      vue 앱에 상태관리를 위한 라이브러리</li>
    <li class="has-line-data" data-line-start="72" data-line-end="75">
      모든 컴포넌트에 대한 상태를 중앙집중식으로 관리하는 저장소 역할을 한다.<br>
      <img src="https://media.vlpt.us/images/katanazero86/post/836ec55e-f55f-44b4-a6ac-e94998644372/%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C.png"
        alt="">
    </li>
  </ul>
  <h3 class="code-line" data-line-start=75 data-line-end=76>
    <a id="Q12_Why_we_need_Vuejs_mixins_75"></a>
    Q12. Why we
    need
    Vue.js mixins?</h3>
  <ul>
    <li class="has-line-data" data-line-start="76" data-line-end="77">
      <p class="has-line-data" data-line-start="76" data-line-end="77">
        mixin 은 여러 컴포넌트간의 공통으로 사용하고 있는 로직, 상태들을
        재사용하는 방법
      </p>
    </li>
    <li class="has-line-data" data-line-start="77" data-line-end="78">
      <p class="has-line-data" data-line-start="77" data-line-end="78">
        2개의 컴포넌트가 동일한 기능을 가지고 있다고 생각해보자. 만약 같은 메서드를
        2개
        작성한다면 코드 중복 + 해당 메서드들이 바뀌면 코드를 2번 수정해야한다. -&gt; 이걸 우아하게 mixin 으로 해결 가능하다.</p>
    </li>
    <li class="has-line-data" data-line-start="78" data-line-end="79">
      <p class="has-line-data" data-line-start="78" data-line-end="79">
        mixins : [] 속성으로 지정하면 된다.</p>
    </li>
    <li class="has-line-data" data-line-start="79" data-line-end="81">
      <p class="has-line-data" data-line-start="79" data-line-end="80">
        mixin과 컴포넌트의 옵션이 중첩이 된다면, 두 옵션은 ‘Merged’
        된다.</p>
    </li>
    <li class="has-line-data" data-line-start="81" data-line-end="83">
      <p class="has-line-data" data-line-start="81" data-line-end="82">
        라이프사이클도 믹스인에 정의가 가능하지만, 라이프사이클 함수는 모두
        실행된다(mixin
        -&gt; component)</p>
    </li>
  </ul>
  <blockquote>
    <p class="has-line-data" data-line-start="83" data-line-end="84">
      ※ 출처 : <a
        href="https://velog.io/@katanazero86/vue.js-%EA%B8%B0%EC%88%A0%EB%A9%B4%EC%A0%91-%EC%A7%88%EB%AC%B8%EB%AA%A9%EB%A1%9D">
        카타나제로86
        | Vue.js 기술면접 질문목록</a>
    </p>
  </blockquote>
</div>
</template>

<script>
export default {
  name: 'VueQuestion',
};
</script>
