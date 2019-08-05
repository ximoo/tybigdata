import Vue from 'vue';
import VueRouter from 'vue-router';

//引入页面模板文件
import NotFound from '~/publicComponent/Error/notFound'; //404页面
import dHome from '~/pages/Admin/Home/dHome'; //Demo演示平台首页
import assetsVechile from '~/pages/Admin/Components/Assets/assetsVechile' //车辆管理页面
import assetsSite from '~/pages/Admin/Components/Assets/assetsSite' //工地管理页面
import assetsLandfill from '~/pages/Admin/Components/Assets/assetsLandfill' //园区管理页面



import setupMenu from '~/pages/Admin/Components/System/setupMenu' //菜单设置页面
import setupBaseView from '~/pages/Admin/Components/System/setupBaseView' //基础显示设置页面
import setupBaseData from '~/pages/Admin/Components/System/setupBaseData' //基础显示设置页面
import setupBigData from '~/pages/Admin/Components/System/setupBigData' //大数据概览设置页面





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
      component: setupMenu,
      meta: {
        menuID: 21,
        pid: 2
      }
    }, {
      path: '/system/menu',
      component: setupMenu,
      meta: {
        menuID: 21,
        pid: 2
      }
    }, {
      path: '/system/base_view',
      component: setupBaseView,
      meta: {
        menuID: 22,
        pid: 2
      }
    }, {
      path: '/system/base_data',
      component: setupBaseData,
      meta: {
        menuID: 23,
        pid: 2
      }
    }, {
      path: '/system/big_data',
      component: setupBigData,
      meta: {
        menuID: 24,
        pid: 2
      }
    }, {
      path: '/assets/vechile',
      component: assetsVechile,
      meta: {
        menuID: 11,
        pid: 1
      }
    }, {
      path: '/assets/site',
      component: assetsSite
    }, {
      path: '/assets/landfill',
      component: assetsLandfill
    }]
  },
  {
    path: '*',
    component: NotFound
  },
];

export default new VueRouter({
  routes
});