<template>
  <Echarts :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import getBar from "./caselayout.service";

export default {
  name: "caseLayout",
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
