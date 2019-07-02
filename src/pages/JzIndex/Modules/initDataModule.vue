<template>
  <div class="ex-init">
    <el-dialog
      :visible.sync="showModal"
      width="60%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      top="35px"
      :show-close="false"
    >
      <span slot="title">
        <el-steps :active="initStep" finish-status="success" align-center simple>
          <el-step
            :title="item.label"
            :icon="item.icon"
            v-for="item,index in dialogTitle"
            :key="index"
          ></el-step>
        </el-steps>
      </span>

      <!-- 第一步 -->
      <section v-if="initStep == 0">
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
        <el-divider></el-divider>
        <h3>基础配置</h3>
        <el-form :inline="true" size="mini"  label-position="right"  label-width="150px" :model="pState">
          <el-form-item label="平台名称：">
            <el-input v-model="pState.name"></el-input>
          </el-form-item>
          <el-form-item label="城市名称：">
            <el-input v-model="pState.city" style="width:150px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-location"
              plain
              @click="getCity"
            >定位城市</el-button>
          </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <h3>模块选择</h3>
        <el-form :inline="true" size="mini" label-width="120px">
          <el-form-item label="全局监管">
            <el-switch v-model="pModule.allmonitor.enable" disabled></el-switch>
          </el-form-item>
          <el-form-item label="环境监测">
            <el-switch v-model="pModule.airmonitor.enable" disabled></el-switch>
          </el-form-item>
          <!-- <el-form-item label="工地监控">
            <el-switch v-model="pModule.sitemonitor.enable"></el-switch>
          </el-form-item>-->
        </el-form>
      </section>

      <!-- 第二步 -->
      <section v-if="initStep == 1">
        <el-tabs type="border-card">
          <el-tab-pane label="全局监管">
            <initAllMonitor />
          </el-tab-pane>
          <el-tab-pane label="围栏设置">
            <initFences />
          </el-tab-pane>
          <el-tab-pane label="环境监测" v-if="pModule.airmonitor.enable">
            <initAirMonitor />
          </el-tab-pane>
          <el-tab-pane label="工地监控" v-if="pModule.sitemonitor.enable">
            <initAirMonitor />
          </el-tab-pane>
        </el-tabs>
      </section>
      <span slot="footer" class="dialog-footer">
        <span class="ex-ver" style="float:left">当前版本：{{ver}}</span>

        <section v-if="initStep == 0">
          <!--    @click="submitUpload" -->
          <el-button type="primary" @click="handleStep(1)">下一步</el-button>
        </section>
        <section v-if="initStep == 1">
          <el-button type="default" @click="handleStep(0)">上一步</el-button>
          <el-button type="primary" @click="handleStep(2)">下一步</el-button>
        </section>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import service from "./initdatamodule.service";
import store from "../Configs/store";

import initAllMonitor from "./initData/initAllMonitor.vue";
import initAirMonitor from "./initData/initAirMonitor.vue";
import initFences from "./initData/initFences.vue";
export default {
  name: "initDataModule",
  components: { initAllMonitor, initAirMonitor, initFences },
  data() {
    return {
      showModal: true,
      dialogTitle: [
        { label: "数据初始化", icon: "el-icon-s-management" },
        { label: "模块配置", icon: "el-icon-s-help" },
        { label: "模拟数据生成", icon: "el-icon-s-open" },
        { label: "完成初始配置", icon: "el-icon-s-claim" }
      ],
      dialogWidth: "40%",
      initStep: 0,
      isFile: false,
      noIpt: true
    };
  },
  mounted() {
    this.$nextTick(function() {
      //   this.handleStep(0);
      //   this.getCity();
    });
  },
  methods: {
    //定位城市
    getCity() {
      service.getCity(this);
    },

    handleModulesEdit() {},

    handleStep(initStep) {
      console.log("step:" + initStep);
      service.initStep(initStep, this);
    },
    importCfg(file) {
      console.log("iptCfg");
      service.importCfg(this.cfgFile, this);
    },
    beforeFileUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      this.cfgFile = file;
      this.isFile = true;
    },
    airModule() {
      this.$router.push("/air");
    },
    siteModule() {
      this.$router.push("/site");
    }
  },
  computed: {
    initPlartform() {
      return store.state.initPlartform;
    },
    pState() {
      return store.state.platformData.state;
    },
    pModule() {
      return store.state.platformData.module;
    },
    platformUnit() {
      let unitTemp = store.state.platformUnit;
      unitTemp = unitTemp.join("|");
      return unitTemp;
    },
    ver() {
      return store.state.version;
    }
  }
};
</script>


<style lang="less">
.ex-init {
  line-height: 1.5;
  .el-button--mini.is-circle {
    padding: 3px !important;
  }
  blockquote {
    padding: 10px;
    background-color: #fffdb7;
  }
  h3 {
    line-height: 42px;
  }
  .ex-ver {
    font-size: 12px;
  }
}
</style>