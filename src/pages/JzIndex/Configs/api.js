const AmapWebKey = '0ef6825bdde97686378638eb43882ccb'

export default {






    //获取所在城市
    GET_CITY: 'https://restapi.amap.com/v3/ip?key=' + AmapWebKey,
    //获取所在城市编码
    GET_AREACODE: 'https://restapi.amap.com/v3/config/district?key=' + AmapWebKey,

};