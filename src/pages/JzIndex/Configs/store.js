import Vue from 'vue'
import Vuex from 'vuex'
import API from './api';
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        "version": "3.4.19.0703",
        "isFirst": !localStorage.$platformData,
        "initStep": 0,
        "platformData": localStorage.$platformData ? JSON.parse(localStorage.$platformData) : {
            "state": {
                "name": "城市固废资源利用云平台",
                "city": "武汉市",
                "adcode": "420000",
                "center": "114.374025,30.874155",
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
            "basedata": {
                "name": "基础数据：",
                "tip": "演示平台的基本资产单位数据，平台将根据这些数据模拟生成动态数据，填入的数量为最大数量。",
                "timer": 30,
                "data": [{
                        "id": 11,
                        "label": "车辆总数",
                        "unit": "辆",
                        "number": "600",
                        "required": true
                    }, {
                        "id": 12,
                        "label": "在线车辆",
                        "unit": "辆",
                        "number": "300",
                        "required": true
                    },
                    {
                        "id": 13,
                        "label": "停车车辆",
                        "unit": "辆",
                        "number": "710",
                        "required": false
                    },
                    {
                        "id": 14,
                        "label": "离线车辆",
                        "unit": "辆",
                        "number": "710",
                        "required": false
                    },
                    {
                        "id": 15,
                        "label": "设备损坏",
                        "unit": "辆",
                        "number": "710",
                        "required": false
                    },
                    {
                        "id": 21,
                        "label": "工地总数",
                        "unit": "个",
                        "number": "300",
                        "required": true
                    },
                    {
                        "id": 22,
                        "label": "开工工地",
                        "unit": "个",
                        "number": "30",
                        "required": true
                    },
                    {
                        "id": 23,
                        "label": "出土量",
                        "unit": "立方",
                        "number": "710",
                        "required": false
                    },
                    {
                        "id": 24,
                        "label": "出土次数",
                        "unit": "次",
                        "number": "710",
                        "required": false
                    },
                    {
                        "id": 31,
                        "label": "消纳点总数",
                        "unit": "个",
                        "number": "10",
                        "required": true
                    },
                    {
                        "id": 32,
                        "label": "运营消纳点",
                        "unit": "个",
                        "number": "30",
                        "required": true
                    },
                    {
                        "id": 33,
                        "label": "消纳量",
                        "unit": "立方",
                        "number": "710",
                        "required": false
                    },
                    {
                        "id": 34,
                        "label": "消纳次数",
                        "unit": "次",
                        "number": "710",
                        "required": false
                    }
                ]
            },
            "module": {
                "allmonitor": {
                    "name": "全局监管",
                    "enable": true,
                    "module": {
                        "basedata": {
                            "name": "基础监控数据：",
                            "tip": "由上一步基础数据得到左上角基本监控数据展示，您可以在这里修改展示字段名称，数量可通过返回上一步进行修改。也可以对展示项进行删减，建议最少留3项。",
                            "timer": 30,
                            "data": []
                        },
                        "operatedata": {
                            "name": "运营数据:",
                            "data": [{
                                "name": "-饼状图:",
                                "tip": "由上一步基础数据得到饼图运营数据，默认为车辆数据。也可以对展示项进行添加删减，不限项数，但要注意不要重复,数量为随机最大数",
                                "timer": 30,
                                "list": []
                            }, {
                                "name": "-柱状图:",
                                "tip": "由上一步基础数据得到饼图运营数据，默认为出土/消纳运营数据。也可以对展示项进行添加删减，最多4个统计字段,数量为随机最大数",
                                "timer": 30,
                                "list": []
                            }]
                        },
                        "producedata": {
                            "name": "生产数据:",
                            "tip": "最多4个统计字段,默认为固废利用产出物统计。也可以酌情修改成其他统计数据。",
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
        "platformUnit": ["人", "辆", "个", "台", "次", "吨", "立方", "小时"]
    },
    mutations: {
        "adminPass": (state) => {
            if (localStorage.$platformData) {
                state.platformData = JSON.parse(localStorage.$platformData)
            }
            // localStorage.removeItem("$platformData");
            state.isFirst = true;
            state.initStep = 0
        },
        "init_data": (state) => {
            if (localStorage.$platformData) {
                state.platformData = JSON.parse(localStorage.$platformData)
            }
        },
        "handle_step": (state, data) => {
            state.initStep = data
            if (data == 1) {
                axios.get(API.GET_AREACODE + "&extensions=all&subdistrict=1&keywords=" + state.platformData.state.city).then((res) => {

                    if (res.data.status === '1') {
                        // state.platformData.state.city = res.data.city
                        state.platformData.state.adcode = res.data.districts[0].adcode
                        state.platformData.state.center = res.data.districts[0].center
                    } else {
                        alert("没有定位成功")
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
            if (data == 2) {
                console.log(data)
                // localStorage.$platformData = JSON.stringify(state.platformData)
                // state.isFirst = false
                // localStorage.$isFirst = false
                // return false
            }
            if (data == 3) {
                console.log(data)
                localStorage.$platformData = JSON.stringify(state.platformData)
                state.isFirst = false
                // localStorage.$isFirst = false
            }
        },
        "hanlde_basedata": (state) => {
            let tempData = state.platformData.basedata.data
            let tempBaseData = new Array()
            for (var i in tempData) {
                switch (tempData[i]["id"]) {
                    case 11:
                        tempBaseData.push(tempData[i])
                        break;
                    case 21:
                        tempBaseData.push(tempData[i])
                        break;
                    case 31:
                        tempBaseData.push(tempData[i])
                        break;
                    case 12:
                        tempBaseData.push(tempData[i])
                        break;
                    case 22:
                        tempBaseData.push(tempData[i])
                        break;
                    case 32:
                        tempBaseData.push(tempData[i])
                        break;
                }
            }
            state.platformData.module.allmonitor.module.basedata.data = tempBaseData
        },
        "hanlde_operatedata": (state) => {
            let tempData = state.platformData.basedata.data
            let tempBaseData = new Array()
            for (var i in tempData) {
                switch (tempData[i]["id"]) {
                    case 12:
                        tempBaseData.push(tempData[i])
                        break;
                    case 13:
                        tempBaseData.push(tempData[i])
                        break;
                    case 14:
                        tempBaseData.push(tempData[i])
                        break;
                    case 15:
                        tempBaseData.push(tempData[i])
                        break;
                }
            }
            state.platformData.module.allmonitor.module.operatedata.data[0].list = tempBaseData
        },
        "hanlde_operatedata2": (state) => {
            let tempData = state.platformData.basedata.data
            let tempBaseData = new Array()
            for (var i in tempData) {
                switch (tempData[i]["id"]) {
                    case 23:
                        tempBaseData.push(tempData[i])
                        break;
                    case 24:
                        tempBaseData.push(tempData[i])
                        break;
                    case 33:
                        tempBaseData.push(tempData[i])
                        break;
                    case 34:
                        tempBaseData.push(tempData[i])
                        break;
                }
            }
            state.platformData.module.allmonitor.module.operatedata.data[1].list = tempBaseData
        },
        "getCity": (state) => {
            axios.get(API.GET_CITY).then((res) => {
                console.log(res)
                if (res.data.status === '1') {
                    state.platformData.state.city = res.data.city
                    state.platformData.state.adcode = res.data.adcode
                } else {
                    alert("没有定位成功")
                }
            })
        },
    },
    getters: {}
})