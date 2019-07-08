<template>
  <div class="ex-bigdata-main right" :class="{full:fullMain}">
     <el-button @click="handleFull" icon="el-icon-d-arrow-left" type="info" size="mini" round class="full-main-btn" v-if="!fullMain"></el-button>
    <el-button @click="handleFull" icon="el-icon-d-arrow-right" type="info" size="mini" round class="full-main-btn" v-else></el-button>
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
import AirMonitor from "../Component/AirMonitor/AirMonitor.vue";
import AirData from "../Component/AirMonitor/AirData";

export default {
  name: "jHome",
   data() {
    return {
      fullMain: false
    };
  },
  components: {  AirMonitor, AirData },
  methods: {
     handleFull(){
      this.fullMain = !this.fullMain
    }
  }
};
</script>
