/**
 * 此处写公共的state
 */
import {localCache} from './../../../tool/lib/CacheTool';

export default {
    openid:'',    //微信id
    // openid:'ojctqwRXe13GrSOp00k3foSvU344' ,    //微信id
    nickname:''  ,  //微信名称
    headimgurl:'' ,//微信头像

    webType:'wx',   //类型
    // appid:'wx8f145bc5c567af83',
    appid:'wx17adbdd21f20f99c', //zhzhen
    // secret:'c3c8f690e6904d83fa5de7ac9eb381ff',
    secret:'d797cb2190d8692d6b7e71273a571d70',
    getOpenId:{
        source:'/doAction/userInfo',
    },
    getWxConfig:{
        source:'/doAction/wxConfig',
    },
    baiduLocation:{
        source:'/doAction/getCity',
        result:{

        }
    },
    publicError:{   //错误信息
        show:false,
        msg:'',
        status:'',
    },
    isLoading: false,
    direction: 'out'
}
