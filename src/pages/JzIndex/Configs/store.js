import Vue from 'vue'
import Vuex from 'vuex'
import API from './api';
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        "version": "3.4.19.0722",
        "isFirst": !localStorage.$platformData,
        "initStep": 0,
        "platformData": localStorage.$platformData ? JSON.parse(localStorage.$platformData) : {
            "state": {
                "name": "城市固废资源利用云平台",
                "city": "武汉市",
                "adcode": "420000",
                "center": "114.374025,30.874155",
                "districts": []
            },
            "alerms": {
                "name": "车辆报警类型",
                "number": 10,
                "timer": 5,
                "list": [{
                        "label": "超速驾驶",
                        "level": 1,
                        "enable": true
                    }, {
                        "label": "超载驾驶",
                        "level": 2,
                        "enable": true
                    }, {
                        "label": "道路抛洒",
                        "level": 3,
                        "enable": true
                    }

                    /*
                    , {
                        "label": "分神驾驶",
                        "enable": true
                    }, {
                        "label": "接打电话",
                        "enable": true
                    }, {
                        "label": "抽烟驾驶",
                        "enable": true
                    }, {
                        "label": "前方碰撞",
                        "enable": true
                    }, {
                        "label": "车道偏离",
                        "enable": true
                    }
                    */

                ]
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
                            "timer": 1800,
                            "data": []
                        },
                        "operatedata": {
                            "name": "运营数据:",
                            "data": [{
                                "name": "-饼状图:",
                                "tip": "由上一步基础数据得到饼图运营数据，默认为车辆数据。也可以对展示项进行添加删减，不限项数，但要注意不要重复,数量为随机最大数",
                                "timer": 1800,
                                "list": []
                            }, {
                                "name": "-柱状图:",
                                "tip": "由上一步基础数据得到饼图运营数据，默认为出土/消纳运营数据。也可以对展示项进行添加删减，最多4个统计字段,数量为随机最大数",
                                "timer": 1800,
                                "list": []
                            }]
                        },
                        "producedata": {
                            "name": "生产数据:",
                            "tip": "最多4个统计字段,默认为固废利用产出物统计。也可以酌情修改成其他统计数据。",
                            "timer": 1800,
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
                    "name": "场站实时状况",
                    "enable": true,
                    "module": {
                        "fences": {
                            "site": [{
                                "name": "",
                                "type": "site",
                                "icon": "el-icon-office-building",
                                "center": [],
                                "path": "",
                                "door": {
                                    enable: true,
                                    path: ""
                                },
                                "wash": {
                                    enable: true,
                                    path: ""
                                }
                            }],
                            "landfill": [{
                                "name": "",
                                "type": "landfill",
                                "icon": "el-icon-office-building",
                                "center": [],
                                "path": "",
                                "door": {
                                    enable: true,
                                    path: ""
                                },
                                "wash": {
                                    enable: true,
                                    path: ""
                                }
                            }]
                        },
                        "airmonitor": {
                            enable: true,
                            "type": []
                        },
                    }
                }
            }
        },
        "simData": {
            "vechile": [],
            "gps": [],
            "alerms": [],
            "vechileInfo": []
        },
        "mapGps": [],
        "platformUnit": ["人", "辆", "个", "台", "次", "吨", "立方", "小时"],
        "mapComponent": {
            "allComponent": null,
            "siteComponent": null,
            "airComponent": null,
            "vecComponent": null,
            "caseComponent": null
        },
        "platformAdminNav": [{
            "id": 1,
            "title": "智慧办公",
            "pid": null,
            "url": "###",
            "iconClass": null,
            "children": [{
                "id": 11,
                "title": "日常办公",
                "pid": 1,
                "url": "###",
                "iconClass": null,
                "children": [{
                    "id": 111,
                    "title": "工作台",
                    "pid": 11,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 112,
                    "title": "收发文管理",
                    "pid": 11,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 113,
                    "title": "会务管理",
                    "pid": 11,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 114,
                    "title": "消息管理",
                    "pid": 11,
                    "url": "/Message/NoticeMessage",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 115,
                    "title": "行政审批",
                    "pid": 11,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }]
            }, {
                "id": 12,
                "title": "工地消纳场管理",
                "pid": 1,
                "url": "###",
                "iconClass": null,
                "children": [{
                    "id": 121,
                    "title": "工地勘查审核",
                    "pid": 12,
                    "url": "/Site/Index",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 122,
                    "title": "消纳场备案",
                    "pid": 12,
                    "url": "/Unload/Index",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 123,
                    "title": "渣土处置工地和消纳场电子围栏划定",
                    "pid": 12,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 124,
                    "title": "二维码管理",
                    "pid": 12,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 125,
                    "title": "车辆运输核准证办理",
                    "pid": 12,
                    "url": "/RemovalPermit/Index",
                    "iconClass": null,
                    "children": null
                }]
            }, {
                "id": 13,
                "title": "督察考核工作",
                "pid": 1,
                "url": "###",
                "iconClass": null,
                "children": [{
                    "id": 131,
                    "title": "工地/消纳场开停工",
                    "pid": 13,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 132,
                    "title": "申报开工管理",
                    "pid": 13,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 133,
                    "title": "督查考核系统",
                    "pid": 13,
                    "url": "/Reports/DepartmentRank",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 134,
                    "title": "管理与执法对接",
                    "pid": 13,
                    "url": "/Event/Index",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 135,
                    "title": "考核配置",
                    "pid": 13,
                    "url": "/ConfigEvent/ConfigEvent",
                    "iconClass": null,
                    "children": null
                }]
            }, {
                "id": 14,
                "title": "企业日常管理与考核",
                "pid": 1,
                "url": "###",
                "iconClass": null,
                "children": [{
                    "id": 141,
                    "title": "车辆注册注销管理",
                    "pid": 14,
                    "url": "/VehicleAsset/VehicleInfoMgr",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 142,
                    "title": "车辆查验管理",
                    "pid": 14,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 143,
                    "title": "违规及报警信息管理",
                    "pid": 14,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 144,
                    "title": "信用评价管理",
                    "pid": 14,
                    "url": "###",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 145,
                    "title": "企业信息管理",
                    "pid": 14,
                    "url": "/Enterprise/Index",
                    "iconClass": null,
                    "children": null
                }]
            }, {
                "id": 15,
                "title": "渣土计量系统",
                "pid": 1,
                "url": "/Reports/AreaSite",
                "iconClass": null,
                "children": null
            }]
        }, {
            "id": 2,
            "title": "智慧监管",
            "pid": null,
            "url": "###",
            "iconClass": null,
            "children": [{
                "id": 21,
                "title": "工地监管",
                "pid": 2,
                "url": "/Site/siteSupervision",
                "iconClass": null,
                "children": null
            }, {
                "id": 22,
                "title": "消纳场监管",
                "pid": 2,
                "url": "/Unload/UnloadSupervision",
                "iconClass": null,
                "children": null
            }, {
                "id": 23,
                "title": "车辆监管",
                "pid": 2,
                "url": "/MapView/Index",
                "iconClass": null,
                "children": null
            }, {
                "id": 24,
                "title": "视频监管",
                "pid": 2,
                "url": "/Vehicle/Video2",
                "iconClass": null,
                "children": null
            }]
        }, {
            "id": 3,
            "title": "智慧服务",
            "pid": null,
            "url": "###",
            "iconClass": null,
            "children": [{
                "id": 31,
                "title": "出土统计",
                "pid": 3,
                "url": "###",
                "iconClass": null,
                "children": [{
                    "id": 311,
                    "title": "每日出土工地",
                    "pid": 31,
                    "url": "/Reports/SiteDayStat",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 312,
                    "title": "工地车辆出土",
                    "pid": 31,
                    "url": "/Reports/SiteVehWorkNormal",
                    "iconClass": null,
                    "children": null
                }]
            }, {
                "id": 32,
                "title": "车辆统计",
                "pid": 3,
                "url": "###",
                "iconClass": null,
                "children": [{
                    "id": 321,
                    "title": "报警统计",
                    "pid": 32,
                    "url": "/Reports/AlarmStats",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 322,
                    "title": "历史轨迹报表",
                    "pid": 32,
                    "url": "/Reports/HisLoc",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 323,
                    "title": "里程统计",
                    "pid": 32,
                    "url": "/Reports/Mileages",
                    "iconClass": null,
                    "children": null
                }]
            }]
        }, {
            "id": 4,
            "title": "系统管理",
            "pid": null,
            "url": "###",
            "iconClass": null,
            "children": [{
                "id": 41,
                "title": "账号管理",
                "pid": 4,
                "url": "###",
                "iconClass": null,
                "children": [{
                    "id": 411,
                    "title": "用户管理",
                    "pid": 41,
                    "url": "/User/Index",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 412,
                    "title": "网格",
                    "pid": 41,
                    "url": "/CloudMap/Grid",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 413,
                    "title": "角色管理",
                    "pid": 41,
                    "url": "/Role/Index",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 414,
                    "title": "数据权限管理",
                    "pid": 41,
                    "url": "/RolePermissionScope/Index",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 415,
                    "title": "人员标签",
                    "pid": 41,
                    "url": "/Tag/Index",
                    "iconClass": null,
                    "children": null
                }, {
                    "id": 416,
                    "title": "网格人员设置",
                    "pid": 41,
                    "url": "/CloudMapUser/Index",
                    "iconClass": null,
                    "children": null
                }]
            }, {
                "id": 42,
                "title": "部门管理",
                "pid": 4,
                "url": "/Department/Index",
                "iconClass": null,
                "children": null
            }, {
                "id": 43,
                "title": "内控管理",
                "pid": 4,
                "url": "###",
                "iconClass": null,
                "children": [{
                    "id": 431,
                    "title": "后台检测日志",
                    "pid": 43,
                    "url": "/DataRecord/EntChangelog",
                    "iconClass": null,
                    "children": null
                },{
                    "id": 432,
                    "title": "操作日志",
                    "pid": 43,
                    "url": "/Message/ReceiveMessage",
                    "iconClass": null,
                    "children": null
                }]
            }]
        }]
    },
    mutations: {
        "adminPass": (state) => {
            if (localStorage.$platformData) {
                state.platformData = JSON.parse(localStorage.$platformData)
            }
            localStorage.removeItem("$simdata");
            state.isFirst = true;
            state.initStep = 0
        },
        "init_data": (state) => {
            if (localStorage.$platformData) {
                state.platformData = JSON.parse(localStorage.$platformData)
            }
            if (localStorage.$simdata) {
                state.simData = JSON.parse(localStorage.$simdata)
            }
        },
        "cntTreData": (state, data) => {
            // console.log(data)
            state.platformData.module.allmonitor.module.operatedata.data[1].list = data
        },
        "handle_step": (state, data) => {
            state.initStep = data
            if (data == 1) {
                for (var i in state.platformData.alerms.list) {
                    if (state.platformData.alerms.list[i].enable) {
                        state.simData.alerms.push(i)
                    }
                }
                axios.get(API.GET_AREACODE + "&extensions=all&subdistrict=1&keywords=" + state.platformData.state.city).then((res) => {
                    if (res.data.status === '1') {
                        console.log(res.data)
                        // state.platformData.state.city = res.data.city
                        state.platformData.state.adcode = res.data.districts[0].adcode
                        state.platformData.state.center = res.data.districts[0].center
                        state.platformData.state.districts = res.data.districts[0].districts
                    } else {
                        alert("没有定位成功")
                    }
                }).catch((error) => {
                    console.log(error)
                })
            }
            if (data == 2) {}
            if (data == 3) {}
            if (data == 4) {
                localStorage.$platformData = JSON.stringify(state.platformData)
                localStorage.$simdata = JSON.stringify(state.simData)
                setTimeout(function () {
                    state.isFirst = false;
                    window.location.reload()
                }, 5000)
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

                if (res.data.status === '1') {
                    state.platformData.state.city = res.data.city
                    state.platformData.state.adcode = res.data.adcode
                    state.platformData.state.regions = res.data






                } else {
                    alert("没有定位成功")
                }
            })
        },

        "importCfg": (state, data) => {
            console.log(JSON.parse(data))
            let resouceData = JSON.parse(data)
            state.platformData = resouceData.platformData
            state.simData = resouceData.simData
            localStorage.$platformData = JSON.stringify(state.platformData)
            localStorage.$simdata = JSON.stringify(state.simData)
            state.initStep = 2
        },



        //模拟车牌号
        "simVechile": (state, data) => {
            state.simData.vechile = data
            localStorage.$simdata = JSON.stringify(state.simData)
        },
        "simGps": (state, data) => {
            state.simData.gps = data
            // localStorage.$gps = JSON.stringify(data)
            localStorage.$simdata = JSON.stringify(state.simData)
        },
        "simMapGps": (state, data) => {
            state.mapGps = data
            localStorage.$simdata = JSON.stringify(state.simData)
        },
        "simVechileData": (state, data) => {
            console.log(data)
            state.simData.vechileInfo = data
            localStorage.$simdata = JSON.stringify(state.simData)
        },

        "recodePath": (state, data) => {
            // console.log(data.index)
            if (data.door.path.length <= 0) data.door.path = ""
            if (data.wash.path.length <= 0) data.wash.path = ""
            switch (data.type) {
                case "site":
                    state.platformData.module.sitemonitor.module.fences.site[data.index].icon = 'el-icon-office-building'
                    state.platformData.module.sitemonitor.module.fences.site[data.index].adcode = data.adcode
                    state.platformData.module.sitemonitor.module.fences.site[data.index].address = data.address
                    state.platformData.module.sitemonitor.module.fences.site[data.index].center = data.center
                    state.platformData.module.sitemonitor.module.fences.site[data.index].district = data.district
                    state.platformData.module.sitemonitor.module.fences.site[data.index].path = data.path
                    state.platformData.module.sitemonitor.module.fences.site[data.index].door.path = data.door.path
                    state.platformData.module.sitemonitor.module.fences.site[data.index].wash.path = data.wash.path
                    break;

                case "landfill":
                    state.platformData.module.sitemonitor.module.fences.landfill[data.index].icon = 'el-icon-office-building'
                    state.platformData.module.sitemonitor.module.fences.landfill[data.index].adcode = data.adcode
                    state.platformData.module.sitemonitor.module.fences.landfill[data.index].address = data.address
                    state.platformData.module.sitemonitor.module.fences.landfill[data.index].center = data.center
                    state.platformData.module.sitemonitor.module.fences.landfill[data.index].district = data.district
                    state.platformData.module.sitemonitor.module.fences.landfill[data.index].path = data.path
                    state.platformData.module.sitemonitor.module.fences.landfill[data.index].door.path = data.door.path
                    state.platformData.module.sitemonitor.module.fences.landfill[data.index].wash.path = data.wash.path
                    break;

            }


        }
    },
    getters: {}
})