/**
 * Created by girl on 16/8/5.
 */
import validateAndSubmit from '../js/validateAndSubmit';
import * as types from '../constants/addressActionTypes';
//导出登录的方法
//所有的方法必须加 fun

/**********************查询地址列表**************************/
export const queryAddressLst = function ({ dispatch, state }) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        componentLst: ['addressModules', 'queryAddressLst']
    });
};


/**********************增加地址列表**************************/
//增加地址
export const addAddressFun = function ({ dispatch,state},{params}={}) {
   const params2 = validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        validates: [
            {'name': 'province'},
            {'name': 'city'},
            {'name': 'area'},
            {'name': 'address', 'rules': [{'rule': 'isEmpty', 'errorMsg': `地址不能为空`}]},
            {'name': 'is_default'},
            {'name': 'receiver' , 'rules': [{'rule': 'isEmpty', 'errorMsg': `姓名不能为空`}]},
            {'name': 'mobile', 'rules': [{'rule': 'isEmpty', 'errorMsg': `手机好不能为空`}]}
        ],
        moreParams:params,
        result:(res)=>{
            alert(JSON.stringify(res))
            alert(JSON.stringify(params2))
         if(res.status== 200)   addAddressInCacheFun({params:params2})
        },
        componentLst: ['addressModules', 'addAddress']
    });
};
//增加地址到缓存
export const addAddressInCacheFun = function ({ dispatch},{params}) {
    dispatch(types.ADDADDRESSINCACHE,{params});
};


/**********************删除地址*******************************/
//删除地址
export const deleteAddressFun = function ({ dispatch,state},{params,result}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        result:result,
        componentLst: ['addressModules', 'deleteAddress']
    });
};
//从缓存里面删除地址
export const deleteAddressInCacheFun = function ({ dispatch},{params}) {
    dispatch(types.DELETEADDRESSINCACHE,{params});
};


/**********************修改地址*******************************/
//修改地址
export const alterAddressFun = function ({ dispatch,state},{params}={}) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        validates: [
            {'name': 'province'},
            {'name': 'city'},
            {'name': 'area'},
            {'name': 'address', 'rules': [{'rule': 'isEmpty', 'errorMsg': `地址不能为空`}]},
            {'name': 'is_default'},
            {'name': 'receiver' , 'rules': [{'rule': 'isEmpty', 'errorMsg': `姓名不能为空`}]},
            {'name': 'mobile', 'rules': [{'rule': 'isEmpty', 'errorMsg': `手机好不能为空`}]}
        ],
        moreParams:params,
        result:(res)=>{
            alert(JSON.stringify(res))
            if(res.status== 200)   alterAddressInCacheFun({params:params2})
        },
        componentLst: ['addressModules', 'alertAddress']
    });
};

//从缓存里面删除地址
export const alterAddressInCacheFun = function ({ dispatch},{params}) {
    dispatch(types.ALTERADDRESSINCACHE,{params});
};
