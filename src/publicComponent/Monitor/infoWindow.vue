<template>
  <div class="vec-info-box">
    <slot name="header">
      <div class="vec-number">{{data.name}}</div>
    </slot>
    <slot name="body">
      <div class="vec-address">
        <i class="el-icon-time"></i>
        最后定位时间：{{nowTime}}
      </div>
      <div class="vec-address">
        <i class="el-icon-map-location"></i>
        最后定位位置：{{data.address}}
      </div>
    </slot>
    <slot name="footer">
    </slot>

    
  </div>
</template>
<script>
import Util from "../../pages/JzIndex/Configs/util.lib";
export default {
  name: "infoWdBtn",
  props: ["data"],
  data() {
    return {
      nowTime: Util.getNow(),
      detailShow: false
    };
  },
  mounted() {
    let self = this;
    console.log(self.$slots);
    this.$nextTick(() => {});
  },
  methods: {
    
  }
};
</script>

