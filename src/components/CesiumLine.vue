<script setup>
import {onMounted, ref} from 'vue'
import * as Cesium from 'cesium'

defineProps({
  msg: String
})
let count = ref(0)

function init() {
  let viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
    }),
    geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
    navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false,
  })
  viewer.cesiumWidget.creditContainer.style.display = "none"


  viewer.entities.add({
    name: 'Red line on terrain',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
      width: 5,
      material: Cesium.Color.RED,

    }
  })
  viewer.entities.add({
    name: 'Red line on terrain',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
      width: 5,
      material: Cesium.Color.GREEN,
      clampToGround: true,
      arcType: Cesium.ArcType.RHUMB
    }
  })
  viewer.entities.add({
    name: 'Red line on terrain',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray([-75, 37, -125, 37]),
      width: 10,
      material: new Cesium.PolylineGlowMaterialProperty({
        glowPower: 0.9,
        taperPower: 1,
        color: Cesium.Color.CORNFLOWERBLUE
      })
    }
  })
  viewer.entities.add({
    name: 'outline',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -75,
        39,
        250000,
        -125,
        39,
        250000,
      ]),
      width: 5,
      material: new Cesium.PolylineOutlineMaterialProperty({
        color: Cesium.Color.ORANGE,
        outlineWidth: 2,
        outlineColor: Cesium.Color.BLACK
      })
    }
  })
  viewer.entities.add({
    name: 'outline',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -75,
        43,
        500000,
        -125,
        43,
        500000,
      ]),
      width: 15,
      arcType: Cesium.ArcType.NONE,
      material: new Cesium.PolylineArrowMaterialProperty(
          Cesium.Color.PURPLE
      )
    }
  })
  const line_last = viewer.entities.add({
    name: 'outline',
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -85.0,
        31.0,
        120000.0,
        -85.0,
        32.0,
        120000.0,
        -85.0,
        36.0,
        120000.0,
        -89.0,
        36.0,
        120000.0,
        -95.0,
        36.0,
        120000.0
      ]),
      width: 1,
      material: Cesium.Color.AQUA,
      arcType: Cesium.ArcType.RHUMB
    }
  })
  viewer.zoomTo(line_last)
}
onMounted(() => {
  init()
})

</script>

<template>
  <div id="cesiumContainer">
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

#cesiumContainer {
  width: 100%;
  height: 100%;
}
</style>
