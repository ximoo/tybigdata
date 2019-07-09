const AmapWebKey = '0a2c31bc6770455f08b0fcdc1674831c'

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

};