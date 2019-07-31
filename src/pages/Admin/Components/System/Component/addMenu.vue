<template>
  <div>
    <el-dialog :title="modalName" :visible="centerDialogVisible" width="30%">
      <el-form inline>
        <el-form-item v-for="item,index in editCfg" :key="index" :label="item.name">
          <el-input v-model="editData[item.label]" v-if="item.type==='input'"></el-input>

          <el-switch v-model="editData[item.label]" v-if="item.type==='switch'"></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleSave">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "addMenu",
  props: ["showModal", "rowData", "modalName", "editCfg"],
  data() {
    return {
      editData: {}
    };
  },
  mounted() {},
  methods: {
    handleCancel() {
      this.$emit("addMenu", false);
    },
    handleSave() {
      this.$emit("addMenu", false);
    }
  },
  watch: {
    rowData(n) {
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
