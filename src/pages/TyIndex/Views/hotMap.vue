<template>
  <div class="ex-bigdata-content" style="position: absolute;width:100%;height:100%;">
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
      style="height:100%;position: relative;width:100%"
    ></el-amap>
  </div>
</template>

<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();

export default {
  name: "bigData",
  components: {},
  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 14,
      zooms: [5, 20],
      center: [112.55067, 37.87059],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      features: ["bg", "point", "road", "building"],
      pitch: 0,
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
          var toolBar = new AMap.ControlBar({
            showZoomBar: false,
            showControlButton: true,
            position: {
              right: "15px",
              bottom: "-75px"
            }
          });
          o.addControl(toolBar);

          new AMap.DistrictSearch({
            extensions: "all",
            subdistrict: 0
          }).search("太原市", (status, result) => {
            // self.TextTest = result;
            var outer = [
              new AMap.LngLat(-360, 90, true),
              new AMap.LngLat(-360, -90, true),
              new AMap.LngLat(360, -90, true),
              new AMap.LngLat(360, 90, true)
            ];
            var holes = result.districtList[0].boundaries;
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
            o.add(polygon);
            self.addHot();
          });
        }
      }
    };
  },
  methods: {
    addHot() {
      let tempPOI = [];
      let hotData = [];

      this.$http.get("/api/hot.json").then(res => {
        console.log(res);
        tempPOI = res.data;

        for (var i in tempPOI) {
          hotData.push({
            lng: tempPOI[i].location.split(",")[0],
            lat: tempPOI[i].location.split(",")[1],
            count: tempPOI[i].counter
          });
        }

        let heatmap = new AMap.Heatmap(amapManager.getMap(), {
          radius: 50, //给定半径
          opacity: [0, 0.8]
        });
        //设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
          data: hotData,
          max: 200
        });



      });
    }
  }
};
</script>