import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "SearchIndex" */ '../views/Index.vue')
  },
  {
    path: '/search',
    name: 'SearchIndex',
    component: () => import(/* webpackChunkName: "SearchIndex" */ '../views/SearchIndex.vue')
  },
  {
    path: '/live/',
    name: 'TvPrograms',
    component: () => import(/* webpackChunkName: "TvPrograms" */ '../views/LivePrograms.vue'),
    children: [
      {
        path: 'gd',
        name: 'GuangDongTvPrograms',
        component: () => import('../components/LiveComponent/GuangDongPrograms')
      },
      {
        path: 'sz',
        name: 'ShenZhenTvPrograms',
        component: () => import('../components/LiveComponent/ShenZhenPrograms')
      },
      {
        path: 'gz',
        name: 'GuangZhouTvPrograms',
        component: () => import('../components/LiveComponent/GuangZhouPrograms')
      }
    ]
  },
  {
    path: '/tvColumn',
    name: 'TvColumn',
    component: () => import('../views/TvColumn'),
    children: [
      {
        path: 'index',
        name: 'IndexColumn',
        component: () => import('../components/TvColumn/IndexColumn')
      }, {
        path: 'index/:id',
        name: 'GuangDongColumn',
        component: () => import('../components/TvColumn/Column')
      }
    ]
  },
  {
    path: '/play',
    name: 'playBack',
    component: () => import(/* webpackChunkName: "SearchIndex" */ '../views/playBack.vue')
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
