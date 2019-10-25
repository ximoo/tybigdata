import Vue from 'vue';
import VueRouter from 'vue-router';

//引入页面模板文件
import NotFound from '~/publicComponent/Error/notFound'; //404页面
import bHome from '~/pages/TyIndex/Home/bHome'; //智能分析系统首页
import bigData from '~/pages/TyIndex/Views/bigData' //大数据页面


import Analysis from '~/pages/TyIndex/Home/Analysis'; //智能分析系统首页
import spoilMigrate from '~/pages/TyIndex/Analysis/spoilMigrate' //建筑垃圾流向智能分析
import siteGuard from '~/pages/TyIndex/Analysis/siteGuard' //城市工地门禁智能监控与环境污染分析
import bayonetMonitor from '~/pages/TyIndex/Analysis/bayonetMonitor' //智能卡口查黑车系统
import cloneCarMonitor from '~/pages/TyIndex/Analysis/cloneCarMonitor' //智能卡口查黑车系统




import hotMap from '~/pages/TyIndex/Views/hotMap'

Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: bHome,
    title: '首页',
    children: [{
      path: '/index',
      component: bigData
    }]
  }, {
    path: '/hotmap',
    component: hotMap
  }, {
    path: '/analysis',
    title: '智能分析',
    component: Analysis,
    meta: {requireAuth: false, title: '建筑垃圾流向智能分析', keepAlive: true},
    children: [{
      path: '/analysis',
      component: spoilMigrate,
      meta: {requireAuth: false, title: '建筑垃圾流向智能分析', keepAlive: true}
    }, {
      path: '/analysis/spoilMigrate',
      component: spoilMigrate,
      meta: {requireAuth: false, title: '建筑垃圾流向智能分析', keepAlive: true}
    }, {
      path: '/analysis/siteGuard',
      component: siteGuard,
      meta: {requireAuth: false, title: '城市工地门禁智能监控与环境污染分析', keepAlive: true}
    }, {
      path: '/analysis/bayonetMonitor',
      component: bayonetMonitor,
      meta: {requireAuth: false, title: '智能卡口查黑车系统', keepAlive: true}
    }, {
      path: '/analysis/cloneCarMonitor',
      component: cloneCarMonitor,
      meta: {requireAuth: false, title: '智能分析套牌车系统', keepAlive: true}
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