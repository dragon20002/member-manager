<template>
  <div class="about">
    <h1>This is an about page</h1>
    <AboutMe msg="여긴 이런 사람이 만들었습니다."/>
  </div>
</template>

<script>
import AboutMe from '@/components/AboutMe.vue';

export default {
  name: 'About',
  components: {
    AboutMe,
  },
};
</script>
