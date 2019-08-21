//平台基本数据设置及计算
import platJson from "../../json/platData.json"
import lib from "~/common/lib"


const baseData = localStorage.$baseData

const platformBigBaseData = localStorage.$platformBigBaseData
const platformBigOprateData = localStorage.$platformBigOprateData
const platformBigProduceData = localStorage.$platformBigProduceData

const vechileNumber = localStorage.$vechileNumber
const GPSData = localStorage.$GPSData
const platAlermSetup = localStorage.$platAlermSetup

let randomName = require("chinese-random-name");

const state = {

    alermTimes: baseData ? JSON.parse(baseData).alerm : 10,

    platformBigBaseData: platformBigBaseData ? JSON.parse(platformBigBaseData) : platJson.baseData,
    platformBigOprateData: platformBigOprateData ? JSON.parse(platformBigOprateData) : platJson.oprateData,
    platformBigProduceData: platformBigProduceData ? JSON.parse(platformBigProduceData) : platJson.produceData,

    platformVechileNumber: vechileNumber ? JSON.parse(vechileNumber) : [],
    platformGPSData: GPSData ? JSON.parse(GPSData) : [],


    //
    platformAlermSetup: platAlermSetup ? JSON.parse(platAlermSetup) : platJson.state.alermSetup,
    platformAlermVechile: []




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
                gpsinfo: gData[i],
                alerm: alermData[lib.randomNumber(0, alermData.length - 1)]
            })
        }
        localStorage.$vechileInfo = JSON.stringify(vechileInfo)
        return vechileInfo
    }






}

// actions
const actions = {}

// mutations
const mutations = {
    "changeAlerm": (state, data) => {
        state.platformAlermVechile = data
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}