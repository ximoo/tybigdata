<template>
  <div class="item" style="height:230px">
    <h3>今日运营趋势</h3>
    <Echarts :options="linesOption" autoresize class="ex-bigdata-charts" />
    <Conner />
  </div>
</template>
<script>
import lib from "~/common/lib";
import { mapState } from "vuex";
let TrendDataId;
export default {
  name: "TrendData",
  data() {
    return {
      linesOption: null
    };
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      clearInterval(TrendDataId);
      self.countTrendData();
      TrendDataId = setInterval(function() {
        self.countTrendData();
      }, 1800000);
    });
  },
  methods: {
    countTrendData() {
      let self = this;
      let platformBigProduceData = self.platformBigProduceData.data;
      let xAxisData = [],
        seriesData = [],
        legendData = [],
        TimeSplit = 48,
        xStart = -1,
        xHalf = "00";
      for (var i = 0; i <= TimeSplit; i++) {
        if (i % 2 != 0) xHalf = "30";
        if (i % 2 == 0) {
          xStart = xStart + 1;
          xHalf = "00";
        }
        xAxisData.push(xStart + ":" + xHalf);
      }
      for (var i in platformBigProduceData) {
        if (platformBigProduceData[i].checked) {
          let nowData = [];
          for (var x = 0; x <= lib.nowTimer() * 2 + 1; x++) {
            nowData.push(
              lib.randomNumber(0, platformBigProduceData[i].now / TimeSplit)
            );
          }
          seriesData.push({
            type: "bar",
            name: platformBigProduceData[i].label,
            data: nowData,
            itemStyle: {
              barBorderRadius: [5, 5, 0, 0]
            }
          });
          legendData.push(platformBigProduceData[i].label);
        }
      }
      let options = {
        legend: {
          data: legendData,
          top: 10,
          right: 20,
          textStyle: {
            color: "#1990ff",
            fontWeight: 700
          }
        },
        grid: {
          left: 55,
          top: 35,
          right: 55,
          bottom: "32%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            animation: false,
            label: {
              backgroundColor: "#505765"
            }
          }
        },
        xAxis: {
          type: "category",
          data: xAxisData,

          splitLine: {
            show: false
          },
          nameTextStyle: {
            color: "#298bff",
            fontWeight: 700
          },
          axisLine: {
            axisLine: {
              onZero: false
            },
            lineStyle: {
              color: "#298bff"
            }
          }
        },
        // Declare Y axis, which is a value axis.
        yAxis: [
          {
            // name: '出土量',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: "#298bff"
              }
            }
          }
        ],
        series: seriesData
      };
      self.linesOption = options;
    }
  },
  computed: {
    ...mapState("bigData", {
      platformBigProduceData: state => state.platformBigProduceData
    })
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