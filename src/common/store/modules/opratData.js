//平台基本数据设置及计算
import platJson from "../../json/platData.json"
const baseData = localStorage.$baseData

const state = {
    /************先判断是否存在本地缓存，没有则取本地JSON文件进行初始化************/
    //基础数据名称
    baseDataName: baseData ? JSON.parse(baseData).name : platJson.basedata.name
}

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}