<template>
  <div>
    <blockquote style="margin-bottom:20px;">
      <p>
        因为无法自动生成围栏，所以还需要借助外部工具查找经纬度进行手动添加围栏。
        <el-link
          href="http://www.gpsspg.com/maps.htm"
          icon="el-icon-map-location"
          type="primary"
          target="_blank"
        >经纬度查询工具</el-link>
      </p>
      <br />
      <p>
        <strong>使用方法：</strong>
        <el-link
          icon="el-icon-map-location"
          href="http://www.gpsspg.com/maps.htm"
          target="_blank"
        >工具页面</el-link>左侧选择 “腾讯地图/高德地图”,在搜索框中输入演示城市，并在地图中使用点工具按目标围栏端点进行描绘。在弹出的信息窗中复制高德经纬度。点与点之间的经纬度请用“|”隔开。
      </p>
    </blockquote>

    <el-tabs tab-position="left">
      <el-tab-pane label="工地围栏">
        <el-form size="mini">
          <div v-for="item , index in fences.site.data" :key="index">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="工地围栏名称：">
                  <el-input placeholder="请输入工地围栏名称" v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="工地围栏路径：">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="item.path"
                    placeholder="请输入围栏经纬度，以'|'进行分隔'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="padding-top: 45px;">
                <el-form-item>
                  <el-button
                    type="info"
                    icon="el-icon-edit"
                    circle
                    @click="handleDraw(index,'site')"
                  ></el-button>
                  <el-button
                    v-if="index == fences.site.data.length -1 && index !=5"
                    type="success"
                    icon="el-icon-plus"
                    circle
                    @click="handlePlusSite"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-minus"
                    circle
                    @click="handleMinusSite(index)"
                  ></el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="消纳点围栏">
        <el-form size="mini">
          <div v-for="item , index in fences.landfill.data" :key="index">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="消纳点围栏名称：">
                  <el-input placeholder="请输入消纳点围栏名称" v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="消纳点围栏路径：">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="item.path"
                    placeholder="请输入围栏经纬度，以'|'进行分隔'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="padding-top: 45px;">
                <el-form-item>
                  <el-button
                    type="info"
                    icon="el-icon-edit"
                    circle
                    @click="handleDraw(index,'landfill')"
                  ></el-button>
                  <el-button
                    v-if="index == fences.landfill.data.length -1 && index !=5"
                    type="success"
                    icon="el-icon-plus"
                    circle
                    @click="handlePlusLandfill"
                  ></el-button>
                  <el-button
                    type="danger"
                    icon="el-icon-minus"
                    circle
                    @click="handleMinusLandfill(index)"
                  ></el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-dialog :title="iFence.title" :visible="iFence.show" :append-to-body="true">
      <div style="position:relative">
        <el-amap
          :vid="'amap-vue-drawmap'"
          :center="center"
          :zoom="zoom"
          :zooms="zooms"
          :showLabel="showLabel"
          :mapStyle="mapStyle"
          :plugin="plugins"
          :amap-manager="amapManager"
          style="height:500px"
        ></el-amap>
        <el-button @click="startDraw" class="btn-draw-fences">开始画</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mapEvent from "./initfences.service";
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();

export default {
  name: "initFences",
  data() {
    let self = this;
    return {
      iFence: {
        title: "新增工地围栏",
        show: false
      },
      mapStyle: "amap://styles/whitesmoke", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 14,
      zooms: [5, 20],
      showLabel: true,
      amapManager,
      mapObj: null,
      mouseTool: null,
      indexRecord: null,
      plugins: [
        {
          pName: "AMap.DistrictSearch",
          events: {
            init(instance) {
              // let self = this;
              self.mapObj = amapManager.getMap();
              self.vecMarkers = new AMap.OverlayGroup();
              mapEvent.initMap(amapManager, self.city, self);
            }
          }
        }
      ]
    };
  },
  computed: {
    fences() {
      return this.$store.state.platformData.fences;
    },
    center() {
      let centerArry = this.$store.state.platformData.state.center.split(",");
      return [parseFloat(centerArry[0]), parseFloat(centerArry[1])];
    }
  },
  methods: {
    //
    handleDraw(index, t) {
      this.iFence.show = true;
      this.indexRecord = [index, t];
    },
    //开始画多边形
    startDraw() {
      let self = this;
      let mouseTool = new AMap.MouseTool(self.mapObj);
      self.mapObj.setDefaultCursor("crosshair");
      let index = self.indexRecord[0];
      let type = self.indexRecord[1];
      let pathString = [],
        tempPath = [];
      mouseTool.on("draw", function(e) {
        let path = e.obj.B.path;
        console.log(e.obj);
        for (var i in path) {
          // pathString.push(path[i].lng + "," + path[i].lat);
          tempPath.push({
            lng: parseFloat(path[i].lng),
            lat: parseFloat(path[i].lat)
          });
        }


        self.$store.commit("recodePath", {
          path:JSON.stringify(tempPath),  //pathString.join("|"),
          center:getCenterPoint(tempPath),
          index: index,
          type: type
        });
        self.iFence.show = false;
        mouseTool.close(true);
        self.mapObj.setDefaultCursor("pointer");
      });
      mouseTool.polygon({
        fillColor: "#00b0ff",
        strokeColor: "#80d8ff",
        strokeWeight: 5
      });

      function getCenterPoint(path) {
        //var path =e.;//Array<Point> 返回多边型的点数组
        //var ret=parseFloat(num1)+parseFloat(num2);
        var x = 0.0;
        var y = 0.0;
        for (var i = 0; i < path.length; i++) {
          x = x + parseFloat(path[i].lng);
          y = y + parseFloat(path[i].lat);
        }
        x = x / path.length;
        y = y / path.length;

        //return new BMap.Point(path[0].lng,path[0].lat);
        return [x, y];
        //return path[0];
      }
    },

    handleDrawClose() {},
    handlePlusSite() {
      let lastData = this.fences.site.data;
      let temp = {
        name: "",
        path: ""
      };
      lastData.push(temp);
      this.fences.site.data = lastData;
    },
    handleMinusSite(index) {
      let lastData = this.fences.site.data;
      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(index, 1);
      this.fences.site.data = lastData;
    },
    handlePlusLandfill() {
      let lastData = this.fences.landfill.data;
      let temp = {
        name: "",
        path: ""
      };
      lastData.push(temp);
      this.fences.landfill.data = lastData;
    },
    handleMinusLandfill(index) {
      let lastData = this.fences.landfill.data;
      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(index, 1);
      this.fences.landfill.data = lastData;
    }
  }
};
</script>
<style lang="less" scoped>
.btn-draw-fences {
  position: absolute;
  top: 15px;
  right: 15px;
}
.el-textarea.is-disabled .el-textarea__inner {
  background: none !important;
  color: #585858 !important;
}
</style>

