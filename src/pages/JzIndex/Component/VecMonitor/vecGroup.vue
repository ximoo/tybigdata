<template>
  <reDialog
    v-dialogDrag
    title="车辆列表"
    :visible="groupShow"
    :modal="false"
    :modal-append-to-body="false"
    :append-to-body="true"
    width="240px"
    class="group-tree-dialog"
    @close="closeDialog"
  >
    <el-tree :data="disTree" @node-click="handleNodeClick" accordion>
      <span slot-scope="{ node, data }">
        <span
          :class="{'vec-green': data.state == 4,'vec-green': data.state == 3,'vec-green': data.state == 2,'vec-red': data.state == 1,'vec-gray': data.state == 0}"
        >
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

  props: ["groupShow", "vechileInfo"],

  data() {
    return {};
  },

  methods: {
    closeDialog() {
      this.$emit("closeGroupDialog");
    },

    handleNodeClick(e) {
      this.$emit("pantoVechile", e);
    }
  },

  computed: {
    districts() {
      let self = this;
      let platformDistricts = self.platformDistricts;
      return platformDistricts;
    },

    disTree() {

      let self = this;
      let districts = self.districts;
      let vechileInfo = self.vechileInfo;

      let disTree = [
        {
          label: self.platformCity,
          adcode: self.adcode,
          children: []
        }
      ];

      for (var i in vechileInfo) {
        vechileInfo[i]["lnglat"] = vechileInfo[i].gpsinfo.location.split(",");
        vechileInfo[i]["id"] = parseInt(i) + 1;
      }

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
        for (var j in vechileInfo) {
          if (
            parseInt(vechileInfo[j].adcode) ==
            parseInt(disTree[0].children[i].adcode)
          ) {
            disTree[0].children[i].children.push({
              id: vechileInfo[j].id,
              label: vechileInfo[j].name,
              adcode: vechileInfo[j].adcode,
              center: vechileInfo[j].lnglat,
              address: vechileInfo[j].address,
              icon: "el-icon-s-opportunity",
              state: vechileInfo[j].state
            });
          }
        }
      }

      return disTree;

    },

    ...mapState("platData", {
      platformDistricts: state => state.platformDistricts,
      platformDistrictsSelect: state => state.platformDistrictsSelect,
      platformCity: state => state.platformCity,
      adcode: state => state.adcode,
      platformCenter: state => state.platformCenter


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

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #f9f9f9;
        border-radius: 5px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #484598;
        border-radius: 5px;
      }
      &::-webkit-scrollbar-track {
        background-color: #112166;
      }

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

.vec-green {
  color: #11c711;
}
.vec-red {
  color: #ff3300;
}
.vec-yellow {
  color: #eae200;
}
.vec-gray {
  color: #959595;
}
</style>