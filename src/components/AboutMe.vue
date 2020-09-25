<template>
  <div class="aboutMe">
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
