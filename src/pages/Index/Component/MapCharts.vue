<template>
    <chart :options="map" autoresize/>
</template>


<script>
import ECharts from "./Echarts";
import getMap from './mapcharts.service.js'



export default {
  name: "MuckStatics",
  components: { chart: ECharts },
  data() {
    return {
      map:getMap()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
