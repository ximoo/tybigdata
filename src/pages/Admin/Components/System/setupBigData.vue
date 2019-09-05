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

                <el-form-item style="width:100%;" label="刷新时间：">
                  <el-input v-model="bigBaseData.timer" style="width:100px;" />秒
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>

          <!-- oprateData -->
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

                <el-form-item style="width:100%;" label="刷新时间：">
                  <el-input v-model="bigOprateData.timer" style="width:100px;" />秒
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

          <!-- produceData -->
          <el-col :span="6">
            <el-card class="box-card" :class="{'box-card-edit':bigProduceData.edit}">
              <template slot="header" class="clearfix">
                <el-input
                  size="small"
                  v-model="bigProduceData.name"
                  v-if="bigProduceData.edit"
                  style="width:180px;"
                />
                <span v-else>{{bigProduceData.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="bigProduceData.edit = true"
                  v-if="!bigProduceData.edit"
                  icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="saveProduceData"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini">
                <el-form-item
                  v-for="item,index in bigProduceData.data"
                  :key="index"
                  style="width:calc(50% - 15px);"
                >
                  <i
                    class="el-icon-circle-check"
                    v-if="item.checked && !bigProduceData.edit"
                    style="color:#00cb0e"
                  />
                  <i
                    class="el-icon-circle-close"
                    v-if="!item.checked && !bigProduceData.edit"
                    style="color:#f30"
                  />
                  <el-checkbox
                    v-model="item.checked"
                    style="margin-right: 5px;"
                    v-if="bigProduceData.edit"
                  ></el-checkbox>
                  <el-input v-model="item.label" v-if="bigProduceData.edit" style="width:77px;" />
                  <el-input v-model="item.unit" v-if="bigProduceData.edit" style="width:45px;" />
                  <span v-if="bigProduceData.edit">昨日:</span>
                  <el-input-number
                    v-model="item.last"
                    placeholder="昨日"
                    v-if="bigProduceData.edit"
                    style="width:120px;"
                  />
                  <span v-if="bigProduceData.edit">今日:</span>
                  <el-input-number
                    v-model="item.now"
                    placeholder="今日"
                    v-if="bigProduceData.edit"
                    style="width:120px;"
                  />
                  <span v-if="!bigProduceData.edit">
                    <strong>{{item.label}}({{item.unit}}) ：</strong>
                    昨: {{item.last}} / 今：{{item.now}}
                  </span>
                </el-form-item>
                <el-form-item style="width:100%;" label="刷新时间：">
                  <el-input v-model="bigProduceData.timer" style="width:100px;" />秒
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>

          <!-- oprateData -->
          <el-col :span="6">
            <el-card class="box-card">
              <template slot="header" class="clearfix">
                <span>大数据看板模块控制</span>
              </template>

              <el-form inline size="mini">
                <el-form-item :label="item.label" v-for="item,index in bigModuleData" :key="index">
                  <el-switch v-model="item.checked" @change="saveBigModule" />
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>

          <!-- oprateData -->
          <el-col :span="18">
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
  data() {
    return {
      PM25: []
    };
  },
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
        timer: 30,
        data: []
      },
      bigOprateData: {
        name: "运营数据",
        edit: false,
        timer: 30,
        data: []
      },
      bigProduceData: {
        name: "自定义对比数据",
        edit: false,
        timer: 30,
        data: []
      },
      bigModuleData: [],
      PM25: []
    };
  },

  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.bigBaseData = self.initBaseData;
      self.bigOprateData = self.initOprateData;
      self.bigProduceData = self.initProduceData;
      self.bigModuleData = self.platformBigModuleData;

      self.requestPM();
    });
  },

  methods: {
    //保存基础监控数据
    saveBaseData() {
      let self = this,
        bigBaseData = self.bigBaseData,
        platformBigBaseData = self.platformBigBaseData;
      self.bigBaseData.edit = false;
      localStorage.$platformBigBaseData = JSON.stringify(bigBaseData);
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
          self.bigOprateData.data = OprateData.slice(8, 10);
          break;
        case "case":
          self.bigOprateData.data = OprateData.slice(11, 12);
          break;
      }
      console.log(self.bigOprateData.data);
    },

    //保存运营数据
    saveOprateData() {
      let self = this,
        bigOprateData = self.bigOprateData,
        platformBigOprateData = self.platformBigOprateData;
      self.bigOprateData.edit = false;
      localStorage.$platformBigOprateData = JSON.stringify(bigOprateData);
    },

    //保存自定义数据
    saveProduceData() {
      let self = this,
        bigProduceData = self.bigProduceData,
        platformBigProduceData = self.platformBigProduceData;
      self.bigProduceData.edit = false;
      localStorage.$platformBigProduceData = JSON.stringify(bigProduceData);
    },

    handleMenu(e) {
      this.hideMenu = e;
    },

    saveBigModule() {
      localStorage.$platformBigModuleData = JSON.stringify(this.bigModuleData);
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
          let dataString = "",
            dateString = "xAxis:[{type:'category',boundaryGap:false,data:";
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
            let dateStart = pmOption.indexOf(dateString);
            let dateEnd = pmOption.indexOf("],axisLine:{lineStyle:")

            self.PM25.push({
              region: region,
              name: type,
              date: pmOption
                .slice(dateStart + dateString.length,dateEnd)
                .replace(/]}]}/g, ""),
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
      if (
        self.platformBigBaseData &&
        self.platformBigBaseData.data.length > 0
      ) {
        adminBaseData = self.platformBigBaseData.data;
        baseData["name"] = self.platformBigBaseData.name;
      } else {
        adminBaseData = self.adminBaseData;
        baseData["name"] = "基础数据";
      }
      baseData["timer"] = 30;
      baseData["edit"] = false;
      baseData["data"] = adminBaseData;
      return baseData;
    },

    initOprateData() {
      let self = this;
      let oprateData = new Object();
      let adminBaseData;
      if (
        self.platformBigOprateData &&
        self.platformBigOprateData.data.length > 0
      ) {
        adminBaseData = self.platformBigOprateData.data;
        oprateData["name"] = self.platformBigOprateData.name;
      } else {
        adminBaseData = self.adminBaseData;
        oprateData["name"] = "运营数据";
      }
      oprateData["timer"] = 30;
      oprateData["edit"] = false;
      oprateData["module"] = "vechile";
      oprateData["data"] = adminBaseData.slice(0, 4);
      return oprateData;
    },

    initProduceData() {
      let self = this;
      let produceData = new Object();
      let adminProduceData;
      if (
        self.platformBigProduceData &&
        self.platformBigProduceData.data.length > 0
      ) {
        adminProduceData = self.platformBigProduceData.data;
        produceData["name"] = self.platformBigProduceData.name;
      } else {
        adminProduceData = new Array();
        for (var i = 0; i < 6; i++) {
          adminProduceData.push({
            label: "选项" + (i + 1),
            unit: "辆",
            checked: true,
            last: 0,
            now: 0
          });
        }
        produceData["name"] = "自定义对比数据";
      }
      produceData["timer"] = 30;
      produceData["edit"] = false;
      produceData["data"] = adminProduceData;
      return produceData;
    },

    ...mapState("bigData", {
      platformBigBaseData: state => state.platformBigBaseData,
      platformBigOprateData: state => state.platformBigOprateData,
      platformBigProduceData: state => state.platformBigProduceData,
      platformBigModuleData: state => state.platformBigModuleData
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