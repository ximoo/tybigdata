<template>
  <div class="item" style="width:240px;height:calc(100% - 240px)">
    <h3>实时报警</h3>

    <div class="realtime-box">
      <ul>
        <li v-for="item,index in alermVechile" :key="index">
          <div>
            <span class="number">{{item.name}}</span>
            <span class="alerm">{{item.alermname}}</span>
          </div>
        </li>
      </ul>
    </div>
    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>
  </div>
</template>
<script>
import randomIze from "../Configs/service.lib";

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
    }, self.alerms.timer * 100);
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
      console.log(alermsTypes);
      for (var i = 0; i < alermNumber; i++) {
        alermVechile.push({
          name: vechileData[randomIze.randomLib(0, vechileData.length - 1)],
          lnglat:
            (vechileGps[randomIze.randomLib(0, vechileGps.length - 1)].location),
          address:
            vechileGps[randomIze.randomLib(0, vechileGps.length - 1)].address,
          alermname:
            alermsData.list[
              parseInt(
                alermsTypes[
                  randomIze.randomLib(0, self.simData.alerms.length - 1)
                ]
              )
            ].label,
          style: randomIze.randomLib(0, 2)
        });
      }
      console.log(alermsData.list.length);
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
      background: url("../../../stastic/img/bigData_jz/alerm_box.png") left
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
