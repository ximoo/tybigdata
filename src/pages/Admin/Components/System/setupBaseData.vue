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
            <el-card class="box-card" :class="{'box-card-edit':platformState.edit}">
              <template slot="header" class="clearfix">
                <span>平台设置:</span>
                <el-button
                  style="float: right; padding: 3px 0"
                  type="text"
                  icon="el-icon-edit"
                  @click="platformState.edit = true"
                  v-if="!platformState.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  icon="el-icon-success"
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
                  icon="el-icon-edit"
                  v-if="!baseData.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="baseData.edit = false"
                  icon="el-icon-success"
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
          <el-col :span="6">
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
                  icon="el-icon-edit"
                  v-if="!operatData.edit"
                >编辑</el-button>
                <el-button
                  style="float: right; padding: 3px 0;color:#11c711;font-weight:bold;"
                  type="text"
                  @click="operatData.edit = false"
                  icon="el-icon-success"
                  v-else
                >保存</el-button>
              </template>
              <el-form inline size="mini" label-width="160px" label-position="left">
                <el-form-item label="车辆在线率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.vechile"
                    v-if="operatData.edit"
                  />
                  <span v-else>{{operatData.vechile}}</span> %
                </el-form-item>
                <el-form-item label="车辆离线：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.vechile"
                    v-if="operatData.edit"
                  />
                  <span v-else>
                    <strong style="color:#11c711">{{operatData.vechile}}</strong>
                  </span> %
                </el-form-item>
                <el-form-item label="车辆设备损坏：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.vechile"
                    v-if="operatData.edit"
                  />
                  <span v-else>
                    <strong style="color:#f30">{{operatData.vechile}}</strong>
                  </span> %
                </el-form-item>
                <el-form-item label=" 工地开工率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.site"
                    v-if="operatData.edit"
                  />
                  <span v-else>{{operatData.site}}</span> %
                </el-form-item>
                <el-form-item label=" 消纳点开工率：">
                  <el-input-number
                    :min="0"
                    :max="100"
                    v-model="operatData.landfill"
                    v-if="operatData.edit"
                  />
                  <span v-else>{{operatData.landfill}}</span> %
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
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
          <el-col :span="24">
            <el-card class="box-card">
              <template slot="header" class="clearfix">
                <span>报警类型:</span>
              </template>
              <el-table :data="alermSetup" border :span-method="alermSetupMethod">
                <el-table-column prop="type" label="报警类别" width="180"></el-table-column>
                <el-table-column prop="selected" width="80" label="选择模块" align="center">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.selected" />
                  </template>
                </el-table-column>
                <el-table-column label="类别详情">
                  <template slot-scope="scopePid">
                    <ul>
                      <li
                        v-for="item,index in scopePid.row.list"
                        :key="index"
                        style="margin-right:15px;"
                      >
                        <strong style="color:#11c711" v-if="item.checked && scopePid.row.selected">
                          <i class="el-icon-check"></i>
                          {{item.alerm}}
                        </strong>
                        <del v-if="!item.checked && scopePid.row.selected">{{item.alerm}}</del>
                      </li>
                    </ul>
                    <el-table
                      :data="scopePid.row.list"
                      border
                      v-if="scopePid.row.selected"
                      :ref="'multipleTable'+scopePid.$index"
                    >
                      <el-table-column prop="checked" width="80" align="center">
                        <template slot="header" slot-scope="scope">
                          <el-checkbox
                            :checked="scopePid.row.checkAll"
                            :indeterminate="scopePid.row.indeterminate"
                            @change="handleSelection(scopePid.row)"
                            label="全选"
                          />
                        </template>
                        <template slot-scope="scope">
                          <el-checkbox
                            v-model="scope.row.checked"
                            @change="handleSelection(scope.row)"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column prop="alerm" label="报警类型" width="160" align="center">
                        <template slot-scope="scope">
                          <span
                            class="alerm"
                            :class="{'redAlerm':scope.row.level==3,'yellowAlerm':scope.row.level==2}"
                          >{{scope.row.alerm}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="level" label="报警等级" width="150" align="center">
                        <template slot-scope="scope">
                          <el-input-number size="mini" :max="3" :min="1" v-model="scope.row.level" />
                        </template>
                      </el-table-column>
                      <el-table-column prop="icon" label="图例" width="80" align="center">
                        <template slot-scope="scope">
                          <i :class="scope.row.icon" style="font-size:18px;color:#606266" />
                        </template>
                      </el-table-column>
                      <el-table-column prop="voice" label="警报声" width="80" align="center">
                        <template slot-scope="scope">
                          <el-switch size="mini" v-model="scope.row.voice" />
                        </template>
                      </el-table-column>
                      <el-table-column prop="remarks" label="备注" align="center">
                        <template slot-scope="scope">
                          <el-input
                            type="textarea"
                            rows="3"
                            size="mini"
                            v-model="scope.row.remarks"
                          />
                        </template>
                      </el-table-column>
                    </el-table>
                  </template>
                </el-table-column>
                <el-table-column align="right" width="100">
                  <template slot="header" slot-scope="scope">
                    <el-button size="small" icon="el-icon-edit" type="success">保存</el-button>
                  </template>
                </el-table-column>
              </el-table>
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
      },
      alermSetup: [
        {
          type: "车辆监控",
          indeterminate: true,
          checkAll: true,
          list: [
            {
              id: 1,
              checked: true,
              alerm: "超速驾驶",
              level: 1,
              voice: false,
              icon: "ex-icon-copy",
              remarks: ""
            },
            {
              id: 2,
              checked: false,
              alerm: "疲劳驾驶",
              level: 1,
              voice: false,
              icon: "",
              remarks: ""
            }
          ],
          selected: true
        },
        {
          type: "驾驶行为",
          indeterminate: true,
          checkAll: true,
          list: [
            {
              id: 1,
              checked: true,
              alerm: "疲劳驾驶",
              level: 1,
              voice: false,
              icon: "ex-new-icon-fatigue",
              remarks: ""
            },
            {
              id: 2,
              checked: true,
              alerm: "接打电话",
              level: 1,
              voice: false,
              icon: "ex-new-icon-phone",
              remarks: ""
            },
            {
              id: 3,
              checked: true,
              alerm: "分神驾驶",
              level: 1,
              voice: false,
              icon: "ex-new-icon-eyes",
              remarks: ""
            },
            {
              id: 4,
              checked: true,
              alerm: "驾驶员变更",
              level: 1,
              voice: false,
              icon: "ex-new-icon-driver",
              remarks: ""
            },
            {
              id: 5,
              checked: true,
              alerm: "抽烟驾驶",
              level: 1,
              voice: false,
              icon: "ex-new-icon-smoke",
              remarks: ""
            },
            {
              id: 6,
              checked: true,
              alerm: "驾驶员异常",
              level: 1,
              voice: false,
              icon: "ex-new-icon-wheel",
              remarks: ""
            },
            {
              id: 7,
              checked: true,
              alerm: "车距过近",
              level: 1,
              voice: false,
              icon: "ex-new-icon-equipment",
              remarks: ""
            },
            {
              id: 8,
              checked: true,
              alerm: "前向碰撞",
              level: 1,
              voice: false,
              icon: "ex-new-icon-collision",
              remarks: ""
            },
            {
              id: 9,
              checked: true,
              alerm: "车道偏离",
              level: 1,
              voice: false,
              icon: "ex-new-icon-deviate",
              remarks: ""
            },
            {
              id: 10,
              checked: true,
              alerm: "行人碰撞报警",
              level: 1,
              voice: false,
              icon: "ex-new-icon-deviate",
              remarks: ""
            }
          ],
          selected: false
        },
        {
          type: "渣土运输违规",
          indeterminate: true,
          checkAll: true,
          list: [
            {
              id: 1,
              checked: true,
              alerm: "疲劳驾驶",
              level: 1,
              voice: false,
              icon: "",
              remarks: ""
            }
          ],
          selected: false
        },
        {
          type: "场站违规",
          indeterminate: true,
          checkAll: true,
          list: [
            {
              id: 1,
              checked: true,
              alerm: "疲劳驾驶",
              level: 1,
              voice: false,
              icon: "",
              remarks: ""
            }
          ],
          selected: false
        }
      ],
      alermModule: []
    };
  },
  mounted() {},
  methods: {
    handleMenu(e) {
      console.log(e);
      this.hideMenu = e;
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },

    handleSelection(e) {
      console.log(e);
      e.checkAll = !e.checkAll;
      e.indeterminate = false;
      let list = e.list;
      for (var i in list) {
        list[i].checked = e.checkAll;
      }
    },

    //合并行用的
    alermSetupMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 2) {
        return [1, 2];
      }
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
    background-color: #f3fdf3;
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

  .el-table {
    border: none !important;
    box-shadow: none !important;
    height: auto !important;

    th {
      background-color: #e7e8ee !important;
    }
    .cell {
      span.alerm {
        border-radius: 5px;
        padding: 4px 15px;
        &.yellowAlerm {
          color: #fff;
          background-color: #fc0;
        }
        &.redAlerm {
          color: #fff;
          background-color: #f30;
        }
      }

      ul {
        margin: 0;
        padding: 0;
        display: inline-block;
        list-style: none;
      }
      li {
        margin: 0;
        padding: 0;
        list-style: none;
        float: left;
      }
    }
  }
}
</style>
