<template>
  <div class="item" style="width:240px;height:calc(40% - 6px)">
    <h3>各区上报状况</h3>
    <ul class="case-stastic-list">
      <li v-for="item,index in caseStastic" :key="index">
        <div class="label">{{item.name}}</div>
        <div class="number">{{item.caseNumber}}</div>
      </li>
    </ul>
    <div style="clear:both;" />
    <Conner />
  </div>
</template>
<script>


export default {
  name: "CaseStastic",
  props:["caseStastic"],
  data() {
    return {
    };
  }
};
</script>
<style lang="less">
.case-stastic-list {
  color: #fff;
  padding: 15px;
  line-height: 32px;

  li {
    background-image: url("../../../../stastic/img/bigData_jz/case_list.png");
    background-position: left center;
    background-repeat: no-repeat;
    padding: 0 15px;
    font-size: 15px;
    color: #22c8fc;
    font-weight: bold;

    .label {
        float: left;
    }
    .number {
      text-align: right;
      color: #fc0;
    }

    &::after {
      clear: both;
    }
  }
}
</style>

