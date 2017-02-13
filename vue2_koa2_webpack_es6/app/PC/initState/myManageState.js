import  {SOURCE} from  '../js/publicParams'
/**
 * Created by pengfeng on 2016/11/14.
 */
export default {
    // 应用启动时，初始化的state
    queryUserInfo:{
        source: `${SOURCE}app_get_userinfo`,
        result : false
    },
    alertUserInfo:{
        source: `${SOURCE}app_userinfo_update`,
    },
    membersCount:{
        source : `${SOURCE}app_members_count`,
        result : {
        }
    },
    prizeList:{
        source : `${SOURCE}app_prize_list`,
        result : {
        }
    },
    commissionList:{
        source : `${SOURCE}app_commission_list`,
        result : {
        }
    },
    withdraw:{
        source : `${SOURCE}app_withdraw`
    },
    withdrawRecord:{
        source : `${SOURCE}app_withdraw_list`,
        result : {
        }
    },
    vipList:{
        source : `${SOURCE}app_members_list`
    },
    orderList:{
        source : `${SOURCE}app_order_list`
    },
    orderSummary:{
        source : `${SOURCE}app_order_summary`
    },
    buyOrder:{  //暂未有接口
        source : `${SOURCE}app_order_list`
    },
    myOderInfo:{
    },
    myRate:{
        source : `${SOURCE}app_product_comment_add`
    } ,
    getIntegal:{
        source : `${SOURCE}app_integal_list`
    },
    signList:{
        source : `${SOURCE}app_sign_list`,
        result : {
            list:[]
        }
    },
    sign:{
        source : `${SOURCE}app_member_sign`
    }
};
