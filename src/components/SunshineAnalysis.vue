<template>
  <div id="cesiumContainer">
    <div id="content">
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import * as Cesium from "cesium";
let targetY = ref(0)
let pickPlane = undefined
onMounted(()=>{
  const clock = new Cesium.Clock({
    startTime: Cesium.JulianDate.fromIso8601("2013-12-25"),
    currentTime: Cesium.JulianDate.fromIso8601("2013-12-25"),
    stopTime: Cesium.JulianDate.fromIso8601("2013-12-26"),
    clockRange: Cesium.ClockRange.LOOP_STOP, // loop when we hit the end time
    clockStep: Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER,
    multiplier: 4000, // how much time to advance each tick
    shouldAnimate: true, // Animation on by default
  });
  //初始化视图
  window.viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
    },),
    geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
    navigationHelpButton: false, animation: true, timeline: true, fullscreenButton: false,
    clockViewModel: new Cesium.ClockViewModel(clock),
  })
  viewer.scene.globe.depthTestAgainstTerrain = true

  viewer.scene.globe.enableLighting = true
  viewer.shadows = true
  let tileSet = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: '../../BatchTableHierarchy/tileset.json',
  }))
  viewer.zoomTo(tileSet)
})
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#cesiumContainer {
  position: relative;
  width: 100%;
  height: 100%;
}
#content{
  position: absolute;
  z-index: 100;
  left: 10px;
  top: 10px;
}
</style>