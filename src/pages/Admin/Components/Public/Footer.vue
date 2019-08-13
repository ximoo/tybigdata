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
      <ul class="ex-tabmenu">
        <li v-for="item,index in platTabMenu" :key="index">{{item.meta.title}}</li>
      </ul>

      <span class="fr" style="margin-right:15px;">当前版本:{{ver}}</span>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  name: "Footer",

  computed: {
    platTabMenu() {
      console.log("version:" + this.platformTabMenu);
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
  margin: 0;
  padding: 0;
  float: left;
  li {
    float: left;
    margin: 0 5px;
  }
}
</style>
