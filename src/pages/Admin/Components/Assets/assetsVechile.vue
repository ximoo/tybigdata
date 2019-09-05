<template>
  <div class="ex-pages">
    <!-- 侧边导航栏 -->
    <SideMenu v-on:handleMenu="handleMenu" />

    <div class="ex-pages-content" :class="{'hide-menu':hideMenu}">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="margin:15px;">
        <el-breadcrumb-item :to="{ path: '/' }">
          <i class="el-icon-s-home" /> 首页
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/assets/vechile' }">资产管理</el-breadcrumb-item>
        <el-breadcrumb-item>车辆管理</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="ex-table-content">
        <!-- 报表查询 -->
        <div class="ex-table-query">
          <el-form :inline="true" :model="queryData" size="mini">
            <el-form-item>
              <strong>请选择查询条件：</strong>
            </el-form-item>
            <el-form-item label="菜单名称">
              <el-input v-model="queryData.title" placeholder="请输入您要查询的菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="是否收藏">
              <el-radio v-model="queryData.fav" :label="true">是</el-radio>
              <el-radio v-model="queryData.fav" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="是否跳转">
              <el-radio v-model="queryData.blank" :label="true">是</el-radio>
              <el-radio v-model="queryData.blank" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item label="是否嵌套">
              <el-radio v-model="queryData.iframe" :label="true">是</el-radio>
              <el-radio v-model="queryData.iframe" :label="false">否</el-radio>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="QueryTitle">
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
                  <el-button type="warning" icon="el-icon-sold-out">导入配置文件</el-button>
                </el-upload>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" icon="el-icon-sell">导出配置文件</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" icon="el-icon-delete">批量删除</el-button>
              </el-form-item>
            </div>
          </el-form>
        </div>

        <!-- 报表表格 -->
        <el-table
          :data="vecInfo"
          ref="tableDom"
          row-key="id"
          stripe
          border
          default-expand-all
          lazy
          header-row-class-name="ex-table-header"
          height="100%"
          max-height="100%"
          :tree-props="{children: 'children'}"
        >
          <el-table-column type="selection" width="40" align="center"></el-table-column>
          <el-table-column prop="vechileNumber" label="车牌号" width="160" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.vechileNumber" size="mini" v-if="scope.row.edit"></el-input>
              <span v-else>{{scope.row.vechileNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="adname" label="所属区域" align="center" width="120" sortable>
            <template slot-scope="scope">{{scope.row.gpsinfo.adname?scope.row.gpsinfo.adname:"---"}}</template>
          </el-table-column>
          <el-table-column prop="address" label="当前地址" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.gpsinfo.address" size="mini" v-if="scope.row.edit"></el-input>
              <span v-else>{{scope.row.gpsinfo.address}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="当前状态" align="center" width="120" sortable>
            <template slot-scope="scope">{{scope.row.status?scope.row.status:"---"}}</template>
          </el-table-column>
          <el-table-column prop="mileage" label="总里程(公里)" width="140" sortable>
            <template slot-scope="scope">{{scope.row.mileage?scope.row.mileage:"---"}}</template>
          </el-table-column>
          <el-table-column prop="action" label="操作" align="center" width="190">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="info"
                plain
                @click="handleEdit(scope.row)"
                icon="el-icon-edit"
                v-if="!scope.row.edit"
              >编辑</el-button>
              <el-button
                size="mini"
                plain
                type="success"
                @click="handleSave(scope.row)"
                icon="el-icon-edit"
                v-if="scope.row.edit"
              >保存</el-button>
              <el-button
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                @click="handleDelete(scope.$index, scope.row)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :hide-on-single-page="true"
          background
          layout="total, prev, pager, next, jumper"
          :pager-count="11"
          :page-size="tableSize"
          :total="tableTotal"
          @current-change="hanldePage"
          class="ex-pagination"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import SideMenu from "../Public/SideMenu";

import { mapState, mapGetters } from "vuex";

export default {
  name: "assetsVechile",
  components: { SideMenu },
  data() {
    return {
      hideMenu: false,
      activeIndex: "/assets/vechile",
      currentTable: [],
      queryData: {
        title: "",
        blank: false,
        iframe: false,
        fav: false
      },
      tableSize: 20
    };
  },
  methods: {
    handleMenu(e) {
      this.hideMenu = e;
    },
    hanldePage() {},
    handleAdd(index, row) {},
    handleEdit(row) {
      row.edit = true;
    },
    handleSave(row) {
      row.edit = false;
    },
    handleDelete() {},
    handleSelect(key, keyPath) {
      console.log(key);
      this.$router.push({ path: key });
    },

    QueryTitle() {
      let self = this;
      let queryData = self.queryData;
      let titleTxt = queryData.title;
      let blankBoolean = queryData.blank;
      let iframeBoolean = queryData.iframe;
      let favBoolean = queryData.fav;
      let tableData = self.tableData;
      let tempData = [];
      for (var i in tableData) {
        if (
          tableData[i].title.search(titleTxt) != -1 && //查询菜单名称
          tableData[i].blank == blankBoolean && //查询是否跳转
          tableData[i].iframe == iframeBoolean && //查询是否嵌套
          tableData[i].fav == favBoolean //查询是否收藏
        ) {
          tempData.push(tableData[i]);
        }
      }
      self.currentTable = tempData;
      self.tableTotal = tempData.length;
    }
  },
  computed: {
    tableTotal() {
      return this.vechileInfo.length;
    },
    vecInfo() {
      let self = this;
      let vechileInfo = self.vechileInfo;
      for (var i in vechileInfo) {
        vechileInfo[i]["edit"] = false;
      }
      return vechileInfo.slice(0, 20);
    },
    ...mapGetters("bigData", ["vechileInfo"])
  }
};
</script>
