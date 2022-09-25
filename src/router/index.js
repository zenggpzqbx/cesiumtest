import {createWebHistory, createRouter} from 'vue-router'
import CesiumLine from '../components/CesiumLine.vue'
import PolylineVolume from '../components/PolylineVolume.vue'
const routes = [
    {path:'/cesiumLine', name:'cesiumLine', component:CesiumLine},
    {path:'/polylineVolume', name:'polylineVolume', component:PolylineVolume}
]
const history = createWebHistory();
const router = createRouter({
    history,
    routes,
})
export default router;