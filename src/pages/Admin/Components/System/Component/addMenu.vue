<template>
  <div>
    <el-drawer
      :title="modalName"
      :visible.sync="centerDialogVisible"
      direction="ltr"
      size="50%"
      :before-close="handleCancel"
    >
      <el-form inline label-width="120px" class="modal-box">
        <el-form-item v-for="item,index in editData" :key="index" :label="item.name">
          <el-popover
            placement="bottom"
            @show="hanldeTreeDropNav"
            v-model="showTreeDropNav"
            v-if="item.type==='select-tree'"
          >
            <el-tree
              ref="treeDropNav"
              :data="treeDropNavData"
              :props="NavProps"
              @node-click="handleParent"
            ></el-tree>
            <el-input size="mini" :ref="item.id" slot="reference" v-model="item.parentTxt" />
          </el-popover>
          <el-input v-model="item.value" type="hidden" v-if="item.type==='input-hidden'"></el-input>
          <el-input v-model="item.value" size="mini" v-if="item.type==='input'"></el-input>
          <el-switch v-model="item.value" size="mini" v-if="item.type==='switch'"></el-switch>
        </el-form-item>
      </el-form>

      <div class="fr modal-box-footer">
        <el-button>取 消</el-button>
        <el-button type="success">保 存</el-button>
      </div>
    </el-drawer>
  </div>
</template>
<script>
export default {
  name: "addMenu",
  props: ["showModal", "rowData", "modalName", "editCfg"],
  data() {
    return {
      editData: [],
      treeDropNavData: {},
      NavProps: {
        children: "children",
        label: "title"
      },
      showTreeDropNav: false,
      treeDropNavData: []
    };
  },
  mounted() {
    this.editData = this.editCfg;
  },
  methods: {
    handleCancel() {
      this.$emit("addMenu", false);
    },
    handleSave() {
      this.$emit("addMenu", false);
    },
    hanldeTreeDropNav(row) {
      let self = this;
      let treeDropNavData = self.platformAdminNav;
      console.log(treeDropNavData);
    },
    handleParent() {}
  },
  watch: {
    editCfg(n) {
      this.editData = n;
    }
  },
  computed: {
    centerDialogVisible() {
      return this.showModal;
    }
  }
};
</script>
<style lang="less">
.el-drawer__header {
  padding-bottom: 20px !important;
  background: #dcdfe6 !important;
  margin-bottom: 0 !important;
  font-weight: 700;
}
.modal-box-footer {
  margin: 0 15px;
  padding: 5px 10px;
}
.modal-box {
  margin: 15px;
  border: 1px solid #ddd;
  display: inline-block;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 5px 10px;

  .el-form-item {
    margin-bottom: 0;
    width: calc(50% - 40px);
    padding: 5px 15px;

    .el-form-item__content {
      width: calc(100% - 120px);
    }
  }
}
</style>
