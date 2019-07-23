<template>
  <!-- vecHisShow -->
  <reDialog
    v-dialogDrag
    :title="vecInfo.name + '的轨迹'"
    :visible="vecHisShow"
    :modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="1000px"
    class="group-tree-dialog"
    @close="closeDialog"
  >
    <div class="vec-histrail-content">
      <el-amap
        :vid="'amap-vue-vec-his'"
        :center="center"
        :zoom="zoom"
        :mapStyle="mapStyle"
        :events="events"
        :amap-manager="amapManager"
      >
        <div class="vec-temp-timer">{{trailStopTime}}</div>

        <div class="vec-speed-charts">
          <Echarts :options="dashOption" autoresize />
        </div>
        <ul class="vec-trail-control">
          <li>
            <el-button
              type="info"
              size="mini"
              icon="ex-icon-play_fill"
              circle
              @click="TrailStart"
              v-if="btnState.start"
            ></el-button>
            <el-button
              type="info"
              size="mini"
              icon="ex-icon-play_fill"
              circle
              @click="TrailResum"
              v-if="!btnState.pause && !btnState.start"
            ></el-button>

            <el-button
              type="info"
              size="mini"
              icon="ex-icon-suspend"
              circle
              @click="TrailPause"
              v-if="btnState.pause && !btnState.start"
            ></el-button>
          </li>

          <li style="width:50%;">
            <el-slider v-model="TrailPathData" @change="TrailMoveIdx"></el-slider>
          </li>

          <li>
            <el-select
              v-model="playSpeed"
              @change="handlePlaySpeed"
              size="mini"
              placeholder="请选择播放速度"
            >
              <el-option
                v-for="item in optSpeed"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </li>
        </ul>
      </el-amap>
    </div>
    <!-- <div class="vec-histrail-search"></div> -->
  </reDialog>
</template>
<script>
import VueAMap from "vue-amap";
import Axios from "axios";
import API from "../../Configs/api";
let amapManager = new VueAMap.AMapManager();
import dashOption from "./vecSpeeddash.service";

let trailPath;

var hour, minute, second; //时 分 秒
hour = minute = second = 0; //初始化
var millisecond = 0; //毫秒
var intId;

export default {
  name: "vecDetail",
  props: ["vecInfo", "vecHisShow"],
  data() {
    let self = this;
    return {
      show: true,
      mapStyle: "amap://styles/whitesmoke", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 16,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      center: [112.24069, 30.33479],
      features: ["bg", "point", "road", "building"],
      pitch: 0,
      rotation: 0,
      buildingAnimation: false, //楼块出现是否带动画
      expandZoomRange: true,
      amapManager,
      mapObj: null,
      pathSimplifierIns: null,
      navg: null,
      btnState: { start: true, pause: false },
      TrailPathData: 0,
      optSpeed: [
        {
          label: "1X速度",
          value: 1
        },
        {
          label: "2X速度",
          value: 2
        },
        {
          label: "4X速度",
          value: 4
        },
        {
          label: "8X速度",
          value: 8
        }
      ],
      playSpeed: 1,
      events: {
        init(o) {
          self.mapObj = o;
          self.initPage(o);
        }
      },
      dashOption: dashOption(0),
      trailStopTime: null
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      // self.simStart();
    });
  },
  methods: {
    closeDialog() {
      this.$emit("vecHisClose", false);
    },
    initPage(o) {
      let self = this;
      console.log(" initPage.PathSimplifier");
      //创建组件实例
      //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
      AMapUI.load(["ui/misc/PathSimplifier"], function(PathSimplifier) {
        if (!PathSimplifier.supportCanvas) {
          alert("当前环境不支持 Canvas！");
          return;
        }
        self.pathSimplifierIns = new PathSimplifier({
          zIndex: 100,
          map: o, //所属的地图实例
          autoSetFitView: false,
          zIndex: 50,
          getPath: function(pathData, pathIndex) {
            //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
            console.log(pathData);

            return pathData.path;
          },

          getHoverTitle: function(pathData, pathIndex, pointIndex) {
            if (pointIndex >= 0) {
              return "点： " + pointIndex;
            }
          },

          renderOptions: {
            //轨迹线的样式
            pathLineStyle: {
              strokeStyle: "#11c711",
              lineWidth: 6,
              dirArrowStyle: true,
              pathTolerance: 1
            },
            keyPointStyle: {
              radius: 5,
              fillStyle: "#ffffff",
              strokeStyle: "#11c711",
              lineWidth: 3
            }
          }
        });
        self.addSiteFences(o);
        self.trailPlay();
        self.activePieData();
      });
    },

    trailPlay() {
      let self = this;
      let siteData = this.fences.site[0];
      let landfillData = this.fences.landfill[0];
      // let TrailPath = JSON.parse(localStorage.$polyline); //临时用
      let TrailPathData;

      var driving = new AMap.TruckDriving({
        policy: 2,
        size: 3
      });

      driving.search(
        [
          {
            lnglat: [112.9895782471, 28.1943806695]
          },
          {
            lnglat: [112.990436554, 28.1947068961]
          },
          {
            lnglat: [112.8794413805, 28.1213470728]
          }
        ],
        function(status, result) {
          // 未出错时，result即是对应的路线规划方案
          console.log(result);
          if (result.info === "OK") {
            let stepPath = result.routes[0].steps;
            let polyLine = [],
              polyLines = [];

            for (var i in stepPath) {
              polyLine = polyLine.concat(stepPath[i].path);
            }

            localStorage.$polyline = JSON.stringify(polyLine);
            TrailPathData = polyLine.length;
            console.log(TrailPathData);

            self.pathSimplifierIns.setData([{ name: "轨迹0", path: polyLine }]);
            // self.TrailPathData = TrailPathData;
            //创建一个巡航器
            self.navg = self.pathSimplifierIns.createPathNavigator(
              0, //关联第1条轨迹
              { speed: 60 }
            );
            let flag = 0;
            self.navg.on("move", function() {
              self.mapObj.setCenter(self.navg.getPosition());

              if (self.navg.getCursor().idx == 6)
                console.log(self.navg.getCursor());

              if (
                self.navg.getCursor().idx == 6 &&
                self.navg.getCursor().tail.toFixed(2) >= 0.15 &&
                self.navg.getCursor().tail.toFixed(2) <= 0.25 &&
                flag == 0
              ) {
                flag = 1;
                intId = setInterval(function() {
                  self.TimerId();
                }, 50);

                self.navg.pause();
                self.btnState.pause = false;
              }

              if (self.navg.getCursor().idx == 296) {
                flag = 0;
                self.playSpeed = 1;
                self.handlePlaySpeed(1);
                self.navg.pause();
                self.mapObj.setZoom(18);
                setTimeout(function() {
                  self.navg.resume();
                }, 1000);
              }

              self.pathSimplifierIns.renderLater(1000);
              self.TrailPathData = parseInt(
                (self.navg.getCursor().idx / TrailPathData) * 100
              );
            });
          }
        }
      );
    },
    //饼状图动态值
    activePieData() {},

    TrailMoveIdx(e) {
      let self = this;
      let TrailTotal = JSON.parse(localStorage.$polyline).length;
      let curIdx = parseInt((e / 100) * TrailTotal);
      // console.log(curIdx);
      self.navg.moveToPoint(curIdx);
    },

    TrailStart() {
      this.btnState.pause = true;
      this.btnState.start = false;
      this.simStart();
    },

    TrailPause() {
      this.navg.pause();
      this.btnState.pause = false;
    },

    TrailResum() {
      this.mapObj.setZoom(18);
      this.navg.resume();
      this.btnState.pause = true;
    },

    handlePlaySpeed(e) {
      console.log(e);
      let self = this;
      let orgSpeed = 600;
      self.navg.setSpeed(orgSpeed * e);
    },

    addSiteFences(o) {
      let self = this;
      let siteGeo = self.fences;
      console.log(siteGeo.site[0].wash);
      let sitePath = JSON.parse(siteGeo.site[0].path);
      let siteWath = JSON.parse(siteGeo.site[0].wash.path);

      let landfillPath = JSON.parse(siteGeo.landfill[0].path);
      let landfillWash = JSON.parse(siteGeo.landfill[0].wash.path);

      let polySitePath = [],
        polySiteWash = [];
      for (var i in sitePath) {
        polySitePath.push([sitePath[i].lng, sitePath[i].lat]);
      }
      for (var i in siteWath) {
        polySiteWash.push([siteWath[i].lng, siteWath[i].lat]);
      }

      let polyLandPath = [],
        polyLandWash = [];
      for (var i in landfillPath) {
        polyLandPath.push([landfillPath[i].lng, landfillPath[i].lat]);
      }
      for (var i in landfillWash) {
        polyLandWash.push([landfillWash[i].lng, landfillWash[i].lat]);
      }

      var polygon = new AMap.Polygon({
        map: o,
        path: polySitePath,
        strokeColor: "rgba(100, 150, 230, 1)",
        strokeWeight: 3,
        strokeOpacity: 1,
        fillOpacity: 0.45,
        fillColor: "rgba(100, 150, 230, 0.75)",
        zIndex: 10
      });

      var polygon3 = new AMap.Polygon({
        map: o,
        path: polySiteWash,
        strokeColor: "#11c711",
        strokeWeight: 3,
        strokeOpacity: 1,
        fillOpacity: 0.45,
        fillColor: "#11c71170",
        zIndex: 15
      });

      var polygon2 = new AMap.Polygon({
        map: o,
        path: polyLandPath,
        strokeColor: "rgba(100, 150, 230, 1)",
        strokeWeight: 3,
        strokeOpacity: 1,
        fillOpacity: 0.45,
        fillColor: "rgba(100, 150, 230, 0.75)",
        zIndex: 10
      });

      var polygon4 = new AMap.Polygon({
        map: o,
        path: polyLandWash,
        strokeColor: "#11c711",
        strokeWeight: 3,
        strokeOpacity: 1,
        fillOpacity: 0.45,
        fillColor: "#11c71170",
        zIndex: 15
      });

      o.setFitView(polygon);
    },
    //重置函数
    ResetId() {
      clearInterval(intId);
      millisecond = hour = minute = second = 0;
      this.trailStopTime = "";
    },
    TimerId() {
      let self = this;
      //开始函数
      millisecond = millisecond + 50;
      if (millisecond >= 1000) {
        millisecond = 0;
        second = second + 1;
      }
      if (second >= 60) {
        second = 0;
        minute = minute + 1;
      }
      let randomMinute = Math.round(Math.random() * 59);
      if (minute == 0 && second == 5) {
        // self.TrailResum();
        self.pathSimplifierIns.setFitView(0);
        self.playSpeed = 2;
        self.handlePlaySpeed(2);
        self.navg.pause();
        self.ResetId();
        setTimeout(function() {
          self.navg.resume();
        }, 1000);
      } else {
        self.trailStopTime = "停留：" + minute + ":" + second;
      }
    },

    simStart() {
      let self = this;
      let randomWeight = function() {
        return Math.floor(Math.random() * 6) + 1;
      };
      let indexWeight = [
        randomWeight(),
        randomWeight(),
        randomWeight(),
        randomWeight(),
        randomWeight(),
        randomWeight(),
        randomWeight(),
        randomWeight()
      ];

      console.log(indexWeight);

      self.trailStopTime = "开始装土";
      let idx = 0;
      let finalWeight = 0;
      let weightId = setInterval(function() {
        idx = idx + 1;
        finalWeight = finalWeight + indexWeight[idx];
        if (finalWeight >= 19) finalWeight = 19;

        self.dashOption = dashOption(finalWeight);
        console.log(idx + "============" + finalWeight);
        if (idx == 6) {
          setTimeout(function() {
            self.dashOption = dashOption(20);
            self.TrailResum();
          }, 5000);
          clearInterval(weightId);
        }
      }, 5000);
    }
  },
  computed: {
    city() {
      return this.$store.state.platformData.state.city;
    },
    fences() {
      return this.$store.state.platformData.module.sitemonitor.module.fences;
    }
  }
};
</script>
<style lang="less">
.vec-histrail-content {
  width: 100%;
  height: 550px;
}
.vec-histrail-search {
  width: 350px;
  height: 350px;
  background-color: #fc0;
  position: absolute;
  right: -300px;
  top: 46px;
}

.vec-trail-control {
  position: absolute;
  left: 25px;
  bottom: 25px;
  background-color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  width: calc(~"100% - 85px");

  i {
    font-size: 20px;
  }
  li {
    float: left;
    margin: 0 10px;
  }
}
.vec-speed-charts {
  position: absolute;
  right: 35px;
  bottom: 0;
  width: 150px;
  height: 150px;
  z-index: 10;
}

.vec-temp-timer {
  position: absolute;
  right: 25px;
  top: 45px;
  z-index: 10;
  font-size: 24px;
  font-weight: bold;
}
</style>