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
    meta: {
      title: '大数据概览'
    },
    children: [{
      path: '/index',
      component: bigData,
      meta: {
        title: '大数据概览'
      },
      children: [{
        path: '/index',
        meta: {
          title: '大数据概览'
        },
        component: siteModule
      }, {
        path: '/air',
        meta: {
          title: '环境污染'
        },
        component: airModule
      }, {
        path: '/site',
        meta: {
          title: '场站管理'
        },
        component: siteModule
      }, {
        path: '/case',
        meta: {
          title: '案件管理'
        },
        component: caseModule
      }, {
        path: '/vechile',
        meta: {
          title: '车辆监控'
        },
        component: vecModule
      }, {
        path: '/flow',
        meta: {
          title: '弃土流向'
        },
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