/**
 * 此处写公共的state
 */

export default {
    openid:''  ,    //微信id
    webType:'wx',   //类型
    appid:'wx8f145bc5c567af83',
    secret:'c3c8f690e6904d83fa5de7ac9eb381ff',
    getOpenId:{
        source:'/doAction/userInfo',
    },
    publicError:{   //错误信息
        msg:'',
        status:''
    }
}
