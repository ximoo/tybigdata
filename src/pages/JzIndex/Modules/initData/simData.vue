<template>
  <div>
    <el-button @click="simData">模拟车牌号</el-button>
    {{simVechile}}
  </div>
</template>
<script>
import simData from "../../Configs/service.lib";

export default {
  name: "simData",
  data() {
    return {
      simVechile: null
    };
  },
  methods: {
    simData() {
      let city = this.$store.state.platformData.state.city;
      let number = this.$store.state.platformData.basedata.data[0].number
      this.simVechile = simData.simVechileData(number, city).join(" | ");
    }
  }
};
</script>

