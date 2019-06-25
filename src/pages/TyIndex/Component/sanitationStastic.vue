<template>
  <Echarts :options="pie" autoresize class="ex-bigdata-charts"/>
</template>


<script>
import getPie from "./sanitationstastic.service";

export default {
  name: "sanitationStastic",
  data() {
    return {
      pie: getPie()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>
