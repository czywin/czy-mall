<template>
  <div id="detial">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
      <!-- 属性：topImages 但是传入值的时候要写成：top-images -->
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" class="back-top"></back-top>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <!-- <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  // import Toast from 'components/common/toast/Toast.vue'

  import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
  import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
  import {debounce} from 'common/utils.js'
  export default{
    name:"Detail",
    components:{
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList,
      Scroll
      // Toast
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        iid:null,
        topImages:[],
        goods:{},
        shop:{},
        detailInfo:{},
        paramInfo:{},
        commentInfo:{},
        recommends:[],
        itemImageListener:null,
        themeTopYs:[],
        getThemeTopY:null,
        currentIndex:0
        // message:'',
        // show:false
      }
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid

      //2.根据iid请求详情数据
      getDetail(this.iid).then( res => {
        console.log(res)
        const data = res.data.result
        //1.获取顶部轮播图的数据
        this.topImages = data.itemInfo.topImages

        //2.获取商品信息,首先将一些分散复杂的数据整合到一起，封装成一个对象在去请求数据
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)

        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)

        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo

        //5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

        //6.获取评论信息，有些商品是没有品论信息的，所以要进行判断
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.data.list
      })

      //4.给getThemeTopY赋值，并且进行防抖操作
      this.getThemeTopY= debounce(() => {
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
      },100)

    },
    methods:{
      imageLoad(){
        //refresh在mixin进行封装了，在所有图片加载完成后进行一次刷新
        this.refresh()
        //在这里调用获取到的offsettop值才是正确的，因为这里是对所有图片加载完成后的刷新，所以能获取到正确的offsettop值
        this.getThemeTopY()
      },
      titleClick(index){
        //点击标题跳转到对应主题
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position){
        //滚动到相应位置时，标题自动发生改变
        //1.获取当前位置的Y值
        const positionY = -position.y
        // console.log(positionY)
        // //2.将positionY与主题位置的值进行比较
        let length = this.themeTopYs.length
        // for(let i = 0;i < length; i++){
          //1.普通做法
          //若当前index是保持一致的就不需要跳转，防止赋值的操作过于频繁；否则进行比较在更改相应的currentIndex
          // if(this.currentIndex !== i && ((i < length - 1 && positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) || (i === length-1 && positionY > this.themeTopYs[i]))){
          //   this.currentIndex = i
          //   this.$refs.nav.currentIndex = this.currentIndex
          // }
          // }
          for(let i = 0;i < length-1;i++){//-1是因为最后一个值是添加进去为了方便比较的，但是不用进行跟踪
            //2.hack做法，手动在themeTopYs后面在添加一个比较大的值
            if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1])){
                this.currentIndex = i
                this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //是否显示回到顶部
        this.listenShowBackTop(position)
      },
      addToCart(){
        //获取购物车需要显示的信息
        const product ={}
          product.image = this.topImages[0];
          product.title = this.goods.title;
          product.desc = this.goods.desc;
          product.price =  this.goods.nowPrice;
          product.iid = this.iid;

         //将商品加入到购物车里(首先添加到vuex里进行保存),要修改state的数量要通过mutation来进行修改
         // this.$store.commit('addCart',product)
         //直接在mutation里面进行修改，无法记录到修改操作，因此要采用异步操作actions来提交给mutation
         //1.在不使用封装的toast情况下使用弹窗
         // this.$store.dispatch('addCart',product).then(res => {
         //   //是否显示弹窗
         //    this.show = true;
         //    this.message = res;
         //    //定时消失
         //    setTimeout(() => {
         //      this.show = false;
         //      this.message = '';
         //    },1500)
         // })
         //2在使用toast进行弹窗提示
         this.$store.dispatch('addCart',product).then(res => {
           this.$toast.show(res,2000)
         })
      }
    },
    destroyed() {
      this.$bus.$off('itemImageLoad',this.itemImageListener)
    }

  }
</script>

<style scoped>
  #detial{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav{
    position: relative;
    background-color: #fff;
    z-index: 11;
  }
  .content{
   height: calc(100% - 44px - 49px);

  }
  .back-top{
    z-index: 10000;
  }
</style>
