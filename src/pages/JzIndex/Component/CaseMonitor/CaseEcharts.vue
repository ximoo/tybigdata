<template>
  <div class="item" style="width:240px;height:calc(30% - 4px)">
    <h3>案件处理状况</h3>
    <Echarts :options="calendarOption" autoresize/>
    <Conner />
  </div>
</template>
<script>
import service from "../../Configs/service.lib";
import getCalendar from "./caseecharts.service"




export default {
  name: "CaseStastic",
  data() {
    return {
      alermList: [],
      calendarOption:getCalendar()
    };
  },
  mounted() {
    this.initDistricts();
  },
  methods: {
    initDistricts() {
      let self = this;
      let districts = self.districts;
      let alermList = [];

      for (var i in districts) {
        alermList.push({
          name: districts[i].name,
          caseNumber: service.randomLib(0, 20)
        });
      }

      self.alermList = alermList;
    }
  },
  computed: {
    districts() {
      return this.$store.state.platformData.state.districts;
    }
  }
};
</script>
<style lang="less">
.case-stastic-list {
  color: #fff;
  padding: 15px;
  line-height: 32px;

  li {
    background-image: url("../../../../stastic/img/bigData_jz/case_list.png");
    background-position: left center;
    background-repeat: no-repeat;
    padding: 0 15px;
    font-size: 15px;
    color: #22c8fc;
    font-weight: bold;

    .label {
        float: left;
    }
    .number {
      text-align: right;
      color: #fc0;
    }

    &::after {
      clear: both;
    }
  }
}
</style>

