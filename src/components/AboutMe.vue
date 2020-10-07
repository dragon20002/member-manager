<template>
  <div class="aboutMe">
    <h3>{{ msg }}</h3>
    <p>
      mw-kim<br>
      mw-kim@****.net<br>
      010-****-****
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
