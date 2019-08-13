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
    }




}