<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default{
    name:"Toast",
    props:{
      // message:{
      //   type:String,
      //   default:''
      // },
      // show:{
      //   type:Boolean,
      //   default:false
      // }
    },
    data(){
      return {
        message:'',
        isShow:false
      }
    },
    methods:{
      //封装使用toast
      show(message,duration=2000){
        this.isShow = true;
        this.message = message

        setTimeout(() => {
          this.isShow = false;
          this.message = ''
        },duration)
      }
    }
  }
</script>

<style scoped="scoped">
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 5px 8px;
    /* width: 100px;
    height: 40px; */
    text-align: center;
    line-height: 40px;
    border-radius: 5px;
    color: #FFFFFF;
    background-color: rgba(0,0,0,.7);

    z-index: 99;
  }
</style>
