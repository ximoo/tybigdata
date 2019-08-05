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
        <el-breadcrumb-item>菜单设置</el-breadcrumb-item>
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
          :data="currentTable"
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
          <el-table-column prop="id" label="ID" width="80" sortable></el-table-column>
          <el-table-column prop="iconClass" width="80" align="center" label="图标">
            <template slot-scope="scope">
              <el-input v-model="scope.row.iconClass" size="mini" v-if="scope.row.edit"></el-input>
              <span v-else>{{scope.row.iconClass}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="菜单名称" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.title" size="mini" v-if="scope.row.edit"></el-input>
              <span v-else>{{scope.row.title}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="pid" label="PID" width="80" sortable>
            <template slot-scope="scope">{{scope.row.pid?scope.row.pid:"---"}}</template>
          </el-table-column>
          <el-table-column prop="parentTxt" label="上级菜单" width="200" sortable>
            <template slot-scope="scope">
              <el-popover
                placement="bottom"
                @show="hanldeTreeDropNav(scope.row)"
                v-model="showTreeDropNav"
                v-if="scope.row.edit"
              >
                <el-tree
                  ref="treeDropNav"
                  :data="treeDropNavData"
                  :props="NavProps"
                  @node-click="handleParent(scope.row)"
                ></el-tree>
                <el-input
                  size="mini"
                  :ref="scope.row.id"
                  slot="reference"
                  v-model="scope.row.parentTxt"
                />
              </el-popover>
              <span v-else>{{scope.row.parentTxt?scope.row.parentTxt:"------"}}</span>
            </template>
          </el-table-column>

          <el-table-column prop="url" label="菜单地址" sortable>
            <template slot-scope="scope">
              <el-input v-model="scope.row.url" size="mini" v-if="scope.row.edit"></el-input>
              <span v-else>{{scope.row.url}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="fav" width="80" align="center" label="是否收藏">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.fav"
                @change="handleBlank(scope.row.fav)"
                :disabled="!scope.row.edit"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="blank" width="80" align="center" label="是否嵌套">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.iframe"
                @change="handleBlank(scope.row.iframe)"
                :disabled="!scope.row.edit"
              ></el-switch>
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
          <el-table-column prop="sort" label="排序" type="index" sortable width="180" align="center">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.index" size="mini"></el-input-number>
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
          :page-size="tableSize"
          :total="tableTotal"
          @current-change="hanldePage"
          class="ex-pagination"
        ></el-pagination>
      </div>
    </div>

    <!-- 新增弹框 -->
    <addMenu
      :showModal="showModal"
      :editCfg="editCfg"
      :rowData="rowData"
      :modalName="modalName"
      v-on:addMenu="addMenu"
    />
  </div>
</template>
<script>
import addMenu from "./Component/addMenu";
import SideMenu from "../Public/SideMenu";
import { resolve, reject } from "q";

export default {
  name: "setupMenu",
  components: {
    addMenu,
    SideMenu
  },
  data() {
    return {
      hideMenu: true,
      activeIndex: "/system/menu",
      modalName: "",
      showModal: false,
      rowData: {},
      currentTable: [],
      tablePages: 1,
      tableTotal: 0,
      tableSize: 20,
      tableData: [],
      queryData: {
        title: "",
        blank: false,
        iframe: false,
        fav: false
      },
      editCfg: [
        {
          label: "title",
          name: "菜单名称",
          value: "",
          type: "input"
        },
        {
          label: "pid",
          name: "上级菜单",
          value: "",
          type: "select-tree"
        },
        {
          label: "iconClass",
          name: "菜单图标",
          value: "",
          type: "select-icon"
        },
        {
          label: "url",
          name: "菜单地址",
          value: "",
          type: "input",
          type: "input"
        },
        {
          label: "fav",
          name: "是否收藏",
          value: false,
          type: "switch"
        },
        {
          label: "iframe",
          name: "是否嵌套",
          value: false,
          type: "switch"
        },
        {
          label: "blank",
          name: "是否跳转",
          value: false,
          type: "switch"
        },
        {
          label: "sort",
          name: "排序",
          value: "0",
          type: "input"
        }
      ],
      NavProps: {
        children: "children",
        label: "title"
      },
      showTreeDropNav: false,
      treeDropNavData: []
    };
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      self.JSON2Arr(self.$store.state.platformAdminNav);
    });
  },
  methods: {
    handleBlank(e) {
      console.log(e);
    },

    handleAdd(index, row) {
      var self = this;
      self.showModal = true;
      self.modalName = "新增菜单";
    },

    handleEdit(row) {
      row.edit = true;
    },

    handleSave(row) {
      let self = this;
      let id = row.id;
      let tableData = self.tableData;
      let currentTable = self.currentTable;

      for (var i in currentTable) {
        if (currentTable[i].id === id) {
          currentTable[i] = row;
        }
      }

      for (var i in tableData) {
        if (tableData[i].id === id) {
          tableData[i] = row;
        }
      }

      self.currentTable = currentTable;
      self.tableData = tableData;
      self.tableTotal = tableData.length;
      row.edit = false;
      setTimeout(() => {
        self.Arr2Json(tableData);
      }, 50);
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

    handleMenu(e) {
      console.log(e);
      this.hideMenu = e;
    },

    hanldePage(e) {
      let self = this;
      self.tablePages = e;
      self.JSON2Arr(self.$store.state.platformAdminNav);
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
    },

    handleParent(row) {
      let self = this;
      let data = this.$refs.treeDropNav.getCurrentNode();
      console.log(data);
      if (data && !data.disabled) {
        row.parentTxt = data.title;
        row.pid = data.id;
        self.showTreeDropNav = false;
      }
    },

    //遍历菜单
    JSON2Arr(obj, tableData = []) {
      let self = this;
      for (var i in obj) {
        let newObj = new Object();
        newObj.id = obj[i].id;
        newObj.title = obj[i].title;
        newObj.pid = obj[i].pid;
        newObj.url = obj[i].url;
        newObj.iconClass = obj[i].iconClass;
        newObj.edit = obj[i].edit ? obj[i].edit : false;
        newObj.iframe = obj[i].blank ? obj[i].iframe : false;
        newObj.blank = obj[i].blank ? obj[i].blank : false;
        newObj.fav = obj[i].fav ? obj[i].fav : false;
        newObj.index = obj[i].index ? obj[i].index : 0;
        newObj.parentTxt = "";
        tableData.push(newObj);

        if (obj[i].children) {
          self.JSON2Arr(obj[i].children, tableData);
        }
      }
      for (var i in obj) {
        for (var x in tableData) {
          if (tableData[x].pid == obj[i].id) {
            tableData[x].parentTxt = obj[i].title;
          }
        }
      }

      self.tableData = tableData;
      self.tableTotal = tableData.length;

      self.currentTable = tableData.slice(
        self.tableSize * (self.tablePages - 1),
        self.tableSize * self.tablePages
      );
    },

    hanldeTreeDropNav(row) {
      let self = this;
      let treeDropNavData = self.platformAdminNav;
      console.log(treeDropNavData);
      self.JSON2Tree(treeDropNavData, row);
    },

    //遍历菜单树
    JSON2Tree(obj, row) {
      let self = this;

      for (var i in obj) {
        if (row.id == obj[i].id) {
          console.log(row.id);
          obj[i].disabled = true;
        }
        if (obj[i].children) {
          self.JSON2Tree(obj[i].children, row);
        }
      }
      self.treeDropNavData = obj;
    },

    //输出菜单
    Arr2Json(obj, navJson = []) {
      let self = this;
      console.info(obj);

      obj.forEach((item, index) => {
        console.log(item.pid);
      });

      /*
      function level1(obj) {
        return new Promise(function(resolve, reject) {
          for (var i in obj) {
            if (!obj[i].pid) {
              navJson.push({
                id: obj[i].id,
                pid: obj[i].pid,
                title: obj[i].title,
                url: obj[i].url,
                iconClass: obj[i].iconClass,
                edit: obj[i].edit,
                blank: obj[i].blank,
                iframe: obj[i].iframe,
                children: []
              });
            } else {
              navJson = obj;
            }
          }
          resolve(navJson);
        });
      }

      function level2(obj) {
        return new Promise(function(resolve, reject) {
          localStorage.$temp = JSON.stringify(navJson);
          for (var i in obj) {
            for (var x in navJson) {
              if (navJson[x].id == obj[i].pid) {
                navJson[x].children.push({
                  id: obj[i].id,
                  pid: obj[i].pid,
                  title: obj[i].title,
                  url: obj[i].url,
                  iconClass: obj[i].iconClass,
                  edit: obj[i].edit,
                  blank: obj[i].blank,
                  iframe: obj[i].iframe,
                  children: []
                });
              }
            }
          }

          resolve(navJson);
        });
      }

      function level3(obj) {
        return new Promise(function(resolve, reject) {
          for (var i in obj) {
            for (var x in navJson) {
              for (var y in navJson[x].children)
                if (navJson[x].children[y].id == obj[i].pid) {
                  navJson[x].children[y].children.push({
                    id: obj[i].id,
                    pid: obj[i].pid,
                    title: obj[i].title,
                    url: obj[i].url,
                    iconClass: obj[i].iconClass,
                    edit: obj[i].edit,
                    blank: obj[i].blank,
                    iframe: obj[i].iframe,
                    children: null
                  });
                }
            }
          }
          resolve(navJson);
        });
      }

      var p = new Promise(function(resolve, reject) {
        console.log("start new Promise...");
        resolve(navJson);
      });

      p.then(level1(obj))
        .then(level2(obj))
        .then(level3(obj))
        .then(function(res) {
          self.$store.commit("storeNav", res);
        });

        */
    }
  },

  watch: {
    platformAdminNav(n) {
      console.log(n);
      this.JSON2Arr(n);
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
