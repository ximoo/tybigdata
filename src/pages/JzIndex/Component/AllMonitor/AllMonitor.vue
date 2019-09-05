<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3 style="margin-left:25px;">全局实时监控</h3>
    <el-amap
      :vid="'amap-vue-monitor'"
      :center="center"
      :zoom="zoom"
      :zooms="zooms"
      :mapStyle="mapStyle"
      :pitch="pitch"
      :rotation="rotation"
      :features="features"
      :showLabel="showLabel"
      :resizeEnable="resizeEnable"
      :buildingAnimation="buildingAnimation"
      :expandZoomRange="expandZoomRange"
      :animateEnable="animateEnable"
      :events="events"
      :amap-manager="amapManager"
      style="height:calc(100% - 36px)"
    >
      <i class="el-icon-loading map-loading" v-if="showLoading" />
      <el-amap-marker
        v-for="(marker, index) in alermMarker"
        :position="marker.position"
        :icon="marker.icon"
        :vid="index"
      ></el-amap-marker>
    </el-amap>
    <Conner />
  </div>
</template>
<script>
import VueAMap from "vue-amap";
import { mapState } from "vuex";
import lib from "~/common/lib";

let amapManager = new VueAMap.AMapManager();
let mapTruckId;

export default {
  name: "AllMoitor",
  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 13,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      features: ["bg", "point", "road", "building"],
      // center: [store.state.platformData.state.city],
      pitch: 35,
      rotation: 15,
      buildingAnimation: true, //楼块出现是否带动画
      expandZoomRange: true,
      amapManager,
      vecMarkers: null,
      vecMarkersGps: [],
      mapObj: null,
      truckMarkerGps: [],
      holes: [],
      showLoading: false,
      TralDots: null,
      dataBase: openDatabase(
        "hisTralDots",
        "1.0",
        "轨迹点数据",
        1024 * 1024,
        function() {
          console.info("创建轨迹点数据成功！");
        }
      ),
      events: {
        init(instance) {
          self.mapObj = amapManager.getMap();
          self.vecMarkers = new AMap.OverlayGroup();

          //地图控制器
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

          // self.simVechileHisTral();
          //判断是否生成轨迹
          self.dataBase.transaction(function(ts) {
            ts.executeSql(
              "select data from hisTralDots ",
              [],
              function(ts, result) {
                if (result) {
                  let data = result.rows[0].data;
                  if (data.length > 0) {
                    self.addPointer(JSON.parse(data));
                  } else {
                    self.simVechileHisTral();
                  }
                }
                console.info("查询数据成功！");
              },
              function(ts, message) {
                console.info("查询数据失败！" + message);
              }
            );
          });
        }
      }
    };
  },

  mounted() {
    let self = this;
    this.$nextTick(() => {
      self.TralDots = self.hisTralDots;
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
            strokeWeight: 3,
            strokeOpacity: 0.45,
            fillColor: "#0a0e1f",
            fillOpacity: 0.85
          });
          polygon.setPath(pathArray);
          self.mapObj.add(polygon);
          // self.addVecMarker(self.platformAlermVechile);
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

    addVecMarker(data) {
      let self = this;
      let markers = new Array();
      var style = [
        { icon: require("~/stastic/img/icon/ex-new-icon-fatigue.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-phone.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-eyes.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-driver.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-equipment.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-collision.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-deviate.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-man.png") }
      ];

      for (var i in data) {
        let lnglat = data[i].gpsinfo.location.split(",");
        var mker = new AMap.Marker({
          id: i + 1,
          icon: style[0].icon,
          position: [parseFloat(lnglat[0]), parseFloat(lnglat[1])],
          clickable: true,
          label: data[i].gpsinfo.address,
          map: self.mapObj
        });
      }

      self.mapObj.setFitView();
    },

    addPointer(data) {
      let self = this;
      self.mapObj.plugin(["AMap.Heatmap"], function() {
        //初始化heatmap对象
        var heatmap = new AMap.Heatmap(self.mapObj, {
          radius: 2, //给定半径
          // heightBezier: [0.21,0.18,0.952,-0.21],
          heightScale: 0.15,
          opacity: [0, 0.85],
          gradient: {
            0.5: "#ffcc00",
            0.7: "rgb(0, 255, 0)",
            1.0: "#ffff00"
          }
        });
        //设置数据集
        heatmap.setDataSet({
          data: data,
          max: 100
        });
        self.mapObj.setZoom(11);
      });
    },

    simVechileHisTral() {
      let self = this;
      let gData = self.GPSData;
      let HisTralDot = [],
        index = 1;

      // console.log(gData);

      let searchPoi = new Promise(function(resolve, reject) {
        resolve("开始描点");
      });
      self.showLoading = true;

      initData();

      function initData() {
        searchPoi
          .then(res => {
            console.log(res);
            return searchHisPoi(
              gData[lib.randomNumber(0, gData.length - 1)].location.split(","),
              gData[lib.randomNumber(0, gData.length - 1)].location.split(",")
            );
          })
          .then(res => {
            return (HisTralDot = HisTralDot.concat(res));
          })
          .then(res => {
            if (index >= gData.length * 2) {
              self.showLoading = false;

              if (!self.dataBase) {
                console.info("当前浏览器不支持Html5本地数据库");
                return false;
              } else {
                //更新数据
                self.dataBase.transaction(function(ts) {
                  ts.executeSql(
                    "update hisTralDots set data = ? where rowid = ? ",
                    [JSON.stringify(res), 1],
                    function(ts, result) {
                      console.info(result);
                    },
                    function(ts, message) {
                      console.info(message);
                    }
                  );
                });
              }
              self.addPointer(res);
            } else {
              initData();
            }
            console.log(index + "/" + HisTralDot.length);
          })
          .catch(error => {
            self.showLoading = false;
            if (!self.dataBase) {
              console.info("当前浏览器不支持Html5本地数据库");
              return false;
            } else {
              //更新数据
              self.dataBase.transaction(function(ts) {
                ts.executeSql(
                  "update hisTralDots set data = ? where rowid = ? ",
                  [JSON.stringify(HisTralDot), 1],
                  function(ts, result) {
                    console.info(result);
                  },
                  function(ts, message) {
                    console.info(message);
                  }
                );
              });
            }
            self.addPointer(HisTralDot);
            console.log(index + "/" + HisTralDot.length);
            console.log(error);
          });
      }

      function searchHisPoi(startLngLat, endLngLat) {
        return new Promise(function(resolve, reject) {
          new AMap.Driving({
            policy: AMap.DrivingPolicy.REAL_TRAFFIC
          }).search(
            [startLngLat[0], startLngLat[1]],
            [endLngLat[0], endLngLat[1]],
            function(status, result) {
              // 未出错时，result即是对应的路线规划方案
              if (result.info == "OK") {
                let steps = result.routes[0].steps;
                let dots = [];
                for (var i in steps) {
                  dots = dots.concat(steps[i].path);
                }
                console.log(index);
                index++;
                resolve(dots);
              } else {
                reject("fail!");
              }
            }
          );
        });
      }
    }
  },
  watch: {
    platformAlermVechile(n) {
      let self = this;
      // if(n)self.mapObj.setFitView()
      // self.addVecMarker(self.platformAlermVechile);
    }
  },
  computed: {
    city() {
      return this.platformCity;
    },

    center() {
      let centerArry = this.platformCenter.split(",");
      return [parseFloat(centerArry[0]), parseFloat(centerArry[1])];
    },

    mapGps() {
      return this.GPSData;
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

    alermMarker() {
      let self = this;
      let platformAlermVechile = self.platformAlermVechile;
      let alermMarker = [];
      var style = [
        { icon: require("~/stastic/img/icon/ex-new-icon-fatigue.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-phone.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-eyes.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-driver.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-equipment.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-collision.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-deviate.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-man.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-phone.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-eyes.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-driver.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-equipment.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-collision.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-deviate.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-man.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-phone.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-eyes.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-driver.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-equipment.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-collision.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-deviate.png") },
        { icon: require("~/stastic/img/icon/ex-new-icon-man.png") }
      ];

      for (var i in platformAlermVechile) {
        let lnglat = platformAlermVechile[i].gpsinfo.location.split(",");
        let iconId = platformAlermVechile[i].alerm.id;
        // console.log(iconId);
        alermMarker.push({
          id: i + 1,
          icon: style[iconId].icon,
          position: [parseFloat(lnglat[0]), parseFloat(lnglat[1])],
          clickable: true,
          label: platformAlermVechile[i].gpsinfo.address,
          map: self.mapObj
        });
      }
      // if (platformAlermVechile.length > 0) self.mapObj.setFitView();
      return alermMarker;
    },
    ...mapState("platData", {
      platformCity: state => state.platformCity
    }),

    ...mapState("platData", {
      platformCity: state => state.platformCity,
      platformCenter: state => state.platformCenter,
      adcode: state => state.adcode,
      platformDistricts: state => state.platformDistricts,
      platformDistrictsSelect: state => state.platformDistrictsSelect
    }),

    ...mapState("bigData", {
      hisTralDots: state => state.hisTralDots,
      platformAlermVechile: state => state.platformAlermVechile
    }),

    ...mapState("baseData", {
      GPSData: state => state.GPSData
    })
  }
};
</script>
<style lang="less" scoped>
.map-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 32px;
}
</style>