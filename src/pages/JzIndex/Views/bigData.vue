<template>
  <div class="ex-bigdata-content">
    <div class="ex-bigdata-side">



    </div>
    
    <div class="ex-bigdata-main">
      



    </div>

    <div class="ex-bigdata-side">
     



    </div>
  </div>
</template>

<script>
require("echarts-gl");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/map");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/radar");

import muckCharts from "../Component/muckStastics.vue";
import dustCharts from "../Component/dustcartStastic.vue";
import sanitationStastic from "../Component/sanitationStastic";
import vechileCharts from "../Component/vechileOline.vue";
import mapCharts from "../Component/mapCharts.vue";
import caseCharts from "../Component/caseStastics.vue";
import caseLayCharts from "../Component/caseLayout.vue";
import garbageCharts from "../Component/garbageLayout.vue";
import levyCharts from "../Component/levystastic.vue";

export default {
  name: "bigData",
  components: {
    muckCharts,
    dustCharts,
    sanitationStastic,
    vechileCharts,
    mapCharts,
    caseCharts,
    caseLayCharts,
    garbageCharts,
    levyCharts
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>