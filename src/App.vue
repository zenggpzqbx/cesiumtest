<script setup>
import Header from './components/Header.vue'

</script>

<template>
  <Header></Header>
  <router-view class="middle"></router-view>
</template>

<style scoped>
.middle{
  background-color: aqua;
  width: 500px;
  height: 500px;
}
</style>
