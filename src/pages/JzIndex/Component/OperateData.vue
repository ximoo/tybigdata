<template>
  <div class="item">
    <h3>运营数据</h3>
    <div class="ex-operate-data-box">
      <Echarts class="echarts-box"/>
    </div>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
// import getline from "./dustcartstastic.service.js";

export default {
  name: "OperateData"
};
</script>
<style lang="less">
.ex-operate-data-box {
  min-width: 300px;
  max-height: 300px;
  height: 30%;

  .echarts-box {
    min-width: 300px;
    min-height: 300px;
  }
}
</style>

