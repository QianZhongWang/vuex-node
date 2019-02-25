import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login/Login'
import Home from '@/components/MallHome/home'
Vue.use(Router)


import {mapState} from "vuex"
import store from '../store';

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },{
      path:'/mallhome',
      name:'home',
      meta:{
        requireAuth:true, //添加该字段，表示进入该路由是需要登录的
      },
      component:Home
    }
  ]
})

router.beforeEach(( to, from, next) =>{
  if(to.meta.requireAuth){//判断该路由是否需要登录权限
    if(store.state.token){//通过vuex state获取当前的token是否存在
      next()
    }else{
      next({
        path:'/',
        // query:{redirect:to.fullPath}//将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }else{
    next()
  }
})



export default router;