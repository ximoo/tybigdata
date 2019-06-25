<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3>全局实时监控</h3>
    <el-amap
      :vid="'amap-vue-monitor'"
      :center="center"
      :zoom="zoom"
      :zooms="zooms"
      :mapStyle="mapStyle"
      :showLabel="showLabel"
      :resizeEnable="resizeEnable"
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
import getOption from "./operatedata.service";

import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();

export default {
  name: "OperateData",
  data() {
    let self = this;

    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 9,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      center: [112.24069, 30.33479],
      amapManager,
      polygons: [
        {
          draggable: false,
          path: [
            [121.5273285, 31.21515044],
            [121.5293285, 31.21515044],
            [121.5293285, 31.21915044],
            [121.5273285, 31.21515044]
          ]
        }
      ],
      plugins: [
        {
          pName: "AMap.DistrictSearch",
          events: {
            init(instance) {
              new AMap.DistrictSearch({
                extensions: "all",
                subdistrict: 0
              }).search("荆州市", (status, result) => {
                // self.TextTest = result;

                console.log(result);

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
                  fillOpacity: .75
                });
                polygon.setPath(pathArray);
                let monitorMap = amapManager.getMap();
                monitorMap.add(polygon);
              });
            }
          }
        }
      ]
    };
  }
  /*
  mounted() {
    //行政区遮罩
    new AMap.DistrictSearch({
      extensions: "all",
      subdistrict: 0
    }).search("荆州市", function(status, result) {
      console.log(result);

      // 外多边形坐标数组和内多边形坐标数组
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
        strokeColor: "#e97d49",
        strokeWeight: 5,
        fillColor: "#10193f",
        fillOpacity: 0.55
      });
      polygon.setPath(pathArray);
      // self.mapObj.add(polygon)
    });
  }
  */
};
</script>

