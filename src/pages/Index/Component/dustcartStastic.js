export default function getData() {


  var data = randomize();
  var data2 = randomize();


  return {
    legend: {
      data: ['本月清运量', '去年同比清运量'],
      top: 20,
      right:0,
      textStyle: {
        color: "#23c6de",
        fontWeight: 700
      }
    },
    grid: {
      right: 10
    },
    tooltip: {
      formatter: '{a}<br />{b}: {c} 万吨'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],

      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: '#3b5db3',
        fontWeight: 700
      },
      axisLine: {
        lineStyle: {
          color: '#3b5db3'
        },

      }
    },
    // Declare Y axis, which is a value axis.
    yAxis: {
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#3b5db3'
        }
      }
    },
    series: [{
      type: 'line',
      name: '本月清运量',
      data: data,
      symbolSize: 7,
      lineStyle:{
        width:3
      },
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0],
        normal: {
          color: '#e28d3a'
        },
        emphasis: {
          color: '#ffb368'
        }
      }
    }, {
      type: 'line',
      data: data2,
      name: '去年同比清运量',
      symbolSize: 9,
      lineStyle:{
        width:3
      },
      itemStyle: {
        normal: {
          color: '#298bff'
        },
        emphasis: {
          color: '#6cafff'
        }
      }
    }]
  }
}

function randomize() {
  return [0, 0, 0, 0, 0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10
  })
}