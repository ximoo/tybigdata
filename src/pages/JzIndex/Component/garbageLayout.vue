<template>
  <chart :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import barCharts from "./Echarts";
import getBar from "./garbagelayout.service";

export default {
  name: "garbagelayout",
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
