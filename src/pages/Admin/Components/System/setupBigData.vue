<template>
  <div class="ex-pages">
    <!-- 侧边导航栏 -->
    <SideMenu v-on:handleMenu="handleMenu" />
    <div class="ex-pages-content" :class="{'hide-menu':hideMenu}">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:15px;">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-s-home" /> 首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system/menu' }">系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>基础数据设置</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="ex-table-content">
        <el-row :gutter="20">
          <!-- bigBaseData -->
          <el-col :span="6">
            <el-card class="box-card" :class="{'box-card-edit':bigBaseData.edit}">
              <template slot="header" class="clearfix">
                <el-input
                  size="small"
                  v-model="bigBaseData.name"
                  v-if="bigBaseData.edit"
                  style="width:180px;"
                />
                <span v-else>{{bigBaseData.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="bigBaseData.edit = true"
                  v-if="!bigBaseData.edit"
                  icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="saveBaseData"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini">
                <el-form-item
                  v-for="item,index in bigBaseData.data"
                  :key="index"
                  style="width:calc(50% - 15px);"
                >
                  <i
                    class="el-icon-circle-check"
                    v-if="item.checked && !bigBaseData.edit"
                    style="color:#00cb0e"
                  />
                  <i
                    class="el-icon-circle-close"
                    v-if="!item.checked && !bigBaseData.edit"
                    style="color:#f30"
                  />
                  <el-checkbox
                    v-model="item.checked"
                    style="margin-right: 5px;"
                    v-if="bigBaseData.edit"
                  ></el-checkbox>
                  <el-input v-model="item.label" v-if="bigBaseData.edit" style="width:80px;" />
                  <span v-if="!bigBaseData.edit">
                    <strong>{{item.label}} ：</strong>
                    {{item.value}} {{item.unit}}
                  </span>
                  <span v-else>{{item.value}} {{item.unit}}</span>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- opratData -->
          <el-col :span="6">
            <el-card class="box-card" :class="{'box-card-edit':bigOprateData.edit}">
              <template slot="header" class="clearfix">
                <el-input
                  size="small"
                  v-model="bigOprateData.name"
                  v-if="bigOprateData.edit"
                  style="width:180px;"
                />
                <span v-else>{{bigOprateData.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="bigOprateData.edit = true"
                  v-if="!bigOprateData.edit"
                  icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="saveOprateData"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" style="display:inline-block;">
                <el-form-item style="width:100%">
                  <el-radio-group
                    v-model="bigOprateData.module"
                    @change="countOprateData"
                    v-if="bigOprateData.edit"
                  >
                    <el-radio label="vechile">车辆在线情况</el-radio>
                    <el-radio label="site">工地运营情况</el-radio>
                    <el-radio label="landfill">消纳运营情况</el-radio>
                    <el-radio label="case">案件处理情况</el-radio>
                  </el-radio-group>
                  <strong
                    v-show="bigOprateData.module == 'vechile' &&  !bigOprateData.edit"
                  >车辆在线情况 ：</strong>
                  <strong v-show="bigOprateData.module == 'site' &&  !bigOprateData.edit">工地运营情况 ：</strong>
                  <strong
                    v-show="bigOprateData.module == 'landfill' &&  !bigOprateData.edit"
                  >消纳运营情况 ：</strong>
                  <strong v-show="bigOprateData.module == 'case' &&  !bigOprateData.edit">案件处理情况 ：</strong>
                </el-form-item>

                <el-form-item v-for="item,index in bigOprateData.data" :key="index">
                  <i
                    class="el-icon-circle-check"
                    v-if="item.checked && !bigOprateData.edit"
                    style="color:#00cb0e"
                  />
                  <i
                    class="el-icon-circle-close"
                    v-if="!item.checked && !bigOprateData.edit"
                    style="color:#f30"
                  />
                  <el-checkbox
                    v-model="item.checked"
                    style="margin-right: 5px;"
                    v-if="bigOprateData.edit"
                  ></el-checkbox>
                  <el-input v-model="item.label" v-if="bigOprateData.edit" style="width:80px;" />
                  <span v-if="!bigOprateData.edit">
                    <strong>{{item.label}} ：</strong>
                    {{item.value}} {{item.unit}}
                  </span>
                  <span v-else>{{item.value}} {{item.unit}}</span>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <strong v-show="bigOprateData.module == 'vechile'">车辆在线情况 ：</strong>
              <strong v-show="bigOprateData.module == 'site'">工地运营情况 ：</strong>
              <strong v-show="bigOprateData.module == 'landfill'">消纳运营情况 ：</strong>
              <strong v-show="bigOprateData.module == 'case'">案件处理情况 ：</strong>
              <Echarts :options="chartsOption" autoresize style="min-height:390px" />
            </el-card>
          </el-col>
          <el-col :span="24">
            <el-card class="box-card">{{PM25}}</el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import SideMenu from "../Public/SideMenu";
import { mapState, mapGetters } from "vuex";
require("echarts-gl");
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");
require("echarts/lib/chart/map");
require("echarts/lib/chart/pie");
require("echarts/lib/chart/radar");

import Axios from "axios";
import getOption from "../../../JzIndex/Component/AllMonitor/operatedata.service";

export default {
  name: "setupBigData",
  components: {
    SideMenu
  },
  data() {
    let self = this;
    return {
      hideMenu: false,
      bigBaseData: {
        name: "基础数据",
        edit: false,
        data: []
      },
      bigOprateData: {
        name: "运营数据",
        edit: false,
        data: []
      },
      PM25: []
    };
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.bigBaseData = self.initBaseData;
      self.bigOprateData = self.initOprateData;
      // self.requestPM();
    });
  },
  methods: {

    /* removeBaseData(index) {
      let self = this;
      console.log(self.bigData.baseData.data.length);
      if (self.bigData.baseData.data.length - 1 > 0)
        self.bigData.baseData.data.splice(index, 1);
      else self.bigData.baseData.data[0].value = 0;
    },
    addBaseData() {
      let self = this;
      let templateData = {
        id: 1,
        label: "车辆总数",
        unit: "辆",
        value: "0"
      };
      if (
        self.bigData.baseData.data.length - 1 > 0 &&
        self.bigData.baseData.data.length < 6
      ) {
        self.bigData.baseData.data.push(templateData);
      }
    },    */

    //保存基础监控数据
    saveBaseData() {
      let self = this,
        bigBaseData = self.bigBaseData,
        platformBigData = self.platformBigData;
      self.bigBaseData.edit = false;
      platformBigData["baseData"] = bigBaseData;
      localStorage.$platformBigData = JSON.stringify(platformBigData);
    },

    //计算运营数据
    countOprateData(t) {
      console.log(t);
      let self = this;
      let OprateData = self.bigBaseData.data;
      console.log(OprateData);
      switch (t) {
        case "vechile":
          self.bigOprateData.data = OprateData.slice(0, 4);
          break;
        case "site":
          self.bigOprateData.data = OprateData.slice(4, 8);
          break;
        case "landfill":
          self.bigOprateData.data = OprateData.slice(9, 11);
          break;
        case "case":
          self.bigOprateData.data = OprateData.slice(12, 13);
          break;
      }
      console.log(self.bigOprateData.data);
    },

    //保存运营shuju
    saveOprateData() {
      let self = this,
        bigOprateData = self.bigOprateData,
        platformBigData = self.platformBigData;
      self.bigOprateData.edit = false;
      platformBigData["oprateData"] = bigOprateData;
      localStorage.$platformBigData = JSON.stringify(platformBigData);
    },

    handleMenu(e) {
      this.hideMenu = e;
    },

    //临时做个东西
    requestPM() {
      let self = this;
      let regions = [
        "尖草坪",
        "上兰",
        "南寨",
        "坞城",
        "坞城",
        "小店",
        "晋源",
        "桃园",
        "涧河",
        "金胜"
      ];
      let urlType = ["aqi", "pm2_5", "pm10", "so2", "no2", "co", "o3"];
      for (var x = 0; x <= regions.length - 1; x++) {
        for (var i = 0; i <= urlType.length - 1; i++) {
          let url =
            "/pm/city/mon/" + urlType[i] + "/太原/" + regions[x] + ".html";
          let dataString = "";
          console.log(urlType[i]);
          let region = regions[x];
          let type = urlType[i];
          switch (i) {
            case 0:
              dataString = "name:'中国标准',type:'line',data:[";
              break;
            case 1:
              dataString = "name:'浓度值',type:'line',data:[";
              break;
            case 2:
              dataString = "name:'浓度值',type:'line',data:[";
              break;
            case 3:
              dataString = "name:'浓度值',type:'line',data:[";
              break;
            case 4:
              dataString = "name:'浓度值',type:'line',data:[";
              break;
            case 5:
              dataString = "name:'浓度值',type:'line',data:[";
              break;
            case 6:
              dataString = "name:'浓度值',type:'line',data:[";
              break;
          }
          Axios.get(url).then(res => {
            let html = res.data.toString();
            let index = html.indexOf("option_h24 =");
            let end = html.indexOf("var option_d30");

            let pmOption =
              html
                .slice(index + 13, end)
                .replace(/\s+/g, "")
                .replace(/;/g, "") + "";

            let data = pmOption.indexOf(dataString);
            self.PM25.push({
              region: region,
              name: type,
              data: pmOption
                .slice(data + dataString.length)
                .replace(/]}]}/g, "")
            });
            // self.pmOption = tempData;
          });
        }
      }
    }
  },

  computed: {
    
    chartsOption() {
      let self = this;
      let chartsData = self.bigOprateData.data;
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

    initBaseData() {
      let self = this;
      let baseData = new Object();
      let adminBaseData;
      console.log(self.platformBigData.baseData);
      if (self.platformBigData.baseData.data.length > 0) {
        adminBaseData = self.platformBigData.baseData.data;
        baseData["name"] = self.platformBigData.baseData.name;
      } else {
        adminBaseData = self.adminBaseData;
        baseData["name"] = "基础数据";
      }
      baseData["edit"] = false;
      baseData["data"] = adminBaseData;
      return baseData;
    },

    initOprateData() {
      let self = this;
      let oprateData = new Object();
      let adminBaseData;
      console.log(self.platformBigData.oprateData);
      if (self.platformBigData.oprateData.data.length > 0) {
        adminBaseData = self.platformBigData.oprateData.data;
        oprateData["name"] = self.platformBigData.oprateData.name;
      } else {
        adminBaseData = self.adminBaseData;
        oprateData["name"] = "运营数据";
      }
      oprateData["edit"] = false;
      oprateData["module"] = "vechile";
      oprateData["data"] = adminBaseData.slice(0, 4);
      return oprateData;
    },

    ...mapState("bigData", {
      platformBigData: state => state.platformBigData
    }),

    ...mapGetters("baseData", ["adminBaseData"])

  }
};
</script>
<style lang="less" scoped>
.el-radio {
  margin-bottom: 15px;
}
</style>