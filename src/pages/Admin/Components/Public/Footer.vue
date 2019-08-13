<template>
  <div class="ex-footer">
    <div class="ex-footer-user">
      <el-popover
        placement="top"
        title="常用快捷菜单"
        width="200"
        trigger="click"
        content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
      >
        <el-button type="primary" slot="reference" icon="el-icon-user-solid" size="mini" circle></el-button>
      </el-popover>
      <span>超级管理员 - 城管委</span>
      <span class="fr" style="margin-right:15px;">当前版本:{{version}}</span>
    </div>
  </div>
</template>
<script>
import {mapState} from 'vuex'

export default {
  name: "Footer",

  computed: {
    ...mapState({
      //获取版本号
      version: state => state.platData.version
    })

  }
};
</script>
