//平台基本数据设置及计算
import platJson from "../../json/platData.json"
import lib from "~/common/lib"


const baseData = localStorage.$baseData
const platformBigBaseData = localStorage.$platformBigBaseData
const platformBigOprateData = localStorage.$platformBigOprateData
const platformBigProduceData = localStorage.$platformBigProduceData
const platformBigModuleData = localStorage.$platformBigModuleData

const vechileNumber = localStorage.$vechileNumber
const GPSData = localStorage.$GPSData
const SiteInfo = localStorage.$SiteInfo
const platAlermSetup = localStorage.$platAlermSetup


const hisTralDots = localStorage.$hisTralDots


let randomName = require("chinese-random-name");

const state = {

    alermTimes: baseData ? JSON.parse(baseData).alerm : 10,
    platformBigBaseData: platformBigBaseData ? JSON.parse(platformBigBaseData) : platJson.baseData,
    platformBigOprateData: platformBigOprateData ? JSON.parse(platformBigOprateData) : platJson.oprateData,
    platformBigProduceData: platformBigProduceData ? JSON.parse(platformBigProduceData) : platJson.produceData,
    platformVechileNumber: vechileNumber ? JSON.parse(vechileNumber) : [],
    platformGPSData: GPSData ? JSON.parse(GPSData) : [],
    platformSiteInfo: SiteInfo ? JSON.parse(SiteInfo) : [{
        name: "爱的发顺丰",
        
    }],





    //
    platformAlermSetup: platAlermSetup ? JSON.parse(platAlermSetup) : platJson.state.alermSetup,
    platformAlermVechile: [],

    //模块控制
    platformBigModuleData: platformBigModuleData ? JSON.parse(platformBigModuleData) : platJson.bigModule,

    //模拟数据
    hisTralDots: hisTralDots ? JSON.parse(hisTralDots) : null

}

// getters
const getters = {

    alermData(state, getters) {
        let alertData = state.platformAlermSetup
        let alermData = new Array()
        for (var i in alertData) {
            if (alertData[i].selected && alertData[i].list.length > 0) {
                for (var x in alertData[i].list) {
                    if (alertData[i].list[x].checked) {
                        alermData.push(alertData[i].list[x])
                    }
                }
            }
        }
        return alermData
    },

    vechileInfo(state, getters) {
        let alermData = getters.alermData
        let vecNumber = state.platformVechileNumber
        let gData = state.platformGPSData
        let vecSize = vecNumber.length
        let vechileInfo = new Array()
        for (var i = 0; i < vecSize; i++) {
            vechileInfo.push({
                vechileNumber: vecNumber[i],
                driver: randomName.generate(),
                gpsinfo: gData[lib.randomNumber(0, gData.length - 1)],
                alerm: alermData[lib.randomNumber(0, alermData.length - 1)],
                status: lib.randomNumber(0, 4),
                mileage: lib.randomNumber(10000, 50000),
            })
        }
        localStorage.$vechileInfo = JSON.stringify(vechileInfo)
        return vechileInfo
    },

    siteInfo(state, getters) {
        let platformSiteInfo = state.platformSiteInfo
        let gData = state.platformGPSData
        let siteSize = platformSiteInfo.length = 0 ? 1 : platformSiteInfo.length
        let siteInfo = new Array()

        for (var i = 0; i < siteSize; i++) {
            siteInfo.push({
                name: i + "号工地",
                gpsinfo: gData[lib.randomNumber(0, gData.length - 1)],
            })
        }
        return siteInfo
    }




}

// actions
const actions = {}

// mutations
const mutations = {
    "changeAlerm": (state, data) => {
        state.platformAlermVechile = data
    },





}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}