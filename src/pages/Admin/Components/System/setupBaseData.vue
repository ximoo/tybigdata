<template>
  <div class="ex-pages">
    <!-- 侧边导航栏 -->
    <SideMenu v-on:handleMenu="handleMenu" />
    <div class="ex-pages-content" :class="{'hide-menu':hideMenu}">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:15px;">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-s-home" /> 首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system/setupBaseData' }">系统设置</el-breadcrumb-item>
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
                  @click="EditPlatData"
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
                  <el-input v-model="platData.name" v-if="platData.edit" />
                  <span v-else>{{platData.name}}</span>
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
                <!-- <el-form-item label="配置文件：" style="width:100%" v-if="!platformState.edit">
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
                </el-form-item>-->
              </el-form>
            </el-card>
          </el-col>
          <!-- baseData -->
          <el-col :span="8">
            <el-card class="box-card" :class="{'box-card-edit':platformBaseData.edit}">
              <template slot="header" class="clearfix">
                <span>{{platformBaseData.name}}</span>
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
                  <el-input-number v-model="platformBaseData.vechile" v-if="platformBaseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="platformBaseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom('vechile')"></el-button>
                  </el-tooltip>
                  <span v-else>{{platformBaseData.vechile}}</span> 辆
                </el-form-item>
                <el-form-item label=" 工地总数：">
                  <el-input-number v-model="baseData.site" v-if="platformBaseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="platformBaseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom('site')"></el-button>
                  </el-tooltip>
                  <span v-else>{{platformBaseData.site}}</span> 个
                </el-form-item>
                <el-form-item label=" 消纳点总数：">
                  <el-input-number
                    v-model="platformBaseData.landfill"
                    v-if="platformBaseData.edit"
                  />
                  <el-tooltip effect="dark" content="随机数" v-if="platformBaseData.edit">
                    <el-button
                      type="info"
                      icon="el-icon-magic-stick"
                      @click="getRandom('landfill')"
                    ></el-button>
                  </el-tooltip>
                  <span v-else>{{platformBaseData.landfill}}</span> 个
                </el-form-item>
                <el-form-item label=" 企业总数：">
                  <el-input-number v-model="platformBaseData.company" v-if="platformBaseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="platformBaseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom('company')"></el-button>
                  </el-tooltip>
                  <span v-else>{{platformBaseData.company}}</span> 个
                </el-form-item>
                <el-form-item label=" 案件总数：">
                  <el-input-number v-model="platformBaseData.case" v-if="platformBaseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="platformBaseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom('case')"></el-button>
                  </el-tooltip>
                  <span v-else>{{platformBaseData.case}}</span> 个
                </el-form-item>
                <el-form-item label="报警推送数：">
                  <el-input-number
                    :max="20"
                    v-model="platformBaseData.alerm"
                    v-if="platformBaseData.edit"
                  />
                  <el-tooltip effect="dark" content="随机数" v-if="platformBaseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom('alerm')"></el-button>
                  </el-tooltip>
                  <span v-else>{{platformBaseData.alerm}}</span> 个
                </el-form-item>
                <el-form-item style="width:100%;font-size:12px;">{{platformBaseData.tip}}</el-form-item>

                <el-form-item label="模拟数据：" style="width:100%;" v-if="baseData.edit">
                  <label>
                    GPS种子：
                    <el-select v-model="platformBaseData.gpsSeed" style="width:140px;">
                      <el-option v-for="item in gpsSeeds" :key="item" :label="item" :value="item"></el-option>
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
                  <el-button
                    size="small"
                    type="success"
                    @click="simVechileInfo"
                    v-show="simStep.vechile == 3"
                  >
                    地理位置信息模拟完毕
                    <i class="el-icon-checked" />
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
                <span>{{platformOprateData.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="oprateData.edit = true"
                  icon="el-icon-edit"
                  v-if="!oprateData.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="handleOperateDataSave"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="160px" label-position="left">
                <el-form-item label="车辆在线率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="oprateData.vechile"
                    v-if="oprateData.edit"
                    @change="countVecData"
                  />
                  <span v-else>{{oprateData.vechile}}</span> %
                </el-form-item>
                <el-form-item label="车辆离线：">
                  <el-input
                    style="width:100px;"
                    v-model="oprateData.vecOffline"
                    v-if="oprateData.edit"
                    readonly
                  />
                  <span v-else>{{oprateData.vecOffline}}</span> %
                </el-form-item>
                <el-form-item label="车辆设备损坏：">
                  <el-input-number
                    :min="0"
                    :max="oprateData.vecOffline"
                    v-model="oprateData.vecDamage"
                    v-if="oprateData.edit"
                  />
                  <span v-else>{{oprateData.vecDamage}}</span> %
                </el-form-item>
                <el-form-item label=" 核准工地率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="oprateData.site"
                    v-if="oprateData.edit"
                    @change="countSiteData"
                  />
                  <span v-else>{{oprateData.site}}</span> %
                </el-form-item>
                <el-form-item label=" 可疑工地率：">
                  <el-input
                    readonly
                    v-model="oprateData.siteDubious"
                    v-if="oprateData.edit"
                    style="width:100px"
                  />
                  <span v-else>{{oprateData.siteDubious}}</span> %
                </el-form-item>
                <el-form-item label=" 工地开工率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="oprateData.siteOnline"
                    v-if="oprateData.edit"
                    @change="countSiteStateData"
                  />
                  <span v-else>{{oprateData.siteOnline}}</span> %
                </el-form-item>
                <el-form-item label=" 核准消纳点率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="oprateData.landfill"
                    v-if="oprateData.edit"
                    @change="countLandFillData"
                  />
                  <span v-else>{{oprateData.landfill}}</span> %
                </el-form-item>
                <el-form-item label=" 可疑消纳点率：">
                  <el-input
                    readonly
                    v-model="oprateData.landfillDubious"
                    v-if="oprateData.edit"
                    style="width:100px"
                  />
                  <span v-else>{{oprateData.landfillDubious}}</span> %
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <el-col :span="24">
            <el-card class="box-card">
              <template slot="header" class="clearfix">
                <span>报警类型:</span>
              </template>
              <el-table :data="platformAlermSetup" border :span-method="alermSetupMethod">
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
                    <el-button
                      size="small"
                      icon="el-icon-edit"
                      type="success"
                      @click="saveALermSetup"
                    >保存</el-button>
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
import lib from "~/common/lib";

import API from "../../../JzIndex/Configs/api";
import Axios from "axios";

import { mapState } from "vuex";

export default {
  name: "setupBaseData",
  components: {
    SideMenu
  },
  data() {
    let self = this;
    return {
      hideMenu: false,
      platformState: {},
      platformBaseData: {},
      platformOprateData: {},
      operatData: {},
      gpsSeeds: ["车站", "加油站", "ATM", "酒店", "医院", "银行"],
      simStep: {
        vechile: 0
      }
    };
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
      this.platformBaseData.edit = false;
      baseDatalib.setPlatformBaseData(this.platformBaseData);
    },

    //保存运营数据
    handleOperateDataSave() {
      this.platformOprateData.edit = false;
      baseDatalib.setPlatformOperateData(this.platformOprateData);
    },

    countVecData(v) {
      this.platformOprateData.vecOffline = 100 - v;
      this.platformOprateData.vecDamage = lib.randomNumber(
        0,
        this.platformOprateData.vecOffline
      );
    },

    countSiteData(v) {
      console.log(v);
      this.platformOprateData.siteDubious = 100 - v;
      this.platformOprateData.siteOnline = lib.randomNumber(0, 100);
      this.platformOprateData.siteOffline =
        100 - this.platformOprateData.siteOnline;
    },

    countSiteStateData(v) {
      this.platformOprateData.siteOffline =
        100 - this.platformOprateData.siteOnline;
    },

    countLandFillData(v) {
      this.platformOprateData.landfillDubious = 100 - v;
    },

    //模拟车辆数据
    simVechileInfo() {
      let self = this;
      self.simStep.vechile = 1;
      let gpsSeeds = self.platformBaseData.gpsSeed;
      let index = 0;
      let vechileNumber, simGps;
      let simVechile = baseDatalib.simVechile(
        this.baseData.vechile,
        this.platformState.city
      );

      let platformDistricts = self.platformDistricts;
      let platformDistrictsSelect = self.platformDistrictsSelect;
      let Districts = [];

      for (var i in platformDistricts) {
        for (var x in platformDistrictsSelect)
          if (platformDistricts[i].name == platformDistrictsSelect[x]) {
            Districts.push(platformDistricts[i]);
          }
      }

      if (simVechile.status) {
        vechileNumber = simVechile.vechileNumber;
        localStorage.$vechileNumber = JSON.stringify(vechileNumber);
        let poiArr = [];

        var p = new Promise(function(resolve, reject) {
          resolve("开始模拟车辆信息");
        });

        function runAsync1(index) {
          var p = new Promise(function(resolve, reject) {
            //做一些异步操作
            let self = this;
            let poiArray = [];
            let getPoiUrl =
              API.GET_POI +
              "&keywords=" +
              gpsSeeds +
              "&extensions=all&citylimit=true&city=" +
              Districts[index].adcode;

            Axios.get(getPoiUrl)
              .then(res => {
                if ((res.data.status = "1")) {
                  let pois = res.data.pois;
                  for (var i in pois) {
                    poiArray.push({
                      address: pois[i].address,
                      location: pois[i].location,
                      adcode: pois[i].adcode,
                      adname: pois[i].adname
                    });

                    if (i == pois.length - 1) {
                      resolve(poiArray);
                    }
                  }
                }
              })
              .catch(error => {
                reject(error);
              });
          });
          return p;
        }

        function runAsync2() {
          let poiArray = [];
          let poiNum = poiArr.length - 1;
          console.log(poiNum);
          var p = new Promise(function(resolve, reject) {
            for (var it = 0; it < poiNum; it++) {
              //做一些异步操作
              let getPoiAroundUrl =
                API.GET_AROUND +
                "&keywords=" +
                gpsSeeds +
                "&extensions=all&radius=50000&citylimit=true" +
                "&location=" +
                poiArr[it].location;

              Axios.get(getPoiAroundUrl)
                .then(res => {
                  console.log(res);
                  let pois = res.data.pois;
                  for (var i in pois) {
                    poiArr.push({
                      address: pois[i].address,
                      location: pois[i].location,
                      adcode: pois[i].adcode,
                      adname: pois[i].adname
                    });
                  }
                })
                .catch(error => {
                  reject(error);
                });

              setTimeout(() => {
                if (it == poiNum) {
                  resolve(poiArr);
                }
              }, 5000);
            }
          });
          return p;
        }

        self.simStep.vechile = 2;

        runAsync1(0)
          .then(function(data) {
            console.log(data);
            poiArr = poiArr.concat(data);
            return runAsync1(1);
          })
          .then(function(data) {
            console.log(data);
            poiArr = poiArr.concat(data);
            return runAsync2();
          })
          .then(function(data) {
            console.log(data);
            localStorage.$GPSData = JSON.stringify(poiArr);
            console.log(poiArr);
            self.simStep.vechile = 3;
          });
      }
      
    },

    //模拟地理位置信息
    simGps(adcode) {
      return new Promise(function(resolve, reject) {});
    },

    getAroundGps(location) {
      console.log(location);
      return new Promise(function(resolve, reject) {});
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
      let RandomNumber = lib.randomNumber(0, 10000);
      self.platformBaseData[key] = RandomNumber;
    },

    //保存报警类型
    saveALermSetup() {
      let self = this;
      let alermSetup = self.platformAlermSetup;
      localStorage.$platAlermSetup = JSON.stringify(alermSetup);
    },

    beforeFileUpload() {},
    EditPlatData() {
      this.platData.edit = !this.platData.edit;
      console.log(this.platData);
    }
  },

  computed: {
    platData() {
      let self = this;
      let platData = new Object();
      platData["edit"] = false;
      platData["name"] = self.platformName;
      platData["adcode"] = self.adcode;
      platData["city"] = self.platformCity;
      platData["showCity"] = self.showCity;
      platData["showWeather"] = self.showWeather;
      platData["districts"] = self.platformDistricts;
      platData["districtsSelect"] = self.platformDistrictsSelect;
      self.platformState = platData;
      return platData;
    },

    baseData() {
      let self = this;
      let baseData = new Object();
      baseData["edit"] = false;
      baseData["name"] = self.baseDataName;
      baseData["vechile"] = self.baseVechile;
      baseData["site"] = self.baseSite;
      baseData["landfill"] = self.baseLandfill;
      baseData["company"] = self.baseCompany;
      baseData["case"] = self.baseCase;
      baseData["alerm"] = self.baseAlerm;
      baseData["gpsSeed"] = self.baseGpsSeed;
      baseData["tip"] = self.baseTip;
      self.platformBaseData = baseData;
      return baseData;
    },

    oprateData() {
      let self = this;
      let oprateData = new Object();
      oprateData["edit"] = false;
      oprateData["name"] = self.oprateDataName;
      oprateData["vechile"] = self.oprateVechile;
      oprateData["vecOffline"] = self.oprateVechileOffLine;
      oprateData["vecDamage"] = self.oprateVechileDamage;
      oprateData["site"] = self.oprateSite;
      oprateData["siteOnline"] = self.oprateSiteOnline;
      oprateData["siteOffline"] = self.oprateSiteOffline;
      oprateData["siteDubious"] = self.oprateSiteDubious;
      oprateData["landfill"] = self.oprateLandfill;
      oprateData["landfillDubious"] = self.oprateLandfillDubious;
      self.platformOprateData = oprateData;
      return oprateData;
    },

    ...mapState("platData", {
      platformName: state => state.platformName,
      platformCity: state => state.platformCity,
      adcode: state => state.adcode,
      showCity: state => state.showCity,
      showWeather: state => state.showWeather,
      platformDistricts: state => state.platformDistricts,
      platformDistrictsSelect: state => state.platformDistrictsSelect,
      platformAlermSetup: state => state.platformAlermSetup
    }),

    ...mapState("baseData", {
      baseDataName: state => state.baseDataName,
      baseVechile: state => state.vechile,
      baseSite: state => state.site,
      baseLandfill: state => state.landfill,
      baseCompany: state => state.company,
      baseCase: state => state.case,
      baseAlerm: state => state.alerm,
      baseGpsSeed: state => state.gpsSeed,
      baseTip: state => state.tip,
      oprateDataName: state => state.oprateDataName,
      oprateVechile: state => state.oprateVechile,
      oprateVechileOffLine: state => state.oprateVechileOffLine,
      oprateVechileDamage: state => state.oprateVechileDamage,
      oprateSite: state => state.oprateSite,
      oprateSiteOnline: state => state.oprateSiteOnline,
      oprateSiteOffline: state => state.oprateSiteOffline,
      oprateSiteDubious: state => state.oprateSiteDubious,
      oprateLandfill: state => state.oprateLandfill,
      oprateLandfillDubious: state => state.oprateLandfillDubious
    })

  }
};
</script>