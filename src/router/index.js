import {createWebHistory, createRouter} from 'vue-router'
import CameraTutorial from "../components/CameraTutorial.vue"
import EntityTutorial from "../components/EntityTutorial.vue"
import CoordinateSystemConversion from "../components/CoordinateSystemConversion.vue"
import TilesetCut from  "../components/TilesetCut.vue"
import SunshineAnalysis from  "../components/SunshineAnalysis.vue"
const routes = [
    {path:'/cameraTutorial', name: 'cameraTutorial', component: CameraTutorial},
    {path:'/entityTutorial', name: 'entityTutorial', component: EntityTutorial},
    {path:'/CoordinateSystemConversion', name: 'coordinateSystemConversion', component: CoordinateSystemConversion},
    {path:'/TilesetCut', name: 'tilesetCut', component: TilesetCut},
    {path:'/SunshineAnalysis', name: 'sunshineAnalysis', component: SunshineAnalysis},
]
const history = createWebHistory();
const router = createRouter({
    history,
    routes,
})
export default router;