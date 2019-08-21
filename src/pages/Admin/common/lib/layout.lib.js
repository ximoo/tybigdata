export default {
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
    }
}