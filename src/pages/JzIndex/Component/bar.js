import echarts from 'echarts'

export default function getData() {


  var data = [220, 182, 191, 234, 290, 330, 310];

  return {
    legend: {
      data: ['同比上月', '本月'],
      top: 20,
      textStyle: {
        color: "#23c6de",
        fontWeight: 700
      }
    },
    tooltip: {},
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

      axisLabel:{
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
      barWidth: 5,
      itemStyle: {
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
      data: data,
      name: '本月',
      barWidth: 5,
      itemStyle: {
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
  return [0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10
  })
}