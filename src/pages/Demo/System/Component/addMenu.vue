<template>
  <div>
    <el-dialog title="新增弹框" :visible.sync="centerDialogVisible" width="30%">
      <p>弹框内容</p>
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
  props: ["showModal"],
  data() {
    return {};
  },
  methods: {
    handleCancel() {
      this.$emit("addMenu", false);
    },
    handleSave() {
      this.$emit("addMenu", false);
    }
  },
  computed: {
    centerDialogVisible() {
      return this.showModal;
    }
  }
};
</script>
