export default function getData(mapData) {






  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)'
    },
    // geo: {
    //   map: 'cityMap',
    //   // left: 200,
    //   // right: 10,
    //   // layoutCenter: ['55%', '50%'],
    //   // layoutSize:650,
    //   zoom: 1.25,
    //   itemStyle: {
    //     color: '#193178',
    //     opacity: 1,
    //     borderWidth: 2,
    //     borderColor: '#476cc8'
    //   },
    //   label: {
    //     show: false,
    //     textStyle: {
    //       color: '#00ff98', //地图初始化区域字体颜色
    //       fontSize: 14,
    //       backgroundColor: 'transparent'
    //     },
    //   },
    //   regions: [{
    //     name: '万柏林区',
    //     selected: true,
    //   }, {
    //     name: '娄烦县',
    //     selected: true,
    //   }, {
    //     name: '迎泽区',
    //     selected: true,
    //   }, {
    //     name: '清徐县',
    //     selected: true,
    //   }],
    //   emphasis: { //当鼠标放上去  地区区域是否显示名称
    //     itemStyle: {
    //       color: '#274cba',
    //     },
    //     label: {
    //       show: true,
    //       textStyle: {
    //         color: '#00ff98', //地图初始化区域字体颜色
    //         fontSize: 14,
    //         backgroundColor: 'transparent'
    //       },
    //     },
    //   },
    // },
    visualMap: {
      min: 800,
      max: 50000,
      text: ['High', 'Low'],
      textStyle: {
        color: "#fff"
      },
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
    series: [{
      type: 'map',
      mapType: 'cityMap',
      itemStyle: {
        normal: {
          opacity: 1,
          borderWidth: 2,
          borderColor: '#193178',
          label: {
            show: false
          }
        },
        emphasis: {
          label: {
            show: true
          }
        }
      },
      data: mapData
    }]
  }










}


function randomize() {
  return Math.round(30 / 10 + Math.random() * 70 / 10)
}

function randomColor() {
  let color = ['#1ebce5', '#e16880', '#42eaa6', '#f4cb7a']
  let index = Math.round(Math.random() * 3)
  return color[index]
}