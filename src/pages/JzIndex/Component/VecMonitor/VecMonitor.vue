<template>
  <div class="item" style="width:calc(100% -4px );height:calc(100% - 6px)">
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
    ></el-amap>
    <vecGroup :groupShow="groupShow" :vechileInfo="vechileInfo" v-on:pantoVechile="pantoVechile" />
    <Conner />
  </div>
</template>
<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
import mapEvent from "./vecmonitor.service";
import randomIze from "../../Configs/service.lib";

import vecGroup from "./vecGroup.vue";

export default {
  name: "AirMonitor",
  components: { vecGroup },
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
          self.addMarker();
          // 创建 infoWindow 实例
          self.infoWindow = new AMap.InfoWindow({
            isCustom: true, //使用自定义窗体
            content: "<div>dfasfsafsaf</div>",
            autoMove: true,
            offset: new AMap.Pixel(16, -50)
          });

          self.infoWindow.open();
        }
      },
      groupShow: true
    };
  },
  mounted() {
    let self = this;

    this.$nextTick(() => {
      self.$store.state.mapComponent.vecComponent = self;
    });

  },
  methods: {

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
        vechileInfo[i]["lnglat"] = vechileInfo[i].location.split(",");
        vechileInfo[i]["name"] = vechileInfo[i].label;
        vechileInfo[i]["id"] = parseInt(i) + 1;
        vechileInfo[i]["style"] = vechileInfo[i].state;

        var mker = new AMap.Marker({
          id: vechileInfo[i].id,
          icon: style[vechileInfo[i].state].iconUrl,
          position: vechileInfo[i].location.split(","),
          clickable: true
        });

        mker.on("click", function() {
          self.infoWindow.open(obj, vechileInfo[i].location.split(","));
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

    addInfoWindow() {
      // 实现自定义窗体内容，返回拼接后的字符串
      function createInfoWindow(title, content) {
        // 内容拼接 ...
        return content;
      }
    },

    pantoVechile(e) {
      let mapObj = amapManager.getMap();
      mapObj.setZoomAndCenter(20, e.center);
    }

  },

  computed: {

    vechileInfo() {
      return this.$store.state.simData.vechileInfo;
    },

    city() {
      return this.$store.state.platformData.state.city;
    }

  }
};
</script>
<style lang="less" scoped>
</style>

