import echarts from 'echarts'

export default function getData() {


  var data = randomize();
  var data2 = randomize();


  return {
    color: ['#ffbe4d', '#61d5ff'],
    legend: {
      data: ['本月', '同比上月'],
      top: 10,
      right: 0,
      textStyle: {
        color: "#23c6de",
        fontWeight: 700
      }
    },
    grid: {
      top: 75,
      left: 45,
      right: 10,
      bottom: 25
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0} 吨<br />{a1}: {c1} 吨'
    },
    xAxis: {
      type: 'category',
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      boundaryGap: false,
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
      name: '本月',
      data: data,
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      lineStyle: {
        color: '#ffbe4d'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [{
              offset: 0,
              color: 'rgba(255,190,77,1)'
            },
            {
              offset: 1,
              color: 'rgba(255,190,77,0)'
            }
          ]
        )
      },
    }, {
      type: 'line',
      data: data2,
      name: '同比上月',
      smooth: true,
      symbol: 'none',
      sampling: 'average',
      lineStyle: {
        color: '#61d5ff'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(
          0, 0, 0, 1,
          [{
              offset: 0,
              color: 'rgba(59,93,179,1)'
            },
            {
              offset: 1,
              color: 'rgba(59,93,179,0)'
            }
          ]
        )
      },
    }]
  }
}

function randomize() {
  return [0, 0, 0, 0, 0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10
  })
}