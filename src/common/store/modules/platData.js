import lib from "~/pages/Admin/common/lib/layout.lib"

//平台基本数据设置及计算
import platJson from "../../json/platData.json"
import platNav from "~/pages/Admin/common/json/nav.json"

const platData = localStorage.$platData
const platAdminNav = localStorage.$platAdminNav
const platTabMenu = localStorage.$platTabMenu
const platAlermSetup = localStorage.$platAlermSetup

let version = localStorage.$version
localStorage.$version = platJson.version


const state = {
    /************先判断是否存在本地缓存，没有则取本地JSON文件进行初始化************/
    //版本号
    version: version ? version : platJson.version,
    //定位的城市
    platformCity: platData ? JSON.parse(platData).city : platJson.state.city,
    adcode: platData ? JSON.parse(platData).adcode : platJson.state.adcode,
    platformCenter: platData ? JSON.parse(platData).center : platJson.state.center,
    //是否标题显示城市名称
    showCity: platData ? JSON.parse(platData).showCity : platJson.state.showCity,
    //平台名称
    platformName: platData ? JSON.parse(platData).name : platJson.state.name,
    //是否显示天气
    showWeather: platData ? JSON.parse(platData).showWeather : platJson.state.showWeather,
    //城市行政区
    platformDistricts: platData ? JSON.parse(platData).districts : platJson.state.districts,
    //城市行政区选择
    platformDistrictsSelect: platData ? JSON.parse(platData).districtsSelect : platJson.state.districtsSelect,

    //
    platformAlermSetup: platAlermSetup ? JSON.parse(platAlermSetup) : platJson.state.alermSetup,

    //后台菜单
    platformAdminNav: platAdminNav ? JSON.parse(platAdminNav) : platNav,
    //菜单选项卡
    platformTabMenu: platTabMenu ? JSON.parse(platTabMenu) : [{
        url: '/index',
        name: '首页',
        meta: {
            title: '首页',
            keepAlive: true,
            menuID: null,
            pid: null
        }
    }]
}

// getters
const getters = {



}

// actions
const actions = {



}

// mutations
const mutations = {
    "StoreTabMenu": (state, data) => {
        state.platformTabMenu = data
        localStorage.$platTabMenu = data
    }



}



export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}