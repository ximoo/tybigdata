<template>
  <Echarts :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import getBar from "./levystastic.service";

export default {
  name: "levyStastics",
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
