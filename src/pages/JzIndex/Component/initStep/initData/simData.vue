<template>
  <div>
    <!-- <el-button @click="simData">开始模拟数据</el-button> -->

    <ul style="font-size:13px; line-height:32px; margin:20px;">
      <li v-for="item ,index in simstep" :key="index" v-show="item.show">
        <i class="el-icon-caret-right" />
        {{item.info}}
        <i class="el-icon-loading" style="color:#009a22" />
      </li>
    </ul>
  </div>
</template>
<script>
import simData from "../../../Configs/service.lib";

export default {
  name: "simData",
  data() {
    return {
      simVechile: null,
      simstep: [
        {
          show: true,
          info: ""
        },
        {
          show: false,
          info: ""
        },
        {
          show: false,
          info: ""
        },
        {
          show: false,
          info: ""
        },
        {
          show: false,
          info: ""
        },
        {
          show: false,
          info: ""
        },
        {
          show: false,
          info: ""
        },
        {
          show: false,
          info: ""
        }
      ]
    };
  },

  mounted() {
    let self = this;
    this.$nextTick(() => {
      this.simstep[0].show = true;
      this.simstep[0].info = "开始模拟数据";
      setTimeout(() => {
        self.simData();
      }, 1000);
    });
  },

  methods: {
    simData() {
      let self = this;
      let city = this.$store.state.platformData.state.city;
      let number = this.$store.state.platformData.basedata.data[0].number;
      // this.simVechile = simData.randomVehile(number, city).join(" | ");
      this.$store.commit("simVechile", simData.randomVehile(number, city));
      this.simstep[1].show = true;
      this.simstep[1].info =
        "正在模拟" +
        number +
        "辆车牌号..........................................";
      setTimeout(function() {
        self.simstep[1].info =
          "正在模拟" +
          number +
          "辆车牌号..........................................已模拟完成";
        setTimeout(self.simGpsData(), 3000);
      }, 3000);
    },
    simGpsData() {
      let self = this;
      let adcode = this.$store.state.platformData.state.adcode;
      let number = this.$store.state.platformData.basedata.data[0].number;
      // console.log(localStorage.$simdata);
      simData.randomVechileGps(number, adcode);
      this.simstep[2].show = true;
      this.simstep[2].info =
        "正在模拟车辆地理定位.........................................";
      setTimeout(function() {
        self.simstep[2].info =
          "正在模拟车辆地理定位.........................................已模拟完成";
        self.simVechileData();
      }, 3000);
    },
    simVechileData() {
      let self = this;
      this.$store.commit("simVechileData", simData.simVechileInfo());
      this.simstep[3].show = true;
      this.simstep[3].info =
        "正在模拟车辆信息.........................................";
      setTimeout(function() {
        self.simstep[3].info =
          "正在模拟车辆信息.........................................已模拟完成";
        self.simFencesData();
      }, 3000);
    },
    simFencesData() {
      let self = this;
      let adcode = this.$store.state.platformData.state.adcode;
      this.simstep[4].show = true;
      this.simstep[4].info =
        "正在模拟场站信息.........................................";
      setTimeout(function() {
        self.simstep[4].info =
          "正在模拟场站信息.........................................已模拟完成";
        self.$store.commit("handle_step", 3);
      }, 3000);
    }
  }
};
</script>

