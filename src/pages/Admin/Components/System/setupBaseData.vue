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
          <el-col :span="8">
            <el-card class="box-card" :class="{'box-card-edit':platformState.edit}">
              <template slot="header" class="clearfix">
                <span>平台设置:</span>

                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-edit"
                  @click="platformState.edit = true"
                  v-if="!platformState.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  icon="el-icon-success"
                  @click="handleStateSave"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="120px" label-position="right">
                <el-form-item label=" 平台名称：" style="width:100%">
                  <el-input v-model="platformState.name" v-if="platformState.edit" />
                  <span v-else>{{platformState.name}}</span>
                </el-form-item>
                <el-form-item label=" 城市名称：" style="width:100%">
                  <el-input
                    v-model="platformState.city"
                    style="width:140px;"
                    v-if="platformState.edit"
                    @blur="getDistricts(platformState.city)"
                  />
                  <el-tooltip effect="dark" content="定位当前城市" v-if="platformState.edit">
                    <el-button type="info" icon="el-icon-location" @click="getCity"></el-button>
                  </el-tooltip>
                  <span v-else>{{platformState.city}}</span>
                </el-form-item>
                <el-form-item style="width:100%">
                  <div
                    style="width:120px;float:left; text-align:right;padding: 0 12px 0 0;box-sizing: border-box;"
                  >行政区：</div>
                  <div v-if="platformState.edit" style="width:calc(100% - 120px);float:left;">
                    <el-checkbox-group v-model="platformState.districtsSelect">
                      <el-checkbox
                        :label="item.name"
                        v-for="item,index in platformState.districts"
                        :key="index"
                      />
                    </el-checkbox-group>
                  </div>
                  <div v-else style="width:calc(100% - 120px);float:left;">
                    <span
                      v-for="item ,index in platformState.districtsSelect"
                      :key="index"
                      style="margin:0 5px;"
                    >
                      <i class="el-icon-check" />
                      {{item}}
                    </span>
                    <span
                      v-if="platformState.districtsSelect && platformState.districtsSelect.length <=0"
                    >所有行政区</span>
                  </div>
                </el-form-item>
                <el-form-item label=" 显示城市名：">
                  <el-switch v-model="platformState.showCity" :disabled="!platformState.edit" />
                </el-form-item>
                <el-form-item label=" 显示天气：">
                  <el-switch v-model="platformState.showWeather" :disabled="!platformState.edit" />
                </el-form-item>
                <el-form-item label="配置文件：" style="width:100%" v-if="!platformState.edit">
                  <el-upload
                    ref="upload"
                    action="###"
                    accept="application/json, text/json, .json"
                    :on-change="beforeFileUpload"
                    :auto-upload="false"
                    :show-file-list="false"
                    size="mini"
                  >
                    <el-button type="info" icon="el-icon-sold-out" size="mini">导入平台设置配置</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- baseData -->
          <el-col :span="8">
            <el-card class="box-card" :class="{'box-card-edit':baseData.edit}">
              <template slot="header" class="clearfix">
                <span>基础数据</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="baseData.edit = true"
                  icon="el-icon-edit"
                  v-if="!baseData.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="handleBaseDataSave"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="100px" label-position="left">
                <el-form-item label=" 车辆总数：">
                  <el-input-number v-model="baseData.vechile" v-if="baseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="baseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom('vechile')"></el-button>
                  </el-tooltip>
                  <span v-else>{{baseData.vechile}}</span> 辆
                </el-form-item>
                <el-form-item label=" 工地总数：">
                  <el-input-number v-model="baseData.site" v-if="baseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="baseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom('site')"></el-button>
                  </el-tooltip>
                  <span v-else>{{baseData.site}}</span> 个
                </el-form-item>
                <el-form-item label=" 消纳点总数：">
                  <el-input-number v-model="baseData.landfill" v-if="baseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="baseData.edit">
                    <el-button
                      type="info"
                      icon="el-icon-magic-stick"
                      @click="getRandom('landfill')"
                    ></el-button>
                  </el-tooltip>
                  <span v-else>{{baseData.landfill}}</span> 个
                </el-form-item>
                <el-form-item label=" 企业总数：">
                  <el-input-number v-model="baseData.company" v-if="baseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="baseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom('company')"></el-button>
                  </el-tooltip>
                  <span v-else>{{baseData.company}}</span> 个
                </el-form-item>

                <el-form-item label="配置文件：" style="width:100%" v-if="!baseData.edit">
                  <el-upload
                    ref="upload"
                    action="###"
                    accept="application/json, text/json, .json"
                    :on-change="beforeFileUpload"
                    :auto-upload="false"
                    :show-file-list="false"
                    size="mini"
                  >
                    <el-button type="info" icon="el-icon-sold-out" size="mini">导入基础数据配置</el-button>
                  </el-upload>
                </el-form-item>

                <el-form-item label="模拟数据：" style="width:100%;" v-if="baseData.edit">
                  <label>
                    GPS种子：
                    <el-select v-model="baseData.gpsSeed" style="width:140px;">
                      <el-option v-for="item in gpsSeed" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </label>
                  <el-button
                    size="small"
                    type="info"
                    @click="simVechileInfo"
                    v-show="simStep.vechile == 0"
                  >模拟车牌号</el-button>

                  <el-button size="small" type="warning" v-show="simStep.vechile == 1">
                    正在模拟车牌号.......
                    <i class="el-icon-loading" />
                  </el-button>
                  <el-button size="small" type="success" v-show="simStep.vechile == 2">
                    车牌号模拟完毕，开始模拟地理位置信息.......
                    <i class="el-icon-loading" />
                  </el-button>

                  <el-button size="small" type="info">模拟企业数据</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- operatData -->
          <el-col :span="8">
            <el-card class="box-card" :class="{'box-card-edit':operatData.edit}">
              <template slot="header" class="clearfix">
                <span>运营数据</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="operatData.edit = true"
                  icon="el-icon-edit"
                  v-if="!operatData.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="handleOperatDataSave"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="160px" label-position="left">
                <el-form-item label="车辆在线率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.vechile"
                    v-if="operatData.edit"
                    @change="countVecData"
                  />
                  <span v-else>{{operatData.vechile}}</span> %
                </el-form-item>
                <el-form-item label="车辆离线：">
                  <el-input
                    style="width:100px;"
                    v-model="operatData.vecOffline"
                    v-if="operatData.edit"
                    readonly
                  />
                  <span v-else>{{operatData.vecOffline}}</span> %
                </el-form-item>
                <el-form-item label="车辆设备损坏：">
                  <el-input-number
                    :min="0"
                    :max="operatData.vecOffline"
                    v-model="operatData.vecDamage"
                    v-if="operatData.edit"
                  />
                  <span v-else>{{operatData.vecDamage}}</span> %
                </el-form-item>
                <el-form-item label=" 核准工地率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.site"
                    v-if="operatData.edit"
                    @change="countSiteData"
                  />
                  <span v-else>{{operatData.site}}</span> %
                </el-form-item>
                <el-form-item label=" 可疑工地率：">
                  <el-input
                    readonly
                    v-model="operatData.siteDubious"
                    v-if="operatData.edit"
                    style="width:100px"
                  />
                  <span v-else>{{operatData.siteDubious}}</span> %
                </el-form-item>
                <el-form-item label=" 工地开工率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.siteOnline"
                    v-if="operatData.edit"
                    @change="countSiteStateData"
                  />
                  <span v-else>{{operatData.siteOnline}}</span> %
                </el-form-item>
                <el-form-item label=" 核准消纳点率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.landfill"
                    v-if="operatData.edit"
                    @change="countLandFillData"
                  />
                  <span v-else>{{operatData.landfill}}</span> %
                </el-form-item>
                <el-form-item label=" 可疑消纳点率：">
                  <el-input
                    readonly
                    v-model="operatData.landfillDubious"
                    v-if="operatData.edit"
                    style="width:100px"
                  />
                  <span v-else>{{operatData.landfillDubious}}</span> %
                </el-form-item>
                <el-form-item label="配置文件：" style="width:100%" v-if="!operatData.edit">
                  <el-upload
                    ref="upload"
                    action="###"
                    accept="application/json, text/json, .json"
                    :on-change="beforeFileUpload"
                    :auto-upload="false"
                    :show-file-list="false"
                    size="mini"
                  >
                    <el-button type="info" icon="el-icon-sold-out" size="mini">导入运营数据配置</el-button>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="24">
            <el-card class="box-card">
              <template slot="header" class="clearfix">
                <span>报警类型:</span>
              </template>
              <el-table :data="alermSetup" border :span-method="alermSetupMethod">
                <el-table-column prop="type" label="报警类别" width="180"></el-table-column>
                <el-table-column prop="selected" width="80" label="选择模块" align="center">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.selected" />
                  </template>
                </el-table-column>
                <el-table-column label="类别详情">
                  <template slot-scope="scopePid">
                    <ul>
                      <li
                        v-for="item,index in scopePid.row.list"
                        :key="index"
                        style="margin-right:15px;"
                      >
                        <strong style="color:#11c711" v-if="item.checked && scopePid.row.selected">
                          <i class="el-icon-check"></i>
                          {{item.alerm}}
                        </strong>
                        <del v-if="!item.checked && scopePid.row.selected">{{item.alerm}}</del>
                      </li>
                    </ul>
                    <el-table
                      :data="scopePid.row.list"
                      border
                      v-if="scopePid.row.selected"
                      :ref="'multipleTable'+scopePid.$index"
                    >
                      <el-table-column prop="checked" width="80" align="center">
                        <template slot="header" slot-scope="scope">
                          <el-checkbox
                            :checked="scopePid.row.checkAll"
                            :indeterminate="scopePid.row.indeterminate"
                            @change="handleSelection(scopePid.row)"
                            label="全选"
                          />
                        </template>
                        <template slot-scope="scope">
                          <el-checkbox
                            v-model="scope.row.checked"
                            @change="handleSelection(scope.row)"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column prop="alerm" label="报警类型" width="160" align="center">
                        <template slot-scope="scope">
                          <span
                            class="alerm"
                            :class="{'redAlerm':scope.row.level==3,'yellowAlerm':scope.row.level==2}"
                          >{{scope.row.alerm}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="level" label="报警等级" width="150" align="center">
                        <template slot-scope="scope">
                          <el-input-number size="mini" :max="3" :min="1" v-model="scope.row.level" />
                        </template>
                      </el-table-column>
                      <el-table-column prop="icon" label="图例" width="80" align="center">
                        <template slot-scope="scope">
                          <i :class="scope.row.icon" style="font-size:18px;color:#606266" />
                        </template>
                      </el-table-column>
                      <el-table-column prop="voice" label="警报声" width="80" align="center">
                        <template slot-scope="scope">
                          <el-switch size="mini" v-model="scope.row.voice" />
                        </template>
                      </el-table-column>
                      <el-table-column prop="remarks" label="备注" align="center">
                        <template slot-scope="scope">
                          <el-input
                            type="textarea"
                            rows="3"
                            size="mini"
                            v-model="scope.row.remarks"
                          />
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column align="right" width="100">
                  <template slot="header" slot-scope="scope">
                    <el-button size="small" icon="el-icon-edit" type="success">保存</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import SideMenu from "../Public/SideMenu.vue";
import baseDatalib from "./setup_basedata_lib";
import API from "../../../JzIndex/Configs/api";
import Axios from "axios";

export default {
  name: "setupBaseData",
  components: {
    SideMenu
  },
  data() {
    let self = this;
    return {
      hideMenu: true,
      platformState: {},
      baseData: {},
      operatData: {},
      alermSetup: [
        {
          type: "车辆监控",
          indeterminate: true,
          checkAll: true,
          list: [
            {
              id: 1,
              checked: true,
              alerm: "超速驾驶",
              level: 1,
              voice: false,
              icon: "ex-icon-copy",
              remarks: ""
            },
            {
              id: 2,
              checked: false,
              alerm: "疲劳驾驶",
              level: 1,
              voice: false,
              icon: "",
              remarks: ""
            }
          ],
          selected: false
        },
        {
          type: "驾驶行为",
          indeterminate: true,
          checkAll: true,
          list: [
            {
              id: 1,
              checked: true,
              alerm: "疲劳驾驶",
              level: 1,
              voice: false,
              icon: "ex-new-icon-fatigue",
              remarks: ""
            },
            {
              id: 2,
              checked: true,
              alerm: "接打电话",
              level: 1,
              voice: false,
              icon: "ex-new-icon-phone",
              remarks: ""
            },
            {
              id: 3,
              checked: true,
              alerm: "分神驾驶",
              level: 1,
              voice: false,
              icon: "ex-new-icon-eyes",
              remarks: ""
            },
            {
              id: 4,
              checked: true,
              alerm: "驾驶员变更",
              level: 1,
              voice: false,
              icon: "ex-new-icon-driver",
              remarks: ""
            },
            {
              id: 5,
              checked: true,
              alerm: "抽烟驾驶",
              level: 1,
              voice: false,
              icon: "ex-new-icon-smoke",
              remarks: ""
            },
            {
              id: 6,
              checked: true,
              alerm: "驾驶员异常",
              level: 1,
              voice: false,
              icon: "ex-new-icon-wheel",
              remarks: ""
            },
            {
              id: 7,
              checked: true,
              alerm: "车距过近",
              level: 1,
              voice: false,
              icon: "ex-new-icon-equipment",
              remarks: ""
            },
            {
              id: 8,
              checked: true,
              alerm: "前向碰撞",
              level: 1,
              voice: false,
              icon: "ex-new-icon-collision",
              remarks: ""
            },
            {
              id: 9,
              checked: true,
              alerm: "车道偏离",
              level: 1,
              voice: false,
              icon: "ex-new-icon-deviate",
              remarks: ""
            },
            {
              id: 10,
              checked: true,
              alerm: "行人碰撞报警",
              level: 1,
              voice: false,
              icon: "ex-new-icon-deviate",
              remarks: ""
            }
          ],
          selected: true
        },
        {
          type: "渣土运输违规",
          indeterminate: true,
          checkAll: true,
          list: [
            {
              id: 1,
              checked: true,
              alerm: "疲劳驾驶",
              level: 1,
              voice: false,
              icon: "",
              remarks: ""
            }
          ],
          selected: false
        },
        {
          type: "场站违规",
          indeterminate: true,
          checkAll: true,
          list: [
            {
              id: 1,
              checked: true,
              alerm: "疲劳驾驶",
              level: 1,
              voice: false,
              icon: "",
              remarks: ""
            }
          ],
          selected: false
        }
      ],
      gpsSeed: ["车站", "加油站", "ATM", "酒店", "医院", "银行"],
      simStep: {
        vechile: 0
      }
    };
  },
  mounted() {
    this.platformState = baseDatalib.getPlatformState();
    this.baseData = baseDatalib.getPlatformBaseData();
    this.operatData = baseDatalib.getPlatformOperatData();
  },
  methods: {
    //菜单跳转
    handleMenu(e) {
      console.log(e);
      this.hideMenu = e;
    },

    //保存平台信息
    handleStateSave() {
      this.platformState.edit = false;
      baseDatalib.setPlatformState(this.platformState);
    },

    //保存基础数据
    handleBaseDataSave() {
      this.baseData.edit = false;
      baseDatalib.setPlatformBaseData(this.baseData);
    },

    //保存运营数据
    handleOperatDataSave() {
      this.operatData.edit = false;
      baseDatalib.setPlatformOperatData(this.operatData);
    },

    countVecData(v) {
      console.log(v);
      this.operatData.vecOffline = 100 - v;
      this.operatData.vecDamage = baseDatalib.randomNumber(
        0,
        this.operatData.vecOffline
      );
    },

    countSiteData(v) {
      console.log(v);
      this.operatData.siteDubious = 100 - v;
      this.operatData.siteOnline = baseDatalib.randomNumber(0, 100);
      this.operatData.siteOffline = 100 - this.operatData.siteOnline;
    },

    countSiteStateData(v) {
      this.operatData.siteOffline = 100 - this.operatData.siteOnline;
    },

    countLandFillData(v) {
      this.operatData.landfillDubious = 100 - v;
    },

    //模拟车辆数据
    simVechileInfo() {
      this.simStep.vechile = 1;
      let vechileNumber, simGps;
      let simVechile = baseDatalib.simVechile(
        this.baseData.vechile,
        this.platformState.city
      );
      if (simVechile.status) {
        vechileNumber = simVechile.vechileNumber;
        setTimeout(() => {
          this.simStep.vechile = 2;
          let simGps = baseDatalib.simGps(
            this.baseData.gpsSeed,
            this.platformState.adcode
          );
        }, 3000);
      }
    },

    //checkbox选择
    handleSelection(e) {
      console.log(e);
      e.checkAll = !e.checkAll;
      e.indeterminate = false;
      let list = e.list;
      for (var i in list) {
        list[i].checked = e.checkAll;
      }
    },

    //合并行用的
    alermSetupMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [1, 2];
      }
    },

    //定位城市
    getCity() {
      let self = this;
      Axios.get(API.GET_CITY)
        .then(res => {
          if (res.data.status === "1") {
            self.platformState.city = res.data.city;
            self.platformState.adcode = res.data.adcode;
            self.platformState.regions = res.data;
            console.log(self.platformState);
            self.getDistricts();
          } else {
            alert("没有定位成功");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取城市行政区
    getDistricts(city) {
      let self = this;
      if (!city) {
        city = self.platformState.city;
      }
      Axios.get(
        API.GET_AREACODE + "&extensions=all&subdistrict=1&keywords=" + city
      )
        .then(res => {
          if (res.data.status === "1") {
            console.log(res.data);
            self.platformState.center = res.data.districts[0].center;

            let districts = res.data.districts[0].districts;
            let districtsSelect = [];
            self.platformState.districts = districts;

            for (var i in districts) {
              districtsSelect.push(districts[i].name);
            }

            self.platformState.districtsSelect = districtsSelect;
          } else {
            alert("没有定位成功");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    //随机数
    getRandom(key) {
      let self = this;
      let RandomNumber = baseDatalib.randomNumber(0, 10000);
      self.baseData[key] = RandomNumber;
    },

    beforeFileUpload() {}
  },
  computed: {
    platformAdminNav() {
      return this.$store.state.platformAdminNav;
    }
  }
};
</script>
<style lang="less">
.box-card {
  min-height: 460px;
  margin-bottom: 15px;
  box-shadow: none !important;

  &.box-card-edit {
    background-color: #f3fdf3;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  }
  .el-button--mini {
    padding: 7px !important;
  }
  .el-form--inline .el-form-item {
    display: block;
    width: calc(50% - 10px);
    float: left;
  }

  ul,
  li {
    list-style: none;
    padding: 0 !important;
    margin: 10px 0 !important;
  }

  .el-table {
    border: none !important;
    box-shadow: none !important;
    height: auto !important;

    th {
      background-color: #e7e8ee !important;
    }
    .cell {
      span.alerm {
        border-radius: 5px;
        padding: 4px 15px;
        &.yellowAlerm {
          color: #fff;
          background-color: #fc0;
        }
        &.redAlerm {
          color: #fff;
          background-color: #f30;
        }
      }

      ul {
        margin: 0;
        padding: 0;
        display: inline-block;
        list-style: none;
      }
      li {
        margin: 0;
        padding: 0;
        list-style: none;
        float: left;
      }
    }
  }
}
</style>
