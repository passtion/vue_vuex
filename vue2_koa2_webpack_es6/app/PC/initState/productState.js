/**
 * Created by pengfeng on 2016/11/14.
 */
import {localCache} from './../../tool/lib/CacheTool';
import  {SOURCE} from  '../js/publicParams'

export default {
    // 应用启动时，初始化的state
    queryHotProLst:{//
        source: `${SOURCE}app_hotsale_list`
    },
    queryLikeProLst:{//
        source: `${SOURCE}app_recommend_product_list`
    },
    proCommentLst:{//
        source: `${SOURCE}app_product_comment_list`
    },
    proInfo:{//
        source: `${SOURCE}app_product_detail`,
        result:{
        }
    },
    searchProLst:{
        source: `${SOURCE}app_search_product_list`,
        list:[],
        historyKeys:localCache(`historyKeys`)
    },
    PrizeActive:{//
        source: `${SOURCE}app_prize_active_list`,
        result:{
        }
    },
    sureOrder:false,
    submitOrder:{
        source: `${SOURCE}app_order_submit`,
        result:{
        }
    },
    cancelOrder:{
        source: `${SOURCE}app_order_cancel`,
    },
    surePro:{
        source: `${SOURCE}app_order_confirm_receipt`
    },

    sortLst:{
        source: `${SOURCE}app_product_types`,
        result:false
    }

};
