/* eslint-disable linebreak-style */
/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
import Store from "~/common/store"
import '~/common/plugin/axios';

// 自定义组件
import '~/publicComponent/components';
import '~/common/plugin/element';
import '../Components/components'


// 自定义样式补充
import '~/stastic/admin.less';
import lib from "../common/lib/layout.lib"


//动态路由 start
//最后添加404页面
const unfound = {
  path: '*',
  redirect: '/404',
  hidden: true
}
const routs = [{
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    component(resolve) {
      require(['../../Admin/Components/Layout'], resolve)
    },
    name: '首页',
    children: [{
      path: '/index',
      name: '首页',
      component(resolve) {
        require(['../../Admin/Components/Index.vue'], resolve)
      },
      meta: {
        title: '首页',
        keepAlive: true,
        menuID: null,
        pid: null
      }
    }]
  },
  ...RoutesFromMenu(Store.state.platData.platformAdminNav),
]
routs.push(unfound)
router.addRoutes(routs)





function RoutesFromMenu(menu) {
  let routes = []
  menu.forEach(item => {
    routes.push({
      name: item.title,
      path: item.url,
      component(resolve) {
        require([`../../Admin/Components${item.component}.vue`], resolve)
      },
      meta: {
        title: item.title,
        keepAlive: true,
        menuID: item.id,
        pid: item.pid
      },
      children: item.children ? RoutesFromMenu(item.children) : []
    })
  })
  return routes
}
//动态路由 end


router.afterEach((to) => {
  //替换浏览器title
  let title = to.meta.title,
    platCity = "";
  if (Store.state.platData.showCity) platCity = Store.state.platData.platformCity
  window.document.title = title + " | " + platCity + Store.state.platData.platformName


  //选项卡数据
  let platformTabMenu = localStorage.$platTabMenu ? JSON.parse(localStorage.$platTabMenu) : [{
    url: '/index',
    name: '首页',
    meta: {
      title: '首页',
      keepAlive: true,
      menuID: null,
      pid: null
    }
  }]
  platformTabMenu.push({
    url: to.path,
    meta: to.meta
  })
  platformTabMenu = lib.distinct(platformTabMenu)
  Store.state.platData.platformTabMenu = platformTabMenu
})

new Vue({
  el: '#WebApp',
  router,
  store: Store,
  render: h => h(App),
});