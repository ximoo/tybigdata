<template>
  <!-- vecHisShow" -->
  <reDialog
    v-dialogDrag
    :title="vecInfo.name + '的轨迹'"
    :visible="true"
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
              @click="TrailResum"
              v-if="!btnState.pause"
            ></el-button>

            <el-button
              type="info"
              size="mini"
              icon="ex-icon-suspend"
              circle
              @click="TrailPause"
              v-if="btnState.pause"
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
      btnState: { pause: false },
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
      dashOption: dashOption()
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {});
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
          getPath: function(pathData, pathIndex) {
            //返回轨迹数据中的节点坐标信息，[AMap.LngLat, AMap.LngLat...] 或者 [[lng|number,lat|number],...]
            console.log(pathData);
            return pathData.path;
          },
          renderOptions: {
            //轨迹线的样式
            pathLineStyle: {
              strokeStyle: "#11c711",
              lineWidth: 6,
              dirArrowStyle: true
            }
          }
        });

        self.trailPlay();
        self.activePieData();
      });
    },

    trailPlay() {
      let self = this;
      let siteData = this.fences.site[0];
      let landfillData = this.fences.landfill[0];
      let TrailPath = JSON.parse(localStorage.$polyline); //临时用
      let TrailPathData = TrailPath.length;
      //这里构建两条简单的轨迹，仅作示例
      self.pathSimplifierIns.setData([{ name: "轨迹0", path: TrailPath }]);
      // self.TrailPathData = TrailPathData;
      //创建一个巡航器
      self.navg = self.pathSimplifierIns.createPathNavigator(
        0, //关联第1条轨迹
        { speed: 600 }
      );
      self.navg.on("move", function() {
        self.mapObj.setCenter(self.navg.getPosition());
        self.TrailPathData = parseInt(
          (self.navg.getCursor().idx / TrailPathData) * 100
        );
      });
      // Axios.get(
      //   API.GET_TRAIL +
      //     "&origin=" +
      //     siteData.center +
      //     "&destination=" +
      //     landfillData.center +
      //     "&size=4"
      // )
      //   .then(res => {
      //     console.log(res);
      //     if (res.data.errmsg === "OK") {
      //       let stepPath = res.data.data.route.paths[0].steps;
      //       let polyLine = [],
      //         polyLines = [];

      //       for (var i in stepPath) {
      //         polyLine = polyLine.concat(stepPath[i].polyline.split(";"));
      //       }
      //       for (var i in polyLine) {
      //         polyLines.push(polyLine[i].split(","));
      //       }

      //       localStorage.$polyline = JSON.stringify(polyLines);
      //     } else {
      //       return [];
      //     }

      //     console.log(JSON.parse(localStorage.$polyline));
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
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
      this.navg.start();
      this.btnState.pause = true;
    },
    TrailPause() {
      this.navg.pause();
      this.btnState.pause = false;
    },
    TrailResum() {
      this.navg.resume();
      this.btnState.pause = true;
    },
    handlePlaySpeed(e) {
      console.log(e);
      let self = this;
      let orgSpeed = 600;
      self.navg.setSpeed(orgSpeed * e);
    }
  },
  computed: {
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
  width: 80%;

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
  right: 0;
  bottom: 0;
  width: 150px;
  height: 150px;
  z-index: 10;
}
</style>