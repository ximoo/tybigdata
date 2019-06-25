/* eslint-disable linebreak-style */
/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
// import '~/common/plugin/axios';


import ECharts from 'vue-echarts'


// 注册组件后即可使用
Vue.component('v-chart', ECharts)

import VueAMap from 'vue-amap';

Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: '6f713c69faa95286904fa173059eae94',
  plugin: ['Map3D', 'AMap.DistrictSearch', 'AMap.SimpleMarker', 'AMap.DistrictLayer', 'AMap.ControlBar'],
  v: '1.4.15'
});






import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 自定义组件
import '~/publicComponent/components';
import '~/common/plugin/element';
import '~/stastic/bigdata_jz.less';


new Vue({
  el: '#JzBigData',
  router,
  render: h => h(App),
});