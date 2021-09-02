import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-type.js'
export default{
  addCart(context,payload){
    return new Promise((resolve) => {
			//首先要看待加入的商品是否已经存在
			let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
			if(oldProduct){
          context.commit(ADD_COUNTER,oldProduct)
          resolve('已成功添加至购物车')
			}else{
          payload.count = 1
          context.commit(ADD_TO_CART,payload)
          resolve('已成功添加至购物车')
			}
		})
  }
}
