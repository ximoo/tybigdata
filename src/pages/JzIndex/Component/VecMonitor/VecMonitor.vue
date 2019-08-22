<template>
  <div class="item" style="width:calc(100% - 4px);height:calc(100% - 6px)">
    <h3 style="margin-left:25px;">车辆实时监控</h3>

    <el-amap
      :vid="'amap-vue-vec'"
      :center="center"
      :viewMode="'3D'"
      :pitch="pitch"
      :rotation="rotation"
      :features="features"
      :zoom="zoom"
      :zooms="zooms"
      :mapStyle="mapStyle"
      :showLabel="showLabel"
      :resizeEnable="resizeEnable"
      :animateEnable="animateEnable"
      :buildingAnimation="buildingAnimation"
      :expandZoomRange="expandZoomRange"
      :events="events"
      :amap-manager="amapManager"
      style="height:calc(100% - 36px);position: relative"
    >
      <vecTab v-on:showVecTab="showVecTab" :list-show="groupShow" />
    </el-amap>

    <vecGroup
      :group-show="groupShow"
      :vechileInfo="vechileInfo"
      v-on:closeGroupDialog="closeGroupDialog"
      v-on:pantoVechile="pantoVechile"
    />
    <!-- 信息窗体 -->
    <infoWindow ref="infoWindow" :data="infoWd.data">
      <template slot="footer">
        <div class="vec-info-control">
          <el-button size="mini" type="info" @click="showDetail">详情</el-button>
          <el-button size="mini" type="info" @click="showVideo">视频</el-button>
          <el-button size="mini" type="info" @click="limitSpeed">限速</el-button>
          <el-button size="mini" type="info" @click="limitHandle">限举</el-button>
          <el-button size="mini" type="info" @click="limitAcc">锁车</el-button>
          <!-- <el-button size="mini" @click="showHisTrail">轨迹</el-button> -->
        </div>
      </template>
    </infoWindow>

    <!-- <vecDetail
      :vecInfo="infoWd"
      v-on:showHisTrail="showHisTrail"
      v-on:vecDetailClose="vecDetailClose"
    />-->

    <!-- <vecHisTrail :vecInfo="infoWd.data" :vecHisShow="vecHisShow" v-on:vecHisClose="vecHisClose" /> -->
    <!-- <vecVideo
      :vecInfo="infoWd.data"
      v-on:vecVideoClose="vecVideoClose"
      :vecVideoShow="vecVideoShow"
    />-->
    <Conner />
  </div>
</template>
<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
import mapEvent from "./vecmonitor.service";
import randomIze from "../../Configs/service.lib";

import Util from "../../Configs/util.lib";
import vecGroup from "./vecGroup.vue";
import vecTab from "./vecTab.vue";
import vecDetail from "./vecDetail.vue";
import vecHisTrail from "./vecHisTrail.vue";
import vecVideo from "./vecVideo.vue";

import { mapState, mapGetters } from "vuex";

export default {
  name: "AirMonitor",

  components: { vecGroup, vecTab, vecDetail, vecHisTrail, vecVideo },

  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 11,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      center: [112.24069, 30.33479],
      features: ["bg", "point", "road", "building"],
      pitch: 45,
      rotation: 0,
      buildingAnimation: false, //楼块出现是否带动画
      expandZoomRange: true,
      amapManager,
      mapObj: null,
      vecMarkers: [],
      infoWindow: null,
      events: {
        init(o) {
          self.mapObj = amapManager.getMap();
          self.vecMarkers = new AMap.OverlayGroup();
          var toolBar = new AMap.ControlBar({
            showZoomBar: false,
            showControlButton: true,
            position: {
              right: "15px",
              bottom: "-75px"
            }
          });
          self.mapObj.addControl(toolBar);

          //初始化地图，画边界
          self.initMap(amapManager, self.Districts);

          // 创建 infoWindow 实例
          self.infoWindow = new AMap.InfoWindow({
            // isCustom: true,
            autoMove: true,
            content: "", //传入 dom 对象，或者 html 字符串
            offset: new AMap.Pixel(0, -50),
            zIndex: 500
          });

          self.addMarker();
        }
      },
      groupShow: false,
      infoWd: {
        show: false,
        data: { name: "123" }
      },
      vecHisShow: false,
      vecVideoShow: false
    };
  },

  mounted() {
    let self = this;
    // console.log(self.$refs.infoWindow);
    this.$nextTick(() => {
      // self.$store.state.mapComponent.vecComponent = self;
      
    });
  },

  methods: {
    initMap(obj, districts) {
      let self = this;
      let holes = [];
      let drawPolyline = new Promise(function(resolve, reject) {
        resolve("开始画线");
      });

      drawPolyline
        .then(() => {
          return searchPolyline(districts[0].adcode);
        })
        .then(res => {
          holes = holes.concat(res);
          return searchPolyline(districts[1].adcode);
        })
        .then(res => {
          holes = holes.concat(res);
        })
        .then(() => {
          var outer = [
            new AMap.LngLat(-360, 90, true),
            new AMap.LngLat(-360, -90, true),
            new AMap.LngLat(360, -90, true),
            new AMap.LngLat(360, 90, true)
          ];
          var pathArray = [outer];
          pathArray.push.apply(pathArray, holes);
          var polygon = new AMap.Polygon({
            pathL: pathArray,
            strokeColor: "#298bff",
            strokeWeight: 5,
            fillColor: "#0a0e1f",
            fillOpacity: 0.65
          });
          polygon.setPath(pathArray);
          self.mapObj.add(polygon);
        });

      function searchPolyline(adcode) {
        return new Promise(function(resolve, reject) {
          new AMap.DistrictSearch({
            extensions: "all",
            subdistrict: 0
          }).search(adcode, (status, result) => {
            let hole = result.districtList[0].boundaries;
            resolve(hole);
          });
        });
      }
    },

    addMarker() {
      let self = this;
      let obj = amapManager.getMap();
      let vechileInfo = self.vechileInfo;
      let markers = new Array();

      var style = [
        {
          iconUrl: new AMap.Icon({
            image: require("../../../../stastic/img/icon/icon-gray.png")
          })
        },
        {
          iconUrl: new AMap.Icon({
            image: require("../../../../stastic/img/icon/icon-alerm.png")
          })
        },
        {
          iconUrl: new AMap.Icon({
            image: require("../../../../stastic/img/icon/icon-stop.png")
          })
        },
        {
          iconUrl: new AMap.Icon({
            image: require("../../../../stastic/img/icon/icon-stop.png")
          })
        },
        {
          iconUrl: new AMap.Icon({
            image: require("../../../../stastic/img/icon/icon-drive.png")
          })
        }
      ];

      for (var i in vechileInfo) {
        vechileInfo[i]["lnglat"] = vechileInfo[i].gpsinfo.location.split(",");
        vechileInfo[i]["name"] = vechileInfo[i].vechileNumber;
        vechileInfo[i]["id"] = parseInt(i) + 1;
        vechileInfo[i]["style"] = vechileInfo[i].state;
        vechileInfo[i]["weight"] = randomIze.randomLib(1, 20);
        vechileInfo[i]["mileage"] = randomIze.randomLib(120, 999);

        let poiLocation = vechileInfo[i].gpsinfo.location.split(",");
        let name = vechileInfo[i].label;
        let address = vechileInfo[i].address;
        let state = vechileInfo[i].state;
        let speed = vechileInfo[i].speed;
        let mileage = vechileInfo[i].mileage;
        let weight = vechileInfo[i].weight;

        var mker = new AMap.Marker({
          id: vechileInfo[i].id,
          icon: style[vechileInfo[i].status].iconUrl,
          position: [parseFloat(poiLocation[0]), parseFloat(poiLocation[1])],
          clickable: true,
          label: vechileInfo[i].label
        });

        mker.on("click", function(e) {
          self.infoWd.data = {
            name: name,
            address: address,
            speed: speed,
            state: state,
            mileage: mileage,
            weight: weight
          };

          self.infoWindow.setContent(self.$refs.infoWindow.$el);
          self.infoWindow.open(amapManager.getMap(), [
            parseFloat(poiLocation[0]),
            parseFloat(poiLocation[1])
          ]);
          obj.setCenter([
            parseFloat(poiLocation[0]),
            parseFloat(poiLocation[1])
          ]);
        });

        markers.push(mker);
      }

      var cluster = new AMap.MarkerClusterer(obj, markers, {
        gridSize: 200
      });

      // 将海量点添加至地图实例
      // massMarks.setMap(obj);
      obj.setFitView();
    },

    pantoVechile(e) {
      let mapObj = amapManager.getMap();
      mapObj.setZoomAndCenter(20, e.center);
    },

    closeGroupDialog() {
      this.groupShow = false;
    },

    showVecTab(data) {
      this.groupShow = data;
    },

    showDetail() {
      console.log("detail");
      this.infoWd.show = true;
    },

    showVideo() {
      console.log("video");
      this.vecVideoShow = true;
    },

    vecDetailClose(b) {
      this.infoWd.show = b;
    },

    showHisTrail(b) {
      console.log("showHisTrail");
      this.vecHisShow = b;
    },

    vecHisClose(b) {
      this.vecHisShow = b;
    },

    vecVideoClose(b) {
      this.vecVideoShow = b;
    },

    limitSpeed() {
      this.$confirm("您是否要对该车辆下发限速指令?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "限速成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消限速"
          });
        });
    },

    limitHandle() {
      this.$confirm("您是否要对该车辆下发限举指令?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "限举成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消限举"
          });
        });
    },

    limitAcc() {
      this.$confirm("您是否要对该车辆下发锁车指令?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "锁车成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消锁车"
          });
        });
    }
  },

  computed: {
    inputListeners: function() {
      console.log(this.text());
    },

    city() {
      return this.platformCity;
    },
    Districts() {
      let self = this;
      let platformDistricts = self.platformDistricts;
      let platformDistrictsSelect = self.platformDistrictsSelect;
      let Districts = [];
      for (var i in platformDistricts) {
        for (var x in platformDistrictsSelect)
          if (platformDistricts[i].name == platformDistrictsSelect[x]) {
            Districts.push(platformDistricts[i]);
          }
      }
      return Districts;
    },
    ...mapState("platData", {
      platformDistricts: state => state.platformDistricts,
      platformDistrictsSelect: state => state.platformDistrictsSelect,
      platformCity: state => state.platformCity,
      adcode: state => state.adcode,
      platformCenter: state => state.platformCenter
    }),

    ...mapGetters("bigData", ["vechileInfo","simVechileHisTral"])
  }
};
</script>