<template>
  <div class="ex-header">
    <el-menu
      :default-active="activeIndex"
      class="ex-header-platform fl"
      mode="horizontal"
      @select="handleSelect"
    >
      <!-- logo -->
      <a href="./index.html" class="ex-header-logo">
        <div class="ex-header-logo-img"></div>
      </a>
      <a href="./demo.html" class="ex-header-logo">
        <h1 class="ex-header-logo-text">ExUIWeb3.4 - Demo演示系统</h1>
      </a>
      <!-- 菜单 -->
      <a href="./ai.html" target="_blank" class="ex-menu-link-to">智能分析</a>
      <el-submenu index="/monitor">
        <template slot="title">平台监控</template>
        <el-menu-item index="/monitor/vechileMap">车辆监控</el-menu-item>
      </el-submenu>
      <el-submenu index="/system">
        <template slot="title">系统设置</template>
        <el-menu-item index="/system/menu">菜单设置</el-menu-item>
      </el-submenu>
    </el-menu>
    <div class="ex-function">
      <div class="ex-message">
        <el-tooltip class="item" effect="dark" content="报警信息" placement="bottom" v-if="hadMessage">
          <el-badge is-dot>
            <i class="el-icon-bell"/>
          </el-badge>
        </el-tooltip>
      </div>
      <div class="ex-message">
        <el-tooltip class="item" effect="dark" content="消息提醒" placement="bottom" v-if="hadMessage">
          <el-badge is-dot>
            <i class="el-icon-chat-dot-square"/>
          </el-badge>
        </el-tooltip>
      </div>
      
      
      <fullScreen/>
    </div>
  </div>
</template>
<script>
export default {
  name: "layout",
  data() {
    return {
      hadMessage: true,
      activeIndex: "/system/menu"
    };
  },
  methods: {
    handleSelect(url) {
      this.$router.push({ path: url });
    }
  }
};
</script>

