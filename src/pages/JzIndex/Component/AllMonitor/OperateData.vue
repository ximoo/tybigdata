<template>
  <div class="item" style="height:300px">
    <h3>{{platformBigOprateData.name}}</h3>
    <div class="ex-operatedata-charts">
      <Echarts :options="chartsOptions" />
    </div>
    <Conner />
  </div>
</template>
<script>
import getOption from "./operatedata.service";
import lib from "~/common/lib";
import { mapState, mapGetters } from "vuex";
let OperateDataId;
export default {
  name: "OperateData",
  data() {
    let self = this;
    return {
      chartsOptions: null
    };
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.chartsOptions = self.chartsOption;
      clearInterval(OperateDataId);
      OperateDataId = setInterval(() => {
        self.changeData();
      }, this.platformBigOprateData.timer * 1000);
    });
  },
  methods: {
    changeData() {
      let self = this;
      let chartsData = self.platformBigOprateData.data;
      let tempData = [];
      if (chartsData.length <= 0) chartsData = self.adminBaseData.slice(0, 4);
      for (var i in chartsData) {
        if (chartsData[i].checked) {
          tempData.push({
            name: chartsData[i].label,
            change: chartsData[i].change,
            value: chartsData[i].value
          });
        }
      }
      for (var i in tempData) {
        if (tempData[i].change)
          tempData[i].value = lib.randomNumber(
            Math.round((chartsData[i].max * 5) / 10),
            chartsData[i].max
          );
      }
      self.chartsOptions = getOption(tempData);
    }
  },
  computed: {
    chartsOption() {
      let self = this;
      let chartsData = self.platformBigOprateData.data;
      let tempData = [];
      if (chartsData.length <= 0) chartsData = self.adminBaseData.slice(0, 4);
      for (var i in chartsData) {
        if (chartsData[i].checked) {
          tempData.push({
            name: chartsData[i].label,
            value: chartsData[i].value,
            unit: chartsData[i].unit
          });
        }
      }
      return getOption(tempData);
    },

    ...mapState("bigData", {
      platformBigOprateData: state => state.platformBigOprateData
    }),

    ...mapState("baseData", {
      oprateDataName: state => state.oprateDataName
    }),

    ...mapGetters("baseData", ["adminBaseData"])
  }
};
</script>
<style lang="less">
.ex-operatedata-charts {
  height: calc(~"100% - 36px");
}
.status-stastic-box {
  text-align: center;
  width: 100%;
  height: calc(~"100% - 280px");
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
            url("../../../../stastic/img/bigData_jz/charts_bar_bg.png");
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -3px;
        }
      }
      li:last-child {
        div {
          background: #204ea1
            url("../../../../stastic/img/bigData_jz/charts_bar_bg.png");
        }
      }
    }
  }
}
</style>