/* eslint-disable linebreak-style */
/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
import Store from "../../../common/store"
import '~/common/plugin/axios';

// 自定义组件
import '~/publicComponent/components';
import '~/common/plugin/element';
import '../Components/components'


// 自定义样式补充
import '~/stastic/admin.less';


console.log(Store.state)


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
      name:item.title,
      path: item.url,
      component(resolve) {
        require([`../../Admin/Components${item.component}.vue`], resolve)
      },
      meta: {
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




new Vue({
  el: '#WebApp',
  router,
  store: Store,
  render: h => h(App),
});