<template>
  <div class="ex-bigdata-main right" :class="{full:fullMain}">
    <el-button
      @click="handleFull"
      icon="el-icon-d-arrow-left"
      type="info"
      size="mini"
      round
      class="full-main-btn"
      v-if="!fullMain"
    ></el-button>
    <el-button
      @click="handleFull"
      icon="el-icon-d-arrow-right"
      type="info"
      size="mini"
      round
      class="full-main-btn"
      v-else
    ></el-button>
    <!-- 工地/消纳场环境监测 -->
    <CaseMonitor v-on:changeGps="changeGps" />
    <CaseStastic :caseStastic="caseStastic" />
    <CaseManTrail />
    <CaseEcharts />
  </div>
</template>
<script>
import CaseMonitor from "../Component/CaseMonitor/CaseMonitor.vue";
import CaseStastic from "../Component/CaseMonitor/CaseStastic.vue";
import CaseEcharts from "../Component/CaseMonitor/CaseEcharts.vue";
import CaseManTrail from "../Component/CaseMonitor/CaseManTrail.vue";
import service from "../Configs/service.lib";

export default {
  name: "CaseModule",
  components: { CaseMonitor, CaseStastic, CaseEcharts, CaseManTrail },
  data() {
    return {
      fullMain: true,
      caseStastic: []
    };
  },
  mounted() {
    this.initDistricts();
  },
  methods: {
    handleFull() {
      this.fullMain = !this.fullMain;
    },
    initDistricts(data) {
      let self = this;
      let districts = self.districts;
      let caseStastic = [];
      for (var i in districts) {
        caseStastic.push({
          name: districts[i].name,
          caseNumber: 0
        });
      }
      self.caseStastic = caseStastic;
    },
    changeGps(data) {
      let self = this;
      let caseStastic = self.caseStastic;
      console.log(data);

      for (var i in data) {
        for (var h in caseStastic) {
          if (data[i].adname == caseStastic[h].name) {
            caseStastic[h].caseNumber = caseStastic[h].caseNumber + 1;
          }
        }
      }


      console.log(caseStastic)
      self.caseStastic = caseStastic;



    },

    changeStastic(data) {
      this.caseStastic = data;
    }

  },
  computed: {
    districts() {
      return this.$store.state.platformData.state.districts;
    }
  }
};
</script>

