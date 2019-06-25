<template>
    <Echarts :options="option" autoresize class="ex-bigdata-charts"/>
</template>

<script>
import getBar from "./muckstastics.service";

export default {
  name: "muckStastics",
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
