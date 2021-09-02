<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default{
    name:"Scroll",
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullUpLoad:{
        type:Boolean,
        default:false
      }
    },
    data() {
      return {
        scroll:null
      }
    },
    mounted() {
      //1创建better-scroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullUpLoad
      })

      //2监听滚动的位置
      if(this.probeType ===2 || this.probeType ===3){
        this.scroll.on('scroll',(position) => {
        // console.log(position)
        //哪里需要用到就在哪里监听,还要记得给BScroll对象的probeType传值
        this.$emit('scroll',position)
      })
      }


      //3监听上拉加载
      if(this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
        //哪里需要用到就在哪里监听发出去的事件
        this.$emit('pullingUp')
      })
      }

    },
    methods:{
      scrollTo(x,y,time=500){
        //先检测this.scroll是否为空，为空就停止后面的置顶操作，不为空则进行置顶
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finishPullUp(){
        //先检测this.scroll是否为空，为空就停止后面的完成操作，不为空则进行finish操作
        this.scroll && this.scroll.finishPullUp()
      },
      refresh(){
        // console.log('---')
        //先检测this.scroll是否为空，为空就停止后面的刷新操作，不为空则进行刷新
        this.scroll && this.scroll.refresh()
      },
      getScrollY(){
        //先检测this.scroll是否为空
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style>
</style>
