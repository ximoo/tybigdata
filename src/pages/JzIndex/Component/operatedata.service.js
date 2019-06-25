export default function getData() {
  return {
    color: ['#345eca', '#ff7a56', '#22cbff', '#7761f6', '#f19638'],
    legend: {
      x: 'left',
      top: 15,
      data: ['喷雾降尘车', '垃圾清运车', '吸尘车', '洒水车', '环卫清扫车'],
      textStyle: {
        color: "#23c6de",
        fontWeight: 700
      }
    },
    tooltip: {
      trigger: 'item',
      formatter: "{d}%"
  },
    series: [{
      type: 'pie',
      radius: ['40%', '80%'],
      center: ['50%', '65%'],
      avoidLabelOverlap: false,
      data: [{
          value: 335,
          name: '喷雾降尘车'
        },
        {
          value: 310,
          name: '垃圾清运车'
        },
        {
          value: 274,
          name: '吸尘车'
        },
        {
          value: 235,
          name: '洒水车'
        },
        {
          value: 400,
          name: '环卫清扫车'
        }
      ],
      roseType: 'radius',
      itemStyle: {
        normal: {
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '28',
            fontWeight: 'bold',
            color: "#fff",
          }
        }
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }]
  }
}