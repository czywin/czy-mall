<template>
  <div id="detial-nav-bar">
     <nav-bar>
        <div slot="left" class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" />
        </div>
        <div slot="center" class="title">
          <div class="title-item"
               v-for="(item,index) in titles"
               :key="index"
               :class="{active:index === currentIndex}"
               @click="titleClick(index)">{{item}}</div>
        </div>
     </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  export default{
    name:"DetailNavBar",
    components:{
      NavBar
    },
    data() {
      return{
        titles:['商品','参数','评论','推荐'],
        currentIndex:0
      }
    },
    methods:{
      titleClick(index){
        this.currentIndex = index
        this.$emit('titleClick',index)
      },
      backClick(){
        //返回上一个页面
        // this.$router.go(-1)
        this.$router.back()
      }
    }
  }
</script>

<style scoped="scoped">
  .title{
    display: flex;
    font-size: 12px;
  }
  .title-item{
    flex: 1;
  }
  .active{
    color: var(--color-high-text);
  }
  .back img{
    margin-top: 10px;
    width: 14px;
    height: 14px;
  }
</style>
