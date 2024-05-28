import { createWebHashHistory, createRouter, RouteRecordRaw } from "vue-router";

import Home from '../pages/home.vue'
import Game from '../pages/game.vue'

const routes: Array<RouteRecordRaw> = [
  { //首页
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/game',
    component: Game,
    name: 'Game',
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router;