import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ycopy from '@/utils/copy'
Vue.config.productionTip = false

Vue.directive('ycopy', ycopy)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
