import Vue from 'vue'
import Vuex from 'vuex'





Vue.use(Vuex)







export default new Vuex.Store({
    state: {
        "version": "3.4.1.1",
        "isFirst": localStorage.$isFirst ? !localStorage.$isFirst : true,
        "platformData": {
            "state": {
                "name": "城市固废资源利用云平台",
                "city": "武汉市",
                "adcode": "420000"
            },
            "fences": {
                "site": {
                    "name": "工地",
                    "data": [{
                        "name": "",
                        "path": ""
                    }]
                },
                "landfill": {
                    "name": "消纳点",
                    "data": [{
                        "name": "",
                        "path": ""
                    }]
                }
            },
            "module": {
                "allmonitor": {
                    "name": "全局监管",
                    "enable": true,
                    "module": {
                        "basedata": {
                            "name": "基础监控数据：",
                            "timer": 30,
                            "data": [{
                                "name": "-基本数据",
                                "tip": "演示平台的基本资产单位数据，平台将根据这些数据模拟生成动态数据",
                                "list": [{
                                        "id": 1,
                                        "label": "车辆总数",
                                        "unit": "辆",
                                        "number": "600"
                                    },
                                    {
                                        "id": 2,
                                        "label": "工地总数",
                                        "unit": "个",
                                        "number": "300"
                                    },
                                    {
                                        "id": 3,
                                        "label": "消纳点总数",
                                        "unit": "个",
                                        "number": "10"
                                    }
                                ]
                            }, {
                                "name": "-扩展数据",
                                "tip": "最多3个统计字段",
                                "timer": 30,
                                "list": [{
                                        "id": 1,
                                        "label": "在线车辆",
                                        "unit": "辆",
                                        "number": "300",
                                    },
                                    {
                                        "id": 2,
                                        "label": "开工工地",
                                        "unit": "个",
                                        "number": "30"
                                    },
                                    {
                                        "id": 3,
                                        "label": "消纳量",
                                        "unit": "立方",
                                        "number": "710"
                                    }
                                ]
                            }]
                        },
                        "operatedata": {
                            "name": "运营数据:",
                            "data": [{
                                "name": "-饼状图:",
                                "tip": "默认第一项为运营车辆，与基础数据中车辆总数一致。统计项不限项数，但要注意不要重复,数量为随机最大数",
                                "timer": 30,
                                "list": [{
                                    "id": 1,
                                    "label": "在线车辆",
                                    "unit": "辆",
                                    "number": "300",
                                }, {
                                    "id": 2,
                                    "label": "停车车辆",
                                    "unit": "辆",
                                    "number": "300"
                                }, {
                                    "id": 3,
                                    "label": "离线车辆",
                                    "unit": "辆",
                                    "number": "10"
                                }, {
                                    "id": 4,
                                    "label": "设备损坏",
                                    "unit": "辆",
                                    "number": "400"
                                }]
                            }, {
                                "name": "-柱状图:",
                                "tip": "最多4个统计字段,数量为随机最大数",
                                "timer": 30,
                                "list": [{
                                    "id": 5,
                                    "label": "出土次数",
                                    "unit": "次",
                                    "number": "100"
                                }, {
                                    "id": 6,
                                    "label": "出土量",
                                    "unit": "立方",
                                    "number": "710"
                                }, {
                                    "id": 7,
                                    "label": "消纳次数",
                                    "unit": "立方",
                                    "number": "710"
                                }, {
                                    "id": 8,
                                    "label": "消纳量",
                                    "unit": "立方",
                                    "number": "710"
                                }]
                            }]
                        },
                        "producedata": {
                            "name": "生产数据:",
                            "tip": "最多4个统计字段",
                            "timer": 30,
                            "data": [{
                                "id": 1,
                                "label": "拆迁渣土",
                                "unit": "吨",
                                "number": "100"
                            }, {
                                "id": 2,
                                "label": "粗骨料",
                                "unit": "吨",
                                "number": "710"
                            }, {
                                "id": 3,
                                "label": "细骨料",
                                "unit": "吨",
                                "number": "710"
                            }, {
                                "id": 4,
                                "label": "钢筋",
                                "unit": "吨",
                                "number": "710"
                            }]
                        }
                    }
                },
                "airmonitor": {
                    "name": "环境监测",
                    "enable": true,
                    "module": {}
                },
                "sitemonitor": {
                    "name": "工地监控",
                    "enable": false,
                    "module": {}
                }
            }
        },
        "platformUnit": ["人", "辆", "个", "次", "吨", "立方", "小时"]
    },
    mutations: {
        "is_first": (state, data) => {
            localStorage.$isFirst = data
            state.isFirst = data
        },
    }
})