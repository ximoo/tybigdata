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
          <!-- produceData -->
          <el-col :span="6">
            <el-card class="box-card" :class="{'box-card-edit':produceData.edit}">
              <template slot="header" class="clearfix">
                <el-input
                  size="small"
                  v-model="produceData.name"
                  v-if="produceData.edit"
                  style="width:180px;"
                />
                <span v-else>{{produceData.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="produceData.edit = true"
                  v-if="!produceData.edit"
                  icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="produceData.edit = false"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini">
                <el-form-item v-for="item , index in produceData.data" style="width:100%;">
                  <el-input v-model="item.label" v-if="produceData.edit" style="width:80px;" />
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="item.value"
                    style="width:120px;"
                    v-if="produceData.edit"
                  />
                  <el-input v-model="item.unit" v-if="produceData.edit" style="width:60px;" />
                  <el-button icon="el-icon-delete" type="danger" circle v-if="produceData.edit" />
                  <span v-else>{{item.label}} ： {{item.value}} {{item.unit}}</span>
                </el-form-item>
              </el-form>
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
      hideMenu: true,
      produceData: {
        name: "生产数据",
        data: [
          {
            label: "选项1",
            value: 0,
            unit: "单位"
          },
          {
            label: "选项2",
            value: 0,
            unit: "单位"
          },
          {
            label: "选项3",
            value: 0,
            unit: "单位"
          },
          {
            label: "选项4",
            value: 0,
            unit: "单位"
          }
        ],
        edit: false
      }
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
