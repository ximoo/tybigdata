<template>
  <div class="ex-pages-bigdata">
    <Tile/>
    <fullScreen/>
    <div class="ex-screen" style="left:40px">
      <div class="ex-message">
        <el-tooltip content="环境监管" placement="bottom">
          <i class="el-icon-coin" @click="airModule"/>
        </el-tooltip>
        <el-tooltip content="工地监管" placement="bottom">
          <i class="el-icon-office-building" @click="siteModule"/>
        </el-tooltip>
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
import Tile from "../Component/Tile.vue";

export default {
  name: "jHome",
  components: { Tile },
  methods: {
    airModule(){
      this.$router.push('/air')
    },
    siteModule(){
      this.$router.push('/site')
    }
  }
};
</script>

