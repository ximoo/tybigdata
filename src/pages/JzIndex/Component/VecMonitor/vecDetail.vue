<template>
  <reDialog
    v-dialogDrag
    :title="vecInfo.data.name + '详情'"
    :visible="vecInfo.show"
    :modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="700px"
    class="group-tree-dialog"
    @close="closeDialog"
  >
    <div class="vec-detail-content">
      <el-tabs>
        <el-tab-pane label="实时状态">
          <div class="vec-detail-img">
            <el-image lazy src="https://n.sinaimg.cn/finance/blackcat/pc/blink.gif" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="车辆报警"></el-tab-pane>
        <el-tab-pane label="车辆详情"></el-tab-pane>
        <el-tab-pane label="企业信息"></el-tab-pane>
        <el-tab-pane label="审批路线"></el-tab-pane>
        <el-tab-pane label="设备控制"></el-tab-pane>
      </el-tabs>
    </div>
  </reDialog>
</template>
<script>
export default {
  name: "vecDetail",
  props: ["vecInfo"],
  data() {
    return {};
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {});
  },
  methods: {
    closeDialog() {
      this.$emit("vecDetailClose", false);
    }
  }
};
</script>
<style lang="less">
.vec-detail-content {
  padding: 5px 15px;
  .vec-detail-img {
    width: 150px;
    height: 75px;
    background-color: #fff;
    float: left;
    margin: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .el-tabs__nav-wrap::after {
    background-color: #155cb7;
  }

  .el-tabs__active-bar {
    background-color: #fff;
  }

  .el-tabs__item {
    color: #abc4ff !important;

    &.is-active {
      color: #fff !important;
    }
  }
}
</style>