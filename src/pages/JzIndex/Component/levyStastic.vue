<template>
  <chart :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import barCharts from "./Echarts";
import getBar from "./levystastic.service";

export default {
  name: "levyStastics",
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
