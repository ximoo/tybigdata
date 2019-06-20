import Vue from 'vue';
import VueRouter from 'vue-router';

//引入页面模板文件
import NotFound from '~/component/Error/notFound'; //404页面
import dHome from '~/pages/Demo/Home/dHome'; //Demo演示平台首页
import setupMenu from '~/pages/Demo/System/setupMenu'


Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: dHome,
    title:'首页',
    children: [{
      path: '/index',
      component: setupMenu
    },{
      path: '/system/menu',
      component: setupMenu
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