<template>
  <div class="item" style="height:calc(100% - 520px);">
    <h3>运营数据</h3>
    <div class="ex-operatedata-charts">
      <Echarts :options="option" autoresize/>
    </div>

    <ul class="status-stastic-box">
      <li>
        <ul class="status-stastic">
          <li>
            <em>184</em>
            <div style="height: 36.6333%;"></div>
          </li>
          <li>
            <em>550</em>
            <div style="height: 109.833%;"></div>
          </li>
        </ul>
        <h5>出土次数</h5>
      </li>
      <li>
        <ul class="status-stastic">
          <li>
            <em>638</em>
            <div style="height: 12.5933%;"></div>
          </li>
          <li>
            <em>11592</em>
            <div style="height: 231.673%;"></div>
          </li>
        </ul>
        <h5>出土量</h5>
      </li>
      <li>
        <ul class="status-stastic">
          <li>
            <em>408</em>
            <div style="height: 81.4333%;"></div>
          </li>
          <li>
            <em>519</em>
            <div style="height: 103.633%;"></div>
          </li>
        </ul>
        <h5>消纳次数</h5>
      </li>
      <li>
        <ul class="status-stastic">
          <li>
            <em>1006</em>
            <div style="height: 19.9533%;"></div>
          </li>
          <li>
            <em>10950</em>
            <div style="height: 218.833%;"></div>
          </li>
        </ul>
        <h5>消纳量</h5>
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
import getOption from "./operatedata.service";

export default {
  name: "OperateData",
  data() {
    return {
      option: getOption()
    };
  }
};
</script>
<style lang="less">
.ex-operatedata-charts {
  height: 200px;
}
.status-stastic-box {
  text-align: center;
  width: 100%;
  height: calc(~"100% - 260px");
  font-size: 12px;
  color: #1990ff;
  display: flex;

  li {
    width: 20%;
    margin: 0 2.5%;
    height: 100%;

    .status-stastic {
      display: flex;
      width: 100%;
      height: 100%;

      li {
        width: 50%;
        height: 100%;
        position: relative;
        em {
          display: block;
          font-style: normal;
          // font-weight: 700;
        }

        div {
          width: 6px;
          max-height: calc(~"100% - 40px");
          border-radius: 1px 1px 0 0;
          background: #1d857a
            url("../../../stastic/img/bigData_jz/charts_bar_bg.png");
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -3px;
        }
      }
      li:last-child {
        div {
          background: #204ea1
            url("../../../stastic/img/bigData_jz/charts_bar_bg.png");
        }
      }
    }
  }
}
</style>

