<template>
  <div class="ex-bigdata-content" style="position: absolute;width:100%;height:100%;">
    <fullScreen />
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
    >{{finalData}}</el-amap>
  </div>
</template>
<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();

export default {
  name: "testMap",
  data() {
    let self = this;
    return {
      finalData: null,

      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 13,
      zooms: [5, 20],
      center: [112.55067, 37.87059],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      features: ["bg", "point", "road", "building"],
      pitch: 65,
      rotation: 15,
      buildingAnimation: false, //楼块出现是否带动画
      expandZoomRange: true,
      amapManager,
      mapObj: null,
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

            self.getPath(
              o,
              [112.345161438, 37.9157634878],
              [112.5849723816, 37.7883527056]
            );
          });
        }
      }
    };
  },
  methods: {
    getPath(mapObj, startPoi, endPoi) {
      let pathStep,
        pathLine = [];
      let polyPath = new AMap.Driving();
      polyPath.search(startPoi, endPoi, function(status, result) {
        pathStep = result.routes[0].steps;

        for (var i in pathStep) {
          pathLine = [].concat(pathStep[i].path);
        }
        console.log(pathLine);

        var object3Dlayer = new AMap.Object3DLayer();
        mapObj.add(object3Dlayer);
        var Line3D = new AMap.Object3D.Line();
        Line3D.transparent = true;
        var geometry = Line3D.geometry;
        for (var i = 0; i < pathLine.length-1; i++) {
          var origin = mapObj.lngLatToGeodeticCoord([
            pathLine[i].lng,
            pathLine[i].lat
          ]);
          var des = mapObj.lngLatToGeodeticCoord([
            pathLine[i + 1].lng,
            pathLine[i + 1].lat
          ]);
          console.log(origin);
          geometry.vertices.push(origin.x, origin.y, 0);
          geometry.vertices.push(des.x, des.y, 0);
        }
        console.log(geometry);
        object3Dlayer.add(Line3D);
      });
    }
  }
};
</script>
<style lang="less">
</style>

