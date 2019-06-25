import Vue from 'vue';
import fullScreen from './layout/fullScreen.vue';
import pHeader from './layout/pHeader.vue';
import pFooter from './layout/pFooter.vue';
import Echarts from './Public/Echarts.vue'

Vue.component('fullScreen', fullScreen);
Vue.component('pHeader', pHeader);
Vue.component('pFooter', pFooter);

Vue.component('Echarts', Echarts);