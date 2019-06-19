<template>
  <div class="ex-bigdata-charts">
    <el-button-group class="charts-tabs">
      <el-button type="primary" size="mini">周</el-button>
      <el-button type="primary" size="mini">月</el-button>
    </el-button-group>
    <chart :options="option" autoresize />
  </div>
</template>

<script>
import barCharts from "./Echarts";
import getBar from "./muckstastics.service";

export default {
  name: "muckStastics",
  components: { chart: barCharts },
  data() {
    return {
      option: getBar()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
