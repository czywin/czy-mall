<template>
  <div>
    <swiper>
       <swiper-item v-for="(item,index) in banners" :key="index">
         <a :href="item.link">
           <img :src="item.image" @load="imageLoad">
         </a>
       </swiper-item>
     </swiper>
  </div>
</template>

<script>
   import {Swiper,SwiperItem} from 'components/common/swiper/index.js'
  export default{
    name:"HomeSwiper",
    props:{
      banners:{
        type:Array,
        default(){
          return []
        }
      }
    },
    data(){
      return{
        isLoad:false
      }
    },
    components:{
      Swiper,
      SwiperItem
    },
    methods:{
      imageLoad(){//不需要多次发送加载完成事件，只需要发送一次就可以了，因为只要有一张图片加载完成即可知道高度offsetTop
        if(!this.isLoad){
          this.$emit('swiperImageLoad')
          this.isLoad = true
        } 
      }

    }
  }
</script>

<style>
</style>
