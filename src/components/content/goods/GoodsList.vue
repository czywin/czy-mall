<template>
  <div class="goods">
    <GoodsListItem v-for="(item,index) in goods" :key="index" :goods-item="item"></GoodsListItem>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'
  export default{
    name:"GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    /* 使得请求的数据在一行中均等分布设置了flex属性以后要设置每个item的宽度 */
    display: flex;
    /* 设置每一行均等的包裹item元素 */
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }

</style>
