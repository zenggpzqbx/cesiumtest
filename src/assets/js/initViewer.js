import * as Cesium from 'cesium'
export default {
     init() {
         let viewer = new Cesium.Viewer("cesiumContainer", {
             imageryProvider: new Cesium.UrlTemplateImageryProvider({
                 url: "https://gac-geo.googlecnapps.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}",
             }),
             geocoder: false, homeButton: false, sceneModePicker: false, baseLayerPicker: false,
             navigationHelpButton: false, animation: false, timeline: false, fullscreenButton: false,
         })
         viewer.cesiumWidget.creditContainer.style.display = "none"
         return viewer
     }
}