<template>
  <chart :options="line" autoresize class="ex-bigdata-charts"/>
</template>


<script>
import ECharts from "./Echarts";
import getline from "./vechileoline.service.js";

export default {
  name: "vechileOline",
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
