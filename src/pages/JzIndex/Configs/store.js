import Vue from 'vue'
import Vuex from 'vuex'





Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isFirst: localStorage.$isFirst ? !localStorage.$isFirst : true,
        platformData: {
            state: {
                name: "城市固废资源利用云平台",
                city: "武汉市",
                adcode: "420000"
            },
            module: {
                allmonitor: {
                    name: "全局监管",
                    enable: true,
                    module: {
                        basedata: {
                            name: "基础监控数据:",
                            tip: "最多6个统计字段",
                            timer:30,
                            data: [{
                                id: 1,
                                label: "车辆总数",
                                unit: "辆",
                                number: "600"
                            }, {
                                id: 2,
                                label: "工地总数",
                                unit: "个",
                                number: "300"
                            }, {
                                id: 3,
                                label: "消纳点总数",
                                unit: "个",
                                number: "10"
                            }, {
                                id: 4,
                                label: "在线车辆",
                                unit: "辆",
                                number: "400"
                            }, {
                                id: 5,
                                label: "开工工地",
                                unit: "个",
                                number: "100"
                            }, {
                                id: 6,
                                label: "消纳量",
                                unit: "立方",
                                number: "710"
                            }]
                        },
                        operatedata: {
                            name: "运营数据-饼状图数据:",
                            tip: "统计不限项数，但要注意不要重复，默认第一项为运营车辆,数量为随机最大数",
                            timer:30,
                            data: [{
                                id: 2,
                                label: "停车车辆",
                                unit: "辆",
                                number: "300"
                            }, {
                                id: 3,
                                label: "离线车辆",
                                unit: "辆",
                                number: "10"
                            }, {
                                id: 4,
                                label: "设备损坏",
                                unit: "辆",
                                number: "400"
                            }]
                        },
                        operatedata2: {
                            name: "运营数据-柱状图数据:",
                            tip: "最多4个统计字段,数量为随机最大数",
                            timer:30,
                            data: [{
                                id: 5,
                                label: "出土次数",
                                unit: "次",
                                number: "100"
                            }, {
                                id: 6,
                                label: "出土量",
                                unit: "立方",
                                number: "710"
                            }, {
                                id: 7,
                                label: "消纳次数",
                                unit: "立方",
                                number: "710"
                            }, {
                                id: 8,
                                label: "消纳量",
                                unit: "立方",
                                number: "710"
                            }]
                        }
                    }
                },
                airmonitor: {
                    name: "环境监测",
                    enable: true,
                    module: {}
                },
                sitemonitor: {
                    name: "工地监控",
                    enable: false,
                    module: {}
                }
            }
        }
    },
    mutations: {
        "is_first": (state, data) => {
            localStorage.$isFirst = data
            state.isFirst = data
        },
    }
})