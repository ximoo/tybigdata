<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3 style="margin-left:25px;">全局实时监控</h3>
    <el-amap
      :vid="'amap-vue-monitor'"
      :center="center"
      :zoom="zoom"
      :zooms="zooms"
      :viewMode="'3D'"
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
    ></el-amap>
    <Conner />
  </div>
</template>
<script>
import mapEvent from "./allmonitor.service";
import VueAMap from "vue-amap";

import { mapState } from "vuex";

let amapManager = new VueAMap.AMapManager();
let mapTruckId;

export default {
  name: "AllMoitor",
  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 9,
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
      massTruck: null,
      mass3DTruck: null,
      vecMarkers: null,
      vecMarkersGps: [],
      mapObj: null,
      truckMarkerGps: [],
      holes: [],
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

          self.addVecMarker(self.mapGps);

          /* var p = new Promise(function(resolve, reject) {
                resolve("开始");
              });
              p.then(res => {
                console.log(res);
                return ;
              }).then(res => {
                console.log(res);
              });*/

          // mapEvent.addSiteMarker(self.mapObj, self.siteGps, self);
        }
      }
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      // self.$store.state.mapComponent.allComponent = self;
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

    addVecMarker(data) {
      let self = this;

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

      for (var i in data) {
        let lnglat = data[i].location.split(",");
        var mker = new AMap.Marker({
          id: i + 1,
          icon: style[0].iconUrl,
          position: [parseFloat(lnglat[0]), parseFloat(lnglat[1])],
          clickable: true,
          label: data[i].address
        });
        markers.push(mker);
      }

      var cluster = new AMap.MarkerClusterer(self.mapObj, markers, {
        gridSize: 20
      });

      // 将海量点添加至地图实例
      // massMarks.setMap(obj);
      self.mapObj.setFitView();
    },

    addPointer() {
      let self = this;
      self.mass3DTruck.setData(self.truckMarkerGps);
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
    ...mapState("platData", {
      platformCity: state => state.platformCity,
      platformCenter: state => state.platformCenter,
      adcode: state => state.adcode,
      platformDistricts: state => state.platformDistricts,
      platformDistrictsSelect: state => state.platformDistrictsSelect
    }),
    ...mapState("baseData", {
      GPSData: state => state.GPSData
    })
  }
};
</script>

