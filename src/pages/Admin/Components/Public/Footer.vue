<template>
  <div class="ex-footer">
    <div class="ex-footer-user">
      <el-popover
        placement="top"
        title="常用快捷菜单"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        class="fl"
      >
        <el-button type="primary" slot="reference" icon="el-icon-user-solid" size="mini" circle></el-button>
      </el-popover>

      <span class="fl">超级管理员 - 城管委</span>

      <TabMenu :data="platTabMenu" />

      <span class="fr" style="margin-right:15px;">当前版本:{{ver}}</span>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import lib from "~/pages/Admin/common/lib/layout.lib";

export default {
  name: "Footer",
  data() {
    return {
      activeIndex: 0
    };
  },
  mounted() {
    let self = this;
    self.$nextTick(() => {
      let path = self.$route.path;
      self.pTabMenu = self.platTabMenu;
      for (var i in self.pTabMenu) {
        if (path == self.pTabMenu[i].url) {
          self.activeIndex = i;
        }
      }
    });
  },
  computed: {
    platTabMenu() {
      let path = this.$route.path;
      for (var i in self.pTabMenu) {
        if (path == self.pTabMenu[i].url) {
          self.activeIndex = i;
        }
      }
      return this.platformTabMenu;
    },
    ver() {
      return this.version;
    },
    ...mapState("platData", {
      platformTabMenu: state => state.platformTabMenu,
      //获取版本号
      version: state => state.version
    })
  }
};
</script>
<style lang="less">
.ex-tabmenu {
  width: 80%;
  float: left;
  margin-left: 15px;

  li {
    float: left;
    margin: 0 5px;
    padding: 0 15px;
    background-color: #f0f0f0;
    height: 28px;
    line-height: 28px;
    color: #585858;
    font-size: 13px;
    border-radius: 0 0 3px 3px;
    box-shadow: inset 0 3px 3px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    opacity: 0.85;

    button {
      margin-right: 0 !important;
      color: #909090;
    }

    &.active {
      color: #fff;
      background-color: #7e3ba5;
      box-shadow: 0 3px 3px rgba(0, 0, 0, 0.35);
      opacity: 1;
      button {
        margin-right: 0 !important;
        color: #fff;
      }
    }
  }
}
</style>
