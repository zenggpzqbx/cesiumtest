<template>
  <div id="cesiumContainer">
  </div>
</template>

<script setup>
import {onMounted} from "vue";
import initViewer from "../assets/js/initViewer";
import * as Cesium from "cesium";

let rotation = 0
let sep = 1
defineProps({
  msg: String
})
onMounted(() => {
  let viewer = initViewer.init()
  let entities = viewer.entities.add({
    name: "Cyan vertical polygon with per-position heights and outline",
    //orientation : new Cesium.ImageMaterialProperty({image : '/src/images/Cesium_Logo_Color.jpg', repeat: new Cesium.Cartesian2(1,1)}),
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        -115.0,
        44.0,
        200000.0,
        -117.0,
        44.0,
        200000.0,
      ]),
      minimumHeights: [100000.0, 100000.0],
      //perPositionHeight: true,
      material: new Cesium.ImageMaterialProperty({image : '/src/images/Cesium_Logo_Color.jpg', repeat: new Cesium.Cartesian2(2,2)})
      //fill:true,
      //outline: true,
      //outlineColor: Cesium.Color.BLACK,
    },
  })
  // let a = new Cesium.CallbackProperty(function (){
  //   rotation += sep;
  //   if(rotation>=360){
  //     rotation = 0;
  //   }
  //   return Cesium.Math.toRadians(rotation)
  // },false)
  // console.log(a._callback())
  setInterval(function (){
    viewer.zoomTo(entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(rotation),-Cesium.Math.toRadians(20), 400000))
    rotation += sep;
    if(rotation>=360){
      rotation = 0;
    }
    console.log(rotation)
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