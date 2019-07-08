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
    <el-collapse v-model="activeNames">
      
    </el-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeNames: "1"
    };
  },
  computed: {
    alerms() {
      return this.$store.state.platformData.alerms;
    },
    AlermCheck() {
      let check = [];
      let srcAlerms = this.alerms.list;
      for (var i in srcAlerms) {
        if (srcAlerms[i].enable) check.push(true);
        else check.push(false);
      }
      return check;
    }
  }
};
</script>
