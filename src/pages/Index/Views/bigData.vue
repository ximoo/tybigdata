<template>
  <div class="ex-bigdata-content">
    <div class="ex-bigdata-side">
      <div class="item">
        <h3>渣土消纳量统计</h3>
        <muckCharts/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
      <div class="item">
        <h3>环卫车辆统计</h3>
        <sanitationStastic/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
      <div class="item">
        <h3>垃圾清运量统计</h3>
        <dustCharts/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
      <div class="item">
        <h3>车辆在线率统计</h3>
        <vechileCharts/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
    </div>
    
    <div class="ex-bigdata-main">
      <div class="item">
        <mapCharts/>
      </div>
    </div>

    <div class="ex-bigdata-side">
      <div class="item">
        <h3>生活垃圾产生分布</h3>
        <garbageCharts/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
      <div class="item">
        <h3>环卫征费统计</h3>
        <levyCharts/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>

      <div class="item">
        <h3>环卫案件处理统计</h3>
        <caseCharts/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
      <div class="item">
        <h3>环卫案件分布统计</h3>
        <caseLayCharts/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
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