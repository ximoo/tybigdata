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
          self.mapObj = o;
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

    },

    //随机展示上传案件
    loopPlay(data) {
      let self = this;
      let content =
        "<div class='icon-sanitation-photo'><img src=" +
        data.photo[0] +
        " /></div><div class='info-sanitation-street'>" +
        data.address +
        "</div>";


      //构建自定义信息窗体
      function createInfoWindow(content) {
        var middle = document.createElement("div");
        middle.innerHTML = content;
        middle.style.cursor = "pointer";
        middle.addEventListener(
          "click",
          function(e) {
            // self.showDetail(data);







          },
          false
        );
        return middle;
      }

      infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(-20, -35),
        content: createInfoWindow(content) //使用默认信息窗体框样式，显示信息内容
      });

      infoWindow.open(self.mapObj, data.location.split(","));

      self.mapObj.panTo(data.location.split(","));

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
