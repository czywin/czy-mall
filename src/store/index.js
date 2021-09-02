import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'
//安装插件
Vue.use(Vuex)
const state ={
  cartList:[]
}
//创建store对象
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

//挂载在Vue实例当中
export default store
