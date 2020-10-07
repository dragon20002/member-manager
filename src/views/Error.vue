<template>
  <div class="error">
    <h1>This is an error page</h1>
    <h3>{{msg}}</h3>
    <pre id="fish" :style="fishStyle">
                     |\
                     \  \  ---------------
                   --------               ---
              -----   (    (        . __     --
  \ \      --- (   (    (           `|_||      |_
  \  \ ----  (   (    (    (                     )
  /  / ----   (   (   (   (  (                  _)
  / /      ----  (  (   (   (    (            __|
               ----   (   (   (          -----
                   -----          -------
                        ----------
    </pre>
  </div>
</template>

<script>
const data = {
  posX: -430,
};

export default {
  name: 'Error',
  props: {
    msg: String,
  },
  data: () => data,
  computed: {
    fishStyle: () => `margin-left: ${data.posX}px;`,
  },
  mounted: () => {
    data.posX = -430;
    setInterval(() => {
      data.posX += 1;
      if (data.posX > window.innerWidth) {
        data.posX = -430;
      }
    }, 100);
  },
};
</script>

<style scoped>
#fish {
  font-family: Consolas, monospace;
  text-align: left;
}
</style>
