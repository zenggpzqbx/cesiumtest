<template>
  <div class="display_components" @click="handleClick">
    <button id="cesiumLine">CesiumLine</button>
    <button id="polylineVolume">PolylineVolume</button>
  </div>
</template>

<script>
import CesiumLine from "./CesiumLine.vue";
import PolylineVolume from "./PolylineVolume.vue";
import router from "../router/index.js";

export default {
  name: "Header.vue",
  methods: {
    handleClick(event) {
      console.log(event.target.id)
      switch (event.target.id) {
        case 'cesiumLine':
          router.push(`CesiumLine`)
          break;
        case 'polylineVolume':
          router.push(`PolylineVolume`)
          break;
      }
    }
  }
}
</script>

<style scoped>
.display_components{
  background-color: #535bf2;
}
</style>