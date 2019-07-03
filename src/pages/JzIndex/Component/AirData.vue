<template>
  <div class="item"  style="height:230px">
    <h3>场站空气质量变化趋势</h3>
    <Echarts  :options="option" autoresize class="ex-bigdata-charts"/>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
import getOption from "./airdata.service";

export default {
  name: "AirData",
  data() {
    return {
      option: getOption()
    };
  },
};
</script>
<style lang="less">
.ex-operate-data-box {
  min-width: 240px;

  .ex-bigdata-charts {
    width: 100%;
  }
}
</style>

