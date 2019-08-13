//平台基本数据设置及计算
import platJson from "../../json/platData.json"
const baseData = localStorage.$baseData

const state = {
    /************先判断是否存在本地缓存，没有则取本地JSON文件进行初始化************/
    //基础数据名称
    baseDataName: baseData ? JSON.parse(baseData).name : platJson.basedata.name,
    //车辆总数
    vechile: baseData ? JSON.parse(baseData).vechile : platJson.basedata.data.vechile,
    //工地总数
    site: baseData ? JSON.parse(baseData).site : platJson.basedata.data.site,
    //消纳点总数
    landfill: baseData ? JSON.parse(baseData).landfill : platJson.basedata.data.landfill,
    //企业总数
    company: baseData ? JSON.parse(baseData).company : platJson.basedata.data.company,
    //模拟地理位置种子
    gpsSeed: baseData ? JSON.parse(baseData).gpsSeed : platJson.basedata.data.gpsSeed,
    //提示
    tip: baseData ? JSON.parse(baseData).tip : platJson.basedata.tip
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