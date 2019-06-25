/* eslint-disable linebreak-style */
/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
// import '~/common/plugin/axios';


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

// 自定义组件
import '~/publicComponent/components';
import '~/common/plugin/element';
import '~/stastic/bigdata_jz.less';


new Vue({
  el: '#JzBigData',
  router,
  render: h => h(App),
});