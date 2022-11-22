import {createWebHistory, createRouter} from 'vue-router'
import CameraTutorial from "../components/CameraTutorial.vue"
import EntityTutorial from "../components/EntityTutorial.vue"
const routes = [
    {path:'/cameraTutorial', name: 'cameraTutorial', component: CameraTutorial},
    {path:'/entityTutorial', name: 'entityTutorial', component: EntityTutorial}
]
const history = createWebHistory();
const router = createRouter({
    history,
    routes,
})
export default router;