<template>
  <div class="home">
    <div class="main-content">
      <VueIntro/>
    </div>
    <div class="sub-content1">
      <VueQuestion/>
    </div>
  </div>
</template>

<script>
import VueIntro from '@/components/VueIntro.vue';
import VueQuestion from '@/components/VueQuestion.vue';

export default {
  name: 'Home',
  components: {
    VueIntro,
    VueQuestion,
  },
};
</script>

<style scorped>
.main-content {
  margin: auto;
  margin-bottom: 40px;
  width: 80%;
  max-width: 600px;
  text-align: left;
}

.sub-content1 {
  margin: auto;
  margin-bottom: 40px;
  width: 80%;
  max-width: 600px;
  text-align: left;
}
</style>
