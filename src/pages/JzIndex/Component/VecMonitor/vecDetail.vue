<template>
  <reDialog
    v-dialogDrag
    :title="vecInfo.data.name + '的详情'"
    :visible="vecInfo.show"
    :modal="false"
    :modal-append-to-body="true"
    :append-to-body="true"
    width="700px"
    class="group-tree-dialog"
    @close="closeDialog"
  >
    <div class="vec-info-box" style="width:auto;padding:5px 10px;">
      <el-tabs>
        <el-tab-pane label="实时状态">
          <el-image
            src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563511649427&di=d198f151dc9e42efe44d4d316c6ceeb5&imgtype=0&src=http%3A%2F%2Fimg1.kcimg.cn%2Fdealerimg%2Fnews%2F2017%2F10%2F08%2F1d2eb917bb904e28b23d338da4d9f617.jpg_600xx.jpg"
            class="vec-info-img"
            style="width:280px;height:196px;"
          />
          <ul class="vec-info-intro">
            <li>
              状态:
              <span v-if="vecInfo.data.state == 1">行驶</span>
              <span v-if="vecInfo.data.state == 2">停车</span>
              <span v-if="vecInfo.data.state == 3">熄火</span>
              <span v-if="vecInfo.data.state == 4">定位失败</span>
              <span v-if="vecInfo.data.state == 5">通讯中断</span>
            </li>
            <li>速度: {{vecInfo.data.speed}} km/h</li>
            <li>载重: {{vecInfo.data.weight}} 吨</li>
            <li>里程: {{vecInfo.data.mileage}} km</li>
            <li>
              <i class="el-icon-time"></i>
              最后定位时间: {{nowTime}}
            </li>
            <li>
              <i class="el-icon-map-location"></i>
              最后定位位置: {{vecInfo.data.address}}
            </li>
          </ul>
          <h4 style="clear:both;">实时状态：</h4>
          <ul class="vec-info-state">
            <li
              v-for="item in stateData"
              :style="{'background-color': item.state==0? '#ff3300': '#5daf34'}"
            >
              <i :class="item.icon" />
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="运输过程">
          <el-table :data="TrailTable" style="width: 100%">
            <el-table-column prop="id" align="center" label="趟次"></el-table-column>
            <el-table-column prop="site" label="出土工地"></el-table-column>
            <el-table-column prop="site_date" align="center" width="160" label="出土时间"></el-table-column>
            <el-table-column prop="landfill" label="消纳地点"></el-table-column>
            <el-table-column prop="landfill_date" align="center" width="160" label="消纳时间"></el-table-column>
            <el-table-column width="80" align="center" label="操作">
              <template slot-scope="scope">
                <el-button @click="showHisTrail" type="primary" plain size="mini">轨迹</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="车辆报警">
          <el-table :data="AlermTable" style="width: 100%">
            <el-table-column prop="id" align="center" label="报警次数"></el-table-column>
            <el-table-column prop="type" align="center" label="报警类型"></el-table-column>
            <el-table-column prop="date" align="center" width="160" label="报警时间"></el-table-column>
            <el-table-column width="80" align="center" label="操作">
              <template slot-scope="scope">
                <el-button @click="showPostCard" type="primary" plain size="mini">处理</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="车辆详情"></el-tab-pane>
        <el-tab-pane label="企业信息"></el-tab-pane>
        <el-tab-pane label="审批路线"></el-tab-pane>
      </el-tabs>
    </div>

    <reDialog
      v-dialogDrag
      :title="vecInfo.data.name + '的处理'"
      :visible="postCardList.show"
      :modal="false"
      :modal-append-to-body="false"
      :append-to-body="true"
      width="440px"
      class="group-tree-dialog"
      @close="closeAlermDialog"
    >
      <el-form ref="form" :model="formModel" label-width="80px" class="case-post-form">
        <el-form-item label="* 收件人:">
          <el-select v-model="postMan.select" size="mini" placeholder="请选择收件人">
            <el-option
              v-for="item in postMan.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送内容:">
          <el-input type="textarea" :rows="2" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="small" @click="tipOK">发 送</el-button>
        </el-form-item>
      </el-form>
    </reDialog>
  </reDialog>
</template>
<script>
import Util from "../../Configs/util.lib";
import randomIze from "../../Configs/service.lib";
let randomName = require("chinese-random-name");

let stateId;
export default {
  name: "vecDetail",
  props: ["vecInfo"],
  components: {},
  data() {
    return {
      nowTime: Util.getNow(),
      stateData: [],
      TrailTable: [],
      AlermTable: [
        {
          id: 1,
          type: "超速报警",
          date: "2019-07-24  14:30:29"
        }
      ],
      postCardList: {
        title: "超速驾驶",
        icon: "ivu-icon-logo-dropbox",
        show: false
      },
      postMan: {
        select: null,
        options: [{ label: "" }]
      },
      formModel: null
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(() => {
      self.simState();
      self.simTrail();
    });
  },
  methods: {
    simState() {
      let self = this;
      let stateData = [
        {
          icon: "ex-icon-icon-car-acc",
          state: 1
        },
        {
          icon: "ex-icon-icon-car-big-light",
          state: 1
        },
        {
          icon: "ex-icon-icon-car-small-light",
          state: 1
        },
        {
          icon: "ex-icon-icon-car-left-turn",
          state: 1
        },
        {
          icon: "ex-icon-icon-car-right-turn",
          state: 1
        },
        {
          icon: "ex-icon-icon-car-anode",
          state: 1
        },
        {
          icon: "ex-icon-icon-car-cathode",
          state: 1
        },
        {
          icon: "ex-icon-icon-car-stop",
          state: 1
        },

        {
          icon: "ex-icon-icon-car-stop-oil",
          state: 1
        }
      ];
      let truckData = [
        {
          icon: "ex-icon-icon-car-speed",
          state: randomIze.randomLib(0, 1)
        },
        {
          icon: "ex-icon-icon-car-weight",
          state: randomIze.randomLib(0, 1)
        },
        {
          icon: "ex-icon-icon-car-door-switch",
          state: randomIze.randomLib(0, 1)
        }
      ];
      let stateLength = stateData.length;
      function nowState() {
        let randomState = randomIze.randomLib(0, stateLength);
        let tempState = [];
        for (var i = 0; i <= randomState; i++) {
          tempState.push(stateData[i]);
        }
        self.stateData = tempState.concat([
          {
            icon: "ex-icon-icon-car-speed",
            state: randomIze.randomLib(0, 1)
          },
          {
            icon: "ex-icon-icon-car-weight",
            state: randomIze.randomLib(0, 1)
          },
          {
            icon: "ex-icon-icon-car-door-switch",
            state: randomIze.randomLib(0, 1)
          }
        ]);
      }
      nowState();
      stateId = setInterval(() => {
        nowState();
      }, 30000);
    },

    simTrail() {
      let self = this;
      let tableSize = randomIze.randomLib(1, 10);
      let nowDate = new Date().getTime();

      let tableData = [];
      console.log(self.fences);
      let siteName = self.fences.site[0].name;
      let landfillName = self.fences.landfill[0].name;
      let centerTime = nowDate;

      for (var i = 0; i < tableSize; i++) {
        let deleteTimer = randomIze.randomLib(1800000, 3600000);
        centerTime = centerTime - deleteTimer;
        tableData.push({
          id: tableSize - i,
          site: siteName,
          site_date: Util.getNow(centerTime - deleteTimer),
          landfill: landfillName,
          landfill_date: Util.getNow(centerTime)
        });
      }

      self.TrailTable = tableData.reverse();
    },

    showHisTrail() {
      this.$emit("showHisTrail", true);
    },

    closeDialog() {
      this.$emit("vecDetailClose", false);
    },

    showPostCard() {
      let Generates = [];

      for (var i = 1; i <= 20; i++) {
        let label = randomName.generate();
        Generates.push({
          label: label,
          value: i
        });
      }

      this.postMan.options = Generates;
      this.postCardList.show = true;
    },

    closeAlermDialog() {
      this.postCardList.show = false;
    },

    tipOK() {
      console.log("tipOK");
      this.postCardList.show = false;
      this.$message({
        message: "消息发送成功！",
        type: "success"
      });
    }
  },
  computed: {
    fences() {
      return this.$store.state.platformData.module.sitemonitor.module.fences;
    }
  }
};
</script>
<style lang="less">
</style>