<template>
  <div class="cart">
    <nav-bar class="nav-bar">
       <div slot="center">
          购物车({{length}})
      </div>
    </nav-bar>
    
    <cart-list></cart-list>
    
    <cart-bottom-bar></cart-bottom-bar>
  </div>


</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import { mapGetters} from 'vuex'
  export default{
    name:"Cart",
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed:{
      //两种getters语法
      //1
      // ...mapGetters(['cartLength']),
      //2起别名的方法
      ...mapGetters({
        //可以直接使用length作为计算属性使用
        'length':'cartLength'
      })
    }
  }
</script>

<style scoped>
  .cart{
    height: 100vh;
  }
  .nav-bar{
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
