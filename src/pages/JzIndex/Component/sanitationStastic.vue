<template>
  <chart :options="pie" autoresize class="ex-bigdata-charts"/>
</template>


<script>
import ECharts from "./Echarts";
import getPie from "./sanitationstastic.service";

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
