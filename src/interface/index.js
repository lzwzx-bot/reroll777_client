import jquery from 'jquery';



let commonUrl = "";
let domainList = [
    "https://admin.onerous777.com",//线下域名一
    // "https://api.angelpg777.com",//线下域名一
];
let ms = 10000000000;
console.log("begin to check")
for (let i = 0; i < domainList.length; i++) {
    let nowTime = Date.now();
    let yanchi = 10000000;
    jquery.ajax({
        url: domainList[i] + "/index/index/index",
        async: false,
        success(r) {
            commonUrl = domainList[i]
            //console.log(domainList[i] + ": " + (Date.now()-nowTime) + "ms")
            console.log("successfully")
        }, error() {
            console.log("Failed")
        }
    })

    if (ms < 2000) {
        // console.log(ms);
        break;
    }

}
console.log("end of check");
// console.log("最终选择了:" + commonUrl);

export default {
    commonUrl
}