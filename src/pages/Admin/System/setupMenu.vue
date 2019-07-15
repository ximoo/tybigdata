<template>
  <div class="ex-pages">
    <!-- 侧边导航栏 -->
    <div class="ex-menu-side" :class="{'hide-menu' : hideMenu}">
      <h2>
        <i class="el-icon-set-up"/>
        系统设置
        <el-tooltip
          class="hide-menu"
          effect="dark"
          content="缩进菜单"
          placement="right"
          v-if="!hideMenu"
        >
          <i class="el-icon-s-fold" @click="handleMenu"/>
        </el-tooltip>
        <el-tooltip class="hide-menu" effect="dark" content="展开菜单" placement="right" v-else>
          <i class="el-icon-s-unfold" @click="handleMenu"/>
        </el-tooltip>
      </h2>
      <el-menu @select="handleSelect" :default-active="activeIndex">
        <el-menu-item index="/system/menu">
          <el-tooltip effect="dark" content="菜单设置" placement="right" v-show="hideMenu">
            <i class="el-icon-setting hide-menu-icon"/>
          </el-tooltip>
          <span v-show="!hideMenu">
            <i class="el-icon-setting"/> 菜单设置
          </span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="ex-pages-content" :class="{'hide-menu':hideMenu}">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:15px;">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-s-home"/> 首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/system/menu' }">系统设置</el-breadcrumb-item>
        <el-breadcrumb-item>菜单设置</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="ex-table-content">
        <!-- 报表查询 -->
        <div class="ex-table-query">
          <el-form :inline="true" :model="formInline" size="small">
            <el-form-item label="请选择查询条件："></el-form-item>
            <el-form-item label="菜单名称">
              <el-input v-model="formInline.user" placeholder="请输入您要查询的菜单名称"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="onSubmit">
                <i class="el-icon-search"/> 查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="handleAdd">
                <i class="el-icon-plus"/> 新增
              </el-button>
            </el-form-item>
            <div class="fr">
              <el-form-item>
                <el-upload
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                >
                  <el-button size="small" type="warning" icon="el-icon-sold-out">导入配置文件</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="onSubmit" icon="el-icon-sell">导出配置文件</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="onSubmit" icon="el-icon-delete">批量删除</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <!-- 报表表格 -->
        <el-table
          :data="menuData"
          row-key="name"
          stripe
          border
          header-row-class-name="ex-table-header"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column prop="id" label="id" width="60"></el-table-column>
          <el-table-column prop="icon" width="80" align="center" label="菜单图标"></el-table-column>
          <el-table-column prop="name" label="菜单名称" sortable></el-table-column>
          <el-table-column prop="url" label="菜单地址" sortable></el-table-column>
          <el-table-column prop="id" label="排序" sortable width="80" align="center"></el-table-column>
          <el-table-column prop="action" label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
              >编辑</el-button>
              <el-button size="small" @click="handleAdd" icon="el-icon-star-on">收藏</el-button>
              <el-button
                size="small"
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :hide-on-single-page="true"
          background
          layout="total, prev, pager, next, jumper"
          :total="200"
          class="ex-pagination"
        ></el-pagination>
      </div>
    </div>

    <!-- 新增弹框 -->
    <addMenu :showModal="showModal" v-on:addMenu="addMenu"/>
  </div>
</template>
<script>
import addMenu from "./Component/addMenu";

export default {
  name: "setupMenu",
  components: {
    addMenu
  },
  data() {
    return {
      hideMenu: true,
      activeIndex: "/system/menu",
      menuData: [
        {
          id: 1,
          name: "平台监控",
          url: "/monitor/vechileMap",
          children: [
            {
              id: 21,
              name: "车辆监控",
              url: "/monitor/vechileMap"
            }
          ]
        },
        {
          id: 2,
          name: "系统设置",
          url: "/system/menu",
          children: [
            {
              id: 31,
              name: "菜单设置",
              url: "/system/menu"
            }
          ]
        }
      ],
      showModal: false,
      formInline: {
        user: "",
        region: ""
      }
    };
  },
  methods: {
    handleAdd() {
      var self = this;
      self.showModal = true;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelect(key, keyPath) {
      console.log(key);
      this.$router.push({ path: key });
    },

    addMenu(close) {
      var self = this;
      self.showModal = close;
    },

    onSubmit() {
      console.log("submit!");
    },
    handleMenu() {
      this.hideMenu = !this.hideMenu;
    }
  }
};
</script>
