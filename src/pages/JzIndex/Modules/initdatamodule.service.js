const service = {};
import API from '../Configs/api';
let platformData = new Object();


const dialogWidth = ["40%", "60%"];





// //初始化数据
// service.init = (that) => {
//     platformState = JSON.parse(localStorage.$platformState)
//     return platformState
// }



service.initStep = (step, that) => {
    if (service.isFirst) {
        that.noIpt = true;
        switch (step) {
            case 0: //第一步：设置平台的一些相关属性数据初始化
                that.initStep = 0
                break;
            case 1: //第一步：设置平台的一些相关属性数据初始化
                that.initStep = 1
                break;
        }




    }










}









//是否第一次打开系统
service.isFirst = (that) => {
    console.log('flag:::::' + localStorage.$flag)
    if (!localStorage.$flag && localStorage.$flag !== '1') {
        return true
    } else {
        return false
    }
}

//获取当前城市
service.getCity = (that) => {
    if (!localStorage.$platformState) {
        that.$http.get(API.GET_CITY).then((res) => {
            console.log(res)
            if (res.data.status === '1') {
                platformState.city = res.data.city
                platformState.adcode = res.data.adcode
            }
            console.log(platformState)
            //缓存所在城市
            localStorage.$platformState = JSON.stringify(platformState)
            that.platformState.city = platformState.city;
            that.platformState.adcode = platformState.adcode;
            that.platformState.platformName = platformState.platformName;
        })
    } else {
        console.log('already：：：：：' + localStorage.$platformState)
        that.platformState = JSON.parse(localStorage.$platformState);
    }

}

//导入JSON配置文件
service.importCfg = (file, that) => {
    var reader = new FileReader();
    reader.readAsText(file.raw);
    reader.onloadend = function () {
        // console.log(reader.result);
        platformState = JSON.parse(reader.result).platformState
        //缓存所在城市
        localStorage.$platformState = JSON.stringify(platformState)
        // that.platformState = platformState;
    };
}

//写入缓存及读取相关配置




export default service;