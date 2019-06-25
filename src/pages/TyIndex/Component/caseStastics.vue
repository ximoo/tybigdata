<template>
  <Echarts :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import getBar from "./casestastics.service";

export default {
  name: "caseStastics",
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
