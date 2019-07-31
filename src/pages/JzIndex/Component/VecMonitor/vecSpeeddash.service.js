export default function getData(weightData,speedData) {
  return {
    tooltip: {
      formatter: "{a}: {c}吨"
    },
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    series: [{
      name: '速度',
      type: 'gauge',
      center: ['25%', '50%'], // 默认全局居中
      radius: '80%',
      min: 0,
      max: 120,
      splitNumber: 7,
      pointer: {
        width: 3
      },
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          width: 5
        }
      },
      axisTick: { // 坐标轴小标记
        length: 15, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: 'auto'
        }
      },
      splitLine: { // 分隔线
        length: 20, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          color: 'auto'
        }
      },
      axisLabel: {
        show: false,
      },
      detail: {
        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        formatter: function (value) {
          value = (value + 'km/h')
          return value;
        },
        fontWeight: 'bolder',
        borderRadius: 3,
        backgroundColor: '#444',
        borderColor: '#aaa',
        shadowBlur: 5,
        shadowColor: '#333',
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        borderWidth: 2,
        textBorderColor: '#000',
        textBorderWidth: 2,
        textShadowBlur: 2,
        textShadowColor: '#fff',
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        fontFamily: 'Arial',
        fontSize: 16,
        width: 60,
        color: '#eee',
        offsetCenter: [0, '80%'],
        rich: {}
      },
      data: [{
        value: speedData,
        name:"速度"
      }]
    }, {
      name: '载重',
      type: 'gauge',
      z: 3,
      min: 0,
      max: 24,
      splitNumber: 10,
      center: ['75%', '50%'],
      radius: '80%',
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          width: 5
        }
      },
      pointer: {
        width: 3
      },
      axisTick: { // 坐标轴小标记
        length: 15, // 属性length控制线长
        lineStyle: { // 属性lineStyle控制线条样式
          color: 'auto'
        }
      },
      splitLine: { // 分隔线
        length: 20, // 属性length控制线长
        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
          color: 'auto'
        }
      },
      axisLabel: {
        show: false,
      },
      detail: {
        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        formatter: function (value) {
          value = (value + '吨')
          return value;
        },
        fontWeight: 'bolder',
        borderRadius: 3,
        backgroundColor: '#444',
        borderColor: '#aaa',
        shadowBlur: 5,
        shadowColor: '#333',
        shadowOffsetX: 0,
        shadowOffsetY: 3,
        borderWidth: 2,
        textBorderColor: '#000',
        textBorderWidth: 2,
        textShadowBlur: 2,
        textShadowColor: '#fff',
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
        fontFamily: 'Arial',
        fontSize: 16,
        width: 60,
        color: '#eee',
        offsetCenter: [0, '80%'],
        rich: {}
      },
      data: [{
        value: weightData,
        name:"载重"
      }]
    }, ]
  }
}