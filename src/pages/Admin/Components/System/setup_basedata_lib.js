const cardJson = require("../../common/json/cardCallerloc.json")



export default {
    //获取平台信息
    getPlatformState() {
        let platformState = localStorage.$platformState ? JSON.parse(localStorage.$platformState) : {
            name: "",
            city: null,
            adcode: null,
            center: null,
            regions: null,
            districts: [],
            districtsSelect: [],
            showCity: true,
            showWeather: true,
            edit: false
        }
        return platformState
    },

    //设置平台信息
    setPlatformState(data) {
        let platData = JSON.stringify(data)
        localStorage.$platData = platData
        return true
    },

    //获取基础数据
    getPlatformBaseData() {
        let platformBaseData = localStorage.$platformBaseData ? JSON.parse(localStorage.$platformBaseData) : {
            vechile: 0,
            site: 0,
            landfill: 0,
            company: 0,
            gpsSeed: "车站",
            edit: false
        }
        return platformBaseData
    },

    //设置基础数据
    setPlatformBaseData(data) {
        let baseData = JSON.stringify(data)
        localStorage.$baseData = baseData
        return true
    },

    //获取运营数据
    getPlatformOperatData() {
        let platformOperatData = localStorage.$platformOperatData ? JSON.parse(localStorage.$platformOperatData) : {
            vechile: 100,
            vecOffline: 0,
            vecDamage: 0,
            site: 100,
            siteOnline: 100,
            siteOffline: 0,
            siteDubious: 0,
            landfill: 100,
            landfillDubious: 0,
            edit: false
        }
        return platformOperatData
    },

    //设置运营数据
    setPlatformOperateData(data) {
        let platformOprateData = JSON.stringify(data)
        localStorage.$oprateData = platformOprateData
        return true
    },



    //获取JSON字段值
    getJsonValue(obj, name) {
        var result = null;
        var value = null;
        for (var key in obj) {
            value = obj[key];
            if (key == name) {
                return value;
            } else {
                if (typeof value == "object") {
                    result = getJsonValue(value, name);
                }
            }
        }
        return result;
    },




    //模拟各种数据
    vechileNumber: [],
    poiArray: [],
    cardCallerloc(city) {

        let tempArray = new Array()
        for (var i in cardJson) {
            if (city.indexOf(cardJson[i]["city"]) != -1) {
                //  console.log(cardJson[i]["code"])
                tempArray.push(cardJson[i]["code"])
            }
        }
        return tempArray

    },

    simVechile(number, city) { //模拟车辆数据
        let self = this
        let cardCallerloc = self.cardCallerloc(city)
        var arr = [];
        for (var i = 0; i < number; i++) {
            var n = Math.random().toString(36).substr(2, 5);
            arr.push(n);
        }
        // 去重
        var ukeys = [];
        for (var i = 0; i < arr.length; i++) {
            if (ukeys.indexOf(arr[i]) == -1) {
                ukeys.push(cardCallerloc[Math.round(Math.random() * (cardCallerloc.length - 1))] + arr[i].toUpperCase());
            }
        }
        self.vechileNumber = ukeys
        return {
            vechileNumber: ukeys,
            status: true
        }
    },



}