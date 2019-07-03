<template>
  <div class="ex-bigdata-main">
    <!-- 工地/消纳场环境监测 -->
    <AirMonitor/>
    <div class="item" style="width:240px;height:calc(100% - 240px)">
      <h3>全市空气质量排名</h3>
      <!-- 边框 -->
      <div class="corner lt"></div>
      <div class="corner rt"></div>
      <div class="corner lb"></div>
      <div class="corner rb"></div>
    </div>

    <!-- 环境污染变化趋势 -->
    <AirData/>
  </div>
</template>
<script>
import AirMonitor from "../Component/AirMonitor.vue";
import AirData from "../Component/AirData";

export default {
  name: "jHome",
  components: {  AirMonitor, AirData },
  methods: {}
};
</script>
