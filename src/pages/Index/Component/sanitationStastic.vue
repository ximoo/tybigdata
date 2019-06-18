<template>
  <div class="ex-bigdata-charts">
    <chart :options="pie" autoresize/>
  </div>
</template>


<script>
import ECharts from "./Echarts";
import "echarts/lib/chart/pie";
import getPie from './pie'

export default {
  name: "sanitationStastic",
  components: { chart: ECharts },
  data() {
    return {
      pie: getPie()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
