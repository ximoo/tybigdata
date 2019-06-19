import echarts from 'echarts'
export default function getData() {
  var data = randomize();
  var data2 = randomize();


  return {
    legend: {
      data: ['平均时长', '案件数量'],
      top: 20,
      right: 0,
      textStyle: {
        color: "#23c6de",
        fontWeight: 700
      }
    },
    grid: {
      left: 55,
      top: 75,
      right: 55,
      bottom: 25
    },
    radar: {
      // shape: 'circle',
      name: {
          textStyle: {
              color: '#fff',
              backgroundColor: '#999',
              borderRadius: 3,
              padding: [3, 5]
         }
      },
      indicator: [
         { name: '销售（sales）', max: 6500},
         { name: '管理（Administration）', max: 16000},
         { name: '信息技术（Information Techology）', max: 30000},
         { name: '客服（Customer Support）', max: 38000},
         { name: '研发（Development）', max: 52000},
         { name: '市场（Marketing）', max: 25000}
      ]
  },
    tooltip: {
      trigger: 'axis',
      formatter: '{a0}: {c0} 小时<br />{a1}: {c1}件'
    },
    series: {
      type: 'radar',
      name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        // areaStyle: {normal: {}},
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : '预算分配（Allocated Budget）'
            },
             {
                value : [5000, 14000, 28000, 31000, 42000, 21000],
                name : '实际开销（Actual Spending）'
            }
        ]
    }
  }
}

function randomize() {
  return [0, 0, 0, 0, 0, 0, 0].map(v => {
    return Math.round(300 + Math.random() * 700) / 10
  })
}