import echarts from 'echarts'

var index = 0

export default function getData() {
  return {
    tooltip: {
      position: 'top',
      formatter: function (params) {
        return params.seriesName + '<br/>' + params.value[0] + ':<br/>' + params.value[1] + '条';
      }
    },
    grid: {
      left: 55,
      top: 35,
      right: 55,
      bottom: 25
    },
    visualMap: {
      min: 0,
      max: 5000,
      calculable: true,
      orient: 'horizontal',
      inRange: {
        color: ['#999999', '#0059df'],
        opacity: 0.75
      },
      left: '55%',
      bottom: 20,
      show: false
    },
    calendar: [{
      orient: 'vertical',
      yearLabel: {
        show: false
      },
      dayLabel: {
        firstDay: 1,
        nameMap: ['日', '一', '二', '三', '四', '五', '六'],
        textStyle: {
          color: "#fff"
        }
      },
      monthLabel: {
        show: false
      },
      cellSize: [25, 25],
      left: 35,
      top: 45,
      range: new Date().getFullYear() + '-' + (new Date().getMonth() + 1)
    }],
    series: [{
      name: "处理数",
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: getVirtulData(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
    }]
  }
}

function getVirtulData(year, month, day) {
  year = year || '2018';
  var date = +echarts.number.parseDate(year + '-' + month + '-1');
  var end = +echarts.number.parseDate(year + '-' + month + '-' + day);
  var dayTime = 3600 * 24 * 1000;
  var data = [];
  for (var time = date; time < end; time += dayTime) {
    let dateData = Math.floor(Math.random() * 5000)
    data.push([
      echarts.format.formatTime('yyyy-MM-dd', time),
      dateData
    ]);
    // self.chartsTotal[index] = self.chartsTotal[index] + dateData
  }
  console.log(data)
  index = index + 1
  return data;
}