<template>
  <div class="ex-bigdata-main">
    <!-- 环境监测 -->
    <SiteMonitor/>
    <div class="item" style="width:240px;height:calc(100% - 240px)">
      <h3>场站环境监测排名</h3>
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
import SiteMonitor from "../Component/SiteMonitor.vue";
import AirData from "../Component/AirData";

export default {
  name: "jHome",
  components: {  SiteMonitor, AirData },
  methods: {}
};
</script>
