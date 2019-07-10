<template>
  <div class="module-base">
    <blockquote>
      <span
        style="float:left;margin-right:15px;line-height:32px;"
      >欢迎，这是您第一次使用本演示系统，现在需要您对平台填写一些初始化数据，或者按照配置模板导入配置文件。</span>
      <el-upload
        ref="upload"
        action="###"
        accept="application/json, text/json, .json"
        :on-change="beforeFileUpload"
        :auto-upload="false"
        :show-file-list="false"
        size="mini"
        v-show="noIpt"
      >
        <el-button type="success" size="mini" v-show="!isFile">导入已有配置</el-button>
      </el-upload>
      <el-button type="success" v-show="isFile" size="mini" @click="importCfg">开始导入</el-button>
      <p style="clear:both;font-weight:bold;">目前没时间做表单验证，请尽量将所有空填完，不然会出现问题。后期迭代会做验证更新</p>
    </blockquote>
    <el-collapse v-model="activeNames">
      <!-- 1 -->
      <el-collapse-item name="1">
        <template slot="title">
          <i class="el-icon-caret-right" />
          平台设置：
          <sup style="margin-left:15px; color:#f30;">
            (
            <i class="header-icon el-icon-info"></i>
            演示平台名称、演示城市等相关平台属性的配置 )
          </sup>
        </template>
        <el-divider></el-divider>
        <el-form
          :inline="true"
          size="mini"
          label-position="right"
          label-width="150px"
          :model="pState"
        >
          <el-row :gutter="20">
            <el-col :span="8">
              <el-form-item label="平台名称：">
                <el-input v-model="pState.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="城市名称：">
                <el-input v-model="pState.city" style="width:120px;"></el-input>
                <el-button
                  type="primary"
                  size="mini"
                  icon="el-icon-location"
                  plain
                  @click="getCity"
                ></el-button>
              </el-form-item>
            </el-col>
            <el-col :span="8"></el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <!-- 2 -->
      <el-collapse-item name="2">
        <template slot="title">
          <i class="el-icon-caret-right" />
          {{basedata.name}}
          <sup style="margin-left:15px; color:#f30;">
            (
            <i class="header-icon el-icon-info"></i>
            {{basedata.tip}} )
          </sup>
        </template>
        <el-form :inline="true" label-position="right" label-width="150px" size="mini">
          <el-row style="margin-top:15px;" :gutter="20">
            <el-col :span="8" v-for="item ,index in basedata.data" :key="index">
              <el-form-item :label="item.label + '：'">
                <el-input-number v-model="item.number"></el-input-number>
                &nbsp;&nbsp;{{item.unit}}
                <!-- <el-checkbox v-model="item.required" style="margin-left:10px;"></el-checkbox> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <!-- 3 -->
      <el-collapse-item name="3">
        <template slot="title">
          <i class="el-icon-caret-right" />
          模块选择：
          <sup style="margin-left:15px; color:#f30;">
            (
            <i class="header-icon el-icon-info"></i>
            演示平台展示模块选择，目前演示系统适用于固废利用、智慧渣土等相关场景，后续会逐渐更新新的模块以适应不同特种车联网场景。)
          </sup>
        </template>
        <el-row :gutter="20">
          <el-form :inline="true" size="mini" label-width="120px">
            <el-col :span="6">
              <el-form-item label="全局监管">
                <el-switch v-model="pModule.allmonitor.enable" disabled></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="环境监测">
                <el-switch v-model="pModule.airmonitor.enable" disabled></el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="场站管理">
                <el-switch v-model="pModule.sitemonitor.enable"></el-switch>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </el-collapse-item>

      <!-- 4 -->
      <el-collapse-item name="4">
        <template slot="title">
          <i class="el-icon-caret-right" />
          {{alerms.name}}
          <sup style="margin-left:15px; color:#f30;">
            (
            <i class="header-icon el-icon-info"></i>请选择演示平台展示的车辆报警类型)
          </sup>
        </template>
        <div style="margin:20px;">
          <el-form :inline="true" size="mini">
            <el-form-item>
              <el-checkbox
                v-model="item.enable"
                v-for="item , index in alerms.list"
                :key="index"
              >{{item.label}}</el-checkbox>
            </el-form-item>

            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="单次报警最大车辆数">
                  <el-input-number v-model="alerms.number"></el-input-number>
                  &nbsp;&nbsp;辆
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="实时报警刷新时间">
                  <el-input-number v-model="alerms.timer"></el-input-number>
                  &nbsp;&nbsp;秒
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  name: "initBaseData",
  data() {
    return {
      activeNames: ["1", "2", "3", "4"],
      isFile: false,
      noIpt: true
    };
  },

  methods: {
    // 定位城市
    getCity() {
      this.$store.commit("getCity");
    },
    importCfg(file) {
      console.log("iptCfg");
      //   service.importCfg(this.cfgFile, this);
    },
    beforeFileUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.cfgFile = file;
      this.isFile = true;
    }
  },
  computed: {
    alerms() {
      return this.$store.state.platformData.alerms;
    },
    pState() {
      return this.$store.state.platformData.state;
    },
    pModule() {
      return this.$store.state.platformData.module;
    },
    basedata() {
      return this.$store.state.platformData.basedata;
    }
  }
};
</script>
