<template>
  <div class="ex-header">
    <el-menu
      :default-active="activeIndex"
      class="ex-header-platform fl"
      mode="horizontal"
      @select="handleSelect"
    >
      <!-- logo -->
      <!-- <a href="./index.html" class="ex-header-logo">
        <div class="ex-header-logo-img"></div>
      </a>-->
      <a href="./admin.html" class="ex-header-logo">
        <h1 class="ex-header-logo-text">
          <span v-if="showCity">{{platformCity}}</span>
          {{platformName}} | 管理设置
        </h1>
      </a>

      <el-submenu
        :index="item.url+'?'+index"
        :indexPath="item.url"
        v-for="item,index in platformAdminNav"
        :key="index"
      >
        <template slot="title">{{item.title}}</template>
        <el-submenu
          :index="i.url+'?'+index+'-'+idx"
          :indexPath="i.url"
          v-for="i,idx in item.children"
          :key="idx"
          v-if="i.children !==null"
        >
          <template slot="title">{{i.title}}</template>
          <el-menu-item
            :index="o.url+'?'+index+'-'+idx+'-'+ix"
            v-for="o,ix in i.children"
            :key="ix"
          >{{o.title}}</el-menu-item>
        </el-submenu>
        <el-menu-item
          :index="i.url+'?'+index+'-'+idx"
          :indexPath="i.url"
          v-for="i,idx in item.children"
          :key="idx"
          v-if="i.children ==null"
        >{{i.title}}</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="/system">
        <template slot="title">系统设置</template>
        <el-menu-item index="/system/menu">菜单设置</el-menu-item>
      </el-submenu>-->
    </el-menu>
    <div class="ex-function">
      <div class="ex-message">
        <el-tooltip class="item" effect="dark" content="返回大数据看板" placement="bottom">
          <i class="el-icon-s-data" @click="toBigData" />
        </el-tooltip>
      </div>
      <div class="ex-message">
        <el-tooltip class="item" effect="dark" content="返回监管平台DEMO" placement="bottom">
          <i class="el-icon-s-platform" @click="toDemo" />
        </el-tooltip>
      </div>
      <fullScreen />
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "layout",
  data() {
    return {
      hadMessage: true,
      activeIndex: ""
    };
  },
  mounted() {
    this.handleMenu();
    window.document.title = this.platformCity + this.platformName;
  },
  methods: {
    toBigData() {
      window.open("/jzindex.html", "_blank");
    },
    toDemo() {
      window.open("/demo.html", "_blank");
    },
    handleMenu() {
      let self = this;
      let platformAdminNav = self.platformAdminNav;
    },
    handleSelect(url) {
      if (url == "###") return false;
      this.$router.push({ path: url });
    }
  },

  computed: {
    ...mapState({
      platformName: state => state.platData.platformName, //平台名称
      platformCity: state => state.platData.platformCity, //定位城市
      showCity: state => state.platData.showCity, //是否显示城市名称
      platformAdminNav: state => state.platData.platformAdminNav //后台管理菜单
    }),
    ...mapGetters({})
  }
};
</script>