/**
 * 此处写公共的action方法
 */
//export const loginLoginTabGetOtpFun= function({ dispatch, state }){
//    dispatch(types.LOGINTAB_BOUNCED,param);
//};
import validateAndSubmit from './../../js/validateAndSubmit';


export const ajaxRequst=({ dispatch, state },params={})=>{
    console.log(params);
    params.dispatch = dispatch;
    params.getState = state;
    validateAndSubmit(params);
};


//增加openid到缓存
export const addOpenIdInCacheFun = function ({ dispatch},params) {
    dispatch('ADDOPENIDINCACHE',params);
};


//显示公共错误
export const showError = function ({ dispatch},params){
    dispatch('SHOWPUBLICERROR',params);
}
//隐藏公共错误
export const hideError = function ({ dispatch},params){
    dispatch('HIDEPUBLICERROR',params);
}

//loading
export const publicLoadingFun = function ({ dispatch},params){
    dispatch('UPDATE_LOADING',params);
}
//左右切换页面
export const  directionFun = function ({ dispatch},params){
    dispatch('UPDATE_DIRECTION',params);
}

//右切返回
export const backFun = function ({dispatch},isGo=true){
    isGo && history.go(-1);
};

//左切跳转
export const goToFun = function ({dispatch},{params,obj=false}){
    // dispatch('UPDATE_LOADING',true);
    const  go = () =>{
        directionFun({dispatch:dispatch},'out');
    }
    directionFun({dispatch:dispatch},'in');
    obj && obj.$route.router.go(params);
    setTimeout(go,300);
}

//直接出来
export const straightFun = function ({dispatch},{params={},obj=false}={}){
    const  go = () =>{
        directionFun({dispatch:dispatch},'out');
    }
    directionFun({dispatch:dispatch},'straight');
    obj && obj.$route.router.go(params);
    setTimeout(go,300);
}