export default function getData() {
  return {
    color: ['#345eca', '#ff7a56', '#22cbff', '#7761f6', '#f19638'],
    legend: {
      x: 'left',
      top: 15,
      data: ['社区', '商铺', '医疗场所', '餐饮企业', '其他'],
      textStyle: {
        color: "#23c6de",
        fontWeight: 700
      }
    },
    series: [{
      type: 'pie',
      radius: ['40%', '80%'],
      center: ['50%', '55%'],
      avoidLabelOverlap: false,
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
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [{
          value: 335,
          name: '社区'
        },
        {
          value: 310,
          name: '商铺'
        },
        {
          value: 274,
          name: '医疗场所'
        },
        {
          value: 235,
          name: '餐饮企业'
        },
        {
          value: 400,
          name: '其他'
        }
      ],
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }]
  }
}