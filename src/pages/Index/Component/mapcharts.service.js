import echarts from 'echarts'
export default function getData() {

  let tyPointer = [{
      name: '杏花岭区',
      value: [112.5705300000, 37.8940300000, randomize(), randomColor()],
      "areid": 77,
      "areCode": "420104"
    },
    {
      name: '迎泽区',
      value: [112.5634600000, 37.8632000000, randomize(), randomColor()],
      "areid": 72,
      "areCode": "420103"
    },
    {
      name: '小店区',
      value: [112.5656600000, 37.7360500000, randomize(), randomColor()],
      "areid": 65,
      "areCode": "420102"
    },
    {
      name: '尖草坪区',
      value: [112.4869900000, 37.9403600000, randomize(), randomColor()],
      "areid": 27,
      "areCode": "420112"
    },
    {
      name: '万柏林区',
      value: [112.5156200000, 37.8592900000, randomize(), randomColor()],
      "areid": 59,
      "areCode": "420116"
    },
    {
      name: '晋源区',
      value: [112.4777000000, 37.7152500000, randomize(), randomColor()],
      "areid": 88,
      "areCode": "420106"
    },
    {
      name: '清徐县',
      value: [112.3588500000, 37.6073600000, randomize(), randomColor()],
      "areid": 44,
      "areCode": "420111"
    },
    {
      name: '阳曲县',
      value: [112.6729200000, 38.0582800000, randomize(), randomColor()],
      "areid": 86,
      "areCode": "420107"
    },
    {
      name: '娄烦县',
      value: [111.7974500000, 38.0672000000, randomize(), randomColor()],
      "areid": 53,
      "areCode": "420115"
    },
    {
      name: '古交市',
      value: [112.1758800000, 37.9071400000, randomize(), randomColor()],
      "areid": 53,
      "areCode": "420115"
    }
  ]



  let alir5 = [
    [
      [112.5558020216, 37.8767523599],
      [111.8968215671, 38.0927528905]
    ],
    [
      [112.5558020216, 37.8767523599],
      [112.3829707918, 37.6503408003]
    ],
    [
      [112.5558020216, 37.8767523599],
      [112.4739438435, 37.6243212994]
    ],
    [
      [112.3829707918, 37.6503408003],
      [112.4739438435, 37.6243212994]
    ],
    [
      [111.8968215671, 38.0927528905],
      [112.4739438435, 37.6243212994]
    ],
    [
      [112.1987565812, 37.9114451854],
      [112.9074569456, 37.9503047841]
    ],
    [
      [111.6935059472, 37.9847776560],
      [111.6523495412, 37.6330131386]
    ],
    [
      [112.9431093416, 38.2077087212],
      [112.3141247713, 37.5660686352]
    ],
    [
      [111.6523495412, 37.6330131386],
      [112.4739438435, 37.6243212994]
    ],
    [
      [112.9431093416, 38.2077087212],
      [112.9074569456, 37.9503047841]
    ]
  ]



  return {
    legend: {
      orient: 'vertical', // horizontal水平  vertical垂直
      top: 'bottom',
      left: 'right',
      data: ['垃圾中转站', '垃圾桶站', '填埋场', '其他'],
      selected: {
        '垃圾中转站': true,
        '垃圾桶站': true,
        '填埋场': true,
        '其他': true
      },
      textStyle: {
        color: '#80a4fb',
        fontSize: 16
      },
      itemGap: 15,
      padding: 15,
      zlevel: 15
    },
    tooltip: {
      show: true,
    },
    geo: {
      map: 'ty',
      // left: 200,
      // right: 10,
      // layoutCenter: ['55%', '50%'],
      // layoutSize:650,
      zoom: 1.25,
      itemStyle: {
        color: '#193178',
        opacity: 1,
        borderWidth: 2,
        borderColor: '#476cc8'
      },
      label: {
        show: true,
        textStyle: {
          color: '#00ff98', //地图初始化区域字体颜色
          fontSize: 14,
          backgroundColor: 'transparent'
        },
      },
      regions: [{
        name: '万柏林区',
        selected: true,
      }, {
        name: '娄烦县',
        selected: true,
      }, {
        name: '迎泽区',
        selected: true,
      }, {
        name: '清徐县',
        selected: true,
      }],
      emphasis: { //当鼠标放上去  地区区域是否显示名称
        itemStyle: {
          color: '#274cba',
        },
        label: {
          show: true,
          textStyle: {
            color: '#00ff98', //地图初始化区域字体颜色
            fontSize: 14,
            backgroundColor: 'transparent'
          },
        },
      },
    },

    series: [{
      type: 'lines',
      coordinateSystem: 'geo',
      effect: {
        show: true,
        trailWidth: 4,
        trailOpacity: 0.5,
        trailLength: 0.3,
        constantSpeed: 5
      },
      lineStyle: {
        width: 1,
        opacity: 0.5
      },
      zlevel: 10,
      data: []
    }, {
      type: 'effectScatter',
      coordinateSystem: 'geo',
      data: tyPointer.sort(function (a, b) {
        return b.value - a.value;
      }).slice(0, 5),
      symbolSize: function (val) {
        return val[2] * 3;
      },
      showEffectOn: 'render',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      label: {
        emphasis: {
          formatter: '{b}',
          position: 'right',
          show: true
        }
      },
      itemStyle: {
        normal: {
          color: function (val) {
            return val.data.value[3];
          },
          shadowBlur: 10
        }
      },
      zlevel: 1
    }, {
      type: 'scatter',
      coordinateSystem: 'geo',
      data: tyPointer.sort(function (a, b) {
        return b.value - a.value;
      }).slice(5, 10),
      symbol: 'pin',
      symbolSize: 25,
      symbolOffset: [0, '-50%'],
      itemStyle: {
        normal: {
          color: '#00ff98',
        }
      },
      zlevel: 1
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