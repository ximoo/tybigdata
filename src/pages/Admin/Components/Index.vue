<template>
  <div class="ex-pages">
    <el-row :gutter="20" style="margin:20px;">
      <el-col :span="24">
        <el-card class="box-card">
          欢迎使用<span v-if="showCity">{{platformCity}}</span>{{platformName}} | 管理设置
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Index",
  mounted() {
    let self = this;
    self.$nextTick(() => {
      if (!localStorage.$platAdminNav)
        localStorage.$platAdminNav = JSON.stringify(self.platformAdminNav);
    });
  },
  computed: {
    ...mapState({
      platformName: state => state.platData.platformName, //平台名称
      platformCity: state => state.platData.platformCity, //定位城市
      showCity: state => state.platData.showCity, //是否显示城市名称
      platformAdminNav: state => state.platData.platformAdminNav //后台管理菜单
    })
  }
};
</script>