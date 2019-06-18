<template>
    <chart :options="map" autoresize/>
</template>


<script>
import ECharts from "./Echarts";
import 'echarts/lib/chart/map'
import map from './map'

// Map of China
import tyMap from '../../../common/stastic/ty.json'

// registering map data
ECharts.registerMap('ty', tyMap)

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
