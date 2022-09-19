<script setup>
import {shallowRef} from "vue";

let whichComponents = shallowRef(CesiumLine)
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import CesiumLine from './components/CesiumLine.vue'
import PolylineVolume from './components/PolylineVolume.vue'
function handleClick(event){
  console.log(event.target.id)
  switch (event.target.id) {
    case 'cesiumLine': whichComponents.value = CesiumLine; break;
    case 'polylineVolume': whichComponents.value = PolylineVolume ;break;
  }
  console.log(whichComponents)
}
</script>

<template>
<!--  <CesiumLine msg="Vite + Vue" />-->
  <div class="display_components" @click="handleClick">
    <button id="cesiumLine">CesiumLine</button>
    <button id="polylineVolume">PolylineVolume</button>
  </div>
  <component :is="whichComponents" :msg="whichComponents"></component>
<!--  <PolylineVolume msg="Customer Components"/>-->
</template>

<style scoped>
.display_components{
  display: flex;
  flex-direction: row;
  background-color: aquamarine;
}
</style>
