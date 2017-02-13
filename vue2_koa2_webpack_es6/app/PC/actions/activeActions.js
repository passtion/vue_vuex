/**
 * Created by pengfeng on 2016/11/14.
 */
import validateAndSubmit from '../js/validateAndSubmit';
//查询openid
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
//查询wxConfig
export const queryWxConfigFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        componentLst: ['getWxConfig'],
        result:result
    });
};
// ?ak=btsVVWf0TM1zUBEbzFz6QqWF&callback=renderReverse&location=' + latitude + ',' + longitude + '&output=json&pois=1
// require('http://api.map.baidu.com/api?v=2.0&ak=btsVVWf0TM1zUBEbzFz6QqWF')
//获取微信定位
export const getLocationFun = function ({ dispatch,state},{loadFlg=false}={}) {
    const quryLctInfo=({latitude,longitude}) =>{
        const params = {latitude: latitude,longitude: longitude}
        validateAndSubmit({
            dispatch: dispatch,
            getState: state,
            moreParams: params,
            loadFlg:loadFlg,//loading状态
            componentLst: ['baiduLocation']
        });
    }
    wx.getLocation({
        success: (res)=> {
            JSON.stringify(res).indexOf('ok') >-1 ? quryLctInfo(res): getBaiduLct(quryLctInfo)
        },
        cancel: function(res){
            // alert('用户拒绝授权获取地理位置');
        }
    })
};
function getBaiduLct(fun){
    if (navigator.geolocation){
        window.navigator.geolocation.getCurrentPosition( function(position){
            fun(position.coords)
        },function(err){},{enableHighAccuracy: true})
    }
    // var geolocation = new BMap.Geolocation();
    // geolocation.getCurrentPosition(function(r){
    //     if(this.getStatus() == BMAP_STATUS_SUCCESS){
    //         var mk = new BMap.Marker(r.point);
    //         map.addOverlay(mk);
    //         map.panTo(r.point);
    //         alert(r.point.lng)
    //         fun({longitude: r.point.lng,latitude: r.point.lat});
    //     }
    //     else {
    //         alert('failed'+this.getStatus());
    //     }
    // })
}
//会员推荐
    export const userRecommend = function ({ dispatch,state},{params}) {
        validateAndSubmit({
            dispatch: dispatch,
            getState: state,
            moreParams:params,
            componentLst: ['activeModules','userRecommendDo']
        })
    };

    /**********************获得推广管理列表**************************/

    export const activeManageFun = function({ dispatch,state},{result,params}){
        validateAndSubmit({
            dispatch: dispatch,
            getState: state,
            moreParams:params,
            result:result,
            loadFlg:true,//loading状态
            componentLst: ['activeModules','saleActionList']
        });
    }
    /**********************获得优惠活动列表**************************/
    export const activePreferentialFun = function({ dispatch,state},{result,params}){
        validateAndSubmit({
            dispatch: dispatch,
            getState: state,
            moreParams:params,
            result:result,
            loadFlg:true,//loading状态
            componentLst: ['activeModules','preferentialLst']
        });
    }
/**********************抽取奖品接口**************************/
export const activeDoFun = function({ dispatch,state},{result,params}){
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['activeModules','activeDo']
    });
}