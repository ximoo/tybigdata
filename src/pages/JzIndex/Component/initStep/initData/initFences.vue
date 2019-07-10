<template>
  <div>
    <blockquote style="margin-bottom:20px;">
      <p>
        <strong>使用方法：</strong>
        左侧选择 “腾讯地图/高德地图”,在搜索框中输入演示城市，并在地图中使用点工具按目标围栏端点进行描绘。在弹出的信息窗中复制高德经纬度。点与点之间的经纬度请用“|”隔开。
      </p>
    </blockquote>

    <el-collapse v-model="activeNames">
      <!-- 1 -->
      <el-collapse-item name="1">
        <template slot="title">
          <i class="el-icon-caret-right" />
          围栏设置：
          <sup style="margin-left:15px; color:#f30;">
            (
            <i class="header-icon el-icon-info"></i>
            演示平台名称、演示城市等相关配套工地/消纳点围栏地理位置的配置 )
          </sup>
        </template>
        <el-divider></el-divider>
        <el-form
          :inline="true"
          size="mini"
          label-position="right"
          label-width="150px"
          :model="iFence"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="场站监控显示名称：">
                <el-input v-model="sitemonitor.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider></el-divider>
        <el-tabs tab-position="left">
          <el-tab-pane label="工地围栏">
            <el-form size="mini">
              <div v-for="item , index in fences.site" :key="index">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="工地围栏名称：">
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入工地围栏名称"
                        v-model="item.name"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="工地围栏：">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="item.path"
                        placeholder="请输入围栏经纬度，以'|'进行分隔'"
                      ></el-input>
                      <el-button
                        class="item-draw"
                        type="info"
                        icon="el-icon-edit"
                        circle
                        @click="handleDraw(index,item,'fence')"
                      ></el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="门禁：">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="item.door.path"
                        placeholder="请输入围栏经纬度，以'|'进行分隔'"
                      ></el-input>
                      <el-button
                        class="item-draw"
                        type="info"
                        icon="el-icon-edit"
                        circle
                        @click="handleDraw(index,item,'door')"
                      ></el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="洗车槽：">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="item.wash.path"
                        placeholder="请输入围栏经纬度，以'|'进行分隔'"
                      ></el-input>
                      <el-button
                        class="item-draw"
                        type="info"
                        icon="el-icon-edit"
                        circle
                        @click="handleDraw(index,item,'wash')"
                      ></el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <p>工地配套：</p>
                    <ul>
                      <li>
                        <el-checkbox v-model="item.video">工地视频</el-checkbox>
                      </li>
                      <li>
                        <el-checkbox v-model="item.truck">工地进出车辆模拟</el-checkbox>
                      </li>
                      <li>
                        <el-checkbox v-model="item.truck">工地报警</el-checkbox>
                      </li>
                    </ul>
                  </el-col>
                  <el-col :span="3" style="padding-top: 45px;">
                    <el-form-item>
                      <el-button
                        v-if="index == fences.site.length -1 && index !=5"
                        type="success"
                        icon="el-icon-plus"
                        circle
                        @click="handlePlusSite"
                      ></el-button>
                      <el-button
                        type="danger"
                        icon="el-icon-minus"
                        circle
                        @click="handleMinusSite(index)"
                      ></el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
              </div>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="消纳点围栏">
            <el-form size="mini">
              <div v-for="item , index in fences.landfill" :key="index">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item label="消纳点围栏名称：">
                      <el-input
                        type="textarea"
                        :rows="4"
                        placeholder="请输入消纳点围栏名称"
                        v-model="item.name"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="消纳点围栏：">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="item.path"
                        placeholder="请输入围栏经纬度，以'|'进行分隔'"
                      ></el-input>
                      <el-button
                        class="item-draw"
                        type="info"
                        icon="el-icon-edit"
                        circle
                        @click="handleDraw(index,item,'fence')"
                      ></el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="门禁">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="item.door.path"
                        placeholder="请输入围栏经纬度，以'|'进行分隔'"
                      ></el-input>
                      <el-button
                        class="item-draw"
                        type="info"
                        icon="el-icon-edit"
                        circle
                        @click="handleDraw(index,item,'door')"
                      ></el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4">
                    <el-form-item label="洗车槽">
                      <el-input
                        type="textarea"
                        :rows="4"
                        v-model="item.wash.path"
                        placeholder="请输入围栏经纬度，以'|'进行分隔'"
                      ></el-input>
                      <el-button
                        class="item-draw"
                        type="info"
                        icon="el-icon-edit"
                        circle
                        @click="handleDraw(index,item,'wash')"
                      ></el-button>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <p>工地配套：</p>
                    <ul>
                      <li>
                        <el-checkbox v-model="item.video">消纳点视频</el-checkbox>
                      </li>
                    </ul>
                  </el-col>
                  <el-col :span="3" style="padding-top: 45px;">
                    <el-form-item>
                      <el-button
                        v-if="index == fences.landfill.length -1 && index !=5"
                        type="success"
                        icon="el-icon-plus"
                        circle
                        @click="handlePlusLandfill"
                      ></el-button>
                      <el-button
                        type="danger"
                        icon="el-icon-minus"
                        circle
                        @click="handleMinusLandfill(index)"
                      ></el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-divider></el-divider>
              </div>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-collapse-item>
      <!-- 2 -->
      <el-collapse-item name="2">
        <template slot="title">
          <i class="el-icon-caret-right" />
          场站模块数据配置：
          <sup style="margin-left:15px; color:#f30;">
            (
            <i class="header-icon el-icon-info"></i>
            演示平台名称、演示城市等相关配套工地/消纳点围栏地理位置的配置 )
          </sup>
        </template>
        <el-tabs tab-position="left">
          <el-tab-pane label="工地围栏"></el-tab-pane>
          <el-tab-pane label="消纳点围栏"></el-tab-pane>
        </el-tabs>
      </el-collapse-item>
    </el-collapse>

    <el-dialog :title="iFence.title" :visible="iFence.show" :append-to-body="true">
      <div style="position:relative">
        <el-amap
          :vid="'amap-vue-drawmap'"
          :center="center"
          :zoom="zoom"
          :zooms="zooms"
          :showLabel="showLabel"
          :mapStyle="mapStyle"
          :events="events"
          :fullscreen="true"
          :amap-manager="amapManager"
          style="height:500px"
        ></el-amap>
        <div class="btn-draw-fences">
          <!--  -->
          <el-button @click="startDraw('fence')" v-if="showBtn.fence">开始画场站</el-button>
          <el-button @click="startDraw('door')" v-if="showBtn.door">开始画门禁</el-button>
          <el-button @click="startDraw('wash')" v-if="showBtn.wash">开始画洗车槽</el-button>
          <!--  -->
          <el-button @click="storeFence" v-if="editBtn">结束编辑</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mapEvent from "./initfences.service";
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();

import API from "../../../Configs/api";
import axios from "axios";

export default {
  name: "initFences",
  data() {
    let self = this;
    return {
      activeNames: ["1", "2"],
      showBtn: {
        fence: false,
        door: false,
        wash: false
      },
      editBtn: false,
      iFence: {
        title: "新增工地围栏",
        show: false
      },
      mapStyle: "amap://styles/whitesmoke", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 14,
      zooms: [5, 20],
      showLabel: true,
      amapManager,
      mapObj: null,
      mouseTool: null,
      polygonEditor: null,
      indexRecord: null,
      polygonFence: null,
      polygonDoor: null,
      polygonWash: null,
      events: {
        init(o) {
          self.mouseTool = new AMap.MouseTool(o);
          self.mouseTool.wash = new AMap.MouseTool(o);
          self.mapObj = o;
        }
      },
      tempPath: [],
      tempDoor: [],
      tempWash: []
    };
  },
  mounted() {
    console.log(this.fences);
  },
  computed: {
    sitemonitor() {
      return this.$store.state.platformData.module.sitemonitor;
    },
    fences() {
      return this.$store.state.platformData.module.sitemonitor.module.fences;
    },
    center() {
      let centerArry = this.$store.state.platformData.state.center.split(",");
      return [parseFloat(centerArry[0]), parseFloat(centerArry[1])];
    }
  },
  methods: {
    //触发编辑
    handleDraw(index, item, action) {
      let self = this;
      this.iFence.show = true;
      this.indexRecord = [index, item];

      if (item.path != "") {
        let polyPath = [],
          tempPath = JSON.parse(item.path);
        self.tempPath = tempPath;
        for (var i in tempPath) {
          polyPath.push([tempPath[i].lng, tempPath[i].lat]);
        }
        self.polygonFence = new AMap.Polygon({
          // map: self.mapObj,
          path: polyPath,
          fillColor: "#00b0ff",
          strokeColor: "#80d8ff",
          strokeWeight: 5,
          zIndex: 50
        });

        //
        let polyDoor = [],
          tempDoor = [];
        if (item.door.path != "") tempDoor = JSON.parse(item.door.path);
        self.tempDoor = tempDoor;
        for (var i in tempDoor) {
          polyDoor.push([tempDoor[i].lng, tempDoor[i].lat]);
        }
        self.polygonDoor = new AMap.Polygon({
          // map: self.mapObj,
          path: polyDoor,
          fillColor: "#ffcc00",
          strokeColor: "#ff6600",
          strokeWeight: 3,
          zIndex: 60
        });

        //
        let polyWash = [],
          tempWash = [];
        if (item.wash.path != "") tempWash = JSON.parse(item.wash.path);
        self.tempWash = tempWash;
        for (var i in tempWash) {
          polyWash.push([tempWash[i].lng, tempWash[i].lat]);
        }
        self.polygonWash = new AMap.Polygon({
          // map: self.mapObj,
          path: polyWash,
          fillColor: "#11c711",
          strokeColor: "#008500",
          strokeWeight: 3,
          zIndex: 60
        });

        switch (action) {
          case "fence":
            setTimeout(() => {
              self.mapObj.add(self.polygonFence);
              self.mapObj.add(self.polygonDoor);
              self.mapObj.add(self.polygonWash);
              self.polygonEditor = new AMap.PolyEditor(
                self.mapObj,
                self.polygonFence
              );
              self.showBtn.fence = true;
              self.polygonEditor.open();
              self.polygonEditor.on("adjust", function(event) {
                self.showBtn[action] = false;
                self.editBtn = true;
              });
            }, 3000);
            break;
          case "door":
            setTimeout(() => {
              self.mapObj.add(self.polygonFence);
              self.mapObj.add(self.polygonDoor);
              self.mapObj.add(self.polygonWash);
              self.polygonEditor = new AMap.PolyEditor(
                self.mapObj,
                self.polygonDoor
              );
              self.showBtn.door = true;
              self.polygonEditor.open();
              self.polygonEditor.on("adjust", function(event) {
                self.showBtn[action] = false;
                self.editBtn = true;
              });
            }, 3000);
            break;
          case "wash":
            setTimeout(() => {
              self.mapObj.add(self.polygonFence);
              self.mapObj.add(self.polygonDoor);
              self.mapObj.add(self.polygonWash);
              self.polygonEditor = new AMap.PolyEditor(
                self.mapObj,
                self.polygonWash
              );
              self.showBtn.wash = true;
              self.polygonEditor.open();
              self.polygonEditor.on("adjust", function(event) {
                self.showBtn[action] = false;
                self.editBtn = true;
              });
            }, 3000);
            break;
        }
        // self.mapObj.setFitView();
      } else {
        self.showBtn[action] = true;
      }
    },

    //开始画多边形
    startDraw(action) {
      let self = this;
      self.mapObj.setDefaultCursor("crosshair");
      self.editBtn = false;
      let index = self.indexRecord[0];
      let type = self.indexRecord[1].type;
      if (self.polygonEditor) self.polygonEditor.close();
      self.polygonEditor = null;
      //多边形样式
      switch (action) {
        case "fence":
          if (self.polygonFence) self.mapObj.remove(self.polygonFence);
          self.mouseTool.polygon({
            extData: { id: "fence" },
            fillColor: "#00b0ff",
            strokeColor: "#80d8ff",
            strokeWeight: 5,
            zIndex: 50
          });
          self.tempPath = [];
          break;
        case "door":
          if (self.polygonDoor) self.mapObj.remove(self.polygonDoor);
          self.mouseTool.polygon({
            extData: { id: "door" },
            fillColor: "#ffcc00",
            strokeColor: "#ff9000",
            strokeWeight: 3,
            zIndex: 50
          });
          self.tempDoor = [];
          break;
        case "wash":
          if (self.polygonWash) self.mapObj.remove(self.polygonWash);
          self.mouseTool.polygon({
            extData: { id: "wash" },
            fillColor: "#11c711",
            strokeColor: "#008500",
            strokeWeight: 3,
            zIndex: 50
          });
          self.tempWash = [];
          break;
      }
      //保存路径
      self.mouseTool.on("draw", function(e) {
        let path = e.obj.getPath();

        switch (action) {
          case "fence":
            for (var i in path) {
              self.tempPath.push({
                lng: parseFloat(path[i].lng),
                lat: parseFloat(path[i].lat)
              });
            }
            break;

          case "door":
            for (var i in path) {
              self.tempDoor.push({
                lng: parseFloat(path[i].lng),
                lat: parseFloat(path[i].lat)
              });
            }

            break;

          case "wash":
            for (var i in path) {
              self.tempWash.push({
                lng: parseFloat(path[i].lng),
                lat: parseFloat(path[i].lat)
              });
            }
            break;
        }
        self.editDraw(action);
        self.showBtn[action] = false;
        self.editBtn = true;
      });
    },

    //编辑多边形
    editDraw(action) {
      let self = this;
      var polyArr = self.mapObj.getAllOverlays("polygon");
      var currentArr;
      for (var i in polyArr) {
        switch (polyArr[i].B.extData.id) {
          case "fence":
            currentArr = polyArr[i];
            break;
          case "door":
            currentArr = polyArr[i];
            break;
          case "wash":
            currentArr = polyArr[i];
            break;
        }
      }
      self.polygonEditor = new AMap.PolyEditor(self.mapObj, currentArr);
      //注意通过map.getAllOverlays("polygon")对象获得的是一个数组，故取数组第一个对象
      self.polygonEditor.open();
      self.polygonEditor.on("adjust", function(event) {
        self.showBtn[action] = false;
        self.editBtn = true;
      });
    },
    //
    endDraw() {
      this.polygonEditor.close();
    },
    //保存多边形
    storeFence(action) {
      let self = this;
      let index = self.indexRecord[0];
      let type = self.indexRecord[1].type;
      let center = getCenterPoint(self.tempPath);
      let address = "未知地点",
        district,
        adcode;

      axios
        .get(API.GET_ADDRESS + "&location=" + center.join(","))
        .then(res => {
          console.log(res);
          if (res.data.status == 1) {
            address = res.data.regeocode.formatted_address;
            district = res.data.regeocode.addressComponent.district;
            adcode = res.data.regeocode.addressComponent.adcode;
            self.$store.commit("recodePath", {
              path: JSON.stringify(self.tempPath),
              adcode: adcode,
              address: address,
              district: district,
              center: center,
              index: index,
              type: type,
              door: {
                path: JSON.stringify(self.tempDoor)
              },
              wash: {
                path: JSON.stringify(self.tempWash)
              }
            });
          }
          self.editBtn = false;
          self.iFence.show = false;
          self.mouseTool.close(true);
          self.mapObj.setDefaultCursor("pointer");
          self.showBtn.fence = false;
          self.showBtn.door = false;
          self.showBtn.wash = false;
          self.polygonEditor.close();
          if (self.polygonFence) self.mapObj.remove(self.polygonFence);
          if (self.polygonDoor) self.mapObj.remove(self.polygonDoor);
          if (self.polygonWash) self.mapObj.remove(self.polygonWash);
        })
        .catch(error => {
          console.log(error);
        });
    },

    addPolygons() {},
    //
    handleDrawClose() {},
    handlePlusSite() {
      let lastData = this.fences.site;
      let tempData = {
        icon: "el-icon-office-building",
        name: "",
        path: "",
        door: {
          enable: true,
          path: ""
        },
        wash: {
          enable: true,
          path: ""
        }
      };
      lastData.push(tempData);
      this.fences.site = lastData;
    },
    handleMinusSite(index) {
      let lastData = this.fences.site;
      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(index, 1);
      this.fences.site = lastData;
    },
    handlePlusLandfill() {
      let lastData = this.fences.landfill;
      let tempData = {
        icon: "el-icon-office-building",
        name: "",
        path: "",
        door: {
          enable: true,
          path: ""
        },
        wash: {
          enable: true,
          path: ""
        }
      };
      lastData.push(tempData);
      this.fences.landfill = lastData;
    },
    handleMinusLandfill(index) {
      let lastData = this.fences.landfill;
      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(index, 1);
      this.fences.landfill = lastData;
    }
  }
};

function getCenterPoint(path) {
  var x = 0.0;
  var y = 0.0;
  for (var i = 0; i < path.length; i++) {
    x = x + parseFloat(path[i].lng);
    y = y + parseFloat(path[i].lat);
  }
  x = x / path.length;
  y = y / path.length;
  return [x, y];
}
</script>
<style lang="less" scoped>
.btn-draw-fences {
  position: absolute;
  top: 15px;
  right: 15px;
}
.el-textarea.is-disabled .el-textarea__inner {
  background: none !important;
  color: #585858 !important;
}

.item-draw {
  position: absolute;
  bottom: 5px;
  right: 22px;
}
</style>