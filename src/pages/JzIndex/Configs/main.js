import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
import Store from './store'
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
  key: '6f713c69faa95286904fa173059eae94',
  plugin: ['Map3D', 'AMap.DistrictSearch', 'AMap.SimpleMarker', 'AMap.DistrictLayer', 'AMap.ControlBar','AMap.MouseTool',"AMap.PolyEditor","AMap.MarkerClusterer","AMap.InfoWindow"],
  v: '1.4.15'
});












// 自定义组件
import '~/publicComponent/components';
import '~/common/plugin/element';
import '~/stastic/bigdata_jz.less';









new Vue({
  el: '#JzBigData',
  router,
  store: Store,
  render: h => h(App),
});