
import axios from 'axios'
//promise的另一种方式
export  function request(config){//封装网络请求，只要调用request函数就可以发送网络请求
  // 1,创建axios的实例（不要创建全局的）
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5',
    timeout: 50000
  })

  //2axios拦截器
  //请求拦截,config是请求响应的配置
  // instance.interceptors.request.use(config => {
  //   console.log(config);
  //   //拦截以后要将拦截到的config返回出去，不然真正发送网络请求的时候是拿不到config的
  //   return config
  // }),err => {
  //   console.log(err)
  // }
  //instance(config)的返回值本身就是一个Promise,因此就不需要自己包装一个
  //3发送真正的网络请求
  return instance(config)
}
