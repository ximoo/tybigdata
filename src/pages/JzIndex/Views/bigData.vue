<template>
  <div class="ex-bigdata-content">
    <div class="ex-bigdata-side" style="flex:1">
      <!-- 基础监控数据 -->
      <BaseData/>
      <!-- 运营数据 -->
      <!-- <OperateData/> -->
      <!-- 生产数据 -->
      <!-- <ProduceData/> -->
    </div>

    <div class="ex-bigdata-main" :class="{full:fullMain}">
    <el-button @click="handleFull" icon="el-icon-d-arrow-left" type="info" size="mini" round class="full-main-btn right" v-if="fullMain"></el-button>
    <el-button @click="handleFull" icon="el-icon-d-arrow-right" type="info" size="mini" round class="full-main-btn right" v-else></el-button>
      <!-- 全局实时监控 -->
      <AllMonitor/>
      <!-- <realTimeMonitor/> -->
      <!-- 运营趋势 -->
      <!-- <TrendData/> -->
    </div>

    <!-- 可设置模块 -->
    <transition name="el-zoom-in-top">
      <!-- <router-view/> -->
    </transition>
  </div>
</template>

<script>
require("echarts-gl");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/map");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/radar");

import TrendData from "../Component/AllMonitor/TrendData";
import BaseData from "../Component/AllMonitor/BaseData.vue";
import OperateData from "../Component/AllMonitor/OperateData.vue";
import ProduceData from "../Component/AllMonitor/ProduceData.vue";
import AllMonitor from "../Component/AllMonitor/AllMonitor.vue";
import realTimeMonitor from "../Component/AllMonitor/realTimeMonitor.vue";



export default {
  name: "bigData",
  data() {
    return {
      fullMain: true
    };
  },
  components: {
    BaseData,
    OperateData,
    ProduceData,
    TrendData,
    AllMonitor,
    realTimeMonitor
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  },
  methods: {
    handleFull(){
      this.fullMain = !this.fullMain
    }
  }
};
</script>
