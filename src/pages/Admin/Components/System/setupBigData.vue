<template>
  <div class="ex-pages">
    <!-- 侧边导航栏 -->
    <SideMenu v-on:handleMenu="handleMenu" />
    <div class="ex-pages-content" :class="{'hide-menu':hideMenu}">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:15px;">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-s-home" /> 首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system/menu' }">系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>基础数据设置</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="ex-table-content">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-card class="box-card">
              <template slot="header" class="clearfix">
                <span>基础监控数据:</span>
                <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
              </template>
              <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <template slot="header" class="clearfix">
                <span>运营数据:</span>
                <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
              </template>
              <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <template slot="header" class="clearfix">
                <span>生产数据:</span>
                <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
              </template>
              <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <template slot="header" class="clearfix">
                <span>报警类型:</span>
                <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
              </template>
              <div v-for="o in 4" :key="o" class="text item">{{'列表内容 ' + o }}</div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import SideMenu from "../Public/SideMenu";

export default {
  name: "setupBaseData",
  components: {
    SideMenu
  },
  data() {
    let self = this;
    return {
      hideMenu: true
    };
  },
  mounted() {},
  methods: {
    handleMenu(e) {
      console.log(e);
      this.hideMenu = e;
    }
  },
  computed: {
    platformAdminNav() {
      return this.$store.state.platformAdminNav;
    }
  }
};
</script>
<style lang="less">
</style>
