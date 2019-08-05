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
          <el-col :span="8">
            <el-card class="box-card" :class="{'box-card-edit':platformState.edit}">
              <template slot="header" class="clearfix">
                <span>平台设置:</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="platformState.edit = true"
                  v-if="!platformState.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="platformState.edit = false"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="120px" label-position="right">
                <el-form-item label=" 平台名称：" style="width:100%">
                  <el-input v-model="platformState.name" v-if="platformState.edit" />
                  <span v-else>{{platformState.name}}</span>
                </el-form-item>
                <el-form-item label=" 城市名称：" style="width:100%">
                  <el-input
                    v-model="platformState.city"
                    style="width:140px;"
                    v-if="platformState.edit"
                  />
                  <el-tooltip effect="dark" content="定位当前城市" v-if="platformState.edit">
                    <el-button type="info" icon="el-icon-location" @click="getCity"></el-button>
                  </el-tooltip>
                  <span v-else>{{platformState.city}}</span>
                </el-form-item>
                <el-form-item label=" 显示城市名：" style="width:100%">
                  <el-switch v-model="platformState.showCity" :disabled="!platformState.edit" />
                </el-form-item>
                <el-form-item label=" 显示天气：" style="width:100%">
                  <el-switch v-model="platformState.showWeather" :disabled="!platformState.edit" />
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- baseData -->
          <el-col :span="8">
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
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="baseData.edit = false"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="100px" label-position="left">
                <el-form-item label=" 车辆总数：">
                  <el-input-number v-model="baseData.vechile" v-if="baseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="baseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom"></el-button>
                  </el-tooltip>

                  <span v-else>{{baseData.vechile}}</span> 辆
                </el-form-item>
                <el-form-item label=" 工地总数：">
                  <el-input-number v-model="baseData.site" v-if="baseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="baseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom"></el-button>
                  </el-tooltip>
                  <span v-else>{{baseData.site}}</span> 个
                </el-form-item>
                <el-form-item label=" 消纳点总数：">
                  <el-input-number v-model="baseData.landfill" v-if="baseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="baseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom"></el-button>
                  </el-tooltip>
                  <span v-else>{{baseData.landfill}}</span> 个
                </el-form-item>
                <el-form-item label=" 企业总数：">
                  <el-input-number v-model="baseData.company" v-if="baseData.edit" />
                  <el-tooltip effect="dark" content="随机数" v-if="baseData.edit">
                    <el-button type="info" icon="el-icon-magic-stick" @click="getRandom"></el-button>
                  </el-tooltip>
                  <span v-else>{{baseData.company}}</span> 个
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- operatData -->
          <el-col :span="8">
            <el-card class="box-card" :class="{'box-card-edit':operatData.edit}">
              <template slot="header" class="clearfix">
                <el-input
                  size="small"
                  v-model="operatData.name"
                  v-if="operatData.edit"
                  style="width:180px;"
                />
                <span v-else>{{operatData.name}}</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="operatData.edit = true"
                  v-if="!operatData.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="operatData.edit = false"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="160px" label-position="left">
                <el-form-item label="车辆在线率：">
                  <el-input-number
                    min="0"
                    max="100"
                    v-model="operatData.vechile"
                    v-if="operatData.edit"
                  />
                  <span v-else>{{operatData.vechile}}</span> %
                </el-form-item>
                <el-form-item label="车辆离线：">
                  <el-input-number
                    min="0"
                    max="100"
                    v-model="operatData.vechile"
                    v-if="operatData.edit"
                  />
                  <span v-else>
                    <strong style="color:#11c711">{{operatData.vechile}}</strong>
                  </span> %
                </el-form-item>
                <el-form-item label="车辆设备损坏：">
                  <el-input-number
                    min="0"
                    max="100"
                    v-model="operatData.vechile"
                    v-if="operatData.edit"
                  />
                  <span v-else>
                    <strong style="color:#f30">{{operatData.vechile}}</strong>
                  </span> %
                </el-form-item>
                <el-form-item label=" 工地开工率：">
                  <el-input-number
                    min="0"
                    max="100"
                    v-model="operatData.site"
                    v-if="operatData.edit"
                  />
                  <span v-else>{{operatData.site}}</span> %
                </el-form-item>
                <el-form-item label=" 消纳点开工率：">
                  <el-input-number
                    min="0"
                    max="100"
                    v-model="operatData.landfill"
                    v-if="operatData.edit"
                  />
                  <span v-else>{{operatData.landfill}}</span> %
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          <!-- produceData -->
          <el-col :span="8">
            <el-card class="box-card" :class="{'box-card-edit':produceData.edit}">
              <template slot="header" class="clearfix">
                <span>生产数据:</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="produceData.edit = true"
                  v-if="!produceData.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  @click="produceData.edit = false"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="160px" label-position="left">
                <el-form-item label="车辆在线率：">
                  <el-input-number
                    min="0"
                    max="100"
                    v-model="operatData.vechile"
                    v-if="operatData.edit"
                  />
                  <span v-else>{{operatData.vechile}}</span> %
                </el-form-item></el-form>
            </el-card>
          </el-col>
          <el-col :span="16">
            <el-card class="box-card" :class="{'box-card-edit':platformState.edit}">
              <template slot="header" class="clearfix">
                <span>报警类型:</span>
                <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
              </template>
              <div>
                车辆监控类：
                驾驶行为类：
                渣土运输违规类：
                场站违规类：
              </div>
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
      platformState: {
        name: "城市固废资源利用云平台",
        city: "武汉市",
        adcode: "420000",
        center: "114.374025,30.874155",
        districts: [],
        showCity: true,
        showWeather: true,
        edit: false
      },
      baseData: {
        name: "基础数据",
        vechile: 0,
        site: 0,
        landfill: 0,
        company: 0,
        edit: false
      },
      operatData: {
        name: "运营数据",
        vechile: 100,
        site: 100,
        landfill: 100,
        edit: false
      },
      produceData: {
        data:[{
          label:"选项1",
          value:0
        },{
          label:"选项2",
          value:0
        },{
          label:"选项3",
          value:0
        },{
          label:"选项4",
          value:0
        }],
        edit: false
      }
    };
  },
  mounted() {},
  methods: {
    handleMenu(e) {
      console.log(e);
      this.hideMenu = e;
    },
    getCity() {},
    getRandom() {}
  },
  computed: {
    platformAdminNav() {
      return this.$store.state.platformAdminNav;
    }
  }
};
</script>
<style lang="less">
.box-card {
  min-height: 320px;
  margin-bottom: 15px;
  box-shadow: none !important;

  &.box-card-edit {
    background-color: #f3f4f9;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1) !important;
  }
  .el-button--mini {
    padding: 7px !important;
  }
  .el-form--inline .el-form-item {
    display: block;
    width: calc(50% - 10px);
    float: left;
  }
}
</style>
