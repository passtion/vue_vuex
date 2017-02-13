/**
 * Created by pengfeng on 2016/11/14.
 */
import validateAndSubmit from '../js/validateAndSubmit';

/**********************获得热销产品列表**************************/

export const queryHotProFun = function({ dispatch,state},{result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        result:result,
        loadFlg:true,//loading状态
        componentLst: ['productModules','queryHotProLst']
    });
}

/**********************获得猜你喜欢产品列表**************************/

export const queryLikeProFun = function({ dispatch,state},{params,result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        result:result,
        moreParams:params,
        componentLst: ['productModules','queryLikeProLst']
    });
}

/**********************抽奖活动管理**************************/
export const queryPrizeActiveFun = function({ dispatch,state},{result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        result:result,
        componentLst: ['productModules','PrizeActive']
    });
}

/**********************获得产品评论列表**************************/

export const queryproCommentLstFun = function({ dispatch,state},{params,result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        moreParams:params,
        componentLst: ['productModules','proCommentLst'],
        result:result
    });
}
/**********************获得产品详情**************************/

export const queryProInfoFun = function({ dispatch,state},{params,result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        moreParams:params,
        componentLst: ['productModules','proInfo'],
        result:result
    });
}
/**********************获得产品列表**************************/

export const querySearchProLstFun = function({ dispatch,state},{params,result,loadFlg=true}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:loadFlg,//loading状态
        moreParams:params,
        componentLst: ['productModules','searchProLst'],
        result:result
    });
};

export const searchInCacheFun = function ({ dispatch},params) {
    dispatch('SEARCHINCACHEFUN',{params:params});
}

/**********************更新历史查询记录**************************/

export const updateHistoryKeysFun = function ({ dispatch},params) {
    dispatch('UPDATEHISTORYKEYS',{params:params});
}
/**********************删除历史查询记录**************************/

export const deleteHistoryKeysFun = function ({ dispatch},params) {
        dispatch('DELETEHISTORYKEYS',{params:params});
}

/**********************存储订单信息**************************/

export const addOderInCacheFun = function ({ dispatch},params) {
    dispatch('ADDORDER',{params:params});
}


/**********************提交订单并调用微信支付**************************/
export const submitOrderFun = function({ dispatch,state},{params,result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        moreParams:params,
        componentLst: ['productModules','submitOrder'],
        result:result
    });
}

/**********************删除订单**************************/
const delOrderidInCacheFun = ({ dispatch},params) => {
    dispatch('DELORDERINCACHE',{params:params});
}


export const cancelOrderFun = function({ dispatch,state},{params,result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        moreParams:params,
        componentLst: ['productModules','cancelOrder'],
        result:result
    });
}
/**********************确认收货**************************/
export const sureProrFun = function({ dispatch,state},{params,result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        moreParams:params,
        componentLst: ['productModules','surePro'],
        result:result
    });
}



/**********************查询分类产品**************************/
export const querySortFun = function({ dispatch,state}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        componentLst: ['productModules','sortLst']
    });
}