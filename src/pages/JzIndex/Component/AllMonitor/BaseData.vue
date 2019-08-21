<template>
  <div class="item" style="height:calc(100% - 628px); overflow:hidden;">
    <h3>{{baseDataName}}</h3>
    <ul class="ex-base-data-box">
      <li :style="baseDataWidth" v-for="item , index in platFormBaseData" :key="index">
        <p>{{item.value}}</p>
        <h4>{{item.label}} ({{item.unit}})</h4>
      </li>
    </ul>
    <Conner />
  </div>
</template>
<script>
import lib from "~/common/lib";
import { mapState, mapGetters } from "vuex";

let baseDataId;

export default {
  name: "BaseData",
  data() {
    return {
      baseDataName: "基础数据",
      baseDataNum: 0,
      baseDataWidth: "100%",
      platFormBaseData: []
    };
  },
  mounted() {
    let self = this;
    let timer = self.platformBigBaseData.timer;
    self.platFormBaseData = self.BaseData;
    //定时刷新需要变化的数值
    clearInterval(baseDataId);
    baseDataId = setInterval(function() {
      self.changeData();
    }, timer * 1000);
  },
  methods: {
    changeData() {
      let self = this;
      let tempData = self.BaseData;
      // console.log(storeData);
      for (var i in tempData) {
        if (tempData[i].change) {
          tempData[i].value = lib.randomNumber(
            Math.round((tempData[i].max * 9) / 10),
            tempData[i].max
          );
        }
      }
      self.platFormBaseData = tempData;
    }
  },
  computed: {
    BaseData() {
      let self = this;
      let tempData = self.platformBigBaseData.data;
      let baseData = [];
      for (var i in tempData) {
        if (tempData[i].checked) {
          baseData.push(tempData[i]);
        }
      }
      self.baseDataName = self.platformBigBaseData.name;
      self.baseDataNum = baseData.length < 3 ? baseData.length : 3;
      self.baseDataWidth = "width:calc(" + 100 / +self.baseDataNum + "% - 4px)";
      return baseData;
    },

    ...mapState("bigData", {
      platformBigBaseData: state => state.platformBigBaseData
    }),

    ...mapGetters("baseData", ["adminBaseData"])
  }
};
</script>
<style lang="less">
.ex-base-data-box {
  min-width: 240px;
  display: flex;
  flex-wrap: wrap;

  li {
    text-align: center;
    margin: 10px 2px;
    text-align: center;
    text-shadow: 0 1px 8px rgba(153, 200, 255, 0.85);

    p {
      font-size: 28px;
      color: #abc4ff;
      width: 100%;
      line-height: 100px;
      background: url("../../../../stastic/img/bigData_jz/base_data_bg.png")
        center no-repeat;
      background-size: cover;
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
