<template>
  <div class="ex-bigdata-main">
    <!-- 工地/消纳场环境监测 -->
    <BaseData/>
    <BaseData/>

    <!-- 环境污染变化趋势 -->
    <ProduceData/>
  </div>
</template>
<script>
import BaseData from "../Component/BaseData";
import ProduceData from "../Component/ProduceData";



export default {
  name: "jHome",
  components: { BaseData, ProduceData },
  methods: {}
};
</script>
