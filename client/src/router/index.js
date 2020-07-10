import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'
import Trends from "../views/Trends";

Vue.use(VueRouter)

  const routes = [
  { path: '/', component: Home  },
  { path: '/upload',  component: Upload },
    { path: '/trends',  component: Trends }

]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
