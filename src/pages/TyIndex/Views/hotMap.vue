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
    >
      <div class="hot-slider">
        <i class="el-icon-loading" v-show="loadShow" />
        <el-slider
          v-model="hotDate"
          :show-tooltip="false"
          :marks="hotMarks"
          @change="changeData"
          :step="25"
          show-stops
        ></el-slider>
      </div>
    </el-amap>
  </div>
</template>
<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();

import Util from "../Configs/util.lib";

let tempPOI = [],
  hotData = [],
  heatmap = null,
  dataId,
  indexId = 0;

export default {
  name: "bigData",
  components: {},
  data() {
    let self = this;
    return {
      hotDate: 0,
      hotMarks: {},
      loadShow: true,
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 13,
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
            heatmap = new AMap.Heatmap(amapManager.getMap(), {
              radius: 35, //给定半径
              opacity: [0, 0.8]
            });
            self.changeTime();
            // self.getData(0);
            self.changeId();
          });
        }
      }
    };
  },
  methods: {
    changeId() {
      let self = this;
      dataId = setInterval(() => {
        self.getData(indexId);
        self.hotDate = indexId * 25;
      }, 5000);
    },

    getData(index) {
      let self = this;
      let jsonUrl = [
        "/api/hot1.json",
        "/api/hot2.json",
        "/api/hot3.json",
        "/api/hot4.json",
        "/api/hot5.json"
      ];
      tempPOI = [];
      hotData = [];
      self.loadShow = true;
      self.$http.get(jsonUrl[index]).then(res => {
        tempPOI = res.data;

        for (var i in tempPOI) {
          // console.log(tempPOI[i]);
          let tempCount = 1.5;
          if (indexId > 0) tempCount = 2;

          hotData.push({
            lng: tempPOI[i].location.split(",")[0],
            lat: tempPOI[i].location.split(",")[1],
            count: tempPOI[i].counter * tempCount
          });
        }

        //设置数据集：该数据为北京部分“公园”数据
        heatmap.setDataSet({
          data: hotData,
          max: 7500
        });

        indexId = indexId + 1;
        if (indexId == 5) indexId = 0;
        self.loadShow = false;
      });
    },

    changeTime() {
      let NowTime = Util.getNow();
      let DateNowTime = new Date(NowTime).getTime();
      let hourTime = 3600000;
      let timeLine = [];
      for (var i = 0; i < 5; i++) {
        timeLine.push(Util.getDate(new Date(DateNowTime - hourTime * i)));
      }
      timeLine = timeLine.reverse();

      let hotMarks = {};

      for (var i = 0; i < 5; i++) {
        hotMarks[i * 25] = timeLine[i];
      }

      this.hotMarks = hotMarks;
      console.log(this.hotMarks);
    },

    changeData(step) {
      let _index = step / 25;
      this.getData(_index);
      console.log(_index);
    }
  }
};
</script>
<style lang="less" scoped>
.hot-slider {
  position: fixed;
  width: 50%;
  left: 50%;
  bottom: 60px;
  margin-left: -25%;
  z-index: 3000;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 20px 60px;
  border-radius: 15px;

  i {
    float: left;
    margin-right: 15px;
    margin-top: 7px;
    color: #fff;
    font-size: 24px;
  }

  .el-slider {
    float: right;
    width: 95%;
  }
}
</style>
