import Vue from 'vue';
import VueRouter from 'vue-router';

//引入页面模板文件
import NotFound from '~/component/Error/notFound'; //404页面
import bHome from '~/pages/JzBigdata/Home/jHome'; 
import bigData from '~/pages/JzBigdata/Views/bigData' 


Vue.use(VueRouter);

const routes = [{
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    component: bHome,
    title:'首页',
    children: [{
      path: '/index',
      component: bigData
    },{
      path: '/system/menu',
      component: bigData
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