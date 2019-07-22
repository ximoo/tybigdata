export default function getData() {
  var total = Math.round(Math.random() * 300) + 100
  var color = ['#0059df', '#2cc7b7', '#53b7ff', '#333333', '#414fd3']
  var online = Math.round(total * 2 / 3)
  var offline = Math.round(total / 3)
  var post = Math.round(online * 4 / 5)
  return {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c}人"
    },
    legend: {
      orient: 'vertical',
      x: 'right',
      data: ['人员总数', '在线人员', '离线人员', '上报人员'],
      textStyle: {
        color: "#fff"
      }
    },
    grid: {
      left: '15%',
      right: '15%',
      top: 0,
      bottom: '15%',

    },
    series: {
      name: '人员状况',
      type: 'sunburst',
      center: ['50%', '40%'],
      radius: ['0', '70%'],
      avoidLabelOverlap: false,
      label: {
        formatter: "{b}:{c}人",
        align: "center",
        rotate: 0
      },
      data: [{
        value: total,
        name: '人员总数',
        itemStyle: {
          borderWidth: 3,
          borderColor: "#141845",
          opacity: 0.75,
          color: color[4]
        },
        label: {
          rotate: 0
        },
        children: [{
          value: online,
          name: '在线人员',
          itemStyle: {
            borderWidth: 3,
            borderColor: "#141845",
            opacity: 0.75,
            color: color[1]
          },
          label: {
            rotate: 0
          },
          children: [{
            value: post,
            name: '上报人员',
            itemStyle: {
              borderWidth: 3,
              borderColor: "#141845",
              opacity: 0.75,
              color: color[2]
            },
            label: {
              rotate: 0
            }
          }]
        }, {
          value: offline,
          name: '离线人员',
          label: {
            rotate: 0
          },
          itemStyle: {
            borderWidth: 3,
            borderColor: "#141845",
            opacity: 0.75,
            color: color[3]
          }
        }]
      }, ]
    }
  }
}