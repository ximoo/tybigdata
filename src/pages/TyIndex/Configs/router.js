import Vue from 'vue';
import VueRouter from 'vue-router';

//引入页面模板文件
import NotFound from '~/publicComponent/Error/notFound'; //404页面
import bHome from '~/pages/TyIndex/Home/bHome'; //智能分析系统首页
import bigData from '~/pages/TyIndex/Views/bigData' //大数据页面
import hotMap from '~/pages/TyIndex/Views/hotMap'
import testMap from '~/pages/TyIndex/Views/testMap'


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
    path: '/testMap',
    component: testMap
  },

  {
    path: '*',
    component: NotFound
  },
];

export default new VueRouter({
  routes
});