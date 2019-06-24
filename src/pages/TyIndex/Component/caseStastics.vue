<template>
  <chart :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import barCharts from "./Echarts";
import getBar from "./casestastics.service";

export default {
  name: "caseStastics",
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
