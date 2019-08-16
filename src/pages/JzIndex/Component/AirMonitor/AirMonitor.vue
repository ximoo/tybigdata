<template>
  <div class="item" style="width:calc(100% - 248px);height:calc(100% - 240px)">
    <h3 style="margin-left:25px;">全市空气质量监测</h3>
    <Echarts :options="map" autoresize class="map-content" style="height:calc(100% - 32px)" />
    <Conner />
  </div>
</template>
<script>
import ECharts from "vue-echarts";
import getMap from "./airmonitor.service.js";

import axios from "axios";
import tyMaps from "../../../../stastic/ty.json";

import { mapState } from "vuex";

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
    axios.get("/api/geometryCouties/" + this.city + ".json").then(res => {
      console.log(res.data);
      let mapSrc = res.data;
      ECharts.registerMap("cityMap", mapSrc);
      let mapData = new Array();
      for (var i in mapSrc.features) {
        mapData.push({
          name: mapSrc.features[i].properties.name,
          value: Math.round(800 + Math.random() * 50000)
        });
      }

      this.map = getMap(mapData);
    });
  },
  methods: {},
  computed: {
    city() {
      return this.platformCity;
    },
    ...mapState("platData", {
      platformCity: state => state.platformCity,
      platformCenter: state => state.platformCenter
    })
  }
};
</script>
