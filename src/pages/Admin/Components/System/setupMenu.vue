<template>
  <div class="ex-pages">
    <!-- 侧边导航栏 -->
    <div class="ex-menu-side" :class="{'hide-menu' : hideMenu}">
      <h2>
        <i class="el-icon-set-up" />
        系统设置
        <el-tooltip
          class="hide-menu"
          effect="dark"
          content="缩进菜单"
          placement="right"
          v-if="!hideMenu"
        >
          <i class="el-icon-s-fold" @click="handleMenu" />
        </el-tooltip>
        <el-tooltip class="hide-menu" effect="dark" content="展开菜单" placement="right" v-else>
          <i class="el-icon-s-unfold" @click="handleMenu" />
        </el-tooltip>
      </h2>
      <el-menu @select="handleSelect" :default-active="activeIndex">
        <el-menu-item index="/system/menu">
          <el-tooltip effect="dark" content="菜单设置" placement="right" v-show="hideMenu">
            <i class="el-icon-setting hide-menu-icon" />
          </el-tooltip>
          <span v-show="!hideMenu">
            <i class="el-icon-setting" /> 菜单设置
          </span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="ex-pages-content" :class="{'hide-menu':hideMenu}">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:15px;">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-s-home" /> 首页
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
                <i class="el-icon-search" /> 查询
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="handleAdd">
                <i class="el-icon-plus" /> 新增
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
          :data="platformAdminNav"
          row-key="title"
          stripe
          border
          default-expand-all
          header-row-class-name="ex-table-header"
          height="100%"
          max-height="100%"
          :tree-props="{children: 'children'}"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column prop="id" label="id" width="150"></el-table-column>
          <el-table-column prop="pid" label="上级菜单" align="center" width="80"></el-table-column>
          <el-table-column prop="iconClass" width="80" align="center" label="菜单图标"></el-table-column>
          <el-table-column prop="title" label="菜单名称" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" size="mini" v-if="scope.row.edit"></el-input>
              <span v-else>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="url" label="菜单地址" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.url" size="mini" v-if="scope.row.edit"></el-input>
              <span v-else>{{scope.row.url}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="blank" width="80" align="center" label="是否跳转">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.blank"
                @change="handleBlank(scope.row.blank)"
                :disabled="!scope.row.edit"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" type="index" sortable width="80" align="center">
            <template slot-scope="scope">
              <el-input v-model="scope.row.index" size="mini" style="width:65px"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center" width="280">
            <template slot-scope="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-edit"
                v-if="!showModal"
              >编辑</el-button>
              <el-button size="small" @click="handleSave" icon="el-icon-edit" v-if="showModal">保存</el-button>
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                icon="el-icon-star-on"
              >收藏</el-button>
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
          :total="0"
          class="ex-pagination"
        ></el-pagination>
      </div>
    </div>

    <!-- 新增弹框 -->
    <addMenu
      :showModal="showModalt"
      :editCfg="editCfg"
      :rowData="rowData"
      :modalName="modalName"
      v-on:addMenu="addMenu"
    />
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
      modalName: "",
      showModal: false,
      showModalt: false,
      rowData: {},
      formInline: {
        user: "",
        region: ""
      },
      editCfg: [
        {
          label: "id",
          name: "id",
          value: "",
          type: "input"
        },
        {
          label: "pid",
          name: "上级菜单",
          value: "",
          type: "select"
        },
        {
          label: "iconClass",
          name: "菜单图标",
          value: "",
          type: "select-icon"
        },
        {
          label: "title",
          name: "菜单名称",
          value: "",
          type: "input"
        },
        {
          label: "url",
          name: "菜单地址",
          value: "",
          type: "input",
          type: "input"
        },
        {
          label: "blank",
          name: "是否跳转",
          value: "",
          type: "switch"
        },
        {
          label: "sort",
          name: "排序",
          value: "",
          type: "input"
        }
      ]
    };
  },
  methods: {
    handleBlank(e) {
      console.log(e);
    },
    handleAdd(index, row) {
      var self = this;
      self.showModal = true;
      // self.modalName = "新增菜单";
    },
    handleEdit(index, row) {
      var self = this;
      var id = row.id;
      var platformAdminNav = self.platformAdminNav;
      console.log(index);

      self.showModal = true;
      // self.rowData = row;
      // self.modalName = "编辑菜单";
      console.log(row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSelect(key, keyPath) {
      console.log(key);
      this.$router.push({ path: key });
    },

    handleSave() {
      this.showModal = false;
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
  },
  computed: {
    platformAdminNav() {
      return this.$store.state.platformAdminNav;
    }
  }
};
</script>
