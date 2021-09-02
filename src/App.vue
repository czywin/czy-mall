<template>
  <div id="app">
    <!-- 除去Detail组件之外的其他组件都保持 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
		<main-tabbar></main-tabbar>
  </div>
</template>

<script>
import  MainTabbar from 'components/content/mianTabbar/MainTabBar.vue'

export default {
  name: 'App',
  components: {
   MainTabbar
  }
}
</script>

<style>
	@import "./assets/css/base.css";
</style>
