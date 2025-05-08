<template>
  <div class="hello">
    <h1 @click="handleToAbout">{{ msg }}</h1>
    <p>
      二十一世纪的今天，网路早已是新人类组成的一部分，所以我创建了它。
      <span class="Blur">但是，别把爱交给手机。</span>
    </p>
    <h3>生きてることそのものが野蛮なんだって</h3>
    <ul>
      <li><a target="_blank" rel="noopener">是枝裕和</a></li>
      <li><a target="_blank" rel="noopener">昆汀</a></li>
      <li><a target="_blank" rel="noopener">今敏</a></li>
    </ul>
    <h3>偏执 倔强的 要求成就不了真实</h3>
    <ul>
      <li><a target="_blank" rel="noopener">如父如子</a></li>
      <li><a target="_blank" rel="noopener">步履步停</a></li>
      <li><a target="_blank" rel="noopener">海街日记</a></li>
      <li><a target="_blank" rel="noopener">比海更深</a></li>
      <li><a target="_blank" rel="noopener">爱的曝光</a></li>
    </ul>
  </div>
</template>

<script>
// import '@/utils/pulic.less'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    handleToAbout () {
      this.$router.push('/about')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #4b886b;
}
</style>
