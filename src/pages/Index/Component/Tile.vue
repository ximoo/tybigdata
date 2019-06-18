<template>
  <div class="ex-bigdata-tile">
    太原智慧环卫大数据平台
    <div class="ex-bigdata-tile-flip">太原智慧环卫大数据平台</div>
    <div class="ex-bigdata-timer">{{currentTime}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTime: ""
    };
  },
  mounted() {
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
    }
  }
};
</script>

