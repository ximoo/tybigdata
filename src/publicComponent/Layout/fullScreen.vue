<template>
  <div class="ex-screen">
    <div class="ex-message">
      <el-tooltip content="退出全屏" placement="bottom">
        <i class="el-icon-full-screen" @click="changeScreen" v-show="pageScreen"/>
      </el-tooltip>
    </div>
    <div class="ex-message">
      <el-tooltip content="进入全屏" placement="bottom">
        <i class="el-icon-full-screen" @click="changeScreen" v-show="!pageScreen"/>
      </el-tooltip>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pageScreen: false,
      headerControl: true
    };
  },
  methods: {
    changeScreen() {
      var docElm = document.documentElement;
      if (!this.pageScreen) {
        //W3C
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen();
        }
        //FireFox
        else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen();
        }
        //Chrome等
        else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen();
        }
        //IE11
        else if (docElm.msRequestFullscreen) {
          docElm.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
      this.pageScreen = !this.pageScreen;
    }
  }
};
</script>

