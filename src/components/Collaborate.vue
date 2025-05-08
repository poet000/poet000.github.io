<template>
  <div class="Collaborate">
    <div class="div_title">
      <div style="position: absolute; right: 0; display: flex; height: 65px; gap: 10px; padding-right: 20px;">
        <div @click="back" class="title_button">返回</div>
      </div>
    </div>
    <h1>加入我们</h1>
    <h3>我们是一个为爱发电的团队哦，欢迎加入我们一起建设网站呀。要求不高滴。<br>以下技能只要简单掌握一项就可以哦：游戏开发、做图手绘、写代码、写故事剧本、AI图文视频创作、运营推广、对接资源。能对网站发展提供其他帮助也欢迎加入哦~</h3>
    <img src="https://open.weixin.qq.com/qr/code?username=cfqn66" width="268px" height="268px" />
    <h1>微信扫码入伙</h1>
    <br>
    <h2>请私信暗号 网站入伙</h2>
  </div>
</template>

<script>
import '@/utils/public.less'
export default {
  name: 'Collaborate',
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

.Collaborate {
	text-align: center;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}
</style>
