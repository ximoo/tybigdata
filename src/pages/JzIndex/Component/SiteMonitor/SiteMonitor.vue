<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3 style="margin-left:25px;">场站实时状况</h3>
    <el-amap
      :vid="'amap-vue-site'"
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
    >
      <div class="fences-name">
        <h4>{{FencesName.name}}</h4>
        <p>{{FencesName.address}}</p>
      </div>

      <el-carousel
        class="fences-control"
        :autoplay="false"
        indicator-position="none"
        type="card"
        arrow="never"
        height="60px"
      >
        <el-carousel-item>
          <el-button @click="groupShow = true">打开列表</el-button>
        </el-carousel-item>
      </el-carousel>
    </el-amap>
    <SiteGroup
      :groupShow="groupShow"
      :siteData="fences"
      v-on:pantoBuild="pantoBuild"
      v-on:closeGroupDialog="closeGroupDialog"
    />

    <Conner />
  </div>
</template>
<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
import mapEvent from "./sitemonitor.service";
import SiteGroup from "./SiteGroup.vue";

export default {
  name: "AirMonitor",
  components: { SiteGroup },
  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 8,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      center: [112.24069, 30.33479],
      features: ["bg", "point", "road", "building"],
      pitch: 65,
      rotation: 15,
      buildingAnimation: false, //楼块出现是否带动画
      expandZoomRange: true,
      amapManager,
      mapObj: null,
      siteMarkers: [],
      radar: null,
      object3Dlayer: null,
      polygon: null,
      FencesName: {
        name: "",
        address: ""
      },
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
          self.addMarker();
        }
      },
      groupShow: false
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      self.$store.state.mapComponent.siteComponent = self;
    });
  },
  methods: {
    addMarker() {
      let self = this;
      let obj = amapManager.getMap();
      
      self.siteMarkers = [];
      let siteGeo = self.fences;
      for (var i in siteGeo) {
        if (siteGeo[i].path !== "") {
          console.log(siteGeo[i].type);
          let iconUrl;
          switch (siteGeo[i].type) {
            case "site":
              iconUrl = new AMap.Icon({
                image: require("../../../../stastic/img/bigData_jz/icon/icon-site.png")
              });
              break;
            case "landfill":
              iconUrl = new AMap.Icon({
                image: require("../../../../stastic/img/bigData_jz/icon/icon-upload.png")
              });
              break;
          }

          self.siteMarkers.push({
            icon: iconUrl,
            position: siteGeo[i].center,
            label: {
              offset: new AMap.Pixel(32, 0),
              content: siteGeo[i].title
            },
            data: {
              path: JSON.parse(siteGeo[i].path),
              door: siteGeo[i].door,
              wash: siteGeo[i].wash,
              location: siteGeo[i].center,
              address: siteGeo[i].address,
              // pm: siteGeo[i].pm,
              name: siteGeo[i].name
              // truck: siteGeo[i].truck
            }
          });
        }

        self.siteMarkers.forEach(function(marker) {
          let polyPath = [];
          for (var i in marker.data.path) {
            polyPath.push([marker.data.path[i].lng, marker.data.path[i].lat]);
          }

          var polygon = new AMap.Polygon({
            map: obj,
            strokeColor: "rgba(100, 150, 230, 1)",
            strokeWeight: 6,
            strokeOpacity: 1,
            strokeStyle: "dashed",
            fillOpacity: 0.25,
            fillColor: "rgba(100, 150, 230, 0.75)"
          });
          polygon.setPath(polyPath);

          self.addSiteFences(obj, marker);
          self.addRadar(obj, marker);
          var mker = new AMap.Marker({
            map: obj,
            icon: marker.icon,
            position: [marker.position[0], marker.position[1]],
            offset: new AMap.Pixel(-12, -30)
            //                    label: marker.label,
            //                    animation:'AMAP_ANIMATION_DROP'
            //                    click:self.showVideo()
          });

          mker.on("click", function() {
            obj.setFitView([polygon]);
            self.FencesName = {
              name: marker.data.name,
              address: marker.data.address
            };
          });
        });
      }
      console.log(self.siteMarkers);
      obj.setFitView();
    },

    addSiteFences(obj, marker) {
      let polyPath = [];

      self.object3Dlayer = new AMap.Object3DLayer();
      self.radar = new AMap.Object3D.Mesh();
      obj.add(self.object3Dlayer);

      for (var i in marker.data.path) {
        polyPath.push([marker.data.path[i].lng, marker.data.path[i].lat]);
      }

      var boundsFence = polyPath.map(function(path) {
        return new AMap.LngLat(path[0], path[1]);
      });

      // 创建 Object3D 对象
      var prismFence = new AMap.Object3D.Prism({
        path: boundsFence,
        height: 150,
        color: "rgba(100, 150, 230, 0.35)", // 支持 #RRGGBB、rgb()、rgba() 格式数据
        zIndex: 50
      });

      // 开启透明度支持
      prismFence.transparent = true;

      // 添加至 3D 图层
      self.object3Dlayer.add(prismFence);

      //添加门禁
      if (marker.data.door.path !== "" && marker.data.door.enable) {
        let siteDoor = JSON.parse(marker.data.door.path);
        let doorPath = [];
        for (var i in siteDoor) {
          doorPath.push([siteDoor[i].lng, siteDoor[i].lat]);
        }
        var boundsDoor = doorPath.map(function(path) {
          return new AMap.LngLat(path[0], path[1]);
        });

        var prismDoor = new AMap.Object3D.Prism({
          path: boundsDoor,
          height: 50,
          color: "#ffcc00", // 支持 #RRGGBB、rgb()、rgba() 格式数据
          zIndex: 60
        });
        self.object3Dlayer.add(prismDoor);
      }

      //添加洗车槽
      if (marker.data.wash.path !== "" && marker.data.wash.enable) {
        let siteWash = JSON.parse(marker.data.wash.path);
        let washPath = [];
        for (var i in siteWash) {
          washPath.push([siteWash[i].lng, siteWash[i].lat]);
        }
        var boundsWash = washPath.map(function(path) {
          return new AMap.LngLat(path[0], path[1]);
        });

        var prismWash = new AMap.Object3D.Prism({
          path: boundsWash,
          height: 25,
          color: "#11c711", // 支持 #RRGGBB、rgb()、rgba() 格式数据
          zIndex: 60
        });
        self.object3Dlayer.add(prismWash);
      }
    },
    addRadar(obj, marker) {
      var radar = self.radar;
      var getOpacity = function(scale) {
        return 1 - Math.pow(scale, 0.3);
      };
      var buildRadar = function() {
        radar.transparent = true;
        radar.backOrFront = "front";
        var geometry = radar.geometry;
        var radius = 500; //米
        radius = radius / obj.getResolution(obj.getCenter(), 20);
        var unit = 1;
        var range = 200;
        var count = range / unit;
        for (var i = 0; i < count; i += 1) {
          var angle1 = (i * unit * Math.PI) / 180;
          var angle2 = ((i + 1) * unit * Math.PI) / 180;

          var p1x = Math.cos(angle1) * radius;
          var p1y = Math.sin(angle1) * radius;
          var p2x = Math.cos(angle2) * radius;
          var p2y = Math.sin(angle2) * radius;

          geometry.vertices.push(0, 0, 0);
          geometry.vertices.push(p1x, p1y, 0);
          geometry.vertices.push(p2x, p2y, 0);

          var opacityStart = getOpacity(i / count);
          var opacityEnd = getOpacity((i + 1) / count);

          geometry.vertexColors.push(0, 0.5, 0.5, opacityStart);
          geometry.vertexColors.push(0, 0.5, 0.5, opacityStart);
          geometry.vertexColors.push(0, 0.5, 0.5, opacityEnd);
        }
        radar.position([marker.position[0], marker.position[1]]);
        self.object3Dlayer.add(radar);
      };

      var scan = function() {
        radar.reDraw();
        radar.rotateZ(-5);
        AMap.Util.requestAnimFrame(scan);
      };
      buildRadar();
      scan();
    },
    closeGroupDialog() {
      this.groupShow = false;
    },
    pantoBuild(data) {
      let obj = amapManager.getMap();
      obj.setZoomAndCenter(16, data.center);
      this.FencesName = {
        name: data.label,
        address: data.address
      };
    }
  },
  computed: {
    fences() {
      let siteGeo = this.$store.state.platformData.module.sitemonitor.module.fences.site.concat(
        this.$store.state.platformData.module.sitemonitor.module.fences.landfill
      );
      return siteGeo;
    },
    city() {
      return this.$store.state.platformData.state.city;
    }
  }
};
</script>
<style lang="less" scoped>
.fences-name {
  position: absolute;
  left: 15px;
  top: 15px;
  color: #6edbff;
  border-radius: 3px;
  line-height: 32px;
  padding: 0 15px;
  background-color: rgba(0, 0, 0, 0.25);

  p {
    font-size: 14px;
  }
}

.fences-control {
  position: absolute;
  left: 15px;
  bottom: 15px;
  width: 30%;
  overflow: hidden;

  &.el-carousel--horizontal {
    overflow: inherit;
  }

  .el-carousel__container {
    position: inherit;

    .el-carousel__arrow--left {
      left: -60% !important;
    }
    .el-carousel__arrow--right {
      right: -60% !important;
    }
  }
  button {
    width: 100%;
    height: 100%;
  }
}
</style>

