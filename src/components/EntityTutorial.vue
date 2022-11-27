<template>
  <div id="cesiumContainer">
    <div id="content">
      <div class="btn_style">
        <el-button type="primary" @click="addPoint">Point</el-button>
      </div>
      <div class="btn_style">
        <el-button type="primary" @click="addPolyline">Polyline:材质颜色</el-button>
        <el-button type="primary" @click="addGlowPolyline">Polyline:材质Glow</el-button>
        <el-button type="primary" @click="addOutlinePolyline">Polyline:材质轮廓线</el-button>
        <el-button type="primary" @click="addDashPolyline">Polyline:材质虚线</el-button>
        <el-button type="primary" @click="addArrowPolyline">Polyline:材质箭头</el-button>
      </div>
      <div class="btn_style">
        <el-button type="primary" @click="addColorPolygon">Polygon:材质：颜色</el-button>
        <el-button type="primary" @click="addExtrudePolygon">Polygon：扩展高度</el-button>
        <el-button type="primary" @click="addTexturedPolygon">Polygon：材质：图片，点高度</el-button>
        <el-button type="primary" @click="addOrangePolygon">Polygon：材质：extrudeHeight = 0</el-button>
        <el-button type="primary" @click="addVerticalPolygon">Polygon：材质：垂直面</el-button>
      </div>
      <div class="btn_style">
        <el-button type="primary" @click="addWall">wall:单面墙</el-button>
        <el-button type="primary" @click="addWall2">wall:围墙</el-button>
      </div>
      <div class="btn_style">
        <el-button type="primary" @click="addRectangle">矩形：颜色</el-button>
        <el-button type="primary" @click="addRotationRectangle">矩形：旋转</el-button>
        <el-button type="primary" @click="addImageRotationRectangle">矩形：旋转图片</el-button>
      </div>
      <div class="btn_style">
        <el-button type="primary" @click="addLabel">Label：文本</el-button>
        <el-button type="primary" @click="addFillColorLabel">Label：文本填充色，轮廓色</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import * as Cesium from "cesium";

onMounted(() => {
  Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxY2ZhMjdiZi0yOGI3LTRmNmMtYmFjZS1mYTBjMGEyZmJjMjgiLCJpZCI6OTcyNjAsImlhdCI6MTY1NjAzOTg3N30.bSMrfN_5VJhLrnMgWPllm4dlFV9E_0azlQX0dEO-ffA'
  //初始化视图
  window.viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
    }),
    geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
    navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false,
  })
  viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
    url: Cesium.IonResource.fromAssetId(3956),
    requestWaterMask: true, // 请求水体效果所需要的海岸线数据
    requestVertexNormals: true, // 请求地形照明数据
  });
  viewer.scene.globe.depthTestAgainstTerrain = true

  viewer.cesiumWidget.creditContainer.style.display = "none"
})
function addPoint() {
  viewer.entities.removeAll()
  viewer.trackedEntity = viewer.entities.add({
    id: 0,
    name: 'point',
    position: Cesium.Cartesian3.fromDegrees(110.234, 36.789, 100),
    point: {
      show: true,
      color: Cesium.Color.AQUA,
      pixelSize: 10,
      outlineColor: Cesium.Color.RED,
      outlineWidth: 2,
      heightReference: Cesium.HeightReference.RELATIVE_TO_GROUND,
      // scaleByDistance: new Cesium.NearFarScalar(0,1,1000,0.1),
      // translucencyByDistance: new Cesium.NearFarScalar(0,1,1000,0.5),
      // distanceDisplayCondition:new Cesium.DistanceDisplayCondition(0, 1000)
    }
  })
}
//可以设置预定义的颜色，也可以自己定义，
// 方法一：Cesium.Color.fromCssColorString('#67ADDF')
// 方法二：Cesium.Color.fromBytes(red, green, blue, alpha, result)
// 方法三：new Cesium.Color(red, green, blue, alpha)
function addPolyline() {
  viewer.entities.removeAll()
  let line = viewer.entities.add({
    id:1,
    name:'line',
    polyline:{
      positions: Cesium.Cartesian3.fromDegreesArray([113.234,36.786,116.256,36.786]),
      width:5,
      material: Cesium.Color.RED,
      clampToGround:true
    }
  })
  viewer.zoomTo(line)
}
function addGlowPolyline() {
  viewer.entities.removeAll()
  let line = viewer.entities.add({
    id:2,
    name:'line',
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArray([113.234,36.786,116.256,36.786]),
      width:500,
      material: new Cesium.PolylineGlowMaterialProperty({color:Cesium.Color.AQUA,glowPower:0.5,taperPower:1}),
      clampToGround:true
    }
  })
  viewer.zoomTo(line)
}
function addOutlinePolyline() {
  viewer.entities.removeAll()
  let line = viewer.entities.add({
    id:2,
    name:'line',
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArray([113.234,36.786,116.256,36.786]),
      width:10,
      material: new Cesium.PolylineOutlineMaterialProperty({color:Cesium.Color.RED,outlineColor:Cesium.Color.AQUA,outlineWidth:4}),
      clampToGround:true
    }
  })
  viewer.zoomTo(line)
}
function addDashPolyline() {
  viewer.entities.removeAll()
  let line = viewer.entities.add({
    id:2,
    name:'line',
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArray([113.234,36.786,116.256,36.786]),
      width:10,
      material: new Cesium.PolylineDashMaterialProperty({color:Cesium.Color.BLUE,gapColor:Cesium.Color.AQUA,dashLength:100}),
      clampToGround:true
    }
  })
  viewer.zoomTo(line)
}
function addArrowPolyline() {
  viewer.entities.removeAll()
  let line = viewer.entities.add({
    id:2,
    name:'line',
    polyline:{
      positions:Cesium.Cartesian3.fromDegreesArray([113.234,36.786,116.256,36.786]),
      width:50,
      material: new Cesium.PolylineArrowMaterialProperty(Cesium.Color.GREEN),
      clampToGround:true
    }
  })
  viewer.zoomTo(line)
}

function addColorPolygon() {
  viewer.entities.removeAll()
  let colorPolygon = viewer.entities.add({
    id: 0,
    name: 'Material:Color',
    polygon: {
      hierarchy: {positions: Cesium.Cartesian3.fromDegreesArray([-115.0, 37.0, -115.0, 32, -107.0, 33.0, -102.0, 31.0, -102.0, 35.0])},
      material: Cesium.Color.RED,
    }
  })
  viewer.zoomTo(colorPolygon)
}
function addExtrudePolygon() {
  viewer.entities.removeAll()
  let extrude = viewer.entities.add({
    id: 1,
    name: 'ExtrudeHeightPolygon',
    polygon: {
      hierarchy: {
        positions: Cesium.Cartesian3.fromDegreesArray([-108.0,
          42.0,
          -100.0,
          42.0,
          -104.0,
          40.0])
      },
      extrudedHeight: 500000.0,
      closeTop: false,
      closeBottom: false,
      material:Cesium.Color.GREEN,
    }
  })
  viewer.zoomTo(extrude)
}
function addOrangePolygon() {
  viewer.entities.removeAll()
  let polygon = viewer.entities.add({
    polygon:{
      hierarchy:{positions: Cesium.Cartesian3.fromDegreesArrayHeights([
          -108.0,
          25.0,
          100000,
          -100.0,
          25.0,
          100000,
          -100.0,
          30.0,
          100000,
          -108.0,
          30.0,
          300000,])},
      perPositionHeight:true,
      material:Cesium.Color.ORANGE.withAlpha(0.5),
      extrudedHeight: 0
    }
  })
  viewer.zoomTo(polygon)
}

function addTexturedPolygon() {
  viewer.entities.removeAll()
  let texturePolygon = viewer.entities.add({
    polygon:{
      hierarchy:{positions:Cesium.Cartesian3.fromDegreesArrayHeights([
          -118.4,
          40.4,
          50000,
          -118.4,
          37,
          30000,
          -114.2,
          38.0,
          35000,
          -108.0,
          37,
          30000,
          -108.0,
          40.4,
          50000,
        ]),},
      textureCoordinates: {
        positions: [
          new Cesium.Cartesian2(0, 1),
          new Cesium.Cartesian2(0, 0),
          new Cesium.Cartesian2(0.5, 0),
          new Cesium.Cartesian2(1, 0),
          new Cesium.Cartesian2(1, 1),
        ],
      },
      perPositionHeight:true, //true:使用坐标点的高程，false:不使用坐标点中的高程，即便有高程值。
      extrudedHeight:0,
      fill:false,
      material: new Cesium.ImageMaterialProperty({image: '/src/images/Cesium_Logo_Color.jpg'}),
      outline:true,
      outlineColor: Cesium.Color.RED,
      outlineWidth:500
    }
  })
  viewer.zoomTo(texturePolygon)
}
function addVerticalPolygon() {
  viewer.entities.removeAll()
  let polygon = viewer.entities.add({
    polygon:{
      hierarchy:{positions: Cesium.Cartesian3.fromDegreesArrayHeights([      -90.0,
          41.0,
          0.0,
          -85.0,
          41.0,
          500000.0,
          -80.0,
          41.0,
          0.0,])},
      material: Cesium.Color.CYAN.withAlpha(0.5),
      outline:true,
      outlineColor:Cesium.Color.BLACK,
      perPositionHeight:true,
    }
  })
  viewer.zoomTo(polygon)
}
function addWall() {
  viewer.entities.removeAll()
  let wall = viewer.entities.add({
    id:0,
    name:'wall',
    wall:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
          -115.0,
        44.0,
        200000.0,
        -90.0,
        44.0,
        200000.0,]),
      minimumHeights:[100000,100000],
      material: Cesium.Color.RED
    }
  })
  viewer.zoomTo(wall)
}
function addWall2() {
  viewer.entities.removeAll()
  let wall = viewer.entities.add({
    wall:{
      positions:Cesium.Cartesian3.fromDegreesArrayHeights([
          -107.0,
        43.0,
        100000.0,
        -97.0,
        43.0,
        200000.0,
        -97.0,
        40.0,
        100000.0,
        -107.0,
        40.0,
        200000.0,
        -107.0,
        43.0,
        100000.0,]),
      minimumHeights:[50000.0,50000.0,50000.0,50000.0,50000.0],
      maximumHeights:[300000.0,300000.0,300000.0,300000.0,300000.0],
      material: Cesium.Color.GREEN,
      outline:true,
      outlineColor:Cesium.Color.BLACK,
      outlineWidth:5
    }
  })
  viewer.zoomTo(wall)
}
function addRectangle() {
  viewer.entities.removeAll()
  let rectangle = viewer.entities.add({
    rectangle:{
      coordinates: Cesium.Rectangle.fromDegrees(-110.0,20,-80,25),
      material: Cesium.Color.RED.withAlpha(0.5)
    }
  })
  viewer.zoomTo(rectangle)
}

function addRotationRectangle(){
  viewer.entities.removeAll()
  let rectangle = viewer.entities.add({
    rectangle:{
      coordinates:Cesium.Rectangle.fromDegrees(
          -110.0,
          30.0,
          -100.0,
          40.0),
      material: Cesium.Color.GREEN.withAlpha(0.5),
      rotation:Cesium.Math.toRadians(45),
      height:100000,
      extrudedHeight: 0,
      outline:true,
      outlineColor:Cesium.Color.BLACK
    }
  })
  viewer.zoomTo(rectangle)
}
function addImageRotationRectangle() {
  viewer.entities.removeAll()
  let rectangle = viewer.entities.add({
    rectangle:{
      coordinates: Cesium.Rectangle.fromDegrees(-92.0, 30.0, -76.0, 40.0),
      material: '/src/images/Cesium_Logo_Color.jpg',
      rotation: new Cesium.CallbackProperty(getRotationValue,false),
      stRotation: new Cesium.CallbackProperty(getRotationValue, false),
    }
  })
  viewer.zoomTo(rectangle)
}

function addLabel() {
  viewer.entities.removeAll()
  let label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
    label:{
      text: 'Philadelphia'
    }
  })
  viewer.zoomTo(label)
}
function addFillColorLabel() {
  viewer.entities.removeAll()
  let label = viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(-75.1641667, 39.9522222),
    label: {
      text: 'Philadelphia',
      font: '100px Helvetica',
      // fillColor: Cesium.Color.GREEN,
      outlineColor: Cesium.Color.RED,
      outlineWidth: 2,
      style: Cesium.LabelStyle.OUTLINE
    }
  })
  viewer.zoomTo(label)
}
let rotation = Cesium.Math.toRadians(30);
function getRotationValue() {
  rotation += 0.005;
  return rotation;
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
.btn_style{
  display: flex;
  justify-items: flex-start;
  padding: 0;
  margin: 0 0 5px 0;
}
</style>