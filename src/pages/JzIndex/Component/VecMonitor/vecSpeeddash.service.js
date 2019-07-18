export default function getData(pieData) {
  return {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
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
      z: 3,
      min: 0,
      max: 220,
      splitNumber: 11,
      center:['50%', '50%'],
      radius: '90%',
      axisLine: { // 坐标轴线
        lineStyle: { // 属性lineStyle控制线条样式
          width: 10
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
        backgroundColor: 'auto',
        borderRadius: 2,
        color: '#eee',
        padding: 3,
        textShadowBlur: 2,
        textShadowOffsetX: 1,
        textShadowOffsetY: 1,
        textShadowColor: '#222'
      },
      title: {
        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        fontWeight: 'bolder',
        fontSize: 20,
        fontStyle: 'italic'
      },
      detail: {
        // 其余属性默认使用全局文本样式，详见TEXTSTYLE
        formatter: function (value) {
          value = (value + '').split('.');
          value.length < 2 && (value.push('00'));
          return ('00' + value[0]).slice(-2) +
            '.' + (value[1] + '00').slice(0, 2);
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
        width: 100,
        color: '#eee',
        rich: {}
      },
      data: [{
        value: 40,
        name: 'km/h'
      }]
    }, ]
  }
}