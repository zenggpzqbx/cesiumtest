<template>
  <el-menu @select="handleSelected">
    <el-menu-item class="item_style" index="camera">Camera教程</el-menu-item>
    <el-menu-item class="item_style" index="entity">Entity教程</el-menu-item>
    <el-menu-item class="item_style" index="coordinate">坐标系转换</el-menu-item>
    <el-menu-item class="item_style" index="tileset">三维剖切</el-menu-item>
    <el-menu-item class="item_style" index="SunshineAnalysis">日照分析</el-menu-item>
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
    case 'coordinate':
      router.push(`CoordinatesystemConversion`);
      break;
    case 'tileset':
      router.push(`TilesetCut`);
      break;
    case 'SunshineAnalysis':
      router.push(`SunshineAnalysis`);
      break;

  }
}
</script>

<style scoped>

.item_style {
  height: 40px;
}
</style>