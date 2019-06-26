export default function getData() {
  return {
    color: ['rgba(25,144,255,.25)', 'rgba(255,122,86,.25)', 'rgba(34,203,255,.25)', 'rgba(119,97,246,.25)'],
    tooltip: {
      trigger: 'item',
      formatter: "{d}%"
    },
    series: [{
      type: 'pie',
      radius: ['45%', '60%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      data: [{
          value: 335,
          name: '运营车辆'
        },
        {
          value: 310,
          name: '停车车辆'
        },
        {
          value: 274,
          name: '离线车辆'
        },
        {
          value: 235,
          name: '设备损坏'
        }
      ],
      itemStyle: {
        borderColor: '#1990ff',
        borderWidth: 2,
        shadowBlur: 200,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      label: {
        normal: {
          show: true,
          textStyle: {
            color: '#abc4ff'
          },
          formatter: "{b}：\n\r{c}辆"
        }
      },
      labelLine: {
        // smooth: true,
        length: 1,
        length: 2,
        lineStyle: {
          color: '#1990ff',
          width: 1
        },
      },
      animationType: 'scale',
      animationEasing: 'elasticOut',
      animationDelay: function (idx) {
        return Math.random() * 200;
      }
    }]
  }
}