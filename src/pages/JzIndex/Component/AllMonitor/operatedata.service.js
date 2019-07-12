export default function getData(pieData) {
  return {
    color: ['rgba(25,144,255,1)', 'rgba(255,122,86,1)', 'rgba(34,203,255,1)', 'rgba(119,97,246,1)'],
    tooltip: {
      trigger: 'item',
      formatter: "{d}%"
    },
    series: [{
      type: 'pie',
      radius: ['45%', '60%'],
      center: ['50%', '50%'],
      avoidLabelOverlap: true,
      data:pieData,
      itemStyle: {
        borderColor: '#1990ff',
        borderWidth: 0,
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