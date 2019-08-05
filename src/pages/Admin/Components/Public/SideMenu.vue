<template>
  <!-- 侧边导航栏 -->
  <div class="ex-menu-side" :class="{'hide-menu' : hideMenu}">
    <h2>
      <i :class="currentNav.icon?currentNav.icon:'el-icon-set-up'" />
      {{currentNav.title}}
      <el-tooltip class="hide-menu" effect="dark" content="缩进菜单" placement="right" v-if="!hideMenu">
        <i class="el-icon-s-fold" @click="handleMenu" />
      </el-tooltip>
      <el-tooltip class="hide-menu" effect="dark" content="展开菜单" placement="right" v-else>
        <i class="el-icon-s-unfold" @click="handleMenu" />
      </el-tooltip>
    </h2>
    <el-menu @select="handleSelect" :default-active="activeIndex">
      <el-menu-item :index="item.url" v-for="item,index in currentNavChildren" :key="index">
        <el-tooltip effect="dark" :content="item.title" placement="right" v-show="hideMenu">
          <i :class="item.icon?item.icon:'el-icon-setting'" class="hide-menu-icon" />
        </el-tooltip>
        <span v-show="!hideMenu">
          <i :class="item.icon?item.icon:'el-icon-setting'" />
          {{item.title}}
        </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  name: "SideMenu",
  data() {
    return {
      hideMenu: true,
      activeIndex: ""
    };
  },
  mounted() {},
  methods: {
    handleMenu() {
      this.hideMenu = !this.hideMenu;
      this.$emit("handleMenu", this.hideMenu);
    },
    handleSelect(key, keyPath) {
      console.log(key);
      this.$router.push({ path: key });
    }
  },
  computed: {
    platformAdminNav() {
      return this.$store.state.platformAdminNav;
    },
    currentNavChildren() {
      return this.currentNav.children;
    },
    currentNav() {
      let self = this;
      let platformAdminNav = self.platformAdminNav;
      let currentNav = [];
      let currentPid = self.currentPid;

      for (var i in platformAdminNav) {
        if (platformAdminNav[i].id == currentPid) {
          currentNav = platformAdminNav[i];
        }
      }
      self.activeIndex = this.$route.path;
      return currentNav;
    },
    currentPid() {
      console.log(this.$route);
      return this.$route.meta.pid;
    }
  }
};
</script>
