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
          <!-- baseData -->
          <el-col :span="6">
            <el-card class="box-card" :class="{'box-card-edit':baseData.edit}">
              <template slot="header" class="clearfix">
                <el-input
                  size="small"
                  v-model="baseData.name"
                  v-if="baseData.edit"
                  style="width:180px;"
                />
                <span v-else>{{baseData.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="baseData.edit = true"
                  v-if="!baseData.edit"
                  icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="saveBaseData"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini">
                <el-form-item
                  v-for="item,index in baseData.data"
                  :key="index"
                  style="width:calc(50% - 15px);"
                >
                  <i
                    class="el-icon-circle-check"
                    v-if="item.checked && !baseData.edit"
                    style="color:#00cb0e"
                  />
                  <i
                    class="el-icon-circle-close"
                    v-if="!item.checked && !baseData.edit"
                    style="color:#f30"
                  />
                  <el-checkbox
                    v-model="item.checked"
                    style="margin-right: 5px;"
                    v-if="baseData.edit"
                  ></el-checkbox>
                  <el-input v-model="item.label" v-if="baseData.edit" style="width:80px;" />
                  <span v-if="!baseData.edit">
                    <strong>{{item.label}} ：</strong>
                    {{item.value}} {{item.unit}}
                  </span>
                  <span v-else>{{item.value}} {{item.unit}}</span>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- opratData -->
          <el-col :span="6">
            <el-card class="box-card" :class="{'box-card-edit':opratData.edit}">
              <template slot="header" class="clearfix">
                <el-input
                  size="small"
                  v-model="opratData.name"
                  v-if="opratData.edit"
                  style="width:180px;"
                />
                <span v-else>{{opratData.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="opratData.edit = true"
                  v-if="!opratData.edit"
                  icon="el-icon-edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="saveOpratData"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini">
                <el-form-item style="width:100%">
                  <el-checkbox v-model="opratData.module" label="车辆在线情况"></el-checkbox>
                </el-form-item>
                <el-form-item
                  v-for="item,index in opratData.data.vechile"
                  :key="index"
                  style="width:calc(33% - 15px);"
                >
                  <el-checkbox
                    v-model="item.checked"
                    :label="item.label"
                    style="margin-right: 5px;"
                    v-if="!opratData.edit"
                  ></el-checkbox>
                  <el-checkbox
                    v-model="item.checked"
                    style="margin-right: 5px;"
                    v-if="opratData.edit"
                  ></el-checkbox>
                  <el-input v-model="item.label" v-if="opratData.edit" style="width:80px;" />
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
  name: "setupBigData",
  components: {
    SideMenu
  },
  data() {
    let self = this;
    return {
      hideMenu: true,
      baseData: self.$store.getters.adminBaseData,
      opratData: {
        name: "运营数据",
        edit: false,
        data: []
      }
    };
  },
  mounted() {},
  methods: {
    /*
    removeBaseData(index) {
      let self = this;
      console.log(self.bigData.baseData.data.length);
      if (self.bigData.baseData.data.length - 1 > 0)
        self.bigData.baseData.data.splice(index, 1);
      else self.bigData.baseData.data[0].value = 0;
    },
    addBaseData() {
      let self = this;
      let templateData = {
        id: 1,
        label: "车辆总数",
        unit: "辆",
        value: "0"
      };
      if (
        self.bigData.baseData.data.length - 1 > 0 &&
        self.bigData.baseData.data.length < 6
      ) {
        self.bigData.baseData.data.push(templateData);
      }
    },
    */
    //保存基础监控数据
    saveBaseData() {
      let self = this,
        baseData = self.baseData,
        platformBigData = self.$store.state.platformBigData;
      console.log(platformBigData);
      self.baseData.edit = false;
      platformBigData.baseData.data = baseData.data;
      localStorage.$platformBigData = JSON.stringify(platformBigData.baseData);
    },

    saveOpratData() {
      this.opratData.edit = false;
      let self = this,
        countBaseData = [],
        platformBigData = self.platformBigData;
      for (var i in self.platformOperatData) {
        if (self.platformOperatData.vechile[i].checked) {
          countBaseData.push(self.platformBaseData.vechile[i]);
        }
        platformBigData.opratData.data = countBaseData;
      }
      localStorage.$platformBigData = JSON.stringify(platformBigData);
    },

    handleMenu(e) {
      this.hideMenu = e;
    }
  },
  computed: {
    /*

    platformBaseData() {
      let self = this;
      let platformBaseData = localStorage.$platformBaseData
        ? JSON.parse(localStorage.$platformBaseData)
        : {};

      let baseData = [],
        opratData = {
          vechile: [],
          transport: []
        };
      for (var key in platformBaseData) {
        switch (key) {
          case "vechile":
            let vecTotal = platformBaseData[key],
              vecOnline = Math.round(
                (platformBaseData[key] * self.platformOperatData.vechile) / 100
              ),
              vecOffline = Math.round(
                (platformBaseData[key] * self.platformOperatData.vecOffline) /
                  100
              ),
              vecDamage = Math.round(
                (platformBaseData[key] * self.platformOperatData.vecDamage) /
                  100
              );

            baseData.push(
              {
                id: 11,
                label: "车辆总数",
                unit: "辆",
                value: vecTotal,
                checked: true
              },
              {
                id: 12,
                label: "在线车辆",
                unit: "辆",
                value: vecOnline,
                checked: true
              },
              {
                id: 13,
                label: "离线车辆",
                unit: "辆",
                value: vecOffline,
                checked: true
              },
              {
                id: 14,
                label: "设备损坏",
                unit: "辆",
                value: vecDamage,
                checked: false
              }
            );
            opratData.vechile.push(
              {
                id: 11,
                label: "在线车辆",
                value: vecOnline,
                checked: true
              },
              {
                id: 12,
                label: "离线车辆",
                value: vecOffline,
                checked: true
              },
              {
                id: 13,
                label: "设备损坏",
                value: vecDamage,
                checked: true
              }
            );
            break;
          case "site":
            baseData.push(
              {
                id: 21,
                label: "核准工地",
                unit: "个",
                value: Math.round(
                  (platformBaseData[key] * self.platformOperatData.site) / 100
                ),
                checked: true
              },
              {
                id: 22,
                label: "可疑工地",
                unit: "个",
                value: Math.round(
                  (platformBaseData[key] *
                    self.platformOperatData.siteDubious) /
                    100
                ),
                checked: false
              },
              {
                id: 23,
                label: "开工工地",
                unit: "个",
                value: Math.round(
                  (platformBaseData[key] *
                    self.platformOperatData.siteOnline *
                    self.platformOperatData.site) /
                    10000
                ),
                checked: true
              },
              {
                id: 24,
                label: "停工工地",
                unit: "个",
                value: Math.round(
                  (platformBaseData[key] *
                    self.platformOperatData.siteOffline *
                    self.platformOperatData.site) /
                    10000
                ),
                checked: false
              }
            );
            opratData.transport.push(
              {
                id: 11,
                label: "在线车辆",
                checked: true
              },
              {
                id: 12,
                label: "离线车辆",
                checked: true
              },
              {
                id: 13,
                label: "设备损坏",
                checked: true
              }
            );
            break;
          case "landfill":
            baseData.push(
              {
                id: 31,
                label: "核准消纳点",
                unit: "个",
                value: Math.round(
                  (platformBaseData[key] * self.platformOperatData.landfill) /
                    100
                ),
                checked: true
              },
              {
                id: 32,
                label: "可疑消纳点",
                unit: "个",
                value: Math.round(
                  (platformBaseData[key] *
                    self.platformOperatData.landfillDubious) /
                    100
                ),
                checked: false
              }
            );
            break;
          case "company":
            baseData.push({
              id: 31,
              label: "资质企业总数",
              unit: "个",
              value: platformBaseData[key],
              checked: true
            });
            break;
        }
      }
      self.baseData.data = baseData;
      self.opratData.data = opratData;
      return baseData;
    },

    platformOperatData() {
      let platformOperatData = localStorage.$platformOperatData
        ? JSON.parse(localStorage.$platformOperatData)
        : {};

      return platformOperatData;
    },

    platformBigData() {
      let platformBigData = localStorage.$platformBigData
        ? JSON.parse(localStorage.$platformBigData)
        : {};
      return platformBigData;
    }

    */
  }
};
</script>