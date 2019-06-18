/* eslint-disable linebreak-style */
/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
// import '~/common/plugin/axios';


import ECharts from 'vue-echarts'

import 'echarts-gl';
import "echarts/lib/chart/bar";
import "echarts/lib/chart/line";



// 注册组件后即可使用
Vue.component('v-chart', ECharts)



import axios from 'axios'
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 自定义组件
import '~/component/components';
import '~/common/stastic/bigdata.less';
import '~/common/plugin/element';

new Vue({
  el: '#BigData',
  router,
  render: h => h(App),
});