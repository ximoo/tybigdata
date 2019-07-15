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
    >
      <vecTab v-on:showVecTab="showVecTab" :list-show="groupShow" />
    </el-amap>
    <vecGroup
      :group-show="groupShow"
      :vechileInfo="vechileInfo"
      v-on:closeGroupDialog="closeGroupDialog"
      v-on:pantoVechile="pantoVechile"
    />
    <Conner />
  </div>
</template>
<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
import mapEvent from "./vecmonitor.service";
import randomIze from "../../Configs/service.lib";

import vecGroup from "./vecGroup.vue";
import vecTab from "./vecTab.vue";

export default {
  name: "AirMonitor",
  components: { vecGroup, vecTab },
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
          // 创建 infoWindow 实例
          self.infoWindow = new AMap.InfoWindow({
            // isCustom: true,
            autoMove: true,
            content: "", //传入 dom 对象，或者 html 字符串
            offset: new AMap.Pixel(0, -50),
            zIndex: 500
          });
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
        }
      },
      groupShow: false
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
        let poiLocation = vechileInfo[i].location.split(",");
        let name = vechileInfo[i].label;
        let address = vechileInfo[i].address;

        var mker = new AMap.Marker({
          id: vechileInfo[i].id,
          icon: style[vechileInfo[i].state].iconUrl,
          position: [parseFloat(poiLocation[0]), parseFloat(poiLocation[1])],
          clickable: true,
          label: vechileInfo[i].label
        });

        mker.on("click", function(e) {
          var _content = "<div class='vec-info-box'>";
          _content += "<div class='vec-number'>" + name + "</div>";
          _content +=
            "<div class='vec-address'><i class='el-icon-time'></i> 最后定位时间：" +
            address +
            "</div>";
          _content +=
            "<div class='vec-address'><i class='el-icon-map-location'></i> 最后定位位置：" +
            address +
            "</div>";
          _content += "</div>";
          self.infoWindow.setContent(_content);
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
<style lang="less">
.ex-bigdata-main {
  
}
</style>

