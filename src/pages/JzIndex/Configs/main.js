import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
import Store from '~/common/store'
import ECharts from 'vue-echarts'
import axios from 'axios'
import VueAMap from 'vue-amap';

import '~/common/plugin/directives'

Vue.use(VueAMap);



Vue.prototype.$http = axios
Vue.config.productionTip = false

// let tyMap



// Map of China
//  tyMap =require( '../../../stastic/geometryCouties/' + Store.state.platformData.state.city + '.json')


// ECharts.registerMap('cityMap', tyMap)






// 注册组件后即可使用
Vue.component('v-chart', ECharts)




VueAMap.initAMapApiLoader({
  key: '6273b99a523dee0fcb8ab69b5b9282a4',
  plugin: ['AMap.PathSimplifier', 'AMap.SimpleMarker', 'Map3D', 'AMap.DistrictSearch', 'AMap.SimpleMarker', 'AMap.DistrictLayer', 'AMap.ControlBar', 'AMap.MouseTool', "AMap.PolyEditor", "AMap.MarkerClusterer", "AMap.InfoWindow", "AMap.Driving", "AMap.TruckDriving", "AMap.MassMarks","AMap.Size"],
  v: '1.4.15',
  uiVersion: '1.0.11', // 版本号
});








// 自定义组件
import '~/publicComponent/components';
import '~/common/plugin/element';
import '~/stastic/bigdata_jz.less';



router.afterEach((to) => {
  let title = to.meta.title,
    platCity = ""
  if (Store.state.platData.showCity) platCity = Store.state.platData.platformCity
  window.document.title = title + " | " + platCity + Store.state.platData.platformName
})





new Vue({
  el: '#JzBigData',
  router,
  store: Store,
  render: h => h(App),
});