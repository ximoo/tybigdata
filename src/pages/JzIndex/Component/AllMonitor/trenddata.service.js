export default function getData(trendData) {

  return {
    legend: {
      data: ['出土量', '消纳量'],
      top: 10,
      right: 20,
      textStyle: {
        color: "#1990ff",
        fontWeight: 700
      }
    },
    grid: {
      left: 55,
      top: 35,
      right: 55,
      bottom: 25
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        animation: false,
        label: {
          backgroundColor: '#505765'
        }
      },
      formatter: '{a0}: {c0} 吨<br />{a1}: {c1} 吨'
    },
    xAxis: {
      type: 'category',
      data: trendData.xAxisData,

      splitLine: {
        show: false
      },
      nameTextStyle: {
        color: '#298bff',
        fontWeight: 700
      },
      axisLine: {
        axisLine: {
          onZero: false
        },
        lineStyle: {
          color: '#298bff'
        },

      }
    },
    // Declare Y axis, which is a value axis.
    yAxis: [{
      // name: '出土量',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#298bff'
        }
      }
    }],
    series: [{
      type: 'bar',
      name: '出土量',
      data: trendData.yAxisData1,
      // areaStyle: {},
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
      type: 'bar',
      data: trendData.yAxisData2,
      // yAxisIndex: 1,
      name: '消纳量',
      // areaStyle: {},
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
