<template>
  <div class="item">
    <h3>基础监控数据</h3>
    <ul class="ex-base-data-box">
      <li>
        <p>600</p>
        <h4>车辆总数(辆)</h4>
      </li>
      <li>
        <p>600</p>
        <h4>工地总数(个)</h4>
      </li>
      <li>
        <p>600</p>
        <h4>消纳点总数(个)</h4>
      </li>
      <li>
        <p>600</p>
        <h4>在线车辆(辆)</h4>
      </li>
      <li>
        <p>600</p>
        <h4>开工工地(个)</h4>
      </li>
      <li>
        <p>600</p>
        <h4>消纳量(立方)</h4>
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
  name: "BaseData"
};
</script>
<style lang="less">
.ex-base-data-box {
  min-width: 300px;
  max-height: 300px;
  height: 30%;
  display: flex;
  flex-wrap: wrap;

  li {
    min-width: calc(~"100% / 3 - 10px");
    text-align: center;
    margin: 10px 5px;
    text-align: center;

    p {
      font-size: 28px;
      color: #abc4ff;
      width: 100%;
      line-height: 100px;
      max-height: 100px;
      background: url("../../../stastic/img/bigData_jz/base_data_bg.png") center
        no-repeat;
      background-size: 100%;
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
