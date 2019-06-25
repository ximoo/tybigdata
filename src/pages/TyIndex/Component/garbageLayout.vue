<template>
  <Echarts :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import getBar from "./garbagelayout.service";

export default {
  name: "garbagelayout",
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
