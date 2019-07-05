// const   BaseData = JSON.parse(localStorage.$platformData)



const cardJson = require("../simData/cardCallerloc.json")
import api from "../Configs/api"
import store from "../Configs/store"
import axios from 'axios'


export default {

    poiArray: [],



    cardCallerloc: function (city) {
        let tempArray = new Array()
        for (var i in cardJson) {
            if (city.indexOf(cardJson[i]["city"]) != -1) {
                //  console.log(cardJson[i]["code"])
                tempArray.push(cardJson[i]["code"])
            }
        }
        return tempArray

    },
    randomVehile: function (number, city) { //模拟车辆数据
        let cardCallerloc = this.cardCallerloc(city)
        // 生成十位字母加数字随机数
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
        return ukeys

    },




    randomVechileGps: function (number, adcode) {
        let self = this
        let getPoiUrl = api.GET_POI + "&keywords='atm'&extensions=all&citylimit=true&city=" + adcode
        axios.get(getPoiUrl).then((res) => {
            console.log(res)
            if (res.data.status = "1") {
                let pois = res.data.pois
                for (var i in pois) {
                    self.poiArray.push({
                        address: pois[i].address,
                        location: pois[i].location
                    })
                    self.getAroundGps(res.data.pois[i].location, adcode)
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    },


    getAroundGps: function (location, adcode) {
        let self = this
        let getPoiAroundUrl = api.GET_AROUND + "&extensions=all&radius=50000&citylimit=true&city=" + adcode + "&location=" + location
        axios.get(getPoiAroundUrl).then((res) => {
            // console.log(res)
            for (var i in res.data.pois) {
                self.poiArray.push({
                    address: res.data.pois[i].address,
                    location: res.data.pois[i].location
                })
                store.commit("simGps",self.poiArray)
                // self.getAroundGps2(res.data.pois[i].location, adcode)

            }
        }).catch((error) => {
            console.log(error)
        })
    },

    getAroundGps2: function (location, adcode) {
        let self = this
        let getPoiAroundUrl = api.GET_AROUND + "&extensions=all&radius=50000&citylimit=true&city=" + adcode + "&location=" + location
        axios.get(getPoiAroundUrl).then((res) => {
            // console.log(res)
            for (var i in res.data.pois) {
                self.poiArray.push({
                    address: res.data.pois[i].address,
                    location: res.data.pois[i].location
                })
            }
            // console.log(self.poiArray)
            // return self.poiArray

            store.commit("simGps",self.poiArray)

        }).catch((error) => {
            console.log(error)
        })
    },


    randomLib(min, max) {
        return Math.round(Math.random() * (max - min + 1) + min, 10);
    },


    nowTimer() {
        var date = new Date();
        var seperator1 = "/";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        var begintime_ms = new Date(currentdate); //begintime 为开始时间
        var endtime_ms = new Date(); // endtime 为结束时间
        var date3 = endtime_ms.getTime() - begintime_ms.getTime() //时间差的毫秒数
        //计算出小时数
        var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
        var hours = Math.floor(leave1 / (3600 * 1000))
        return hours
    }





}