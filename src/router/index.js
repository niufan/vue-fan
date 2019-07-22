import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import userRouter from '@/router/user'

let children = [];
children = children.concat(userRouter);

let routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
    children: children
  }
];

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
})
