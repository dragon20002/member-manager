<template>
  <div class="menuItem h5">
    <router-link :to="menu.path">{{ menu.name }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    menu: Object,
  },
};
</script>

<style scoped>
.menuItem {
    display: inline-block;
}

.menuItem a {
  font-weight: bold;
  color: #2c3e50;
}

.menuItem a.router-link-exact-active {
  color: #42b983;
}

.menuItem:not(:last-child) a::after {
  content: "|";
  color: #42b983;
  padding-left: 5px;
  padding-right: 5px;
}
</style>
