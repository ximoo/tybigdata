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
    <CaseMonitor />
    <div class="item" style="width:240px;height:calc(100% - 6px)">
      <h3>全市案件数量</h3>
      <Conner />
    </div>
  </div>
</template>
<script>
import CaseMonitor from "../Component/CaseMonitor/CaseMonitor.vue";
export default {
  name: "CaseModule",
  components: { CaseMonitor },
  data() {
    return {
      fullMain: true
    };
  },
  methods: {
    handleFull() {
      this.fullMain = !this.fullMain;
    }
  }
};
</script>

