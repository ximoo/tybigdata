/* eslint-disable linebreak-style */
/* eslint-disable no-new */
import Vue from 'vue';
import router from './router';
import App from '~/App.vue';
import '~/common/plugin/axios';
// 自定义组件
import '~/publicComponent/components';
import '~/stastic/style.less';
import '~/common/plugin/element';

new Vue({
  el: '#WebApp',
  router,
  render: h => h(App),
});
