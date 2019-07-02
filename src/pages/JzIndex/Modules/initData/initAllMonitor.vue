<template>
  <div class="module-base">
    <el-collapse v-model="activeNames" accordion>
      <!-- 1 -->
      <el-collapse-item name="1">
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
                {{item.unit}}
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-divider></el-divider>
      </el-collapse-item>
      <!--
      <el-collapse-item name="2">
        <template slot="title">
          <i class="el-icon-caret-right" />
          {{allmonitor.module.basedata.name}}{{allmonitor.module.basedata.data[1].name}}
          <sup
            style="margin-left:15px; color:#f30;"
          >
            (
            <i class="header-icon el-icon-info"></i>
            {{allmonitor.module.basedata.data[1].tip}} )
          </sup>
        </template>
        <el-form :inline="true" label-position="right"  size="mini">
          <ul>
            <li v-for="item ,index in allmonitor.module.basedata.data[1].list" :key="index">
              <el-form-item label="统计名称：">
                <el-input v-model="item.label"></el-input>
              </el-form-item>
              <el-form-item label="最大数量：">
                <el-input-number v-model="item.number"></el-input-number>
              </el-form-item>
              <el-form-item label="单位：">
                <el-radio-group v-model="item.unit">
                  <el-radio-button :label="i" v-for="i in platformUnit"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button
                  v-if="index == allmonitor.module.basedata.data[1].list.length -1 && index !=2"
                  type="success"
                  icon="el-icon-plus"
                  size="mini"
                  circle
                  @click="handlePlusBase"
                ></el-button>
                <el-button
                  v-if="index == allmonitor.module.basedata.data[1].list.length-1"
                  type="danger"
                  icon="el-icon-minus"
                  size="mini"
                  circle
                  @click="handleMinusBase"
                ></el-button>
              </el-form-item>
            </li>
          </ul>
          <el-divider></el-divider>
          <el-row style="margin: 10px;">
            <el-col :span="12">
              <el-form-item label="刷新时间：">
                <el-input-number
                  :min="1"
                  :max="1800"
                  v-model="allmonitor.module.basedata.timer"
                  style="width:150px;"
                ></el-input-number>
              </el-form-item>
              <el-form-item>
                (秒)
                <span style="font-size:12px; margin-left:15px;">最大1800秒(半小时)</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图表标题:">
                <el-input v-model="allmonitor.module.basedata.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      
      <el-collapse-item name="3">
        <template slot="title">
          <i class="el-icon-caret-right" />
          {{allmonitor.module.operatedata.name}} {{allmonitor.module.operatedata.data[0].name}}
          <sup
            style="margin-left:15px; color:#f30;"
          >
            (
            <i class="header-icon el-icon-info"></i>
            {{allmonitor.module.operatedata.data[0].tip}} )
          </sup>
        </template>
        <el-form :inline="true" label-position="right"  size="mini">
          <ul>
            <li v-for="item ,index in allmonitor.module.operatedata.data[0].list" :key="index">
              <el-form-item label="统计名称：">
                <el-input v-model="item.label"></el-input>
              </el-form-item>
              <el-form-item label="最大数量：">
                <el-input-number v-model="item.number"></el-input-number>
              </el-form-item>
              <el-form-item label="单位：">
                <el-radio-group v-model="item.unit" size="mini">
                  <el-radio-button :label="i" v-for="i in platformUnit"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="index == allmonitor.module.operatedata.data[0].list.length-1">
                <el-button
                  v-if="index == allmonitor.module.operatedata.data[0].list.length -1"
                  type="success"
                  icon="el-icon-plus"
                  circle
                  @click="handlePlusOperate"
                ></el-button>
                <el-button
                  v-if="index == allmonitor.module.operatedata.data[0].list.length-1 && allmonitor.module.operatedata.data[0].list.length !=1"
                  type="danger"
                  icon="el-icon-minus"
                  circle
                  @click="handleMinusOperate"
                ></el-button>
              </el-form-item>
            </li>
          </ul>
          <el-divider></el-divider>
          <el-row style="margin: 10px;">
            <el-col :span="12">
              <el-form-item label="刷新时间：">
                <el-input-number
                  :min="1"
                  :max="1800"
                  v-model="allmonitor.module.operatedata.data[0].timer"
                  style="width:150px;"
                ></el-input-number>
              </el-form-item>
              <el-form-item>
                (秒)
                <span style="font-size:12px; margin-left:15px;">最大1800秒(半小时)</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图表标题:">
                <el-input v-model="allmonitor.module.operatedata.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      <el-collapse-item name="4">
        <template slot="title">
          <i class="el-icon-caret-right" />
          {{allmonitor.module.operatedata.name}} {{allmonitor.module.operatedata.data[1].name}}
          <sup
            style="margin-left:15px; color:#f30;"
          >
            (
            <i class="header-icon el-icon-info"></i>
            {{allmonitor.module.operatedata.data[1].tip}} )
          </sup>
        </template>
        <el-form :inline="true" label-position="right"  size="mini">
          <ul>
            <li v-for="item ,index in allmonitor.module.operatedata.data[1].list" :key="index">
              <el-form-item label="统计名称：">
                <el-input v-model="item.label"></el-input>
              </el-form-item>
              <el-form-item label="最大数量：">
                <el-input-number v-model="item.number"></el-input-number>
              </el-form-item>
              <el-form-item label="单位：">
                <el-radio-group v-model="item.unit" size="mini">
                  <el-radio-button :label="i" v-for="i in platformUnit"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="index == allmonitor.module.operatedata.data[1].list.length-1">
                <el-button
                  v-if="index == allmonitor.module.operatedata.data[1].list.length -1 && index !=3"
                  type="success"
                  icon="el-icon-plus"
                  circle
                  @click="handlePlusOperate2"
                ></el-button>
                <el-button
                  v-if="index == allmonitor.module.operatedata.data[1].list.length-1 && allmonitor.module.operatedata.data[1].list.length !=1"
                  type="danger"
                  icon="el-icon-minus"
                  circle
                  @click="handleMinusOperate2"
                ></el-button>
              </el-form-item>
            </li>
          </ul>
          <el-divider></el-divider>
          <el-row style="margin: 10px;">
            <el-col :span="12">
              <el-form-item label="刷新时间：">
                <el-input-number
                  :min="1"
                  :max="1800"
                  v-model="allmonitor.module.operatedata.data[1].timer"
                  style="width:150px;"
                ></el-input-number>
              </el-form-item>
              <el-form-item>
                (秒)
                <span style="font-size:12px; margin-left:15px;">最大1800秒(半小时)</span>
              </el-form-item>
            </el-col>
            <el-col :span="12"></el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
      -->
      <!-- 5 -->
      <el-collapse-item name="5">
        <template slot="title">
          <i class="el-icon-caret-right" />
          {{allmonitor.module.producedata.name}}
          <sup
            style="margin-left:15px; color:#f30;"
          >
            (
            <i class="header-icon el-icon-info"></i>
            {{allmonitor.module.producedata.tip}} )
          </sup>
        </template>
        <el-form :inline="true" label-position="right" size="mini">
          <ul>
            <li v-for="item ,index in allmonitor.module.producedata.data" :key="index">
              <el-form-item label="统计名称：">
                <el-input v-model="item.label"></el-input>
              </el-form-item>
              <el-form-item label="最大数量：">
                <el-input-number v-model="item.number"></el-input-number>
              </el-form-item>
              <el-form-item label="单位：">
                <el-radio-group v-model="item.unit" size="mini">
                  <el-radio-button :label="i" v-for="i in platformUnit"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button
                  v-if="index == allmonitor.module.producedata.data.length -1 && index !=3"
                  type="success"
                  icon="el-icon-plus"
                  circle
                  @click="handlePlusBase"
                ></el-button>
                <el-button
                  v-if="index == allmonitor.module.producedata.data.length-1 && allmonitor.module.producedata.data.length !=1"
                  type="danger"
                  icon="el-icon-minus"
                  circle
                  @click="handleMinusBase"
                ></el-button>
              </el-form-item>
            </li>
          </ul>
          <el-divider></el-divider>
          <el-row style="margin: 10px;">
            <el-col :span="12">
              <el-form-item label="刷新时间：">
                <el-input-number
                  :min="1"
                  :max="1800"
                  v-model="allmonitor.module.producedata.timer"
                  style="width:150px;"
                ></el-input-number>
              </el-form-item>
              <el-form-item>
                (秒)
                <span style="font-size:12px; margin-left:15px;">最大1800秒(半小时)</span>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图表标题:">
                <el-input v-model="allmonitor.module.producedata.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return { activeNames: "1" };
  },
  methods: {
    handlePlusBase() {
      let lastData = this.allmonitor.module.basedata.data[1].list;
      let temp = {
        label: "",
        unit: "辆",
        number: ""
      };

      if (lastData.length >= 3) {
        return false;
      }
      lastData.push(temp);
      this.allmonitor.module.basedata.data[1].list = lastData;
    },
    handleMinusBase() {
      let lastData = this.allmonitor.module.basedata.data[1].list;
      let temp = [
        {
          label: "",
          unit: "辆",
          number: ""
        }
      ];
      if (lastData.length == 1) {
        this.allmonitor.module.basedata.data[1].list = temp;
        return false;
      }
      lastData.splice(lastData.length - 1, 1);
      this.allmonitor.module.basedata.data[1].list = lastData;
    },
    handlePlusOperate() {
      let lastData = this.allmonitor.module.operatedata.data[0].list;
      let temp = {
        label: "",
        unit: "辆",
        number: ""
      };

      lastData.push(temp);
      this.allmonitor.module.operatedata.data[0].list = lastData;
    },
    handleMinusOperate() {
      let lastData = this.allmonitor.module.operatedata.data[0].list;
      let temp = {
        label: "",
        unit: "辆",
        number: ""
      };

      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(lastData.length - 1, 1);
      this.allmonitor.module.operatedata.data[0].list = lastData;
    },
    handlePlusOperate2() {
      let lastData = this.allmonitor.module.operatedata.data[1].list;
      let temp = {
        label: "",
        unit: "辆",
        number: ""
      };

      if (lastData.length >= 4) {
        return false;
      }
      lastData.push(temp);
      this.allmonitor.module.operatedata.data[1].list = lastData;
    },
    handleMinusOperate2() {
      let lastData = this.allmonitor.module.operatedata.data[1].list;
      let temp = {
        label: "",
        unit: "辆",
        number: ""
      };

      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(lastData.length - 1, 1);
      this.allmonitor.module.operatedata.data[1].list = lastData;
    }
  },
  computed: {
    allmonitor() {
      return this.$store.state.platformData.module.allmonitor;
    },
    platformUnit() {
      return this.$store.state.platformUnit;
    },
    basedata() {
      return this.$store.state.platformData.basedata;
    }
  }
};
</script>
<style lang="less">
.module-base {
  ul {
    margin: 10px;

    li {
      margin-bottom: 5px;
    }
  }
}

.el-collapse-item__content {
  padding-bottom: 0 !important;
}
.el-divider--horizontal {
  margin: 12px 0 !important;
}
.el-dialog__body {
  overflow: auto;
  max-height: 600px;
}

.el-collapse-item .el-collapse-item__header {
  background: #e2e6ec;
  padding: 0 15px;
}
.el-collapse-item.is-active .el-collapse-item__header,
.el-collapse-item:hover .el-collapse-item__header {
  background: #f5f7fa;
}
</style>