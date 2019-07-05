export default function getData(mapData) {






  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)'
    },
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