import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'

function hasUrl(url){
  return Store.getters.getUserInfo.menus_url.some(item=>item==url)
}

Vue.use(Router)

export const indexRoutes = [{
  path: "/goods",
  component: () => import('@/views/goods/goods'),
  name: "商品管理",
  beforeEnter: (to, from, next) => {
    hasUrl('/goods')?next():next('/home')
  }
}, {
  path: "/specs",
  component: () => import('@/views/specs/specs'),
  name: "商品规格",
  beforeEnter: (to, from, next) => {
    hasUrl('/specs')?next():next('/home')
  }
}, {
  path: "/menu",
  component: () => import('@/views/menu/menu'),
  name: "菜单管理",
  beforeEnter: (to, from, next) => {
    hasUrl('/menu')?next():next('/home')
  }
}, {
  path: "/role",
  component: () => import('@/views/role/role'),
  name: "角色管理",
  beforeEnter: (to, from, next) => {
    hasUrl('/role')?next():next('/home')
  }
}, {
  path: "/manger",
  component: () => import('@/views/manger/manger'),
  name: "用户管理",
  beforeEnter: (to, from, next) => {
    hasUrl('/manger')?next():next('/home')
  }

},{
  path: "/sort",
  component: () => import('@/views/sort/sort'),
  name: "商品分类",
  beforeEnter: (to, from, next) => {
    hasUrl('/sort')?next():next('/home')
  }
},{
  path: "/banner",
  component: () => import('@/views/banner/banner'),
  name: "轮播图管理",
  beforeEnter: (to, from, next) => {
    hasUrl('/banner')?next():next('/home')
  }
},{
  path: "/miao",
  component: () => import('@/views/miao/miao'),
  name: "秒杀管理",
  beforeEnter: (to, from, next) => {
    hasUrl('/miao')?next():next('/home')
  }
}]

const router = new Router({
  routes: [{
    path: "/login",
    component: () => import('@/pages/login'),
  }, {
    path: "/index",
    component: () => import('@/pages/index'),
    children: [{
        path: "/home",
        component: () => import('@/views/home'),
        name: "欢迎来到首页！"
      },
      ...indexRoutes,
      {
        path: "",
        redirect: "/home"
      }
    ]

  }, {
    path: "*",
    redirect: "/login"
  }]
})

router.beforeEach((to,from,next)=>{
  if(to.path==='/login'){
    next()
    return
  }
  if(Store.getters.getUserInfo){
    next()
    return
  }
  next('/login')
})

export default router
