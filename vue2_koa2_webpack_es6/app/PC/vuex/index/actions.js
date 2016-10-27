/**
 * 此处写公共的action方法
 */
//export const loginLoginTabGetOtpFun= function({ dispatch, state }){
//    dispatch(types.LOGINTAB_BOUNCED,param);
//};
import validateAndSubmit from '../../js/validateAndSubmit';


export const ajaxRequst=({ dispatch, state },params={})=>{
    console.log(params);
    params.dispatch = dispatch;
    params.getState = state;
    validateAndSubmit(params);
};



export const queryOpenId = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        async:false,    //同步
        moreParams:params,
        result:result,
        componentLst: ['getOpenId']
    });
};

//增加openid到缓存
export const addOpenIdInCacheFun = function ({ dispatch},params) {
    dispatch('ADDOPENIDINCACHE',params);
};