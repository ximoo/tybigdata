<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3>全市空气质量监测</h3>
    <Echarts :options="map" autoresize class="map-content" style="height:calc(100% - 32px)"/>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
import ECharts from "vue-echarts";
import getMap from "./airmonitor.service.js";

import axios from "axios";
import store from "../Configs/store";

import tyMaps from "../../../stastic/ty.json";

function randomize() {
  return Math.round(30 / 10 + (Math.random() * 70) / 10);
}

export default {
  data() {
    return {
      map: null
    };
  },
  mounted() {
    axios
      .get(
        "/api/geometryCouties/" + store.state.platformData.state.city + ".json"
      )
      .then(res => {
        console.log(res.data);
        let mapSrc = res.data;
        ECharts.registerMap("cityMap", mapSrc);
        let mapData = new Array();
        for (var i in mapSrc.features) {
          mapData.push({
            name: mapSrc.features[i].properties.name,
            value: Math.round(800 + (Math.random() * 50000))
          });
        }

        this.map = getMap(mapData);
      });
  },
  methods: {}
};
</script>
