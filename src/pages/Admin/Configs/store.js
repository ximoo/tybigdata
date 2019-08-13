import Vue from 'vue'
import Vuex from 'vuex'
import mainStore from "../../JzIndex/Configs/store";



Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        version: localStorage.$version ? localStorage.$version : mainStore.state.version,
        platformAdminNav: localStorage.$platformAdminNav ? JSON.parse(localStorage.$platformAdminNav) : mainStore.state.platformAdminNav,
        platformData: localStorage.$platformData ? JSON.parse(localStorage.$platformData) : null,
        platformBigData: localStorage.$platformBigData ?
            JSON.parse(localStorage.$platformBigData) : {
                baseData: {
                    name: "基础监控数据",
                    edit: false,
                    data: []
                }
            },
        platformBaseData: localStorage.$platformBaseData ?
            JSON.parse(localStorage.$platformBaseData) : {}, //平台核心数据
        platformOperatData: localStorage.$platformOperatData ?
            JSON.parse(localStorage.$platformOperatData) : {}, //基础运营数据
        simData: localStorage.$simdata ? JSON.parse(localStorage.$simdata) : null,
    },
    mutations: {
        "storeNav": (state, data) => {
            state.platformAdminNav = data
            localStorage.$platformAdminNav = JSON.stringify(data)



        }

    },
    getters: {
        adminBaseData(state) {
            let baseData = state.platformBigData.baseData;
            let currentData = []
            for (var key in state.platformBaseData) {
                switch (key) {
                    case "vechile":
                        let vecTotal = state.platformBaseData[key],
                            vecOnline = Math.round(
                                (state.platformBaseData[key] * state.platformOperatData.vechile) / 100
                            ),
                            vecOffline = Math.round(
                                (state.platformBaseData[key] * state.platformOperatData.vecOffline) / 100
                            ),
                            vecDamage = Math.round(
                                (state.platformBaseData[key] * state.platformOperatData.vecDamage) / 100
                            );

                        currentData.push({
                            id: 11,
                            label: "车辆总数",
                            unit: "辆",
                            value: vecTotal,
                            checked: true
                        }, {
                            id: 12,
                            label: "在线车辆",
                            unit: "辆",
                            value: vecOnline,
                            checked: true
                        }, {
                            id: 13,
                            label: "离线车辆",
                            unit: "辆",
                            value: vecOffline,
                            checked: true
                        }, {
                            id: 14,
                            label: "设备损坏",
                            unit: "辆",
                            value: vecDamage,
                            checked: false
                        });

                        break;
                    case "site":
                        currentData.push({
                            id: 21,
                            label: "核准工地",
                            unit: "个",
                            value: Math.round(
                                (state.platformBaseData[key] * state.platformOperatData.site) / 100
                            ),
                            checked: true
                        }, {
                            id: 22,
                            label: "可疑工地",
                            unit: "个",
                            value: Math.round(
                                (state.platformBaseData[key] * state.platformOperatData.siteDubious) / 100
                            ),
                            checked: false
                        }, {
                            id: 23,
                            label: "开工工地",
                            unit: "个",
                            value: Math.round(
                                (state.platformBaseData[key] *
                                    state.platformOperatData.siteOnline *
                                    state.platformOperatData.site) /
                                10000
                            ),
                            checked: true
                        }, {
                            id: 24,
                            label: "停工工地",
                            unit: "个",
                            value: Math.round(
                                (state.platformBaseData[key] *
                                    state.platformOperatData.siteOffline *
                                    state.platformOperatData.site) /
                                10000
                            ),
                            checked: false
                        });

                        break;
                    case "landfill":
                        currentData.push({
                            id: 31,
                            label: "核准消纳点",
                            unit: "个",
                            value: Math.round(
                                (state.platformBaseData[key] * state.platformOperatData.landfill) / 100
                            ),
                            checked: true
                        }, {
                            id: 32,
                            label: "可疑消纳点",
                            unit: "个",
                            value: Math.round(
                                (state.platformBaseData[key] * state.platformOperatData.landfillDubious) /
                                100
                            ),
                            checked: false
                        });

                        break;
                    case "company":
                        currentData.push({
                            id: 31,
                            label: "资质企业总数",
                            unit: "个",
                            value: state.platformBaseData[key],
                            checked: true
                        });
                        break;
                }
            }
            return baseData;
        }
    }
})