<template>
  <div class="vec-info-box">
    <slot name="header">
      <div class="vec-number">{{data.name}}</div>
    </slot>
    <slot name="body">
      <el-image
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563511649427&di=d198f151dc9e42efe44d4d316c6ceeb5&imgtype=0&src=http%3A%2F%2Fimg1.kcimg.cn%2Fdealerimg%2Fnews%2F2017%2F10%2F08%2F1d2eb917bb904e28b23d338da4d9f617.jpg_600xx.jpg"
        class="vec-info-img"
      />

      <ul class="vec-info-intro">
        <li>状态: <span v-if="data.state == 1">行驶</span><span v-if="data.state == 2">停车</span><span v-if="data.state == 3">熄火</span><span v-if="data.state == 4">定位失败</span><span v-if="data.state == 5">通讯中断</span></li>
        <li>速度:{{data.speed}} km/h</li>
        <li>载重:{{data.weight}} 吨</li>
        <li>里程:{{data.mileage}} km</li>
      </ul>
      <div class="vec-info-address">
        <i class="el-icon-time"></i>
        最后定位时间: {{nowTime}}
      </div>
      <div class="vec-info-address">
        <i class="el-icon-map-location"></i>
        最后定位位置: {{data.address}}
      </div>
    </slot>
    <slot name="footer"></slot>
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
  methods: {}
};
</script>

