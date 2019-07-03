const service = {};




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