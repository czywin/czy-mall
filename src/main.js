import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import toast from 'components/common/toast/index.js'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
//安装toast插件，就会去执行toast的install函数
Vue.use(toast)

//解决移动端300ms延迟问题
FastClick.attach(document.body)

Vue.use(VueLazyLoad,{
  //设置占位图,在图片还没加载出来之前作为背景图片显示
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
	store,
  render: h => h(App),
}).$mount('#app')
