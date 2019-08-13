<template>
  <div class="item">
    <h3>基础监控数据</h3>
    <ul class="ex-base-data-box">
      <li :style="baseDataWidth" v-for="item , index in BaseData" :key="index">
        <p>{{item.value}}</p>
        <h4>{{item.label}}({{item.unit}})</h4>
      </li>
    </ul>
    <Conner />
  </div>
</template>
<script>
import Store from "../../../Admin/Configs/store";
import lib from "../../../../common/lib";

import {mapState} from "vuex"



export default {
  name: "BaseData",
  data() {
    return {
      baseDataNum: 0,
      baseDataWidth: "100%"
    };
  },
  computed: {
    allmonitor() {
      let allmonitor = JSON.parse(localStorage.$platformData).module.allmonitor;
      return allmonitor;
    },

    BaseData() {
      let baseData = Store.getters.adminBaseData;
      console.log(baseData);
      this.baseDataNum = baseData.length < 3 ? baseData.length : 3;
      this.baseDataWidth = "width:calc(" + 100 / +this.baseDataNum + "% - 4px)";
      return lib.getChecked(baseData.data);
    },
    ...mapState('baseData',{

    })
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
