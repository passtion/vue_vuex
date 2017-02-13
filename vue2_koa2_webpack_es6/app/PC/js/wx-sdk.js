/**
 * Created by pengfeng on 2016/12/2.
 */
export const getLocation = function () {
    wx.getLocation({
        success: function (res) {
            alert(JSON.stringify(res))
        },
        cancel: function (res) {

        }
    })
};

export const wxPay = function ({appId,timestamp,nonceStr,package1,signType,paySign,success}) {
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId" : appId,     //公众号名称，由商户传入
        "timeStamp":timestamp,         //时间戳，自1970年以来的秒数
        "nonceStr" : nonceStr, //随机串
        "package" : package1,
        "signType" : signType,         //微信签名方式:
        "paySign" : paySign //微信签名
}, success);
}