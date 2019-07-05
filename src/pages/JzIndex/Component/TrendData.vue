<template>
  <div class="item" style="height:230px">
    <h3>今日运营趋势</h3>
    <Echarts :options="linesOption" autoresize class="ex-bigdata-charts" />
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
import getOption from "./trenddata.service";
import randomIze from "../Configs/service.lib";

let TrendId;

export default {
  name: "TrendData",
  data() {
    return {
      linesOption: null,
      actData: null
    };
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      clearInterval(TrendId);
      self.countTrendData();
      TrendId = setInterval(function() {
        self.activeTrendData();
      }, this.allmonitor.module.operatedata.data[1].timer*1000);
    });
  },
  methods: {
    activeTrendData() {
      let actData = this.actData;
      let srcData = this.$store.state.platformData.module.allmonitor.module.operatedata.data[1].list;
      console.log(srcData)
      let srcSiteData,
        srcLandData,
        TimeSplit = 48;
      //获取原始数值
      for (var i in srcData) {
        switch (srcData[i].id) {
          case 23:
            srcSiteData = srcData[i].today;
            break;
          case 33:
            srcLandData = srcData[i].today;
            break;
        }
      }
      actData.yAxisData1[actData.yAxisData1.length - 1] =
        actData.yAxisData1[actData.yAxisData1.length - 1] +
        randomIze.randomLib(0, srcSiteData / (TimeSplit * 60));

      actData.yAxisData2[actData.yAxisData2.length - 1] =
        actData.yAxisData2[actData.yAxisData2.length - 1] +
        randomIze.randomLib(0, srcLandData / (TimeSplit * 60));
      this.actData = actData;
      this.linesOption = getOption(this.actData);
    },
    countTrendData() {
      let srcData = this.$store.state.platformData.module.allmonitor.module.operatedata.data[1].list;
      let srcSiteData,
        srcLandData,
        TimeSplit = 48;
      let xAxisData = [],
        yAxisData1 = [],
        yAxisData2 = [],
        xStart = -1,
        xHalf = "00";

      //获取原始数值
      for (var i in srcData) {
        switch (srcData[i].id) {
          case 23:
            srcSiteData = srcData[i].today;
            break;
          case 33:
            srcLandData = srcData[i].today;
            break;
        }
      }
      //时间刻度
      for (var i = 0; i <= TimeSplit; i++) {
        if (i % 2 != 0) xHalf = "30";
        if (i % 2 == 0) {
          xStart = xStart + 1;
          xHalf = "00";
        }
        xAxisData.push(xStart + ":" + xHalf);
      }
      for (var i = 0; i <= randomIze.nowTimer() * 2; i++) {
        yAxisData1.push(randomIze.randomLib(0, srcSiteData / TimeSplit));
        yAxisData2.push(randomIze.randomLib(0, srcLandData / TimeSplit));
      }

      this.actData = {
        xAxisData: xAxisData,
        yAxisData1: yAxisData1,
        yAxisData2: yAxisData2
      };

      this.linesOption = getOption(this.actData);
    }
  },
  computed: {
    allmonitor() {
      let allmonitor = JSON.parse(localStorage.$platformData).module.allmonitor;
      return allmonitor;
    },
    srcTrendData() {
      return this.allmonitor.module.operatedata.data[1].list;
    }
  }
};
</script>
<style lang="less">
.ex-operate-data-box {
  min-width: 240px;

  .ex-bigdata-charts {
    width: 100%;
  }
}
</style>

