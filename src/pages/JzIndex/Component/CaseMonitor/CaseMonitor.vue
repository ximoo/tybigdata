<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 6px)">
    <h3 style="margin-left:25px;">案件监控</h3>
    <el-amap
      :vid="'amap-vue-case'"
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
    ></el-amap>
    <Conner />
  </div>
</template>
<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
import mapEvent from "./casemonitor.service";
import Util from "../../Configs/util.lib";
import Service from "../../Configs/service.lib";
var randomName = require("chinese-random-name");
export default {
  name: "CaseMonitor",
  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 11,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      features: ["bg", "point", "road", "building"],
      pitch: 45,
      rotation: 0,
      buildingAnimation: false, //楼块出现是否带动画
      expandZoomRange: true,
      amapManager,
      mapObj: null,
      caseId: null,
      manMarker: [],
      massMarker: null,
      events: {
        init(o) {
          mapEvent.initMap(amapManager, self.city, self);
          var toolBar = new AMap.ControlBar({
            showZoomBar: false,
            showControlButton: true,
            position: {
              right: "15px",
              bottom: "-75px"
            }
          });
          o.addControl(toolBar);

          //地图海量点
          self.manMarker = [];

          self.casePlay();
        }
      }
    };
  },

  methods: {
    casePlay() {
      let GpsData = this.GpsData;
      let casePointers = new Array();
      let photos = [];

      self.massMarker = new AMap.MassMarks(self.manMarker, {
        opacity: 1,
        zIndex: 100,
        cursor: "pointer",
        style: {
          url: require("../../../../stastic/img/icon/icon-alerm.png"),
          anchor: new AMap.Pixel(12, 12),
          size: new AMap.Size(12, 12)
        }
      });

      for (var i = 1; i <= 20; i++) {
        let url = "../../../../stastic/img/upload/" + i + ".jpg";
        photos.push(url);
      }
      for (var i in GpsData) {
        casePointers.push({
          id: parseInt(i) + 1,
          name: randomName.generate(),
          caseName: "乱扔垃圾",
          address: GpsData[i].address,
          adname: GpsData[i].adname,
          adcode: GpsData[i].adcode,
          lnglat: GpsData[i].location.split(","),
          upDate: Util.getNow(),
          photo: photos[Service.randomLib(0, 20)]
        });
      }

      var marker = new AMap.Marker({
        content: " ",
        map: amapManager.getMap(),
        label: {
          offset: new AMap.Pixel(32, 0),
          content: ""
        }
      });
      self.massMarker.on("mouseover", function(e) {
        marker.setPosition(e.data.lnglat);
        marker.setLabel({
          content:
            "上报原因:" +
            e.data.caseName +
            "</br>上报地点:" +
            e.data.address +
            "</br>" +
            e.data.upDate
        });
      });
      self.massMarker.setData(casePointers);
      self.massMarker.setMap(amapManager.getMap());

      console.log(casePointers);
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

    GpsData() {
      return this.$store.state.simData.gps;
    },

    caseComponent() {
      return this.$store.state.mapComponent.caseComponent;
    }
  }
};
</script>
