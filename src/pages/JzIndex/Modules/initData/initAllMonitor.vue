<template>
  <div class="module-base">
    <el-form :inline="true" size="mini">
      <el-collapse v-model="activeName" accordion>
        <!-- 1 -->
        <el-collapse-item name="1">
          <template slot="title">
            {{allmonitor.module.basedata.name}}
            <sup style="margin-left:15px; color:#f30;">
              (
              <i class="header-icon el-icon-info"></i>
              {{allmonitor.module.basedata.tip}} )
            </sup>
          </template>
          <ul>
            <li v-for="item ,index in allmonitor.module.basedata.data" :key="index">
              <el-form-item label="统计名称：">
                <el-input v-model="item.label"></el-input>
              </el-form-item>
              <el-form-item label="数量：">
                <el-input-number v-model="item.number"></el-input-number>
              </el-form-item>
              <el-form-item label="单位：">
                <el-radio-group v-model="item.unit" size="mini">
                  <el-radio-button label="人"></el-radio-button>
                  <el-radio-button label="辆"></el-radio-button>
                  <el-radio-button label="个"></el-radio-button>
                  <el-radio-button label="次"></el-radio-button>
                  <el-radio-button label="立方"></el-radio-button>
                  <el-radio-button label="小时"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button
                  v-if="index == allmonitor.module.basedata.data.length -1 && index !=5"
                  type="success"
                  icon="el-icon-plus"
                  circle
                  @click="handlePlusBase"
                ></el-button>
                <el-button
                  v-if="index == allmonitor.module.basedata.data.length-1 && allmonitor.module.basedata.data.length !=1"
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
        </el-collapse-item>

        <!-- 2 -->
        <el-collapse-item name="2">
          <template slot="title">
            {{allmonitor.module.operatedata.name}}
            <sup style="margin-left:15px; color:#f30;">
              (
              <i class="header-icon el-icon-info"></i>
              {{allmonitor.module.operatedata.tip}} )
            </sup>
          </template>
          <ul>
            <li v-for="item ,index in allmonitor.module.operatedata.data" :key="index">
              <el-form-item label="统计名称：">
                <el-input v-model="item.label"></el-input>
              </el-form-item>
              <el-form-item label="数量：">
                <el-input v-model="item.number"></el-input>
              </el-form-item>
              <el-form-item label="单位">
                <el-radio-group v-model="item.unit" size="mini">
                  <el-radio-button label="人"></el-radio-button>
                  <el-radio-button label="辆"></el-radio-button>
                  <el-radio-button label="个"></el-radio-button>
                  <el-radio-button label="次"></el-radio-button>
                  <el-radio-button label="立方"></el-radio-button>
                  <el-radio-button label="小时"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="index == allmonitor.module.operatedata.data.length-1">
                <el-button type="success" icon="el-icon-plus" circle @click="handlePlusOperate"></el-button>
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
                  v-model="allmonitor.module.operatedata.timer"
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
        </el-collapse-item>
        <!-- 3 -->
        <el-collapse-item name="3">
          <template slot="title">
            {{allmonitor.module.operatedata2.name}}
            <sup style="margin-left:15px; color:#f30;">
              (
              <i class="header-icon el-icon-info"></i>
              {{allmonitor.module.operatedata2.tip}} )
            </sup>
          </template>
          <ul>
            <li v-for="item ,index in allmonitor.module.operatedata2.data" :key="index">
              <el-form-item label="统计名称：">
                <el-input v-model="item.label"></el-input>
              </el-form-item>
              <el-form-item label="数量：">
                <el-input v-model="item.number"></el-input>
              </el-form-item>
              <el-form-item label="单位">
                <el-radio-group v-model="item.unit" size="mini">
                  <el-radio-button label="人"></el-radio-button>
                  <el-radio-button label="辆"></el-radio-button>
                  <el-radio-button label="个"></el-radio-button>
                  <el-radio-button label="次"></el-radio-button>
                  <el-radio-button label="立方"></el-radio-button>
                  <el-radio-button label="小时"></el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="index == allmonitor.module.operatedata2.data.length-1">
                <el-button type="success" icon="el-icon-plus" circle @click="handlePlusOperate2"></el-button>
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
                  v-model="allmonitor.module.operatedata2.timer"
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
                <el-input v-model="allmonitor.module.operatedata2.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1"
    };
  },
  methods: {
    handlePlusBase() {
      let lastData = this.allmonitor.module.basedata.data;
      let temp = {
        label: "",
        unit: "辆",
        number: ""
      };

      if (lastData.length >= 6) {
        return false;
      }
      lastData.push(temp);
      this.allmonitor.module.basedata.data = lastData;
    },
    handleMinusBase() {
      let lastData = this.allmonitor.module.basedata.data;
      let temp = {
        label: "",
        unit: "辆",
        number: ""
      };

      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(lastData.length - 1, 1);
      this.allmonitor.module.basedata.data = lastData;
    },
    handlePlusOperate() {
      let lastData = this.allmonitor.module.operatedata.data;
      let temp = {
        label: "",
        unit: "",
        number: ""
      };

      lastData.push(temp);
      this.allmonitor.module.operatedata.data = lastData;
    },
    handlePlusOperate2() {
      let lastData = this.allmonitor.module.operatedata2.data;
      let temp = {
        label: "",
        unit: "辆",
        number: ""
      };

      if (lastData.length >= 4) {
        return false;
      }
      lastData.push(temp);
      this.allmonitor.module.operatedata2.data = lastData;
    }
  },
  computed: {
    allmonitor() {
      return this.$store.state.platformData.module.allmonitor;
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

.el-form--inline .el-form-item {
  margin-bottom: 0 !important;
}

.el-collapse-item__content {
  padding-bottom: 0 !important;
}
.el-divider--horizontal {
  margin: 12px 0 !important;
}
</style>

