<template>
  <div class="ex-bigdata-tile">
    {{platformName}}
    <div class="ex-bigdata-tile-flip">{{platformName}}</div>
    <div class="ex-bigdata-timer">{{currentTime}}</div>
    <ul class="weather" v-if="weatherList">
      <li v-for="item,index in weatherList" :key="index">
        <!-- <div class="top"></div> -->
        <div class="center">
          <div style="float:left; line-height:24px; margin-right:10px;">{{item.date}}</div>
          <el-tooltip :content="item.dayweather" placement="bottom">
            <i class="weather-icon" :class="item.icon" style="float:left;"></i>
          </el-tooltip>
        </div>
        <div class="bottom">{{item.daytemp + '℃/'+ item.nighttemp + '℃'}}</div>
      </li>
    </ul>
    <div class="weather" v-else>
      <i class="el-icon-loading"></i>
    </div>
  </div>
</template>

<script>
import store from "../Configs/store";

export default {
  data() {
    return {
      platformName:
        store.state.platformData.state.city +
        store.state.platformData.state.name,
      adcode: store.state.platformData.state.adcode,
      currentTime: "",
      weatherList: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.weatherData();
    }, 3000);
    let timer = setInterval(() => {
      this.currentTime = this.getCurrentTime();
    }, 1000);
  },
  methods: {
    getCurrentTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var strHour =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var strMinute =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var strSecond =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      var currentdate =
        date.getFullYear() +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        strHour +
        seperator2 +
        strMinute +
        seperator2 +
        strSecond;
      return currentdate;
    },
    //天气预报
    weatherData() {
      let self = this;
      let weatherList = new Array();
      const weekStr = new Array(
        "周日",
        "周一",
        "周二",
        "周三",
        "周四",
        "周五",
        "周六",
        "周日"
      );
      self.$http
        .get(
          "https://restapi.amap.com/v3/weather/weatherInfo?city=" +
            self.adcode +
            "&extensions=all&key=0a2c31bc6770455f08b0fcdc1674831c"
        )
        .then(function(res) {
          if (res.data.status == "1") {
            let list = res.data.forecasts[0].casts;
            for (var i in list) {
              let icon = "";
              switch (list[i].dayweather) {
                case "晴":
                  icon = "icon-01";
                  break;
                case "少云":
                  icon = "icon-01";
                  break;
                case "阴":
                  icon = "icon-02";
                  break;
                case "晴间多云":
                  icon = "icon-02";
                  break;
                case "多云":
                  icon = "icon-02";
                  break;
                case "平静":
                  icon = "icon-02";
                  break;
                case "微风":
                  icon = "icon-02";
                  break;
                case "和风":
                  icon = "icon-02";
                  break;
                case "清风":
                  icon = "icon-02";
                  break;
                case "小雨":
                  icon = "icon-03";
                  break;
                case "中雨":
                  icon = "icon-03";
                  break;
                case "大雨":
                  icon = "icon-03";
                  break;
                case "暴雨":
                  icon = "icon-03";
                  break;
                case "大暴雨":
                  icon = "icon-03";
                  break;
                case "特大暴雨":
                  icon = "icon-03";
                  break;
                case "强阵雨":
                  icon = "icon-03";
                  break;
                case "强雷阵雨":
                  icon = "icon-04";
                  break;
                case "极端降雨":
                  icon = "icon-03";
                  break;
                case "毛毛雨/细雨":
                  icon = "icon-03";
                  break;
                case "雨":
                  icon = "icon-03";
                  break;
                case "小雨-中雨":
                  icon = "icon-03";
                  break;
                case "中雨-大雨":
                  icon = "icon-03";
                  break;
                case "大雨-暴雨":
                  icon = "icon-03";
                  break;
                case "暴雨-大暴雨":
                  icon = "icon-03";
                  break;
                case "大暴雨-特大暴雨":
                  icon = "icon-03";
                  break;
                case "阵雨":
                  icon = "icon-03";
                  break;
                case "雷阵雨":
                  icon = "icon-04";
                  break;
                case "雷阵雨并伴有冰雹":
                  icon = "icon-04";
                  break;
                case "雨雪天气":
                  icon = "icon-05";
                  break;
                case "雨夹雪":
                  icon = "icon-05";
                  break;
                case "阵雨夹雪":
                  icon = "icon-05";
                  break;
                case "冻雨":
                  icon = "icon-05";
                  break;
                case "雪":
                  icon = "icon-05";
                  break;
                case "阵雪":
                  icon = "icon-05";
                  break;
                case "小雪":
                  icon = "icon-05";
                  break;
                case "中雪":
                  icon = "icon-05";
                  break;
                case "大雪":
                  icon = "icon-05";
                  break;
                case "暴雪":
                  icon = "icon-05";
                  break;
                case "小雪-中雪":
                  icon = "icon-05";
                  break;
                case "中雪-大雪":
                  icon = "icon-05";
                  break;
                case "大雪-暴雪":
                  icon = "icon-05";
                  break;
                case "有风":
                  icon = "icon-06";
                  break;
                case "强风/劲风":
                  icon = "icon-06";
                  break;
                case "疾风":
                  icon = "icon-06";
                  break;
                case "大风":
                  icon = "icon-06";
                  break;
                case "风暴":
                  icon = "icon-06";
                  break;
                case "烈风":
                  icon = "icon-06";
                  break;
                case "狂爆风":
                  icon = "icon-06";
                  break;
                case "飓风":
                  icon = "icon-06";
                  break;
                case "热带风暴":
                  icon = "icon-06";
                  break;
                case "龙卷风":
                  icon = "icon-06";
                  break;
                case "浮尘":
                  icon = "icon-07";
                  break;
                case "扬沙":
                  icon = "icon-07";
                  break;
                case "沙尘暴":
                  icon = "icon-07";
                  break;
                case "强沙尘暴":
                  icon = "icon-07";
                  break;
                case "雾":
                  icon = "icon-07";
                  break;
                case "浓雾":
                  icon = "icon-07";
                  break;
                case "强浓雾":
                  icon = "icon-07";
                  break;
                case "轻雾":
                  icon = "icon-07";
                  break;
                case "大雾":
                  icon = "icon-07";
                  break;
                case "特强浓雾":
                  icon = "icon-07";
                  break;
                case "霾":
                  icon = "icon-07";
                  break;
                case "中度霾":
                  icon = "icon-07";
                  break;
                case "重度霾":
                  icon = "icon-07";
                  break;
                case "严重霾":
                  icon = "icon-07";
                  break;
                case "大雾":
                  icon = "icon-07";
                  break;
                case "热":
                  icon = "icon-01";
                  break;
                case "冷":
                  icon = "icon-03";
                  break;
                case "未知":
                  icon = "icon-01";
                  break;
              }
              weatherList.push({
                date: i == 0 ? "今日" : weekStr[parseInt(list[i].week)],
                dayweather: list[i].dayweather,
                daytemp: list[i].daytemp,
                nighttemp: list[i].nighttemp,
                icon: icon
              });
            }
            self.weatherList = weatherList;
            // console.log(res)
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less">
.weather {
  position: absolute;
  right: 25px;
  top: 10px;
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
  display: flex;
  text-align: center;
  background-color: rgba(0, 37, 82, 0.75);
  border: 1px solid #4366bf;
  border-radius: 3px;

  li {
    padding: 5px 10px;
    border-right: 1px solid #4366bf;

    .weather-icon {
      margin: 0 auto;
    }
  }
}

.amap-luopan,
.amap-luopan-bg {
  background: url("../../../stastic/img/bigData_jz/ctb.png") -44px -60px
    no-repeat !important;
}
.amap-pointers {
  background: url("../../../stastic/img/bigData_jz/ctb.png") -562px -52px
    no-repeat !important;
}

.amap-rotateLeft,
.amap-rotateRight {
  background: url("../../../stastic/img/bigData_jz/ctb.png") -603px -154px
    no-repeat !important;
}

.amap-pitchDown,
.amap-pitchUp {
  background: url("../../../stastic/img/bigData_jz/ctb.png") -605px -98px
    no-repeat !important;
}

.amap-pitchDown,
.amap-pitchUp {
  background: url("../../../stastic/img/bigData_jz/ctb.png") -605px -98px
    no-repeat !important;
}
.amap-compass {
  background: url("../../../stastic/img/bigData_jz/ctb.png") -462px -52px
    no-repeat;
}
</style>


