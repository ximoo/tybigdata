export default function getData() {
  return {
    color: ['#004b90', '#f19638', '#298bff', '#137fa8', '#2c53c9'],
    radius: '35%',
    center: ['50%', '50%'],
    series: [{
      type: 'pie',
      data: [{
          value: 335,
          name: '直接访问'
        },
        {
          value: 310,
          name: '邮件营销'
        },
        {
          value: 274,
          name: '联盟广告'
        },
        {
          value: 235,
          name: '视频广告'
        },
        {
          value: 400,
          name: '搜索引擎'
        }
      ],
      roseType: 'radius',
      itemStyle: {
        normal: {
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
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