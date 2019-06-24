import Vue from 'vue';
import ECharts from 'vue-echarts'; // refers to components/ECharts.vue in webpack

// import ECharts modules manually to reduce bundle size
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/polar';

// If you want to use ECharts extensions, just import the extension package and it will work
// Taking ECharts-GL as an example:
// You only need to install the package with `npm install --save echarts-gl` and import it as follows
// import 'echarts-gl'

// register component to use
Vue.component('v-chart', ECharts);

export default function getOption(
  xAxisData = ['04-01', '04-02', '04-03', '04-04', '04-05', '04-06', '04-09'],
  yAxisData = [820, 932, 901, 934, 1290, 1330, 1320],
) {
  return {
    grid: {
      x: 45,
      x2: 10,
      y: 30,
      y2: 25,
    },
    xAxis: {
      type: 'category',
      // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      data: xAxisData,
    },
    yAxis: {
      type: 'value',
    },
    series: [{
      type: 'line',
      // data: [820, 932, 901, 934, 1290, 1330, 1320],
      data: yAxisData,
    }],
  };
}
