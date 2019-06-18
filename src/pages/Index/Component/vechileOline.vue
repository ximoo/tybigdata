<template>
  <div class="ex-bigdata-charts">
    <chart :options="line" autoresize/>
  </div>
</template>


<script>
import ECharts from "./Echarts";
import "echarts/lib/chart/line";
import getline from "./line";

export default {
  name: "MuckStatics",
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
