import echarts from 'echarts'
export default function getData() {
  var data = randomize();
  var data2 = randomize();


  return {
    legend: {
      data: ['平均时长', '案件数量'],
      top: 20,
      right: 0,
      textStyle: {
        color: "#23c6de",
        fontWeight: 700
      }
    },
    grid: {
      left: 55,
      top: 75,
      right: 55,
      bottom: 25
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0} 小时<br />{a1}: {c1}件'
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
    yAxis: [{
      name: '平均时长',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#3b5db3'
        }
      },
    },{
      name: '案件数量',
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#3b5db3'
        }
      },
    }],
    series: [{
      type: 'line',
      name: '平均时长',
      data: data,
      lineStyle: {
        width: 3
      },
      itemStyle: {
        normal: {
          color: '#e28d3a'
        },
        emphasis: {
          color: '#ffb368'
        }
      }
    }, {
      type: 'bar',
      data: data2,
      name: '案件数量',
      yAxisIndex:1,
      barWidth: 10,
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

function randomize() {
  return [0, 0, 0, 0, 0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10
  })
}