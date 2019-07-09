<template>
  <div class="item" style="width:240px;height:calc(100% - 240px)">
    <h3>实时报警</h3>
    <div class="realtime-box">
      <ul>
        <transition name="el-zoom-in-center" v-for="item,index in alermVechile" :key="index">
          <li>
            <div>
              <span class="number">{{item.name}}</span>
              <span class="alerm">{{item.alermname}}</span>
            </div>
          </li>
        </transition>
      </ul>
    </div>
   <Conner/>
  </div>
</template>
<script>
import randomIze from "../../Configs/service.lib";
let actMonitorId;
export default {
  name: "realTimeMonitor",
  data() {
    return {
      alermVechile: []
    };
  },
  mounted() {
    let self = this;
    clearInterval(actMonitorId);
    this.actMonitor();
    actMonitorId = setInterval(function() {
      self.actMonitor();
    }, self.alerms.timer * 1000);
  },
  methods: {
    actMonitor() {
      let self = this;
      if (self.simData.vechile.length <= 0) {
        self.$store.commit("init_data");
      }
      let vechileData = self.simData.vechile;
      let vechileGps = self.simData.gps;
      let alermsTypes = self.simData.alerms;
      let alermsData = self.alerms;
      let alermTimer = alermsData.timer; //刷新时间
      let alermNumber = randomIze.randomLib(1, alermsData.number); //刷新车辆
      let alermVechile = new Array();

      //海量点图标样式
      var icons = [
        require("../../../../stastic/img/icon/map_icon_1.png"),
        require("../../../../stastic/img/icon/map_icon_2.png"),
        require("../../../../stastic/img/icon/map_icon_3.png"),
        require("../../../../stastic/img/icon/map_icon_4.png"),
        require("../../../../stastic/img/icon/map_icon_5.png"),
        require("../../../../stastic/img/icon/map_icon_6.png"),
        require("../../../../stastic/img/icon/map_icon_7.png"),
        require("../../../../stastic/img/icon/map_icon_8.png"),
        require("../../../../stastic/img/icon/map_icon_9.png")
      ];

      // console.log(alermsTypes);
      for (var i = 0; i < alermNumber; i++) {
        let singalType = parseInt(
          alermsTypes[randomIze.randomLib(0, self.simData.alerms.length - 1)]
        );
        let vechileIndex = randomIze.randomLib(0, vechileGps.length - 1);
        alermVechile.push({
          name: vechileData[randomIze.randomLib(0, vechileData.length - 1)],
          lnglat: vechileGps[vechileIndex].location,
          address: vechileGps[vechileIndex].address,
          icon: icons[singalType],
          alermname: alermsData.list[0].label,
          style: randomIze.randomLib(0, 2)
        });
        // console.log(singalType);
      }
      self.alermVechile = alermVechile;
      this.$store.commit("simMapGps", alermVechile);
    }
  },

  computed: {
    simData() {
      return this.$store.state.simData;
    },
    alerms() {
      return this.$store.state.platformData.alerms;
    }
  }
};
</script>
<style lang="less">
.realtime-box {
  color: #3e72b1;
  font-size: 13px;
  line-height: 32px;
  margin: 3px 10px;

  li {
    // background: url("../../../stastic/img/bigData_jz/alerm_box.png") right
    //   no-repeat;

    div {
      background: url("../../../../stastic/img/bigData_jz/alerm_box.png") left
        no-repeat;
      padding: 0 10px;

      .number {
        font-weight: 700;
        margin-left: 20px;
      }
      .alerm {
        color: #c1daf8;
        float: right;
      }
    }
  }
}
</style>
