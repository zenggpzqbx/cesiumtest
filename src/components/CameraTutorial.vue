<template>
  <div id="cesiumContainer">
    <div class="content">
      <div>
        <el-button class="btn" @click = 'flyTo'>飞到指定位置</el-button>
        <el-button class="btn" @click = 'flyToRectangle'>飞到范围</el-button>
        <el-button class="btn" @click = 'flyToHPR'>飞到制定位置后执行函数</el-button>
        <el-button class="btn" @click = 'cameraZoomIn'>camera拉近方法1</el-button>
        <el-button class="btn" @click = 'cameraZoomOut'>camera拉远方法1</el-button>
        <el-button class="btn" @click="cameraZoomIn_two">camera拉近方法2</el-button>
        <el-button class="btn" @click="cameraZoomOut_two">camera拉远方法2</el-button>
      </div>
      <div>
        <el-button class="btn" type="primary" @click="moveForward">向前移动</el-button>
        <el-button class="btn" type="primary" @click="moveBackward">向后移动</el-button>
        <el-button class="btn" type="primary" @click="moveUp">向上移动</el-button>
        <el-button class="btn" type="primary" @click="moveDown">向下移动</el-button>
        <el-button class="btn" type="primary" @click="moveLeft">向左移动</el-button>
        <el-button class="btn" type="primary" @click="moveRight">向右移动</el-button>

        <el-button class="btn" type="primary" @click="lookUp">抬头</el-button>
        <el-button class="btn" type="primary" @click="lookDown">低头</el-button>
        <el-button class="btn" type="primary" @click="lookLeft">左转</el-button>
        <el-button class="btn" type="primary" @click="lookRight">右转</el-button>

        <el-button class="btn" type="primary" @click="twistLeft">逆时针旋转</el-button>
        <el-button class="btn" type="primary" @click="twistRight">顺时针旋转</el-button>
      </div>
      <div>
        <el-button class="btn" type="primary" @click="getPosition">获取相机位置</el-button>
        <el-button class="btn" type="primary" @click="getHPR">获取相机姿态</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import * as Cesium from "cesium";
onMounted(() => {
  //初始化视图
  window.viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
    }),
    geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
    navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false,
  })
  viewer.cesiumWidget.creditContainer.style.display = "none"
})

// 飞到指定位置
function flyTo() {
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(115.234, 40.453, 20000)
  })
}

//飞到一个矩形范围
function flyToRectangle() {
  viewer.camera.flyTo({
    destination: Cesium.Rectangle.fromDegrees(115, 20, 119, 20)
  })
}

// 飞到制定位置，with heading pitch roll
function flyToHPR() {
  viewer.camera.flyTo({
    destination : Cesium.Cartesian3.fromDegrees(-122.19, 46.25, 5000.0),
    complete:()=>{
      //console.log('您好，我是曾国平')
      const center = Cesium.Cartesian3.fromDegrees(-122.19, 46.25, 5000.0);
      const heading = Cesium.Math.toRadians(50.0);
      const pitch = Cesium.Math.toRadians(-20.0);
      const range = 5000.0;
      viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));
      // viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, -4790000.0, 30.0));
      alert('旋转视图试试！')
    }
  });
}

// 这种方法有些生硬
function cameraZoomIn() {
  let cameraPos = viewer.camera.position

  let ellipsoid = viewer.scene.globe.ellipsoid
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos)
  let height = cartographic.height
  viewer.camera.zoomIn(height/2)
}

function cameraZoomOut() {
  let cameraPos = viewer.camera.position
  let ellipsoid = viewer.scene.globe.ellipsoid
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos)
  let height = cartographic.height
  viewer.camera.zoomOut(height * 1.2)
}

function cameraZoomIn_two() {
  let cameraPos = viewer.camera.position
  console.log('cameraPos:',cameraPos)
  let ellipsoid = viewer.scene.globe.ellipsoid
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos)
  console.log('cartographic:',cartographic)
  let lon = Cesium.Math.toDegrees(cartographic.longitude)
  let lat = Cesium.Math.toDegrees(cartographic.latitude)
  let height = cartographic.height
  console.log(`lon: ${lon}  lat: ${lat}   height: ${height}`)
  console.log('newPosition:', Cesium.Cartesian3.fromDegrees(lon,lat,height))
  viewer.camera.flyTo({
    destination:Cesium.Cartesian3.fromDegrees(lon,lat,height/2),
    duration:1
  })
}
function cameraZoomOut_two() {
  let cameraPos = viewer.camera.position
  let ellipsoid = viewer.scene.globe.ellipsoid
  let cartographic = ellipsoid.cartesianToCartographic(cameraPos)
  let lon = Cesium.Math.toDegrees(cartographic.longitude)
  let lat = Cesium.Math.toDegrees(cartographic.latitude)
  let height = cartographic.height
  viewer.camera.flyTo({
    destination:Cesium.Cartesian3.fromDegrees(lon,lat,height * 2),
    duration:2
  })
}

function moveForward() {
  viewer.camera.moveForward(1000000)
}
function moveBackward() {
  viewer.camera.moveBackward(1000000)
}
function moveUp() {
  viewer.camera.moveUp(1000000)
}
function moveDown() {
  viewer.camera.moveDown(1000000)
}
function moveLeft() {
  viewer.camera.moveLeft(1000000)
}
function moveRight() {
  viewer.camera.moveRight(1000000)
}
function twistLeft() {
  viewer.camera.twistLeft(100)
}
function twistRight() {
  viewer.camera.twistRight(100)
}
function lookAt() {
  let heading = Cesium.Math.toRadians(60)
  let pitch = Cesium.Math.toRadians(0)
  let range = 1000
  viewer.camera.lookAt(Cesium.Cartesian3.fromDegrees(110, 36, 100),new Cesium.HeadingPitchRange(heading,pitch,range))
}
function lookUp() {
  viewer.camera.lookUp(Cesium.Math.toRadians(5))
}
function lookDown() {
  viewer.camera.lookDown(Cesium.Math.toRadians(5))
}
function lookLeft(){
  viewer.camera.lookLeft(Cesium.Math.toRadians(30))
}
function lookRight() {
  viewer.camera.lookRight(Cesium.Math.toRadians(30))
}
function getPosition() {
  console.log(viewer.camera.position)
}
function getHPR() {
  let heading = viewer.camera.heading
  let pitch = viewer.camera.pitch
  let roll = viewer.camera.roll
  console.log(`heading: ${heading}  pitch: ${pitch}  roll:${roll}`)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
#cesiumContainer{
  width: 100%;
  height: 100%;
}
.content{
  position: absolute;
  z-index: 99;
  background-color: white;
  margin: 0 5px 0 5px;
}
.btn{
  padding: 0 5px 0 5px;
}
</style>