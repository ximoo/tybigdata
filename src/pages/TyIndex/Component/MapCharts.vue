<template>
  <div class="echarts-map">
    <chart :options="map" autoresize class="map-content"/>

    <div class="map-icon-box">
      <ul>
        <li>
          <div class="map-icon">
            <img src="../../../common/stastic/img/bigData/icon-garbage-site.png">
          </div>
          <div class="label">垃圾中转站</div>
        </li>
        <li>
          <div class="map-icon">
            <img src="../../../common/stastic/img/bigData/icon-garbage.png">
          </div>
          <div class="label">垃圾桶站</div>
        </li>
        <li>
          <div class="map-icon">
            <img src="../../../common/stastic/img/bigData/icon-garbage-download.png">
          </div>
          <div class="label">填埋场</div>
        </li>
      </ul>
    </div>

    <div class="map-side-lf">
      <!-- 真实天气 -->
      <div class="map-weather-box">
        <div class="top">
          <div class="icon">
            <i class="weather-icon" :class="weatherList[0].icon"></i>
          </div>
          <div class="temp">
            <h5>{{weatherList[0].daytemp + '℃/'+ weatherList[0].nighttemp + '℃' }}</h5>
            <h6>{{weatherList[0].dayweather}}</h6>
          </div>
        </div>
        <div class="bottom">
          <div class="box">
            <div class="icon">
              <i class="weather-icon" :class="weatherList[1].icon"></i>
            </div>
            <div class="days">明天</div>
          </div>
          <div class="box">
            <div class="icon">
              <i class="weather-icon" :class="weatherList[2].icon"></i>
            </div>
            <div class="days">后天</div>
          </div>
        </div>
      </div>

      <!-- 车辆类别 -->
      <div class="map-vechile-type">
        <h3>环卫设施统计</h3>

        <el-carousel
          class="slide-box"
          direction="vertical"
          autoplay
          height="350px"
          indicator-position="none"
          :interval="5000"
        >
          <el-carousel-item>
            <ul>
              <li>
                <div class="icon">
                  <img src="../../../common/stastic/img/bigData/car-sashui.png">
                </div>
                <div class="info">
                  <p class="num">820</p>
                  <p class="label">洒水车</p>
                </div>
              </li>
              <li>
                <div class="icon">
                  <img src="../../../common/stastic/img/bigData/car-caishi.png">
                </div>
                <div class="info">
                  <p class="num">820</p>
                  <p class="label">采石车</p>
                </div>
              </li>
              <li>
                <div class="icon">
                  <img src="../../../common/stastic/img/bigData/car-qingsao.png">
                </div>
                <div class="info">
                  <p class="num">820</p>
                  <p class="label">清扫车</p>
                </div>
              </li>
              <li>
                <div class="icon">
                  <img src="../../../common/stastic/img/bigData/car-zhatu.png">
                </div>
                <div class="info">
                  <p class="num">820</p>
                  <p class="label">渣土车</p>
                </div>
              </li>
            </ul>
          </el-carousel-item>
        </el-carousel>

        <!-- 边框 -->
        <div class="corner lt"></div>
        <div class="corner rt"></div>
        <div class="corner lb"></div>
        <div class="corner rb"></div>
      </div>
    </div>

    <div class="map-content-top">
      <!-- 基础数据 -->
      <ul>
        <li>
          <h2>渣土消纳量</h2>
          <p>
            8324.12
            <span>立方</span>
          </p>
        </li>
        <li>
          <h2>清扫作业趟次</h2>
          <p>
            8324
            <span>次</span>
          </p>
        </li>
        <li>
          <h2>垃圾清运量</h2>
          <p>
            8324
            <span>万吨</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import ECharts from "./Echarts";
import getMap from "./mapcharts.service.js";

export default {
  name: "mapCharts",
  components: { chart: ECharts },
  data() {
    return {
      map: getMap(),
      weatherList: null,
      slideTop: 0,
      slideBottom: "auto"
    };
  },
  mounted() {
    let self = this;
    this.$nextTick(function() {
      self.weatherData();
    });
  },
  methods: {
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
          "https://restapi.amap.com/v3/weather/weatherInfo?city=140100&extensions=all&key=0a2c31bc6770455f08b0fcdc1674831c"
        )
        .then(function(res) {
          console.log(res);
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
                date:
                  i == 0
                    ? list[i].date.split("-")[2] + "日(今日)"
                    : list[i].date.split("-")[2] +
                      "日(" +
                      weekStr[parseInt(list[i].week)] +
                      ")",
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
