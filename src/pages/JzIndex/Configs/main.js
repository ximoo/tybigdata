/* eslint-disable linebreak-style */
/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
// import '~/common/plugin/axios';


import ECharts from 'vue-echarts'

// Map of China
import tyMap from '../../../common/stastic/ty.json'

// registering map data
ECharts.registerMap('ty', tyMap)



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
  el: '#JzBigData',
  router,
  render: h => h(App),
});