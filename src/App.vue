<template>
  <div id="app">
    <!-- <navbar /> -->
    <router-view style="flex: 1;display: flex;flex-direction: column;"/>

    <div class="footer">
      <div class="footer-top">
        <a @click="handleTo('Tips')">打赏</a>
        <a @click="handleTo('Join')">进群</a>
        <a @click="handleTo('Collaborate')">入伙</a>
        <a href="https://bing.com/search?q=嘲讽恐怖游戏名录">搜索</a>
      </div>
      <div class="footer-bottom">
        <a href="https://github.com/fengzi2333/GuoNanSimulator">Copyright © fengzi2333</a>
      </div>
      <div class="footer-disclaimer">
          游戏仅供娱乐 请勿代入现实
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    handleTo (path) {
      this.$router.push({ path: path })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style lang="less">
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-image: linear-gradient(rgba(255, 255, 255, 0.09) 74%, rgba(0, 156, 238, 0.3));
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.footer {
  width: 100%;
  padding: 10px 0;
  text-align: center;
  a {
    margin: 5px;
    text-decoration: none;
    color: #8B9BAA;
    font-weight: bold;
  }
  .footer-disclaimer {
    color: #8B9BAA;
    font-size: 12px;
  }
}

</style>
