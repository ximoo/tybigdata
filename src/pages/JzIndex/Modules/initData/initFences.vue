<template>
  <div>
    <blockquote style="margin-bottom:20px;">
      <p>
        因为无法自动生成围栏，所以还需要借助外部工具查找经纬度进行手动添加围栏。
        <el-link
          href="http://www.gpsspg.com/maps.htm"
          icon="el-icon-map-location"
          type="primary"
          target="_blank"
        >经纬度查询工具</el-link>
      </p>
      <br />
      <p>
        <strong>使用方法：</strong>
        <el-link
          icon="el-icon-map-location"
          href="http://www.gpsspg.com/maps.htm"
          target="_blank"
        >工具页面</el-link>左侧选择 “腾讯地图/高德地图”,在搜索框中输入演示城市，并在地图中使用点工具按目标围栏端点进行描绘。在弹出的信息窗中复制高德经纬度。点与点之间的经纬度请用“|”隔开。
      </p>
    </blockquote>

    <el-tabs tab-position="left">
      <el-tab-pane label="工地围栏">
        <el-form size="mini">
          <div v-for="item , index in fences.site.data" :key="index">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="工地围栏名称：">
                  <el-input placeholder="请输入工地围栏名称" v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="工地围栏路径：">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="item.path"
                    placeholder="请输入围栏经纬度，以'|'进行分隔'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="padding-top: 45px;">
                <el-form-item>
                  <el-button
                    v-if="index == fences.site.data.length -1 && index !=5"
                    type="success"
                    icon="el-icon-plus"
                    circle
                    @click="handlePlusSite"
                  ></el-button>
                  <el-button
                    v-if="index == fences.site.data.length-1 && fences.site.data.length !=1"
                    type="danger"
                    icon="el-icon-minus"
                    circle
                    @click="handleMinusSite"
                  ></el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="消纳点围栏">
        <el-form size="mini">
          <div v-for="item , index in fences.landfill.data" :key="index">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-form-item label="消纳点围栏名称：">
                  <el-input placeholder="请输入消纳点围栏名称" v-model="item.name"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="16">
                <el-form-item label="消纳点围栏路径：">
                  <el-input
                    type="textarea"
                    :rows="4"
                    v-model="item.path"
                    placeholder="请输入围栏经纬度，以'|'进行分隔'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3" style="padding-top: 45px;">
                <el-form-item>
                  <el-button
                    v-if="index == fences.landfill.data.length -1 && index !=5"
                    type="success"
                    icon="el-icon-plus"
                    circle
                    @click="handlePlusLandfill"
                  ></el-button>
                  <el-button
                    v-if="index == fences.landfill.data.length-1 && fences.landfill.data.length !=1"
                    type="danger"
                    icon="el-icon-minus"
                    circle
                    @click="handleMinusLandfill"
                  ></el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-divider></el-divider>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "initFences",
  computed: {
    fences() {
      return this.$store.state.platformData.fences;
    }
  },
  methods: {
    handlePlusSite() {
      let lastData = this.fences.site.data;
      let temp = {
        name: "",
        path: ""
      };
      lastData.push(temp);
      this.fences.site.data = lastData;
    },
    handleMinusSite() {
      let lastData = this.fences.site.data;
      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(lastData.length - 1, 1);
      this.fences.site.data = lastData;
    },
    handlePlusLandfill() {
      let lastData = this.fences.landfill.data;
      let temp = {
        name: "",
        path: ""
      };
      lastData.push(temp);
      this.fences.landfill.data = lastData;
    },
    handleMinusLandfill() {
      let lastData = this.fences.landfill.data;
      if (lastData.length == 1) {
        return false;
      }
      lastData.splice(lastData.length - 1, 1);
      this.fences.landfill.data = lastData;
    }
  }
};
</script>

