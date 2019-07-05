<template>
  <div class="item" style="height:276px; margin-top:2px;">
    <h3>基础监控数据</h3>
    <ul class="ex-base-data-box">
      <li v-for="item , index in BaseData" :key="index">
        <p>{{item.number}}</p>
        <h4>{{item.label}}({{item.unit}})</h4>
      </li>
    </ul>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
export default {
  name: "BaseData",
  data() {
    return {};
  },
  computed: {
    allmonitor() {
      let allmonitor = JSON.parse(localStorage.$platformData).module.allmonitor;
      return allmonitor;
    },
    BaseData() {
      return this.allmonitor.module.basedata.data;
    }
  }
};
</script>
<style lang="less">
.ex-base-data-box {
  min-width: 240px;
  height: 240px;
  display: flex;
  flex-wrap: wrap;

  li {
    min-width: calc(~"100% / 3 - 4px");
    text-align: center;
    margin: 10px 2px;
    text-align: center;
    text-shadow: 0 1px 8px rgba(153, 200, 255, 0.85);

    p {
      font-size: 28px;
      color: #abc4ff;
      width: 100%;
      line-height: 100px;
      max-height: 100px;
      background: url("../../../stastic/img/bigData_jz/base_data_bg.png") center
        no-repeat;
      background-size: contain;
    }

    h4 {
      font-size: 13px;
      font-weight: normal;
      color: #99c8ff;
      margin-top: -25px;
    }
  }
}
</style>
