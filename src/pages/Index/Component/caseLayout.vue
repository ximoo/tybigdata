<template>
  <div class="ex-bigdata-charts">
    <chart :options="option" autoresize />
  </div>
</template>

<script>
import barCharts from "./Echarts";
import getBar from "./caselayout.service";

export default {
  name: "caseLayout",
  components: { chart: barCharts },
  data() {
    return {
      option: getBar()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
