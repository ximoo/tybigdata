<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3>全局实时监控</h3>
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
      :plugin="plugins"
      :amap-manager="amapManager"
      style="height:calc(100% - 36px)"
    ></el-amap>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
import mapEvent from "./allmonitor.service";
import VueAMap from "vue-amap";
import store from "../Configs/store";

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
      // center: [store.state.platformData.state.city],
      pitch: 0,
      rotation: 0,
      buildingAnimation: true, //楼块出现是否带动画
      expandZoomRange: true,
      amapManager,
      massTruck: null,
      mass3DTruck: null,
      vecMarkers: null,
      vecMarkersGps: null,
      mapObj: null,
      truckMarkerGps: [],
      plugins: [
        {
          pName: "AMap.DistrictSearch",
          events: {
            init(instance) {
              self.mapObj = amapManager.getMap();
              self.vecMarkers = new AMap.OverlayGroup();
              mapEvent.initMap(
                amapManager,
                store.state.platformData.state.city,
                self
              );
              mapEvent.addVecMarker(self.mapObj, self.mapGps, self);
              setInterval(() => {
                mapEvent.addVecMarker(self.mapObj, self.mapGps, self);
              }, store.state.platformData.alerms.timer * 1000);
              var toolBar = new AMap.ControlBar({
                showZoomBar: false,
                showControlButton: true,
                position: {
                  right: "15px",
                  bottom: "-75px"
                }
              });
              self.mapObj.addControl(toolBar);
            }
          }
        }
      ]
    };
  },
  mounted() {},
  methods: {
    addPointer() {
      let self = this;
      self.mass3DTruck.setData(self.truckMarkerGps);
    }
  },
  computed: {
    city() {
      console.log(this.$store.state.platformData.state.city);
      return this.$store.state.platformData.state.city;
    },
    center() {
      let centerArry = this.$store.state.platformData.state.center.split(",");
      return [parseFloat(centerArry[0]), parseFloat(centerArry[1])];
    },
    mapGps() {
      return this.$store.state.mapGps;
    }
  }
};
</script>

