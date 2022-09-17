<template>
  <div id="cesiumContainer">
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import initViewer from "../assets/js/initViewer";
import * as Cesium from "cesium";
defineProps({
  msg: String
})
onMounted(()=>{
  let viewer = initViewer.init()
   viewer.entities.add({
    name:"Red tube with rounded corners",
    polylineVolume:{
      positions: Cesium.Cartesian3.fromDegreesArray([
        -85.0,
        32.0,
        -85.0,
        36.0,
        -89.0,
        36.0,]),
      shape: computeCircle(60000.0),
      material: Cesium.Color.RED,
    }
  })
  viewer.entities.add({
    name:'Green box with beveled corners and outline',
    polylineVolume:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
        -90.0,
        32.0,
        0.0,
        -90.0,
        36.0,
        0.0,
        -94.0,
        36.0,
        0.0,
      ]),
      // shape中的坐标值只是为了确定几何的形状，其具体位置，根据position指定的位置而定。
      // 根据下面加载的两条线，可以看出，几何形状的中心是线的具体位置。
      shape:[
        new Cesium.Cartesian2(-50000, -50000),
        new Cesium.Cartesian2(50000, -50000),
        new Cesium.Cartesian2(50000, 50000),
        new Cesium.Cartesian2(-50000, 50000),
      ],
      material:Cesium.Color.GREEN.withAlpha(0.5),
      cornerType:Cesium.CornerType.MITERED,
      outline:true,
      outlineColor:Cesium.Color.BLACK
    }
  })
  viewer.entities.add({
    name:"line",
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
        -90.0,
        32.0,
        100000,
        -90.0,
        36.0,
        100000,
        -94.0,
        36.0,
        100000,
      ]),
      width:5,
      material: Cesium.Color.BLUE
    }
  })
  viewer.entities.add({
    name:"line",
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
        -90.0,
        32.0,
        50000,
        -90.0,
        36.0,
        50000,
        -94.0,
        36.0,
        50000,
      ]),
      width:5,
      material:Cesium.Color.AQUA
    }
  })
  viewer.entities.add({
    name:"line",
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
        -90.0,
        32.0,
        0,
        -90.0,
        36.0,
        0,
        -94.0,
        36.0,
        0,
      ]),
      width:5,
      material:Cesium.Color.RED
    }
  })
  viewer.zoomTo(viewer.entities)
})
function computeCircle(radius) {
  const positions = [];
  for (let i = 0; i < 360; i++) {
    const radians = Cesium.Math.toRadians(i);
    positions.push(
        new Cesium.Cartesian2(
            radius * Math.cos(radians),
            radius * Math.sin(radians)
        )
    );
  }
  return positions;
}
</script>

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