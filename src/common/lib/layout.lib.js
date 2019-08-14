export default {

    //数组排重
    distinct(arr) {
        let result = []
        let obj = {}

        for (let i of arr) {
            if (!obj[i]) {
                console.log(i)
                result.push(i)
                obj[i] = 1
            }
        }
        return result
    }













}