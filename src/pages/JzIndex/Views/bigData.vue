<template>
  <div class="ex-bigdata-content">
    <div class="ex-bigdata-side" style="flex:1.2">
      <!-- 基础监控数据 -->
      <BaseData/>
      <!-- 运营数据 -->
      <OperateData/>
      <!-- 生产数据 -->
      <ProduceData/>
    </div>

    <div class="ex-bigdata-main">
      <div class="item">
        <h3>全局实时监控</h3>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
    </div>

    <div class="ex-bigdata-side">
      <div class="item">
        <h3>车辆实时报警</h3>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
    </div>

    <div class="ex-bigdata-main">
      <div class="item">
        <h3>工地/消纳场环境监测</h3>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
    </div>

    <div class="ex-bigdata-side">
      <div class="item">
        <h3>环境污染实时数据</h3>
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

import BaseData from "../Component/BaseData.vue";
import OperateData from "../Component/OperateData.vue";
import ProduceData from "../Component/ProduceData.vue";

export default {
  name: "bigData",
  components: {
    BaseData,
    OperateData,
    ProduceData
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
