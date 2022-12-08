<template>
  <div id="cesiumContainer">
    <div id="firstViewer" class="subViewer"></div>
    <div id="secondViewer" class="subViewer"></div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import * as Cesium from "cesium";
import 'leaflet/dist/leaflet.css'
import  L from "leaflet"
onMounted(() => {
  window.viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
    },),
    geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
    navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false,
  })
  viewer.scene.globe.depthTestAgainstTerrain = true
  viewer.cesiumWidget.creditContainer.style.display = "none"

  window.firstViewer = new Cesium.Viewer("firstViewer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
    },),
    geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
    navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false,
  })
  firstViewer.cesiumWidget.creditContainer.style.display = "none"
  let control = firstViewer.scene.screenSpaceCameraController;
  control.enableRotate = false;
  control.enableTranslate = false;
  control.enableZoom = false;
  control.enableTilt = false;
  control.enableLook = false;


  // 第二个视图的同步
  let map = L.map('secondViewer')
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
  }).addTo(map);

  //视图的同步
  let syncFirstViewer = function () {
    // 获取当前镜头位置的笛卡尔坐标
    let cameraPos = viewer.camera.position;
    // 获取当前坐标系标准
    let ellipsoid = viewer.scene.globe.ellipsoid;
    // 根据坐标系标准，将笛卡尔坐标转换为地理坐标
    let cartographic = ellipsoid.cartesianToCartographic(cameraPos);
    // 获取镜头的lon,lat,height
    let lon = Cesium.Math.toDegrees(cartographic.longitude)
    let lat = Cesium.Math.toDegrees(cartographic.latitude)
    let height = cartographic.height;
    let zoomLevel
    if (height <= 800){
      zoomLevel = 16
    }else  if (height <= 1500) {
      zoomLevel = 15
    } else if (height <= 3000) {
      zoomLevel = 14
    } else if (height <= 10000) {
      zoomLevel = 13
    } else if (height <= 20000) {
      zoomLevel = 12
    } else if (height <= 30000) {
      zoomLevel = 11
    } else if (height <= 50000) {
      zoomLevel = 10
    } else if (height <= 91306) {
      zoomLevel = 9
    } else if (height <= 131306) {
      zoomLevel = 8
    } else if (height <= 531306) {
      zoomLevel = 7
    } else if (height <= 831306) {
      zoomLevel = 6
    } else if (height <= 2195110) {
      zoomLevel = 5
    } else if (height <= 3693242) {
      zoomLevel = 4
    } else {
      zoomLevel = 3
    }
    // 指定中心点
    let center = L.latLng(lat, lon);
    map.setView(center, zoomLevel);

    firstViewer.camera.flyTo({
      destination: cameraPos,
      orientation: {
        heading: viewer.camera.heading,
        pitch: viewer.camera.pitch,
        roll: viewer.camera.roll
      },
      duration: 0.0
    });
  };
  //viewer.camera.changed.addEventListener(syncViewer);//卡顿
  viewer.scene.preRender.addEventListener(syncFirstViewer);//成功
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

.subViewer {
  position: absolute;
  z-index: 99;
  left: 5px;
  width: 300px;
  height: 200px;
  background-color: white;
}

#firstViewer {
  top: 5px;
}

#secondViewer {

  top: 210px;
}
</style>