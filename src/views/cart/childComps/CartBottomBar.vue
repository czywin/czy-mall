<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll"
                    class="check-button"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>

    <div>
      合计:{{totakPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去支付({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'
  import {mapGetters} from 'vuex'
  export default{
    name:"CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      //引入mapGetters之后的写法
      ...mapGetters(['cartList']),
      totakPrice(){
        return '￥' + this.cartList.filter( item =>{
          return item.checked
        }).reduce((preValue,item) => {//对过滤后的item进行操作
          return preValue + item.price * item.count
        },0).toFixed(2)//保留两位小数
        //0是preValue的初始值
      },
      //计算选中的商品数量
      checkLength(){
        // 为引入mapGetters时return this.$store.state.cartList.filter(item => item.checked).length
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll(){
        //首先要判断购物车里面是不是有东西，没有东西的情况下是不选中全选的
        // if(this.cartList.length === 0) return false
        // return !(this.cartList.filter(item => !item.checked).length)
        if(this.cartList.length === 0) return false
        return !(this.cartList.find(item => !item.checked))
      }
    },
    methods:{
      checkClick(){
        if(this.isSelectAll){//全部选中的情况下
          this.cartList.forEach(item => item.checked = false)
        }else{//部分或者全部不选中的情况下
          this.cartList.forEach(item => item.checked = true)
        }
      },
			calcClick(){
				if(!this.isSelectAll){
					this.$toast.show('请选择需购买的商品',2000)
				}
			}
    }
  }
</script>

<style scoped="scoped">
  .bottom-bar{
    position: relative;
    display: flex;
    height: 40px;
    position: relative;
    background-color: #eee;
    text-align: center;
    line-height: 40px;
  }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    margin-right: 30px;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .calculate{
    width: 100px;
    position: absolute;
    right: 0;
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
