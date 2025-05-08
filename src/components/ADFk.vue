<template>
  <div class="ADFk">
    <div class="div_title">
      <div style="position: absolute; right: 0; display: flex; height: 65px; gap: 10px; padding-right: 20px;">
        <div @click="back" class="title_button">返回</div>
      </div>
    </div>
    <img src="/img/wx-fk.jpg" width="268px" height="268px" />
    <h1>微信扫码查看</h1>
    <h4>潮牌鞋服高质复刻 低价平替 </h4>
  </div>
</template>

<script>
import '@/utils/public.less'
export default {
  name: 'ADFk',
  methods: {
    back () {
      this.$router.push({ path: '/' })
    }
  }
}
</script>

<style scoped lang="less">
.div_title {
  width: 100vw;
  height: 10vh;
  position: fixed;
  top: 0;
  background: transparent;
  pointer-events: none;
  z-index: 1000;
}

.div_title > div {
  pointer-events: auto;  /* 恢复按钮的点击事件 */
}

h1 {
  font-size:38px;
  color:#0bCA6B;
  margin: -10px;
}

h2 {
  font-size:22px
}

h4 {
  font-size:18px;
  color:#0bCA6B;
  margin: 6px;
}

.ADFk{
	text-align: center;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
</style>
