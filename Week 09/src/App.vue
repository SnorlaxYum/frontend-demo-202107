<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'

</script>

<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :router="true"
  >
    <el-menu-item index="/demo1">json 2 form</el-menu-item>
    <el-menu-item index="/demo2">form dragging</el-menu-item>
  </el-menu>
  <div class='bottom'>
    <router-view/>
  </div>
</template>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
}
.bottom {
  height: calc(100% - 61px);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
.modelTextarea textarea {
  height: 100%;
}
</style>
