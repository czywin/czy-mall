import Toast from './Toast.vue'
const obj = {}

obj.install = function(Vue){
  //1.创建toast组件构造器
  const toastContrustor = Vue.extend(Toast)
  
  //2 使用new根据组件构造器，可以创建一个组件对象
  const toast = new toastContrustor()
  
  //3.将组件对象，手动的挂在到某个元素上
  toast.$mount(document.createElement('div'))
  
  //toast.$el对应的就是div
  document.body.appendChild(toast.$el)
  
  Vue.prototype.$toast= toast;
}
export default obj