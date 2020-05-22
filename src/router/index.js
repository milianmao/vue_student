import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
Vue.use(VueRouter)
  const routes = [
    { path:'/',redirect:'/login'},
    { path:'/login',component: Login,meta:{title:"登录"}},
    {path:'/home',component: Home,meta:{title:"学生管理系统"}}
  ]
const router = new VueRouter({
  routes
})

export default router
