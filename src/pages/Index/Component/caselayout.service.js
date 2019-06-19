export default function getData() {

  return {
    tooltip: {},
    radar: {
      center: ['50%', '50%'],
      radius: '50%',
      name: {
        textStyle: {
          color: '#fff',
        }
      },
      splitArea: {
        areaStyle: {
          opacity: 0,
        }
      },
      axisLine: {
        lineStyle: {
          color: '#5182ff'
        }
      },
      splitLine: {
        lineStyle: {
          color: '#212f61'
        }
      },
      indicator: [{
          name: '垃圾收运',
          max: 600
        },
        {
          name: '环卫设施',
          max: 600
        },
        {
          name: '大气污染',
          max: 600
        },
        {
          name: '渣土消纳',
          max: 600
        },
        {
          name: '其他',
          max: 600
        }
      ]
    },
    series: {
      type: 'radar',
      symbol: 'none',
      data: [{
          value: randomize(),
          lineStyle: {
            color: '#13d1c8'
          },
          areaStyle: {
            normal: {
              opacity: 0.45,
              color: '#13d1c8'
            }
          }
        },
        {
          value: randomize(),
          lineStyle: {
            color: '#02a1ed'
          },
          areaStyle: {
            normal: {
              opacity: 0.45,
              color: '#02a1ed'
            }
          }
        },
        {
          value: randomize(),
          lineStyle: {
            color: '#a156ec'
          },
          areaStyle: {
            normal: {
              opacity: 0.45,
              color: '#a156ec'
            }
          }
        }
      ]
    }
  }
}

function randomize() {
  return [0, 0, 0, 0, 0].map(v => {
    return Math.round(100 + Math.random() * 500)
  })
}

