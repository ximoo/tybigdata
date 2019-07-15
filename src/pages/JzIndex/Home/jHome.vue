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
          <el-tooltip content="车辆监管" placement="bottom">
            <i class="el-icon-office-building" @click="handleModule('/vechile')" />
          </el-tooltip>
          <el-tooltip content="环境监测" placement="bottom">
            <i class="el-icon-cloudy" @click="handleModule('/air')" />
          </el-tooltip>
          <el-tooltip content="工地监管" placement="bottom">
            <i class="el-icon-office-building" @click="handleModule('/site')" />
          </el-tooltip>
          <el-tooltip content="数据输入" placement="bottom">
            <i class="el-icon-office-building" @click="toDemo('/admin')" />
          </el-tooltip>
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
    toDemo(){
      window.open("admin.html","_blank") 
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