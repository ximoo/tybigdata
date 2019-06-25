<template>
  <Echarts :options="line" autoresize class="ex-bigdata-charts"/>
</template>


<script>
import getline from "./dustcartstastic.service.js";

export default {
  name: "dustcartStastic",
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
