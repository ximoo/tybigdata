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
          // 创建 infoWindow 实例
          // 信息窗体的内容
          var content = [
            "<div><b>高德软件有限公司1</b>",
            "电话 : 010-84107000   邮编 : 100102",
            "地址 : 北京市望京阜通东大街方恒国际中心A座16层</div></div>"
          ];
          self.infoWindow = new AMap.InfoWindow({
            // isCustom: true,
            autoMove: true,
            content: content.join("<br>"), //传入 dom 对象，或者 html 字符串
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
        let poiLocation = vechileInfo[i].location.split(",");
        let name = vechileInfo[i].label;
        var mker = new AMap.Marker({
          id: vechileInfo[i].id,
          icon: style[vechileInfo[i].state].iconUrl,
          position: [parseFloat(poiLocation[0]), parseFloat(poiLocation[1])],
          clickable: true,
          label: vechileInfo[i].label
        });

        mker.on("click", function(e) {
          console.log(name);
          self.infoWindow.setContent(name);
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
<style lang="less">
.ex-bigdata-main {
  .amap-info-content {
    background: #0a1854 !important;
    color: aqua !important;
  }

  .amap-info-sharp {
    border-top: 8px solid #0a1854 !important;
  }
}
</style>

