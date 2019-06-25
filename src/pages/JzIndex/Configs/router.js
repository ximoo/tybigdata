import Vue from 'vue';
import VueRouter from 'vue-router';

//引入页面模板文件
import NotFound from '~/publicComponent/Error/notFound'; //404页面
import jHome from '~/pages/JzIndex/Home/jHome';
import bigData from '~/pages/JzIndex/Views/bigData'
import airModule from '~/pages/JzIndex/Home/airModule';
import siteModule from '~/pages/JzIndex/Home/siteModule';

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
        component: airModule
      },{
        path: '/air',
        component: airModule
      },{
        path: '/site',
        component: siteModule
      }]
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