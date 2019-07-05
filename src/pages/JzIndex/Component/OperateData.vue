<template>
  <div class="item" style="height:calc(100% - 520px);">
    <h3>运营数据</h3>
    <div class="ex-operatedata-charts">
      <Echarts :options="pieOption" autoresize />
    </div>

    <ul class="status-stastic-box">
      <li　v-for="item , index in actBarData" :key="index">       
        <ol class="status-stastic">
          <li>
            <em>{{item.yestoday}}</em>
            <div :style="{'height': (item.yestoday / item.number)*100+'%'}"></div>
          </li>
          <li>
            <em>{{item.today}}</em>
            <div :style="{'height': (item.today / item.number)*100+'%'}"></div>
          </li>
        </ol>
        <h5>{{item.label}}({{item.unit}})</h5></li>
    </ul>

    <!-- 边框 -->
    <div class="corner lt"></div>
    <div class="corner rt"></div>
    <div class="corner lb"></div>
    <div class="corner rb"></div>F
  </div>
</template>
<script>
import getOption from "./operatedata.service";
import randomIze from "../Configs/service.lib"

let activeBarId,activePieId

export default {
  name: "OperateData",
  data() {
    return {
      pieOption: getOption(),
      actBarData:[]
    };
  },
  mounted(){
    let self = this
    self.$nextTick(()=>{
        clearInterval(activeBarId)
        clearInterval(activePieId)
        self.BarData()
        self.activePieData()
        activeBarId = setInterval(()=>{self.activeBarData()},this.allmonitor.module.operatedata.data[1].timer*1000)
        activePieId = setInterval(()=>{self.activePieData()},this.allmonitor.module.operatedata.data[0].timer*1000)
     })
  },
  methods:{
    //饼状图动态值
    activePieData(){
      let activePieData = this.srcPieData
      let actPieData = []
      for(var i in activePieData){
            activePieData[i]["now"] = randomIze.randomLib(0,activePieData[i].number);
            actPieData.push({
                 value: activePieData[i].now,
                 name: activePieData[i].label
          })
        }
      // console.log(actPieData)
      // this.actPieData = activePieData
      this.pieOption = getOption(actPieData)
    },
    //柱状图初始值
    BarData(){
       let activeOprateData2 = this.srcBarData 
         for(var i in activeOprateData2){
            activeOprateData2[i]["today"] = randomIze.randomLib(0,activeOprateData2[i].number  * randomIze.nowTimer()/ 24 ) ;
            activeOprateData2[i]["yestoday"] = randomIze.randomLib(activeOprateData2[i].number  * randomIze.nowTimer() / 24 , activeOprateData2[i].number);
           }
        this.actBarData = activeOprateData2
        this.$store.commit("cntTreData",activeOprateData2)
    },
    //柱状图动态值
    activeBarData(){
       let activeOprateData2 = this.actBarData 
         for(var i in activeOprateData2){
            activeOprateData2[i]["today"] = activeOprateData2[i]["today"]+  randomIze.randomLib(0,activeOprateData2[i].number/ 100);
           }
       this.actBarData = activeOprateData2
       this.$store.commit("cntTreData",activeOprateData2)
    }
  },
  computed: {
    allmonitor() {
      let allmonitor = JSON.parse(localStorage.$platformData).module.allmonitor;
      return allmonitor;
    },
    srcPieData(){
      return this.allmonitor.module.operatedata.data[0].list
    },
    srcBarData(){
      return this.allmonitor.module.operatedata.data[1].list
    }
  }
};
</script>
<style lang="less">
.ex-operatedata-charts {
  height: 200px;
}
.status-stastic-box {
  text-align: center;
  width: 100%;
  height: calc(~"100% - 280px");
  font-size: 12px;
  color: #1990ff;
  display: flex;

  li {
    width: 20%;
    margin: 0 2.5%;
    height: 100%;

    .status-stastic {
      display: flex;
      width: 100%;
      height: 100%;

      li {
        width: 50%;
        height: 100%;
        position: relative;
        em {
          display: block;
          font-style: normal;
          // font-weight: 700;
        }

        div {
          width: 6px;
          max-height: calc(~"100% - 40px");
          border-radius: 1px 1px 0 0;
          background: #1d857a
            url("../../../stastic/img/bigData_jz/charts_bar_bg.png");
          position: absolute;
          bottom: 0;
          left: 50%;
          margin-left: -3px;
        }
      }
      li:last-child {
        div {
          background: #204ea1
            url("../../../stastic/img/bigData_jz/charts_bar_bg.png");
        }
      }
    }
  }
}
</style>

