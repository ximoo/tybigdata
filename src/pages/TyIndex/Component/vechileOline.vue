<template>
  <Echarts :options="line" autoresize class="ex-bigdata-charts"/>
</template>


<script>
import getline from "./vechileoline.service.js";

export default {
  name: "vechileOline",
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
