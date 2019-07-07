<template>
  <div class="ex-bigdata-main" :class="{full:fullMain}">
    <el-button @click="handleFull" icon="el-icon-d-arrow-left" type="info" size="mini" round class="full-main-btn" v-if="!fullMain"></el-button>
    <el-button @click="handleFull" icon="el-icon-d-arrow-right" type="info" size="mini" round class="full-main-btn" v-else></el-button>
    <!-- 环境监测 -->
    <SiteMonitor />
    <div class="item" style="width:240px;height:calc(100% - 240px)">
      <h3>场站环境监测排名</h3>
      <!-- 边框 -->
      <div class="corner lt"></div>
      <div class="corner rt"></div>
      <div class="corner lb"></div>
      <div class="corner rb"></div>
    </div>

    <!-- 环境污染变化趋势 -->
    <AirData />
  </div>
</template>
<script>
import SiteMonitor from "../Component/SiteMonitor.vue";
import AirData from "../Component/AirData";

export default {
  name: "jHome",
  data() {
    return {
      fullMain: false
    };
  },
  components: { SiteMonitor, AirData },
  methods: {
    handleFull(){
      this.fullMain = !this.fullMain
    }
  }
};
</script>
