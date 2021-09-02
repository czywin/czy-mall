<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoad" />
    <div class="goods-info ">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default{
    name:"GoodsListItem",
    props:{
      goodsItem:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImage(){
        return this.goodsItem.image || this.goodsItem.show.img
      }
    },
		methods:{
			imageLoad(){
        //因为详情页面也采用了GoodsListItem的监听事件，故不应该只向首页发送事件
        //解决办法1：通过路由来判断是哪个页面发生的图片加载完成事件
        // if(this.$route.path.indexOf('/home')){
        //   this.$bus.$emit('homeItemImageLoad')
        // }else if(this.$route.path.indexOf('/detail')){
        //   this.$bus.$emit('detailItemImageLoad')
        // }
        //解决办法2在首页的destory方法中添加离开时消除全局事件监听
        this.$bus.$emit('itemImageLoad')
				
			},
      itemClick(){
        this.$router.push('/detail/' + this.goodsItem.iid)
      }
		}
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }
  .goods img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 0;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
