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
    },

    //
    /**
     * 本地数据库
     * 操作本地数据库的最基本的步骤是：
     * 第一步：openDatabase方法：创建一个访问数据库的对象。
     * 第二步：使用第一步创建的数据库访问对象来执行transaction方法，通过此方法可以设置一个开启事务成功的事件响应方法，在事件响应方法中可以执行SQL.
     * 第三步：通过executeSql方法执行查询，当然查询可以是：CRUD。
     */
    dataBaseCRUD() {
        var dataBase = openDatabase("school", "1.0", "学校数据库", 1024 * 1024, function () {
            console.info("创建学校数据库成功！");
        });
        /**
         * （1）openDatabase方法打开一个已经存在的数据库，如果数据库不存在，它还可以创建数据库。几个参数意义分别是：
         *     1，数据库名称。
         *     2，数据库的版本号，目前来说传个1.0就可以了，当然可以不填；
         *     3，对数据库的描述。
         *     4，设置分配的数据库的大小（单位是kb）。
         *     5，回调函数(可省略)。
         */
        if (!dataBase) {
            console.info("当前浏览器不支持Html5本地数据库");
            return false;
        } else {

            dataBase.transaction(function (ts) { //启动一个事务，并设置回调函数
                ts.executeSql("create table if not exists Student(id int,name text null,age int,sex text null)", [], function (ts, result) {
                    console.info("创建数据库成功" + result);
                }, function (ts, message) {
                    console.info("创建数据库失败", message);
                });
            });

            dataBase.transaction(function (ts) {
                ts.executeSql("insert into Student(id,name,age,sex) values(?,?,?,?) ", [1, "小明", 21, "男"], function (ts, result) {
                    console.info("插入数据成功！" + result);
                }, function (ts, message) {
                    console.info("插入数据失败！" + message);
                });
            });

            dataBase.transaction(function (ts) {
                ts.executeSql("insert into Student(id,name,age,sex) values(?,?,?,?) ", [2, "小红", 20, "女"], function (ts, result) {
                    console.info("插入数据成功！" + result);
                }, function (ts, message) {
                    console.info("插入数据失败！" + message);
                });
            });

            dataBase.transaction(function (ts) {
                ts.executeSql("update Student set name = ? where id = ? ", ["小红s", 2], function (ts, result) {
                    console.info("更新数据成功！" + result);
                }, function (ts, message) {
                    console.info("更新数据失败！" + message);
                });
            });

            dataBase.transaction(function (ts) {
                ts.executeSql("delete from Student where id = ? ", [2], function (ts, result) {
                    console.info("删除数据成功！" + result);
                }, function (ts, message) {
                    console.info("删除数据失败！" + message);
                });
            });

            dataBase.transaction(function (ts) {
                ts.executeSql("select * from Student ", [], function (ts, result) {
                    if (result) {
                        for (var i = 0; i < result.rows.length; i++) {
                            console.info((result.rows.item(i)));
                        }
                    }
                    console.info("查询数据成功！");
                }, function (ts, message) {
                    console.info("查询数据失败！" + message);
                });
            });
        }
        /**
         * （2）db.transaction方法可以设置一个回调函数，此函数可以接受一个参数就是我们开启的事务的对象。然后通过此对象可以进行执行Sql脚本，跟下面的步骤可以结合起来。
         * （3）通过executeSql方法执行查询。
         *      ts.executeSql(sqlQuery,[value1,value2..],dataHandler,errorHandler)
         *      参数说明：
         *      1，sqlQuery：需要具体执行的sql语句，可以是create、select、update、delete；
         *      2，[value1,value2..]：sql语句中所有使用到的参数的数组，在executeSql方法中，将s>语句中所要使用的参数先用“?”代替，然后依次将这些参数组成数组放在第二个参数中
         *      3，dataHandler：执行成功是调用的回调函数，通过该函数可以获得查询结果集；
         *      4，errorHandler：执行失败时调用的回调函数；
         * 
         */
    },


}