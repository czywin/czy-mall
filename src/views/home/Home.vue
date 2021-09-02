<template>
  <div id="home">
    <nav-bar class="nav-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
   <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'


  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import {getHomeMultidata,getHomeGoods} from 'network/home.js'
  import {itemListenerMixin,backTopMixin} from 'common/mixin.js'

  export default{
    name:"Home",
    components:{
      NavBar,
      TabControl,
      HomeSwiper,
      RecommendView,
      FeatureView,
      GoodsList,
      Scroll,
    },
    // 在mixin里面进行了图片加载的监听事件，并在这里调用了
    mixins:[itemListenerMixin,backTopMixin],
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{ page:0, list:[]},
          'new':{ page:0, list:[]},
          'sell':{ page:0, list:[]}
        },
        currentType:'pop',

        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0

        // result:null
      }
    },
    created(){
      //请求多个数据
      this.getHomeMultidata()

      //请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted(){
      //以下代码进行了抽取，因为多个页面进行了复用

      // //1监听item中的图片加载完成
      // //调用防抖动函数，来防止频繁的进行刷新
      // // this.$refs.scroll是找到当前滚动的区域
      // let refresh = debounce(this.$refs.scroll.refresh,50)
      // //this.$refs.scroll只有在组件挂在完成以后才能拿到，所以不能写在created函数中

      // //对监听的事件进行保存
      // this.itemImgListener = () =>{
      //   //刷新重新计算可滚动区域
      //    refresh()
      // }
      // //监听图片是否加载完成
      // this.$bus.$on('itemImageLoad',this.itemImgListener)
    },
    computed:{
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0,this.saveY,50)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    methods:{
      // 事件监听的相关方法
      tabClick(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        //使得所选择的类型保持
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      contentScroll(position){
        //判断BackTop是否显示
        this.listenShowBackTop(position)
        //决定tabControl是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore(){
        this.getHomeGoods(this.currentType)
      },
      swiperImageLoad(){
        //获取tabControl的offsetTop,不能在mounted内获取，因为图片还没有加载完成，获取的是不正确的
        //任何组件都有$el属性，用来获取组件中的标签元素

        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

      },
      // 网络请求数据的相关方法
      getHomeMultidata(){
        getHomeMultidata().then(res => {
         this.banners = res.data.data.banner.list
         this.recommends = res.data.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page + 1
        getHomeGoods(type,page ).then(res => {
          // 采用...的形式将res.data.data.list请求到的多个数组元素解析并通过push的方法加载到新的数组中去
          this.goods[type].list.push(...res.data.data.list)
          this.goods[type].page += 1

          //完成上拉加载动作之后要finish，这样可以进行多次上拉加载数据
          this.$refs.scroll.finishPullUp()

        })
      }
    }
  }
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .nav-bar{
    color: #fff;
    background-color: var(--color-tint);
    /* 在浏览器使用原生滚动时为了让导航不跟着一起滚动设置的，但是使用了better-scroll之后就不需要设置了
     因为scroll可以实现局部滚动，在自己的区域内实现滚动*/
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index:9; */
  }

  .content{
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    right: 0;
    left: 0;
  }
  .tab-control{
    position: relative;
    z-index: 9;
  }
</style>
