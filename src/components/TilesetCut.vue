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

  //初始化视图
  window.viewer = new Cesium.Viewer("cesiumContainer", {
    imageryProvider: new Cesium.UrlTemplateImageryProvider({
      url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
    },),
    geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
    navigationHelpButton: false, animation: true, timeline: true, fullscreenButton: false,
  })
  viewer.scene.globe.depthTestAgainstTerrain = true

  viewer.scene.globe.enableLighting = true
  viewer.shadows = true

  window.clippingPlanes = new Cesium.ClippingPlaneCollection({
    planes:[new Cesium.ClippingPlane(new Cesium.Cartesian3(0,0,-1), 0)],
  })
  console.log('clippingPlanes:', clippingPlanes)
  let tileSet = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
    url: '../../BatchTableHierarchy/tileset.json',
    clippingPlanes: clippingPlanes,
  }))
  viewer.zoomTo(tileSet)

  tileSet.readyPromise.then((tile) =>{
    //获取一高度值，这个值代表clippingPlanes的实际高度
    const boundingSphereCartographic = Cesium.Cartographic.fromCartesian(tile.boundingSphere.center)
    console.log('tile.root.transform:',tile.root.transform)
    const transformCenter = Cesium.Matrix4.getTranslation(tile.root.transform, new Cesium.Cartesian3())
    const transformCartographic = Cesium.Cartographic.fromCartesian(transformCenter)
    const  height = boundingSphereCartographic.height - transformCartographic.height
    //仅仅平移的仿射变换
    clippingPlanes.modelMatrix = Cesium.Matrix4.fromTranslation(new Cesium.Cartesian3(0, 0, height))

    viewer.entities.add({
      id: 'plane',
      position: tile.boundingSphere.center,
      plane: {
        material: Cesium.Color.WHITE.withAlpha(0.5),
        dimensions: new Cesium.Cartesian2(100, 100),
        plane: new Cesium.CallbackProperty(() => {
          clippingPlanes.get(0).distance = targetY.value
          return clippingPlanes.get(0)
        }, false)
      }
    })
  })

  viewer.screenSpaceEventHandler.setInputAction(e=>{
    const pick = viewer.scene.pick(e.position)
    if (Cesium.defined(pick) && Cesium.defined(pick.id) && Cesium.defined(pick.id.plane)){
      pickPlane = pick.id.plane
      pickPlane.material = Cesium.Color.WHITE.withAlpha(0.2);
      pickPlane.outlineColor = Cesium.Color.WHITE;
      viewer.scene.screenSpaceCameraController.enableInputs = false;
    }
  }, Cesium.ScreenSpaceEventType.LEFT_DOWN)
  viewer.screenSpaceEventHandler.setInputAction(e =>{
    console.log(e)
    if (Cesium.defined(pickPlane)){
      pickPlane.material = Cesium.Color.WHITE.withAlpha(0.5);
      pickPlane.outlineColor = Cesium.Color.WHITE;
      pickPlane = undefined;
    }
    viewer.scene.screenSpaceCameraController.enableInputs = true;
  }, Cesium.ScreenSpaceEventType.LEFT_UP)

  viewer.screenSpaceEventHandler.setInputAction((e)=>{
    if (Cesium.defined(pickPlane)){
      const deltaY = e.startPosition.y - e.endPosition.y
      console.log(`targetY: ${targetY.value} deltaY: ${deltaY}`)
      targetY.value += deltaY
    }
  }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
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