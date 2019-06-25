<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3>全局实时监控 {{TextTest}}</h3>
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
      style="height:calc(100% - 36px)"
    >
      <el-amap-polygon
        v-for="(polygon, index) in polygons"
        :vid="index"
        :ref="`polygon_${index}`"
        :path="polygon.path"
        :key="index"
      ></el-amap-polygon>
    </el-amap>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
import getOption from "./operatedata.service";

export default {
  name: "OperateData",
  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 10,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      center: [112.24069, 30.33479],
      TextTest: "2323123",
      plugins: [
        {
          pName: "AMap.DistrictSearch",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o({
                extensions: "all",
                subdistrict: 0
              });
              o.search("荆州市", (status, result) => {
                self.TextTest = result;
              });
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

