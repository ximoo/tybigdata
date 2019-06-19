import echarts from 'echarts'
function randomize() {
  return [0, 0, 0, 0, 0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10
  })
}


export default function getData() {

  var data = randomize();
  var data2 = randomize();



  return {
    legend: {
      data: ['同比上月', '本月'],
      top: 20,
      right:20,
      textStyle: {
        color: "#23c6de",
        fontWeight: 700
      }
    },
    grid: {
      right: 10,
      bottom:25,
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
      axisLabel: {
        formatter: '{value} 万吨'
      },
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#3b5db3'
        }
      }
    },
    // Declare several series, each of them mapped to a
    // column of the dataset by default.
    series: [{
      type: 'bar',
      name: '同比上月',
      data: data,
      barWidth: 10,
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0],
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [{
                offset: 0,
                color: 'rgba(32,182,205,1)'
              },
              {
                offset: 0.7,
                color: 'rgba(32,182,205,.2)'
              },
              {
                offset: 1,
                color: 'rgba(32,182,205,0)'
              }
            ]
          )
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [{
                offset: 0,
                color: '#20b6cd'
              },
              {
                offset: 1,
                color: '#20b6cd'
              }
            ]
          )
        }
      },
    }, {
      type: 'bar',
      data: data2,
      name: '本月',
      barWidth: 15,
      itemStyle: {
        barBorderRadius: [5, 5, 0, 0],
        normal: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [{
                offset: 0,
                color: 'rgba(41,139,255,1)'
              },
              {
                offset: 0.7,
                color: 'rgba(41,139,255,.2)'
              },
              {
                offset: 1,
                color: 'rgba(41,139,255,0)'
              }
            ]
          )
        },
        emphasis: {
          color: new echarts.graphic.LinearGradient(
            0, 0, 0, 1,
            [{
                offset: 0,
                color: '#298bff'
              },
              {
                offset: 1,
                color: '#298bff'
              }
            ]
          )
        }
      }
    }]
  }
}

