// const   BaseData = JSON.parse(localStorage.$platformData)



const cardJson = require("../simData/cardCallerloc.json")


export default {
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
    simVechileData: function (number, city) { //模拟车辆数据
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




        console.log(ukeys)


        return ukeys

    }
}