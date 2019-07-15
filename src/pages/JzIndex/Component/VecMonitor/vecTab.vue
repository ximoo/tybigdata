<template>
  <div class="ex-layout-tab">
    <ul>
      <li>
        <el-button @click="vecList">
          <i class="ex-icon-truck" />
        </el-button>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "vecTab",
  props: ["listShow"],
  data() {
    return {};
  },
  methods: {
    vecList() {
      this.groupShow = !this.groupShow;
      console.log(this.groupShow);
      this.$emit("showVecTab", this.groupShow);
    }
  }
};
</script>
<style lang="less">
.ex-layout-tab {
  position: absolute;
  right: 15px;
  top: 15px;
  height: 200px;
  width: 60px;
  z-index: 5000;

  ul {
    display: none;
    transition: 0.3s ease-in-out all;

    button {
      font-size: 32px;
      color: #42ecfa !important;
      background: #112166;
      padding: 5px;
      border: 1px solid #4d53a5;
      border-radius: 5px;
      box-shadow: inset 0 0 5px rgba(77, 83, 165, 0.85),
        0 5px 5px rgba(0, 0, 0, 0.45);
    }

    .el-button:hover,
    .el-button:focus {
      border: 1px solid rgba(74, 97, 179, 0.45);
      background-color: rgba(74, 97, 179, 0.45);
    }
  }

  &:hover {
    ul {
      display: block;
    }
  }

}
</style>
