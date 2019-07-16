import Vue from 'vue';
import VueRouter from 'vue-router';

//引入页面模板文件
import NotFound from '~/publicComponent/Error/notFound'; //404页面
import jHome from '~/pages/JzIndex/Home/jHome';
import bigData from '~/pages/JzIndex/Views/bigData'
import airModule from '~/pages/JzIndex/Modules/airModule';
import siteModule from '~/pages/JzIndex/Modules/siteModule';
import vecModule from '~/pages/JzIndex/Modules/vecModule';
import adminModule from '~/pages/JzIndex/Modules/adminModule';
import caseModule from '~/pages/JzIndex/Modules/caseModule';


Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: jHome,
    title: '首页',
    children: [{
      path: '/index',
      component: bigData,
      children: [{
        path: '/index',
        component: siteModule
      }, {
        path: '/air',
        component: airModule
      }, {
        path: '/site',
        component: siteModule
      }, {
        path: '/cases',
        component: caseModule
      }, {
        path: '/vechile',
        component: vecModule
      }]
    }]
  }, {
    path: '/admin',
    component: adminModule
  },
  {
    path: '*',
    component: NotFound
  },
];

export default new VueRouter({
  routes
});