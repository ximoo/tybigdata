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
import mapEvent from "./allmonitor.service";

import VueAMap from "vue-amap";
let amapManager = new VueAMap.AMapManager();



let mapTruckId;

export default {
  name: "AllMoitor",
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
      massTruck:null,
      mass3DTruck:null,
      plugins: [
        {
          pName: "AMap.DistrictSearch",
          events: {
            init(instance) {
              mapEvent.initMap(amapManager,self)
            }
          }
        }
      ]
    };
  },
  methods: {

  }
};
</script>

