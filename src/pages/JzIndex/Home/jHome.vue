<template>
  <div class="ex-pages-bigdata">
    <fullScreen />
    <div v-if="!isFirst">
      <Tile />
      <div class="ex-screen" style="left:40px">
        <div class="ex-message" v-if="setupBtn">
          <el-popover placement="bottom" trigger="click" v-model="wordPass">
            <el-input placeholder="请输入管理员密码:admin" size="mini" v-model="adminPass">
              <el-button slot="append" icon="el-icon-success" @click="handleSetup">确定</el-button>
            </el-input>
            <i class="el-icon-s-tools" slot="reference" />
          </el-popover>

          <el-popover placement="bottom" trigger="click" style="margin-left: 12px;">
            <el-button icon="ex-icon-truck" @click="handleModule('/vechile')">车辆监控</el-button>
            <!-- <el-tooltip content="环境监测" placement="bottom">
              <el-button icon="el-icon-cloudy-and-sunny" @click="handleModule('/air')"> 环境监测</el-button>
            </el-tooltip>-->
            <el-button icon="el-icon-office-building" @click="handleModule('/site')">场站管理</el-button>
            <el-button icon="ex-icon-police" @click="handleModule('/cases')">案件管理</el-button>
            <el-button icon="ex-icon-document_fill" @click="toDemo('/admin')">后台管理</el-button>
            <el-tooltip content="选择模块" placement="bottom" slot="reference">
              <i class="ex-icon-manage_fill" />
            </el-tooltip>
          </el-popover>

          
        </div>
        <div v-else>
          <i class="el-icon-loading" />
        </div>
      </div>
      <router-view />
    </div>
    <initDataModule v-else />
    <!-- <adminPass /> -->
  </div>
</template>
<script>
import Tile from "../Component/Tile.vue";
import initDataModule from "../Modules/initDataModule.vue";
import store from "../Configs/store";

export default {
  name: "jHome",
  components: {
    Tile,
    initDataModule
  },
  data() {
    return {
      isFile: false,
      cfgFile: null,
      noIpt: false,
      setupBtn: false,
      adminPass: null,
      wordPass: false
    };
  },
  mounted() {
    store.commit("init_data");
    window.document.title =
      store.state.platformData.state.city + store.state.platformData.state.name;
  },
  methods: {
    //管理员设置
    handleSetup() {
      if (this.adminPass === "admin") {
        this.wordPass = false;
        store.commit("adminPass");
      }
    },
    //模块切换
    handleModule(url) {
      this.$router.push(url);
    },
    toDemo() {
      window.open("http://jz.comlbs.com/Login/Index", "_blank");
    }
  },
  computed: {
    isFirst() {
      this.setupBtn = !store.state.isFirst;
      return store.state.isFirst;
    }
  }
};
</script>
<style lang="less">
.el-popover {
  background: #112166 !important;
  background: linear-gradient(to bottom, #4e85b4 0%, #112166 100%) !important;
  border: 1px solid #4d53a5 !important;
  padding: 0 !important;
  box-shadow: inset 0 0 5px rgba(77, 83, 165, 0.85),
    0 5px 5px rgba(0, 0, 0, 0.45);

  .el-button {
    background: transparent;
    color: #6edbff;
    border: none;
    padding: 7px;
    line-height: 1.9;
  }

  .el-button:hover,
  .el-button:focus {
    background: #597db7;
    color: #fff;
    border: none;
  }
}
.el-popper[x-placement^="bottom"] .popper__arrow {
  border-bottom-color: #4e85b4;
}
.el-popper[x-placement^="bottom"] .popper__arrow::after {
  border-bottom-color: #4e85b4 !important;
}
</style>
