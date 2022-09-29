import {createWebHistory, createRouter} from 'vue-router'
import CesiumLine from '../components/CesiumLine.vue'
import PolylineVolume from '../components/PolylineVolume.vue'
import Polygon from '../components/Polygon.vue'
const routes = [
    {path:'/cesiumLine', name:'cesiumLine', component:CesiumLine},
    {path:'/polylineVolume', name:'polylineVolume', component:PolylineVolume},
    {path:'/polygon', name: 'polygon', component: Polygon}
]
const history = createWebHistory();
const router = createRouter({
    history,
    routes,
})
export default router;