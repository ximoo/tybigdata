import Vue from 'vue';
import VueRouter from 'vue-router';

//引入页面模板文件
import NotFound from '~/publicComponent/Error/notFound'; //404页面
import dHome from '~/pages/Admin/Home/dHome'; //Demo演示平台首页
import setupMenu from '~/pages/Admin/System/setupMenu'

import iframeModule from "~/pages/Admin/Module/iframeModule"

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: dHome,
    title: '首页',
    children: [{
      path: '/index',
      component: setupMenu
    }, {
      path: '/system/menu',
      component: setupMenu
    }, {
      path: '/VehicleRegister/Index',
      component: iframeModule
    }, ]
  },
  {
    path: '*',
    component: NotFound
  },
];

export default new VueRouter({
  routes
});