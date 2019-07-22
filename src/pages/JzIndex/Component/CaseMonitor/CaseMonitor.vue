<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 6px)">
    <h3 style="margin-left:25px;">案件监控</h3>
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
      style="height:calc(100% - 36px);position: relative"
    ></el-amap>
    <Conner />

    <reDialog
      v-dialogDrag
      :title="postCardList.title"
      :visible="postCardList.show"
      :modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="440px"
      class="group-tree-dialog"
      @close="closeDialog"
    >
      <div class="case-post-image">
        <el-image :src="postCardList.photo" />
      </div>

      <el-form ref="form" :model="formModel" label-width="80px" class="case-post-form">
        <el-form-item label="* 收件人:">
          <el-select v-model="postMan.select" size="mini" placeholder="请选择收件人">
            <el-option
              v-for="item in postMan.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送内容:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="tipOK">发 送</el-button>
        </el-form-item>
      </el-form>
    </reDialog>
  </div>
</template>
<script>
import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();
import mapEvent from "./casemonitor.service";
import Util from "../../Configs/util.lib";
import Service from "../../Configs/service.lib";
var randomName = require("chinese-random-name");

let photoId;

export default {
  name: "CaseMonitor",
  data() {
    let self = this;
    return {
      mapStyle: "amap://styles/10bb9e67de185a47f6ee4b1595438c6e", //8ef17ea2354d5c3d45ec46141986a67b',//样式URL
      zoom: 11,
      zooms: [5, 20],
      showLabel: true,
      resizeEnable: true,
      animateEnable: true,
      features: ["bg", "point", "road", "building"],
      pitch: 45,
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
          self.mapObj = o;
          mapEvent.initMap(amapManager, self.city, self);
          var toolBar = new AMap.ControlBar({
            showZoomBar: false,
            showControlButton: true,
            position: {
              right: "15px",
              bottom: "-75px"
            }
          });
          o.addControl(toolBar);
          //地图海量点
          self.manMarker = [];
          self.casePlay(o);
        }
      },
      postCardList: {
        modifyTime: "2018-11-27 11:00:00",
        state: "已上报",
        title: "发现垃圾乱扔现象，现已拍照",
        icon: "ivu-icon-logo-dropbox",
        show: false
      },
      postMan: {
        select: null,
        options: [{ label: "" }]
      },
      casePointers: [],
      formModel: null
    };
  },

  mounted() {
  },

  methods: {
    casePlay(mapObj) {
      let self = this;
      let GpsData = this.GpsData;
      let casePointers = new Array();
      let photos = [];
      let Generates = [];
      self.massMarker = new AMap.MassMarks(self.manMarker, {
        opacity: 1,
        zIndex: 100,
        cursor: "pointer",
        style: {
          url: require("../../../../stastic/img/icon/icon-alerm.png"),
          anchor: new AMap.Pixel(12, 12),
          size: new AMap.Size(12, 12)
        }
      });

      for (var i = 1; i <= 20; i++) {
        let url = require("../../../../stastic/img/upload/" + i + ".jpg");
        photos.push(url);
      }

      for (var i = 1; i <= 20; i++) {
        let label = randomName.generate();
        Generates.push({
          label: label,
          value: i
        });
      }

      for (var i in GpsData) {
        casePointers.push({
          id: parseInt(i) + 1,
          name: randomName.generate(),
          caseName: "乱扔垃圾",
          address: GpsData[i].address,
          adname: GpsData[i].adname,
          adcode: GpsData[i].adcode,
          lnglat: GpsData[i].location.split(","),
          upDate: Util.getNow(),
          photo: photos[Service.randomLib(0, 20)]
        });
      }

      var marker = new AMap.Marker({
        content: " ",
        map: amapManager.getMap(),
        label: {
          offset: new AMap.Pixel(32, 0),
          content: ""
        }
      });

      self.massMarker.on("mouseover", function(e) {
        marker.setPosition(e.data.lnglat);
        marker.setLabel({
          content:
            "上报原因:" +
            e.data.caseName +
            "</br>上报地点:" +
            e.data.address +
            "</br>" +
            e.data.upDate
        });
      });

      self.massMarker.on("click", function(e) {
        self.loopPlay(e.data);
      });

      self.postMan.options = Generates;
      self.casePointers = casePointers;
      self.massMarker.setData(casePointers);
      self.massMarker.setMap(mapObj);

      //随机展示上传案件
      self.loopPlay(self.casePointers[0]);
      self.changeInfo();
      self.readyGps();
    },
    loopPlay(data) {
      let self = this;
      let content =
        "<div class='icon-sanitation-photo'><img src=" +
        data.photo +
        " /></div><h4 class='info-sanitation-type'>" +
        data.caseName +
        "</h4><div class='info-sanitation-street'>" +
        data.address +
        "</div>";

      var infoWindow = new AMap.InfoWindow({
        offset: new AMap.Pixel(-6, -6),
        content: self.createInfoWindow(content, data) //使用默认信息窗体框样式，显示信息内容
      });
      infoWindow.open(self.mapObj, data.lnglat);
      self.mapObj.setZoomAndCenter(16, data.lnglat);
    },

    //构建自定义信息窗体
    createInfoWindow(content, data) {
      let self = this;
      // console.log(self);
      var middle = document.createElement("div");
      middle.innerHTML = content;
      middle.style.cursor = "pointer";
      middle.addEventListener(
        "click",
        function(e) {
          console.log(data);
          clearInterval(photoId);
          self.postCardList = {
            show: true,
            photo: data.photo,
            id: data.id,
            name: data.name,
            title: "乱扔垃圾 - " + data.address,
            address: data.address,
            adname: data.adname,
            adcode: data.adcode,
            lnglat: data.lnglat,
            upDate: data.upDate
          };
        },
        false
      );
      return middle;
    },

    changeInfo() {
      let self = this;
      photoId = setInterval(function() {
        let randomDot = Service.randomLib(0, self.casePointers.length - 1);
        self.loopPlay(self.casePointers[randomDot]);
      }, 5000);
    },

    //
    closeDialog() {
      this.postCardList.show = false;
      this.changeInfo();
    },

    readyGps() {
      this.$emit("changeGps", this.casePointers);
    },

    tipOK() {
      console.log("tipOK");
      this.postCardList.show = false;
      this.changeInfo();
      this.$message({
        message: "消息发送成功！",
        type: "success"
      });
    }
  },

  computed: {
    city() {
      console.log(this.$store.state.platformData.state.city);
      return this.$store.state.platformData.state.city;
    },
    center() {
      let centerArry = this.$store.state.platformData.state.center.split(",");
      return [parseFloat(centerArry[0]), parseFloat(centerArry[1])];
    },
    GpsData() {
      return this.$store.state.simData.gps;
    },
    caseComponent() {
      return this.$store.state.mapComponent.caseComponent;
    }
  }
};
</script>
<style lang="less">
.icon-sanitation-photo {
  img {
    width: 250px;
    height: 160px;
  }
}

.info-sanitation-type {
  font-size: 16px;
}

.info-sanitation-street {
  font-size: 13px;
}

.case-post-image {
  width: 80%;
  height: 180px;
  margin: 10px auto;
  display: block;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

.case-post-form {
  margin: 25px auto;
  color: #fff;
  width: 80%;

  .el-form-item__label {
    color: #fff;
  }
}
</style>
