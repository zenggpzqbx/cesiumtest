<template>
  <el-menu @select="handleSelected">
    <el-menu-item class="item_style" index="camera">Camera教程</el-menu-item>
    <el-menu-item class="item_style" index="entity">Entity教程</el-menu-item>
  </el-menu>
  <router-view class="middle"></router-view>
</template>

<script setup>
import router from "../router/index.js";

function handleSelected(index) {
  switch (index) {
    case 'camera':
      router.push(`CameraTutorial`);
      break;
    case 'entity':
      router.push(`EntityTutorial`);
      break;
  }
}
</script>

<style scoped>
.menu {
  height: 100%;
  width: 20%;
  border: #242424 solid 1px;
}

.item_style {
  height: 40px;
}
</style>