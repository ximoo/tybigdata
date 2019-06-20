<template>
  <chart :options="line" autoresize class="ex-bigdata-charts"/>
</template>


<script>
import ECharts from "./Echarts";
import getline from "./dustcartstastic.service.js";

export default {
  name: "dustcartStastic",
  components: { chart: ECharts },
  data() {
    return {
      line: getline()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
