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
      path: '/Message/NoticeMessage',
      component: iframeModule
    }, {
      path: '/Site/Index',
      component: iframeModule
    }, {
      path: '/Unload/Index',
      component: iframeModule
    }, {
      path: '/RemovalPermit/Index',
      component: iframeModule
    }, {
      path: '/Reports/DepartmentRank',
      component: iframeModule
    }, {
      path: '/Event/Index',
      component: iframeModule
    }, {
      path: '/ConfigEvent/ConfigEvent',
      component: iframeModule
    }, {
      path: '/VehicleAsset/VehicleInfoMgr',
      component: iframeModule
    }, {
      path: '/Enterprise/Index',
      component: iframeModule
    }, {
      path: '/Reports/AreaSite',
      component: iframeModule
    }, {
      path: '/Site/siteSupervision',
      component: iframeModule
    }, {
      path: '/Unload/UnloadSupervision',
      component: iframeModule
    }, {
      path: '/MapView/Index',
      component: iframeModule
    }, {
      path: '/Vehicle/Video2',
      component: iframeModule
    }, {
      path: '/Reports/SiteDayStat',
      component: iframeModule
    }, {
      path: '/Reports/SiteVehWorkNormal',
      component: iframeModule
    }, {
      path: '/Unload/UnloadSupervision',
      component: iframeModule
    }, {
      path: '/Reports/AlarmStats',
      component: iframeModule
    }, {
      path: '/Reports/HisLoc',
      component: iframeModule
    }, {
      path: '/Reports/Mileages',
      component: iframeModule
    }, {
      path: '/User/Index',
      component: iframeModule
    }, {
      path: '/CloudMap/Grid',
      component: iframeModule
    }, {
      path: '/Role/Index',
      component: iframeModule
    }, {
      path: '/RolePermissionScope/Index',
      component: iframeModule
    }, {
      path: '/Tag/Index',
      component: iframeModule
    }, {
      path: '/CloudMapUser/Index',
      component: iframeModule
    }, {
      path: '/Department/Index',
      component: iframeModule
    }, {
      path: '/DataRecord/EntChangelog',
      component: iframeModule
    }, {
      path: '/Message/ReceiveMessage',
      component: iframeModule
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