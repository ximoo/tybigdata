import Vue from 'vue';
import fullScreen from './layout/fullScreen.vue';
import pHeader from './layout/pHeader.vue';
import pFooter from './layout/pFooter.vue';
import Echarts from './Public/Echarts.vue'
import Conner from './Layout/Conner.vue'
import reDialog from './Layout/reDialog.vue'
import infoWindow from "./Monitor/infoWindow.vue"
import iFrame from "./Public/iFrame.vue"



Vue.component('fullScreen', fullScreen);
Vue.component('pHeader', pHeader);
Vue.component('pFooter', pFooter);
Vue.component('Echarts', Echarts);
Vue.component('Conner', Conner);
Vue.component('reDialog', reDialog);
Vue.component('iFrame', iFrame);
Vue.component('infoWindow', infoWindow);