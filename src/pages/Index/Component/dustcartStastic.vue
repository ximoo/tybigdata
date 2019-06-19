<template>
  <div class="ex-bigdata-charts">
    <el-button-group class="charts-tabs">
      <el-button type="primary" size="mini">周</el-button>
      <el-button type="primary" size="mini">月</el-button>
    </el-button-group>
    <chart :options="line" autoresize/>
  </div>
</template>


<script>
import ECharts from "./Echarts";
import getline from './dustcartstastic.service.js'



export default {
  name: "dustcartStastic",
  components: { chart: ECharts },
  data() {
    return {
      line: getline()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
