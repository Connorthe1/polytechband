import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'
import Trends from "../views/Trends"
import Album from "../views/Album";

Vue.use(VueRouter)

  const routes = [
  { path: '/', component: Home  },
  { path: '/upload',  component: Upload },
  { path: '/trends',  component: Trends },
  { path: '/album/:id',  component: Album}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
