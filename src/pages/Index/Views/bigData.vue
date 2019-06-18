<template>
  <div class="ex-bigdata-content">
    <div class="ex-bigdata-side">
      <div class="item" style="width:100%;">
        <h3>渣土消纳量统计</h3>

        <muckStastics/>

      </div>
      <div class="item" style="flex:1;">
        <h3>环卫车辆统计</h3>

        <sanitationStastic/>

      </div>
      <div class="item" style="flex:1;">
        <h3>垃圾清运量统计</h3>
         <dustcartStastic/>

      </div>
    </div>
    <div class="ex-bigdata-main">
      <div class="item">
        <MapCharts class="echarts-map"/>
        <h3>车辆在线率统计</h3>
        <dustcartStastic/>
      </div>
    </div>

    <div class="ex-bigdata-side">
      <div class="item">
        <h3>生活垃圾产生分类</h3>
        <muckStastics/>
        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
      <div class="item">
        <h3>环卫征费统计</h3>
        <sanitationStastic/>
        <!-- <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div> -->
      </div>

      <div class="item">
        <h3>环卫案件处理统计</h3>
        <muckStastics/>
      </div>
      <div class="item">
        <h3>环卫案件分布统计</h3>
        <muckStastics/>
      </div>
    </div>
  </div>
</template>

<script>
import muckStastics from "../Component/muckStastics";
import dustcartStastic from "../Component/dustcartStastic";
import sanitationStastic from "../Component/sanitationStastic";
import vechileOline from "../Component/vechileOline";
import MapCharts from "../Component/MapCharts";

export default {
  name: "bigData",
  components: {
    muckStastics,
    dustcartStastic,
    sanitationStastic,
    vechileOline,
    MapCharts
  },
  data() {
    return {};
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {});
  }
};
</script>

