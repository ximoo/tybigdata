<template>
    <chart :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import barCharts from "./Echarts";
import getBar from "./muckstastics.service";

export default {
  name: "muckStastics",
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
