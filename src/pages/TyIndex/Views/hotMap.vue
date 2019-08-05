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
      <div class="loadingAll" v-show="loadShowAll">
        <p>
          <i class="el-icon-loading" />
          正在加载数据....
        </p>
      </div>
      <ul class="hot-type-list" v-if="showType">
        <li v-for="item,index in dateType" :key="index" @click="handleType(item.value)">
          <i class="el-icon-document" />
          {{item.label}}
        </li>
      </ul>

      <div class="hot-slider">
        <i class="el-icon-loading" v-show="loadShow" />
        <el-slider
          v-model="hotDate"
          :show-tooltip="false"
          :marks="hotMarks"
          @change="changeData"
          :step="100/12"
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
  preId,
  indexId = 1;

let localTemp = { max: 0, cMax: 0, times: [] };

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
      loadShowAll: true,
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
          });

          self.changeTime();
          console.log("changeTime");

          preId = setInterval(() => {
            self.preGetData();
          }, 1000);

          self.preGetData();
          console.log("getData");
          // self.changeId();
        }
      },

      dateSelect: "",

      dateType: [
        {
          id: 0,
          label: "总人数",
          value: 0
        },
        {
          id: 1,
          label: "非网上购物偏好人数",
          value: 1
        },
        {
          id: 2,
          label: "工作人数",
          value: 2
        },
        {
          id: 3,
          label: "居住人数",
          value: 3
        },
        {
          id: 4,
          label: "老年人数",
          value: 4
        },
        {
          id: 5,
          label: "男性人数",
          value: 5
        },
        {
          id: 6,
          label: "女性人数",
          value: 6
        },
        {
          id: 7,
          label: "其他人数",
          value: 7
        },
        {
          id: 8,
          label: "青年人数",
          value: 8
        },
        {
          id: 9,
          label: "网上购物偏好人数",
          value: 9
        },
        {
          id: 10,
          label: "消费等级低的人数",
          value: 10
        },
        {
          id: 11,
          label: "消费等级高的人数",
          value: 11
        },
        {
          id: 12,
          label: "消费等级中的人数",
          value: 12
        },
        {
          id: 13,
          label: "中年人数",
          value: 13
        }
      ],
      showType: false
    };
  },

  methods: {
    changeId() {
      let self = this;
      dataId = setInterval(() => {
        self.changeData(indexId);
      }, 5000);
    },

    preGetData() {
      let self = this;
      self.loadShow = true;
      tempPOI = [];
      let jsonUrl = "/api/hotmap/hot" + indexId + ".json";

      self.$http
        .get(jsonUrl)
        .then(res => {
          tempPOI = res.data;
          let total = 0;
          for (var i in tempPOI) {
            let singlePoi = parseInt(tempPOI[i].counter);
            total = total + singlePoi;
            if (singlePoi >= localTemp.cMax) localTemp.cMax = singlePoi;
          }

          let times = total / localTemp.max;
          console.log("max:" + localTemp.max + "/total:" + total);
          console.log(times);
          localTemp.times.push(times);
          if (total >= localTemp.max) {
            localTemp.max = total;
          }
          console.log(localTemp);
          indexId = indexId + 1;
          if (indexId == 14) {
            clearInterval(preId);
            indexId = 1;
            self.changeId();
            return false;
          }
        })
        .catch(error => {
          console.log(error);
        });
    },

    getData(date = 0, type = 0) {
      let self = this;
      tempPOI = [];
      hotData = [];
      self.loadShow = true;
      let jsonUrl = "/api/hotmap/hot" + indexId + ".json";
      self.$http.get(jsonUrl + "?date=" + date + "&type=" + type).then(res => {
        self.loadShowAll = false;
        tempPOI = res.data;
        let tempCounter = localTemp.times[indexId - 1];
        if (tempCounter == Infinity) tempCounter = 1;
        console.log(tempCounter);
        for (var i in tempPOI) {
          hotData.push({
            lng: tempPOI[i].location.split(",")[0],
            lat: tempPOI[i].location.split(",")[1],
            count: Math.round(tempPOI[i].counter / tempCounter)
          });
        }

        //设置数据集：该数据为北京部分“公园”数据;
        heatmap.setDataSet({
          data: hotData,
          max: localTemp.cMax
        });

        self.loadShow = false;

        indexId = indexId + 1;
        if (indexId == 14) {
          indexId = 1;
        }
      });
    },

    changeTime() {
      let self = this;
      let NowTime = Util.getNow();
      let DateNowTime = new Date(NowTime).getTime();
      let HourTime = 1800000;
      let timeLine = [];

      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();

      let nowTodayTime = new Date(
        year + "-" + month + "-" + day + " 00:00:00"
      ).getTime();
      if (!self.dateSelect) self.dateSelect = nowTodayTime;

      console.log(nowTodayTime);

      for (var i = 0; i <= 12; i++) {
        timeLine.push(Util.getDate(nowTodayTime + i * HourTime));
      }

      let hotMarks = {},
        split = 100 / 12;

      for (var i = 0; i <= 12; i++) {
        hotMarks[i * split] = timeLine[i];
      }

      this.hotMarks = hotMarks;
    },

    handleType(type) {
      let self = this;
      self.dataType = type;
      console.log(type);

      self.getData(self.dateSelect, self.dataType);
    },

    changeData(step) {
      console.log(step);
      let self = this;
      let _index = ((step + 1) * 12) / 100;
      let HourTime = 1800000;
      let year = new Date().getFullYear();
      let month = new Date().getMonth() + 1;
      let day = new Date().getDate();
      let nowTodayTime = new Date(
        year + "-" + month + "-" + day + " 00:00:00"
      ).getTime();
      self.hotDate = Math.round(((step - 1) * 100) / 12);
      self.dateSelect = nowTodayTime + _index * HourTime;
      self.getData(self.dateSelect, self.dataType);
    }
  }
};
</script>
<style lang="less" scoped>
.loadingAll {
  width: 100%;
  height: 100%;
  text-align: center;
  color: #fff;
  font-size: 32px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.65);

  p {
    width: 320px;
    height: 320px;
    line-height: 160px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-top: -160px;
    margin-left: -160px;
  }
}

.hot-slider {
  position: fixed;
  width: 85%;
  left: 1.5%;
  bottom: 25px;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.55);
  padding: 20px 60px;
  border-radius: 15px;

  i {
    position: absolute;
    left: 20px;
    top: 26px;
    color: #fff;
    font-size: 24px;
  }

  .el-slider {
    float: right;
    width: 99%;
  }
}

.hot-type-list {
  position: fixed;
  right: 35px;
  top: 35px;
  z-index: 100;

  li {
    margin: 5px;
    width: 200px;
    height: 32px;
    line-height: 32px;
    padding: 0 10px;
    cursor: pointer;
    color: aqua;
    background: url("../../../stastic/img/bigData/case_list.png") left center
      no-repeat;
    background-size: cover;
  }
}
</style>