export default {
    getCurrentDb(name) {
        //打开数据库，或者直接连接数据库参数：数据库名称，版本，概述，大小
        //如果数据库不存在那么创建之
        var db = openDatabase(name, "1.0", name, 1024 * 1024);;
        return db;
    },


    //checked return
    getChecked(obj) {
        let cBD = []
        if (typeof obj === "object") {
            for (var i in obj) {
                if (obj[i].checked) {
                    cBD.push(obj[i]);
                }
            }
            return cBD
        }
    },

    //数组排重
    distinct(arr) {
        let result = {};
        let finalResult = [];
        for (let i = 0; i < arr.length; i++) {
            result[arr[i].url] = arr[i];
        }
        for (var item in result) {
            finalResult.push(result[item]);
        }
        return finalResult;
    },


    //获取随机数
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min, 0);
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