import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home"
import About from "@/components/About"
import MyUmzzal from "@/components/MyUmzzal"
import KungKungDDa from "@/components/KungKungDDa"


const routes = [
    { path : "/", name : "Home", component : Home },
    { path : "/About", name : "About", component : About },
    { path : "/MyUmzzal", name : "MyUmzzal", component : MyUmzzal },
    { path : "/KungKungDDa", name : "KungKungDDa", component : KungKungDDa },
]

const router = createRouter({
    history : createWebHistory(),
    routes : routes
});

export default router;