<template>
  <div class="ex-pages-bigdata">
    <div v-if="!isFirst">
      <Tile/>
      <fullScreen/>
      <div class="ex-screen" style="left:40px">
        <div class="ex-message" v-show="Button">
          <el-tooltip content="环境监管" placement="bottom">
            <i class="el-icon-coin" @click="airModule"/>
          </el-tooltip>
          <el-tooltip content="工地监管" placement="bottom">
            <i class="el-icon-office-building" @click="siteModule"/>
          </el-tooltip>
        </div>
      </div>
      <router-view/>
    </div>
    <div v-else class="ex-init">
      <el-dialog
        :title="diagTitle"
        :visible.sync="initPlartform"
        width="30%"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :show-close="false"
      >
        <!-- 第一步 -->
        <section v-if="step == 0">
          <el-form :inline="true" label-width="120px" :model="platformState">
            <el-form-item label="平台名称：">
              <el-input size="small" v-model="platformState.platformName"></el-input>
            </el-form-item>
            <el-form-item label="城市名称：">
              <el-input size="small" v-model="platformState.city"></el-input>
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

          <blockquote>
            <p>欢迎，这是您第一次使用本演示系统，开始初始化平台数据。</p>
            <p>或者按照模板导入配置文件</p>
            <p style="text-align:center; margin-top:15px;">
              <el-upload
                ref="upload"
                action="###"
                accept="application/json, text/json, .json"
                :on-change="beforeFileUpload"
                :auto-upload="false"
                :show-file-list="false"
                v-show="!noIpt"
                size="mini"
              >
                <el-button type="warning" size="mini" v-show="!isFile">导入已有配置</el-button>
              </el-upload>
              <el-button type="success" size="mini" v-show="isFile" @click="importCfg">开始导入</el-button>
            </p>
          </blockquote>
        </section>
        <!-- 第二步 -->
        <section v-if="step == 1">
          <el-form :inline="true" label-width="80px">
            <el-form-item label="全局监管">
              <el-switch v-model="platformState.module.OverAll" disabled></el-switch>
            </el-form-item>
            <el-form-item label="环境监测">
              <el-switch v-model="platformState.module.airMonitor"></el-switch>
            </el-form-item>
          </el-form>
          <blockquote>
            <p>请选择您想展示的模块</p>
          </blockquote>
        </section>
        <span slot="footer" class="dialog-footer">
          <section v-if="step == 0">
            <!--    @click="submitUpload" -->
            <el-button type="primary" @click="handleStep(1)">下一步</el-button>
          </section>
          <section v-if="step == 1">
            <el-button type="default" @click="handleStep(0)">上一步</el-button>
            <el-button type="primary" @click="handleStep(2)">下一步</el-button>
          </section>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Tile from "../Component/Tile.vue";
import service from "./jhome.service";

export default {
  name: "jHome",
  components: {
    Tile
  },
  data() {
    return {
      isFirst: true,
      initPlartform: false,
      isFile: false,
      cfgFile: null,
      noIpt: false,
      diagTitle: "",
      step: 0,
      platformState: {
        platformName: "",
        city: "",
        adcode: "",
        module: {
          OverAll: true,
          airMonitor: true
        }
      },
      Button: false
    };
  },
  mounted() {
    this.$nextTick(function() {
      this.isFirst = service.isFirst(this);
      this.handleStep(0);
      this.getCity();
      this.initPlartform = this.isFirst;
    });
  },
  methods: {
    //定位城市
    getCity() {
      service.getCity(this);
    },

    handleStep(step) {
      console.log("step:"+step);
      service.initStep(step, this);
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
  }
};
</script>

<style lang="less">
.ex-init {
  line-height: 1.5;

  blockquote {
    padding: 10px;
    background-color: #fffdb7;
    margin-bottom: 15px;
  }
  h3 {
    line-height: 42px;
  }
}
</style>
