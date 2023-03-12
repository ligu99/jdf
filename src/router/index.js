import Vue from 'vue'
import VueRouter from 'vue-router'
import { getStore, setStore, removeStore } from '@/utils/storage'

Vue.use(VueRouter)

const Layout = () => import(/* webpackeChunkName: "layout" */ '@/components/Layout.vue');

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
  },
  {
    path: '*',
    redirect: '/login'
  }
]

export const allRoutes = [
  {
    path: '/jdf/page1',
    name: 'page1',
    component: () => import(/* webpackChunkName: "page1" */ '@/views/page1/index.vue'),
    meta: {
      index: "1",
      icon: "el-icon-s-tools",
      title: "page1",
    }
  }, {
    path: '/jdf/page2',
    name: 'page2',
    component: () => import(/* webpackChunkName: "page2" */ '@/views/page2/index.vue'),
    meta: {
      index: "2",
      icon: "el-icon-s-tools",
      title: "page3",
    }
  }, {
    path: '/jdf/page3',
    name: 'page3',
    component: () => import(/* webpackChunkName: "page3" */ '@/views/page3/index.vue'),
    meta: {
      index: "3",
      icon: "el-icon-s-tools",
      title: "page3",
    }
  }, {
    path: '/jdf',
    redirect: '/jdf/page1'
  },
]

//创建路由
const createRouter = () => new VueRouter({
  mode: 'hash',
  routes: [...routes]
})

const router = createRouter();

// reset router
export function resetRouter(role = "") {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
  if (role === "admin") {
    let newroutes = [{
      path: '/jdf',
      component: Layout,
      children: []
    }]
    allRoutes.forEach(item => {
      newroutes[0].children.push(item)
    })
    router.addRoute(...newroutes)
  }
}
// 是否刷新页面
let refresh = true;
router.beforeEach((to, from, next) => {
  next();
  if (refresh) {
    resetRouter("admin");
    refresh = false;
    next({ path: to.redirectedFrom });
  }
  // if (refresh && getStore("token") && to.redirectedFrom && to.redirectedFrom !== "/" && to.redirectedFrom !== "/login") {
  //   resetRouter("admin");
  //   refresh = false;
  //   next({ path: to.redirectedFrom });
  // } else {
  //   // 登录页
  //   if (to.path === "/login") {
  //     // 進入登錄頁需要將refresh設置為false,否則點擊登錄會進入死循環
  //     refresh = false;
  //     next();
  //   } else {
  //     // 非登录页
  //     if (getStore("token")) {
  //       next();
  //     } else {
  //       next({ path: '/login' });
  //     }
  //   }
  // }
});

export default router
