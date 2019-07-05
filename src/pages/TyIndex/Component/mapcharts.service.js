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
      symbol: 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAmCAYAAAClI5npAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjIyOTQ1RTIwOTMzQzExRTk5MzNFODM4MEQ2RDgyQ0MwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjIyOTQ1RTIxOTMzQzExRTk5MzNFODM4MEQ2RDgyQ0MwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MjI5NDVFMUU5MzNDMTFFOTkzM0U4MzgwRDZEODJDQzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MjI5NDVFMUY5MzNDMTFFOTkzM0U4MzgwRDZEODJDQzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6Zauh5AAALgElEQVR42oxY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',
      symbolSize: [24, 29],
      symbolOffset: [0, '-100%'],
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