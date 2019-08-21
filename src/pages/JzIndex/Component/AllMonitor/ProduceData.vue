<template>
  <div class="item" style="height:320px;">
    <h3>{{produceDataName}}</h3>
    <el-row type="flex" justify="space-around" class="ex-produce-data">
      <el-col :span="9">
        <ul class="produce-bar">
          <li>
            昨日
            <div class="driver-box"></div>
          </li>
          <li v-for="item,index in ProduceData">
            <div class="driver-box" :style="{'width': (item.last / Max)*100 +'%'}">{{item.last}}</div>
          </li>
        </ul>
      </el-col>
      <el-col :span="6">
        <ul class="produce-lable">
          <li></li>
          <li v-for="item,index in ProduceData">{{item.label}}({{item.unit}})</li>
        </ul>
      </el-col>
      <el-col :span="9">
        <ul class="produce-bar yestoday">
          <li>
            今日
            <div class="driver-box"></div>
          </li>
          <li v-for="item,index in ProduceData">
            <div class="driver-box" :style="{'width': (item.now / Max)*100 +'%'}">{{item.now}}</div>
          </li>
        </ul>
      </el-col>
    </el-row>
    <Conner />
  </div>
</template>
<script>
import lib from "~/common/lib";
let activeBarId;

import { mapState, mapGetters } from "vuex";

export default {
  name: "ProduceData",
  data() {
    return {
      actBarData: [],
      produceDataName:"",

      Max: 1000
    };
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
    });
  },
  methods: {
    //柱状图初始值
    BarData() {
      let activeOprateData2 = this.srcBarData;
      for (var i in activeOprateData2) {
        activeOprateData2[i]["today"] = randomIze.randomLib(
          0,
          (activeOprateData2[i].number * randomIze.nowTimer()) / 24
        );
        activeOprateData2[i]["yestoday"] = randomIze.randomLib(
          (activeOprateData2[i].number * randomIze.nowTimer()) / 24,
          activeOprateData2[i].number
        );
      }
      this.actBarData = activeOprateData2;
    },
    //柱状图动态值
    activeBarData() {
      let activeOprateData2 = this.actBarData;
      for (var i in activeOprateData2) {
        activeOprateData2[i]["today"] =
          activeOprateData2[i]["today"] +
          randomIze.randomLib(0, activeOprateData2[i].number / 100);
      }
      this.actBarData = activeOprateData2;
    }
  },
  computed: {
    allmonitor() {
      let allmonitor = JSON.parse(localStorage.$platformData).module.allmonitor;
      return allmonitor;
    },
    srcBarData() {
      return this.allmonitor.module.producedata.data;
    },

    ProduceData() {
      let self = this;
      let tempData = self.platformBigProduceData.data;
      let produceData = [];
      for (var i in tempData) {
        if (tempData[i].checked) {
          produceData.push(tempData[i]);
        }
      }
      self.produceDataName = self.platformBigProduceData.name;
      return produceData;
    },

    ...mapState("bigData", {
      platformBigProduceData: state => state.platformBigProduceData
    })
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
      overflow: hidden;
      &.yestoday {
        .driver-box {
          float: left;
          border-radius: 0 5px 5px 0;
          background: #204ea1
            url("../../../../stastic/img/bigData_jz/charts_bar_v_bg.png");
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
            url("../../../../stastic/img/bigData_jz/charts_bar_v_bg.png");
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