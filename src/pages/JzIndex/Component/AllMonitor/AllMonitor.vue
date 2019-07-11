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
      :plugin="plugins"
      :amap-manager="amapManager"
      style="height:calc(100% - 36px)"
    ></el-amap>
    <Conner />
  </div>
</template>
<script>
import mapEvent from "./allmonitor.service";
import VueAMap from "vue-amap";
import store from "../../Configs/store";

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
      pitch: 65,
      rotation: 15,
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
              mapEvent.initMap(amapManager, self.city, self);
              mapEvent.addVecMarker(self.mapObj, self.mapGps, self);
              setInterval(() => {
                mapEvent.addVecMarker(self.mapObj, self.mapGps, self);
              }, store.state.platformData.alerms.timer * 1000);

              mapEvent.addSiteMarker(self.mapObj, self.siteGps, self);
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
  mounted() {
    let self = this;
    this.$nextTick(() => {
      self.$store.state.mapComponent.allComponent = self;
    });
  },
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
    },
    siteGps() {
      let siteGeo = this.$store.state.platformData.module.sitemonitor.module.fences.site.concat(
        this.$store.state.platformData.module.sitemonitor.module.fences.landfill
      );
      return siteGeo;
    },
    siteComponent() {
      return this.$store.state.mapComponent.siteComponent;
    }
  }
};
</script>

