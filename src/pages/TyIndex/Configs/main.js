/* eslint-disable linebreak-style */
/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
// import '~/common/plugin/axios';
import VueAMap from 'vue-amap';
import '~/common/plugin/directives'
Vue.use(VueAMap);

import ECharts from 'vue-echarts'

// Map of China
import tyMap from '../../../stastic/ty.json'

// registering map data
ECharts.registerMap('ty', tyMap)

// 注册组件后即可使用
Vue.component('v-chart', ECharts)

import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false

VueAMap.initAMapApiLoader({
  key: '6f713c69faa95286904fa173059eae94',
  plugin: ['Map3D', 'AMap.DistrictSearch', 'AMap.SimpleMarker', 'AMap.DistrictLayer', 'AMap.ControlBar','AMap.MouseTool',"AMap.PolyEditor","AMap.MarkerClusterer","AMap.InfoWindow","AMap.Heatmap"],
  v: '1.4.15'
});

// 自定义组件
import '~/publicComponent/components';
import '~/stastic/bigdata_ty.less';
import '~/common/plugin/element';

new Vue({
  el: '#BigData',
  router,
  render: h => h(App),
});