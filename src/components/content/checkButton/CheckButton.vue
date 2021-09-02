<template>
  <div class="check-button" :class="{check:isChecked}">
    <img src="~assets/img/cart/tick.svg" />
  </div>
</template>

<script>
  export default{
    name:"CheckButton",
    props:{
      isChecked:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style scoped="scoped">
  .check-button{
    border: 1px solid #666666;
    border-radius: 50%;
  }
  .check{
    background-color: var(--color-tint);
    border-color: var(--color-tint);
  }
</style>
