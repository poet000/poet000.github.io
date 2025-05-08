<template>
  <div class="home">
    <div class="links-area">
      <h2 >嘲讽-恐怖游戏名录</h2>
      <a href="https://lanzouq.com/b01hriq0f">下载本地版</a>
    </div>
    <div class="container">
      <div class="game-card" v-for="item in CardList" :key="item.name">
        <a target="_blank" @click="handleTo(item)">
          <img :src="item.png_url" alt="封面">
          <div class="title">{{ item.name }}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import '@/utils/public.less'
const CardList = [
  {
    path: '/TextAdventure/gndmx',
    url: null,
    name: '国男大冒险',
    png_url: '/img/国男大冒险.jpg',
    params: {
      id: 1
    }
  },
  {
    path: '/TextAdventure/hldmx',
    url: null,
    name: '婚恋大冒险',
    png_url: '/img/婚恋大冒险.jpg',
    params: {
      id: 2
    }
  },
  {
    path: null,
    url: null,
    url: 'https://ocjxs.yhzu.cn/',
    name: '羊毛捡漏',
    png_url: '/img/网购捡漏.jpg'
  },
  {
    path: null,
    url: null,
    name: '订婚惊魂🔒',
    png_url: '/img/婚恋大冒险2.jpg',
    introduce: '【游戏正在开发中】你订婚了，也入狱了...'
  },
  {
    path: null,
    url: null,
    name: '集邮之旅🔒',
    png_url: '/img/婚恋大冒险2.jpg',
    introduce: '【游戏正在开发中】你是个刚失业的金发老光棍，本想去棒国旅游散心，还为此准备了专业相机，谁知刚下飞机就莫名触发支线任务，开始了愉快的集邮旅程...'
  },
  {
    path: '/ADFk',
    url: null,
    name: '潮牌复刻版',
    png_url: '/img/潮牌复刻.jpg'
  },
  {
    path: null,
    url: null,
    name: '底线·抵陷🔒',
    png_url: '/img/婚恋大冒险2.jpg',
    introduce: '【游戏正在开发中】你是个货运司机，某日听说自己的案子作为经典案例被某电视剧〔据真实事件改编〕，于是慕名观看，结果发现不仅改了，也确实编了...'
  },
  {
    path: null,
    url: null,
    name: '毛妹攻略🔒',
    png_url: '/img/婚恋大冒险2.jpg',
    introduce: '【游戏正在开发中】一次偶然的机会，你了解到外国女孩的种种优点，于是出国踏上攻略征程...'
  },
  {
    path: null,
    url: null,
    name: '重生胖猫🔒',
    png_url: '/img/婚恋大冒险2.jpg',
    introduce: '【游戏正在开发中】你重生了，魂穿胖猫，回到跳江前夜。身无分文的你该如何才能拿回属于自己的一切？'
  },
  {
    path: null,
    url: null,
    name: '入婿风云🔒',
    png_url: '/img/婚恋大冒险2.jpg',
    introduce: '【游戏正在开发中】身为单亲家庭的孩子，车房彩礼压得你喘不过气。于是你决定放弃冠姓权，做一个在家带娃的赘婿，谁知...'
  }
]
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      CardList
    }
  },
  methods: {
    handleTo (r) {
      if (r.path) {
        this.$router.push({ path: r.path })
      } else if (r.url) {
        window.open(r.url)
      } else {
        alert(r.introduce)
      }
    }
  }
}
</script>
<style lang="less" scoped>

/* 链接区域样式 */
.links-area {
  text-align: center;
  padding: 10px 0;
  a {
    margin: 5px;
    text-decoration: none;
    color: #8B9BAA;
    font-weight: bold;
  }
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.game-card {
  width: calc(25% - 20px);
  cursor: pointer;
  margin: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-radius: 8px;
  position: relative;
}

.game-card img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

.game-card .title {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 5px 0;
  border-radius: 0 0 8px 8px;
}

@media (max-width: 1024px) and (min-width: 768px) {
  .game-card {
    width: calc(33.33% - 20px);
  }
}
        
@media (max-width: 768px) {
  .game-card {
    width: calc(50% - 20px);
  }
}
</style>