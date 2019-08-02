<template>
  <div class="ex-pages">
    <!-- 侧边导航栏 -->
    <div class="ex-menu-side" :class="{'hide-menu' : hideMenu}">
      <h2>
        <i class="el-icon-set-up" />
        资产管理
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
        <el-menu-item index="/assets/vechile">
          <el-tooltip effect="dark" content="车辆管理" placement="right" v-show="hideMenu">
            <i class="el-icon-setting hide-menu-icon" />
          </el-tooltip>
          <span v-show="!hideMenu">
            <i class="el-icon-setting" /> 车辆管理
          </span>
        </el-menu-item>
      </el-menu>
    </div>
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
          :data="vechileInfo"
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
          <el-table-column prop="label" label="车牌号" width="160" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.label" size="mini" v-if="scope.row.label"></el-input>
              <span v-else>{{scope.row.label}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="adname" label="所属区域" width="120" sortable>
            <template slot-scope="scope">{{scope.row.adname?scope.row.adname:"---"}}</template>
          </el-table-column>
          <el-table-column prop="address" label="当前地址" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.address" size="mini" v-if="scope.row.edit"></el-input>
              <span v-else>{{scope.row.address}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="当前状态" width="120" sortable>
            <template slot-scope="scope">{{scope.row.state?scope.row.state:"---"}}</template>
          </el-table-column>
          <el-table-column prop="mileage" label="总里程" width="120" sortable>
            <template slot-scope="scope">{{scope.row.mileage?scope.row.mileage:"---"}}</template>
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
          <el-table-column prop="action" label="操作" align="center" width="160">
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
export default {
  name: "assetsVechile",
  data() {
    return {
      hideMenu: true,
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
    handleMenu() {
      this.hideMenu = !this.hideMenu;
    },
    hanldePage() {},
    handleAdd(index, row) {},
    handleEdit() {},
    handleSave() {},
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
      return this.$store.state.simData.vechileInfo.length;
    },
    vechileInfo() {
      let simData = this.$store.state.simData;
      console.log(simData.vechileInfo.slice(0, 20));
      return simData.vechileInfo.slice(0, 20);
    }
  }
};
</script>
