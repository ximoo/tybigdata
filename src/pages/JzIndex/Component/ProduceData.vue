<template>
  <div class="item" style="height:230px">
    <h3>生产数据</h3>
    <el-row type="flex" justify="space-around" class="ex-produce-data">
      <el-col :span="9">
        <ul class="produce-bar">
          <li>
            今日
            <div class="driver-box"></div>
          </li>
          <li>
            <div class="driver-box" style="width: 80.68%;">4034</div>
          </li>
          <li>
            <div class="driver-box" style="width: 80.68%;">4034</div>
          </li>
          <li>
            <div class="driver-box" style="width: 80.68%;">4034</div>
          </li>
          <li>
            <div class="driver-box" style="width: 80.68%;">4034</div>
          </li>
        </ul>
      </el-col>
      <el-col :span="6">
        <ul class="produce-lable">
          <li></li>
          <li v-for="item,index in allmonitor.module.producedata.data">{{item.label}}({{item.unit}})</li>
        </ul>
      </el-col>
      <el-col :span="9">
        <ul class="produce-bar yestoday">
          <li>
            今日
            <div class="driver-box"></div>
          </li>
          <li>
            <div class="driver-box" style="width: 80.68%;">4034</div>
          </li>
          <li>
            <div class="driver-box" style="width: 80.68%;">4034</div>
          </li>
          <li>
            <div class="driver-box" style="width: 80.68%;">4034</div>
          </li>
          <li>
            <div class="driver-box" style="width: 80.68%;">4034</div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
export default {
  name: "ProduceData",
  computed: {
    allmonitor() {
      let allmonitor = JSON.parse(localStorage.$platformData).module.allmonitor;
      return allmonitor;
    }
  }
};
</script>
<style lang="less">
.ex-produce-data {
  color: #abc4ff;
  font-size: 12px;
  height: calc(~"100% - 36px");

  div.el-col {
    height: 100%;
    .produce-lable {
      text-align: center;
      height: 100%;

      li {
        height: 38px;
        line-height: 38px;
      }
    }
    .produce-bar {
      height: 100%;

      &.yestoday {
        .driver-box {
          float: left;
          border-radius: 0 5px 5px 0;
          background: #204ea1
            url("../../../stastic/img/bigData_jz/charts_bar_v_bg.png");
        }
      }

      li {
        width: 100%;
        height: 38px;
        line-height: 38px;
        display: inline-block;
        color: #fff;
        text-align: center;
        font-weight: 700;
        vertical-align: middle;

        .driver-box {
          min-width: 0;
          max-width: 100%;
          white-space: nowrap;
          height: 8px;
          background: #1d857a
            url("../../../stastic/img/bigData_jz/charts_bar_v_bg.png");
          float: right;
          width: 30px;
          margin: 0;
          line-height: 8px;
          border-radius: 5px 0 0 5px;
          text-align: center;
          padding: 0 5px;
          margin-top: 15px;
          font-size: 13px;
          font-weight: 400;
          text-shadow: 0 2px 2px rgba(0, 0, 0, 0.5);
          transition: width 2s;
        }
      }
    }
  }
}
</style>

