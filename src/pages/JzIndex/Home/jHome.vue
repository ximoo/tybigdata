<template>
  <div class="ex-pages-bigdata">
    <fullScreen />
    <div v-if="!isFirst">
      <Tile />
      <div class="ex-screen" style="left:40px">
        <div class="ex-message" v-if="setupBtn">
          <el-tooltip content="环境监管" placement="bottom">
            <i class="el-icon-coin" @click="airModule" />
          </el-tooltip>
          <el-tooltip content="工地监管" placement="bottom">
            <i class="el-icon-office-building" @click="siteModule" />
          </el-tooltip>
        </div>
        <div v-else>
          <i class="el-icon-loading" />
        </div>
      </div>
      <router-view />
    </div>
    <initDataModule v-else />
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
      diagTitle: "",
      step: 0,
      setupBtn: false
    };
  },
  mounted() {
    window.document.title =
      store.state.platformData.state.city + store.state.platformData.state.name;
    console.log(this.isFirst);
    setTimeout(() => {
      store.commit("is_first", false);
    }, 3000);
  },
  methods: {
     airModule() {
      this.$router.push("/air");
    },
    siteModule() {
      this.$router.push("/site");
    }
  },
  computed: {
    isFirst() {
      return  true //store.state.isFirst;
    }
  }
};
</script>

