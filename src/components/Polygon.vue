<template>
  <div id="cesiumContainer">
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import initViewer from "../assets/js/initViewer";
import * as Cesium from "cesium";

let rotation = 0
let sep = 1
let material = ref('')
defineProps({
  msg: String
})
onMounted(() => {
  let viewer = initViewer.init()
  const cyanPolygon = viewer.entities.add({
    name: "Cyan vertical polygon with per-position heights and outline",
    polygon: {
      hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
        -90.0,
        41.0,
        0.0,
        -90.0,
        41.0,
        30000.0,
        -89.0,
        41.0,
        30000.0,
        -89.0,
        41.0,
        0.0,
      ]),
      material:'/src/images/Cesium_Logo_Color1.jpg',
      perPositionHeight: true,
      outline: true,
      outlineColor: Cesium.Color.BLACK,
    },
  });
  setInterval(function (){
    viewer.zoomTo(cyanPolygon, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(rotation),-Cesium.Math.toRadians(20), 400000))
    console.log(rotation)
    if (rotation === 90){
      cyanPolygon.polygon.material = '/src/images/Cesium_Logo_Color2.jpg'
    }else if (rotation === 0 || rotation === 270 ){
      cyanPolygon.polygon.material = '/src/images/Cesium_Logo_Color1.jpg'
    }
    rotation += sep;
    if(rotation>=360){
      rotation = 0;
    }
  },50)

})

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