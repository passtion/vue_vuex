/**
 * Created by pengfeng on 2016/11/14.
 */
import validateAndSubmit from '../js/validateAndSubmit';
import {getUserInfo} from '../getters/myManageGetter';
import {backFun} from '../vuex/index/actions'


/**********************获取个人信息**************************/
export const queryUserInfoFun = function({ dispatch,state}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        componentLst: ['myManageModules','queryUserInfo']
    });
};
/**********************修改个人信息**************************/
const alterInfoIncacheFun = function({dispatch}, {params}){
    dispatch('ALERTINFOINCACHE',{params:params});
};

export const alterInfoFun = function({ dispatch,state},{params}){
    const moreParams = {"username":getUserInfo(state).username?getUserInfo(state).username:'',"mobile":getUserInfo(state).mobile ?getUserInfo(state).mobile:'',"email":getUserInfo(state).email ?getUserInfo(state).email:''};
    for(let key in params){
        moreParams[key] = params[key];
    }
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:moreParams,
        loadFlg:true,//loading状态
        componentLst: ['myManageModules','alertUserInfo'],
        result:(res)=>{
            if(res.status == 200){
                alterInfoIncacheFun({dispatch: dispatch}, {params: params});
                backFun({dispatch:dispatch})
            }
        }
    });
};

/**********************获取会员数量**************************/
export const membersCountFun = function({ dispatch,state},{result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        result:result,
        loadFlg:true,//loading状态
        componentLst: ['myManageModules','membersCount']
    });
};

/**********************获取中奖记录**************************/
export const getPrizeFun = function({ dispatch,state},{result,params}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        loadFlg:params.pageno==1,
        result:result,
        componentLst: ['myManageModules','prizeList']
    });
};
/**********************获取积分记录**************************/
export const getIntegalFun = function({ dispatch,state},{result,params}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['myManageModules','getIntegal']
    });
}

/**********************获取佣金收益记录**************************/
export const getCommissionFun = function({ dispatch,state},{result,params}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        loadFlg:params.pageno==1,
        result:result,
        componentLst: ['myManageModules','commissionList']
    });
}



/**********************申请提现**************************/
export const WithdrawFun = function({ dispatch,state},{type,result,maxMoney}){
    const name = type? 'amount' : 'maxMoney';
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        validates: [
            {'name':`${name}`,paraName:'amount', 'rules': [{'rule': 'isEmpty', 'errorMsg': `金额不能为空`},{'rule': 'isMoney', 'errorMsg': `金额必须为数字`},{'rule': `0more${maxMoney}`, 'errorMsg': `金额必须大于0小于${maxMoney}`}]},
        ],
        result:result,
        componentLst: ['myManageModules','withdraw'],
    });
};

export const WithDrawInCacheFun = function({ dispatch},params){
    dispatch('WITHDRAWINCACHE',{params:params});
}

/**********************获取提现记录**************************/
export const getWithdrawRecordFun = function({ dispatch,state},{result,params}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        loadFlg:params.pageno==1,
        result:result,
        componentLst: ['myManageModules','withdrawRecord']
    });
}

/**********************获取会员列表**************************/
export const getVipListFun = function({ dispatch,state},{result,params}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        loadFlg:true,
        result:result,
        componentLst: ['myManageModules','vipList']
    });
}

/**********************获取订单列表**************************/
export const getOrderListFun = function({ dispatch,state},{result,params}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        loadFlg:params.pageno ==1,
        result:result,
        componentLst: ['myManageModules','orderList']
    });
}

/**********************获取订单汇总**************************/
export const getorderSummaryFun = function({ dispatch,state},{result}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        result:result,
        componentLst: ['myManageModules','orderSummary']
    });
}
/**********************获取订单到缓存**************************/
export const myOrderAddInCacheFun = function({ dispatch},params){
    dispatch('MYORDERADDINCACHE',{params:params});
}

/**********************发表评论**************************/
export const submitRated = function({ dispatch,state},{result,blob}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        submitType:'PostFile',
        loadFlg:true,//loading状态
        fileElementId:blob,
        validates: [
            {'name': 'productid'},
            {'name': 'orderid'},
            {'name': 'content' , 'rules': [{'rule': 'isEmpty', 'errorMsg': `评价内容不能为空`}]},
            {'name': 'ssi' , 'rules': [{'rule': '1more6', 'errorMsg': `请选择满意度`}]},
            {'name': 'img'},
            {'name': 'logo_img'}
        ],
        result:result,
        componentLst:   ['myManageModules','myRate']
    });
}
/**********************获取签到记录**************************/
export const signListFun = function({ dispatch,state}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        componentLst: ['myManageModules','signList']
    });
}/**********************签到**************************/
export const signFun = function({ dispatch,state}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        componentLst: ['myManageModules','sign'],
        result:(res)=>{
            if(res.status==200)  dispatch('SIGNTODAY')
        },
    });
}

