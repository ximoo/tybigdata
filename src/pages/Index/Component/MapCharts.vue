<template>
    <chart :options="map" autoresize/>
</template>


<script>
import ECharts from "./Echarts";

import map from './map'



export default {
  name: "MuckStatics",
  components: { chart: ECharts },
  data() {
    return {
      map
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
