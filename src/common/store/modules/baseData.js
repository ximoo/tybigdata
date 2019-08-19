//平台基本数据设置及计算
import platJson from "../../json/platData.json"


const baseData = localStorage.$baseData
const GPSData = localStorage.$GPSData
const oprateData = localStorage.$oprateData







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
    tip: baseData ? JSON.parse(baseData).tip : platJson.basedata.tip,
    //GPS地理位置
    GPSData: GPSData ? JSON.parse(GPSData) : [],

    /************运营数据************/
    //基础运营数据名称
    oprateDataName: oprateData ? JSON.parse(oprateData).name : platJson.opratedata.name,
    //车辆在线率
    oprateVechile: oprateData ? JSON.parse(oprateData).vechile : platJson.opratedata.data.vechile,
    //车辆离线率
    oprateVechileOffLine: oprateData ? JSON.parse(oprateData).vecOffline : platJson.opratedata.data.vecOffline,
    //设备损坏率
    oprateVechileDamage: oprateData ? JSON.parse(oprateData).vecDamage : platJson.opratedata.data.vecDamage,
    //核准工地数
    oprateSite: oprateData ? JSON.parse(oprateData).site : platJson.opratedata.data.site,
    //开工工地数
    oprateSiteOnline: oprateData ? JSON.parse(oprateData).siteOnline : platJson.opratedata.data.siteOnline,
    //停工工地数
    oprateSiteOffline: oprateData ? JSON.parse(oprateData).siteOffline : platJson.opratedata.data.siteOffline,
    //可疑工地数
    oprateSiteDubious: oprateData ? JSON.parse(oprateData).siteDubious : platJson.opratedata.data.siteDubious,
    //核准消纳点数
    oprateLandfill: oprateData ? JSON.parse(oprateData).landfill : platJson.opratedata.data.landfill,
    //可疑消纳点数
    oprateLandfillDubious: oprateData ? JSON.parse(oprateData).landfillDubious : platJson.opratedata.data.landfillDubious
}

// getters
const getters = {
    adminBaseData(state, getters) {
        let baseData = [{
            label: "车辆总数",
            value: state.vechile,
            checked:true,
            unit: "辆"
        }, {
            label: "车辆在线率",
            value: parseInt(state.oprateVechile * state.vechile / 100),
            checked:true,
            unit: "辆"
        }, {
            label: "车辆离线率",
            value: parseInt(state.oprateVechileOffLine * state.vechile / 100),
            checked:true,
            unit: "辆"
        }, {
            label: "车辆设备损坏",
            value: state.oprateVechileDamage,
            checked:true,
            unit: "辆"
        }, {
            label: "核准工地数",
            value: parseInt(state.oprateSite * state.site / 100),
            checked:true,
            unit: "个"
        }, {
            label: "开工工地数",
            value: parseInt(state.oprateSiteOnline * state.site / 100),
            checked:true,
            unit: "个"
        }, {
            label: "停工工地数",
            value: parseInt(state.oprateSiteOffline * state.site / 100),
            checked:true,
            unit: "个"
        }, {
            label: "可疑工地数",
            value: parseInt(state.oprateSiteDubious * state.site / 100),
            checked:true,
            unit: "个"
        }, {
            label: "核准消纳点",
            value: parseInt(state.oprateLandfill * state.landfill / 100),
            checked:true,
            unit: "个"

        }, {
            label: "可疑消纳点",
            value: parseInt(state.oprateLandfillDubious * state.landfill / 100),
            checked:true,
            unit: "个"
        }, {
            label: "企业总数",
            value: state.company,
            checked:true,
            unit: "个"
        }]
        return baseData
    },





}

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