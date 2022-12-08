<template>
<div id="cesiumContainer">
  <div id="content">
    <el-button type="primary" @click="toRadians">空间直角坐标转经纬度（弧度）</el-button>
  </div>
</div>
</template>

<script setup>
import {onMounted} from "vue";
import * as Cesium from "cesium";
onMounted(()=>{
  //初始化视图
  window.viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
    }),
    geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
    navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false,
  })
  viewer.trackedEntity = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(112, 30, 10),
    model: {
      uri: '../../model/Cesium_Air.glb'
    }
  })
  //viewer.scene.globe.depthTestAgainstTerrain = true
  let entity = viewer.entities.add({
    label: {
      show: false,
      showBackground: true,
      font: "14px monospace",
      horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
      verticalOrigin: Cesium.VerticalOrigin.TOP,
      pixelOffset: new Cesium.Cartesian2(15, 0),
    }
  })
  //事件的另一种写法
  viewer.screenSpaceEventHandler.setInputAction((e)=>{
    // 获取鼠标点击位置的空间直角坐标
    // let car3 = viewer.scene.pickPosition(e.position)
    let car3 = viewer.camera.pickEllipsoid(e.position)

    //将空间直角坐标转换成弧度制的地理坐标
    let cartographic1 = Cesium.Cartographic.fromCartesian(car3)
    let cartographic2 = Cesium.Ellipsoid.WGS84.cartesianToCartographic(car3)
    console.log('cartographic1::',cartographic1)
    console.log('cartographic2::',cartographic2)

    //将弧度坐标转换成以度为单位的坐标
    let lon = Cesium.Math.toDegrees(cartographic1.longitude)
    let lat = Cesium.Math.toDegrees(cartographic1.latitude)
    // let height = cartographic1.height

    if (car3){
      entity.position = car3
      entity.label.show = true
      entity.label.text = `lon: ${lon} \nlat: ${lat}`
    }else {
      entity.label.show = false
    }

  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
})
function toRadians(){
}
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