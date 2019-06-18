<template>
  <div class="ex-bigdata-charts">
    <el-button-group class="charts-tabs">
      <el-button type="primary" size="mini">周</el-button>
      <el-button type="primary" size="mini">月</el-button>
    </el-button-group>
    <chart :options="bar" autoresize/>
  </div>
</template>


<script>
import ECharts from "./Echarts";
import getBar from './muckStastics'



export default {
  name: "MuckStatics",
  components: { chart: ECharts },
  data() {
    return {
      bar: getBar()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
