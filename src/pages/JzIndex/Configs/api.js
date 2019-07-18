const AmapWebKey = '84353ef481e125f9c9b8d74b4c952383'

export default {






    //获取所在城市
    GET_CITY: 'https://restapi.amap.com/v3/ip?key=' + AmapWebKey,
    //获取所在城市编码
    GET_AREACODE: 'https://restapi.amap.com/v3/config/district?key=' + AmapWebKey,
    //获取POI信息
    GET_POI: 'https://restapi.amap.com/v3/place/text?key=' + AmapWebKey,
    GET_AROUND: 'https://restapi.amap.com/v3/place/around?key=' + AmapWebKey,
    //逆地理编码
    GET_ADDRESS: 'https://restapi.amap.com/v3/geocode/regeo?key=' + AmapWebKey,
    //路径规划
    GET_TRAIL:'https://restapi.amap.com/v4/direction/truck?key=' + AmapWebKey
};