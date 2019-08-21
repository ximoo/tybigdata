<template>
  <div class="item" style="width:240px;height:calc(100% - 240px)">
    <h3>实时报警</h3>
    <div class="realtime-box">
      <ul>
        <transition name="el-zoom-in-center" v-for="item,index in actMonitor" :key="index">
          <li @click="pantoVec(item)" style="cursor:pointer">
            <div :class="'alerm-level' + item.alerm.level">
              <i :class="item.alerm.icon" />
              <span class="number">{{item.vechileNumber}}</span>
              <span class="alerm">{{item.alerm.alerm}}</span>
            </div>
          </li>
        </transition>
      </ul>
    </div>
    <Conner />
  </div>
</template>
<script>
import lib from "~/common/lib";
import { mapState, mapGetters, mapMutations } from "vuex";

let actMonitorId;
export default {
  name: "realTimeMonitor",
  data() {
    return {
      actMonitor: []
    };
  },
  mounted() {
    let self = this;
    self.activeMonitor();
    actMonitorId = setInterval(() => {
      self.activeMonitor();
    }, 10000);
  },
  methods: {
    activeMonitor() {
      let self = this;
      let vechileInfo = self.vechileInfo;
      let alermVechile = [];
      let alermRandom = lib.randomNumber(1, self.alermTimes);
      for (var i = 0; i < alermRandom; i++) {
        alermVechile.push(
          vechileInfo[lib.randomNumber(0, vechileInfo.length - 1)]
        );
      }
      self.actMonitor = alermVechile;
      self.changeAlerm(alermVechile);
    },

    pantoVec(data) {
      let self = this;
      self.allComponent.amapManager
        .getMap()
        .setZoomAndCenter(16, data.lnglat.split(","));
      clearInterval(actMonitorId);
      setTimeout(() => {
        actMonitorId = setInterval(function() {
          self.actMonitor();
        }, self.alerms.timer * 1000);
      }, 5000);
    },
   
    ...mapMutations("bigData", ["changeAlerm"])
  },

  computed: {
    allComponent() {
      return this.$store.state.mapComponent.allComponent;
    },
    simData() {
      return this.$store.state.simData;
    },
    alerms() {
      return this.$store.state.platformData.alerms;
    },
     ...mapState("bigData", {
      alermTimes: state => state.alermTimes
    }),
    ...mapGetters("bigData", ["vechileInfo"])
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
    div {
      background: url("../../../../stastic/img/bigData_jz/alerm_box.png") left
        no-repeat;
      padding: 0 10px;

      .number {
        font-weight: 700;
        margin-left: 15px;
      }
      .alerm {
        color: #c1daf8;
        float: right;
      }

      &.alerm-level1 {
        background-image: url("../../../../stastic/img/bigData_jz/alerm_box.png");
      }
      &.alerm-level2 {
        color: #fc0;
        background-image: url("../../../../stastic/img/bigData_jz/alerm_box2.png");
      }
      &.alerm-level3 {
        color: #f30;
        background-image: url("../../../../stastic/img/bigData_jz/alerm_box3.png");
      }
    }
  }
}
</style>
