<template>
  <reDialog
    v-dialogDrag
    title="场站列表"
    :visible="groupShow"
    :modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    width="240px"
    class="group-tree-dialog"
    @close="closeDialog"
  >
    <el-tree :data="disTree" @node-click="handleNodeClick" accordion default-expand-all>
      <span slot-scope="{ node, data }">
        <span>
          <i :class="data.icon"></i>
          {{ node.label }}
        </span>
      </span>
    </el-tree>
  </reDialog>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "SiteGroup",
  props: ["groupShow", "siteData"],
  data() {
    return {};
  },
  mounted() {
    console.log(this.siteData);
  },
  methods: {
    closeDialog() {
      this.$emit("closeGroupDialog");
    },
    handleNodeClick(e) {
      this.$emit("pantoBuild", e);
    }
  },
  computed: {
    districts() {
      return this.platformDistricts;
    },
    disTree() {
      let self = this;
      let districts = self.districts;
      let siteData = self.siteData;
      let disTree = [
        {
          label: self.platformCity,
          adcode: self.adcode,
          children: []
        }
      ];

      for (var i in districts) {
        // console.log(districts[i])
        disTree[0].children.push({
          label: districts[i].name,
          adcode: districts[i].adcode,
          center: districts[i].center.split(","),
          icon: "el-icon-place",
          children: []
        });
      }

      for (var i in disTree[0].children) {
        for (var j in siteData) {
          if (
            parseInt(siteData[j].adcode) ==
            parseInt(disTree[0].children[i].adcode)
          ) {
            console.log(siteData[j].adcode);
            disTree[0].children[i].children.push({
              label: siteData[j].name,
              adcode: siteData[j].adcode,
              center: siteData[j].center,
              address: siteData[j].address,
              icon: siteData[j].icon
            });
          }
        }
      }
      return disTree;
    },
    ...mapState("platData", {
      platformCity: state => state.platformCity,
      platformCenter: state => state.platformCenter,
      adcode: state => state.adcode,
      platformDistricts: state => state.platformDistricts,
      platformDistrictsSelect: state => state.platformDistrictsSelect
    })
  }
};
</script>
<style lang="less">
.group-tree-dialog {
  .el-dialog {
    background: #112166;
    padding: 5px;
    border: 1px solid #4d53a5;
    border-radius: 5px;
    box-shadow: inset 0 0 5px rgba(77, 83, 165, 0.85),
      0 5px 5px rgba(0, 0, 0, 0.45);

    .el-dialog__header {
      position: relative;
      font-size: 16px;
      font-weight: bold;
      line-height: 32px;
      height: 36px;
      color: #1990ff;
      padding: 0 15px !important;
      background: url("../../../../stastic/img/bigData_jz/title_bg.png") left
        bottom repeat-x;
      user-select: none;

      .el-dialog__headerbtn {
        right: 15px;
        top: 10px;
      }

      .el-dialog__title {
        font-size: 16px !important;
        color: #42ecfa !important;
        padding: 0 10px;
      }
    }
    .el-dialog__body {
      padding: 0 !important;

      .el-tree {
        color: #42ecfa !important;
        background: #0a1854 !important;

        .el-tree-node:focus > .el-tree-node__content,
        .el-tree-node__content:hover {
          background-color: rgba(74, 97, 179, 0.45) !important;
        }
      }
    }
  }
}
</style>