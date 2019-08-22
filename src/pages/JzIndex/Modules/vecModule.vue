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
    <!-- 环境监测 -->
    <VecMonitor />

    <!-- 环境污染变化趋势 -->
  </div>
</template>
<script>
import VecMonitor from "../Component/VecMonitor/VecMonitor.vue";
export default {
  name: "VecModule",
  data() {
    return {
      fullMain: false
    };
  },
  components: { VecMonitor },
  methods: {
    handleFull() {
      this.fullMain = !this.fullMain;
    }
  }
};
</script>