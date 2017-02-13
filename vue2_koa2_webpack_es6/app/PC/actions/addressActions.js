/**
 * Created by girl on 16/8/5.
 */
import validateAndSubmit from '../js/validateAndSubmit';
import {backFun} from '../vuex/index/actions'
//导出登录的方法
//所有的方法必须加 fun


/**********************查询地址列表**************************/
const addAddressLstInCacheFun = function ({dispatch},{params}) {
    dispatch('ADDADRESSLSTINCACHE',{params:params});
};

export const queryAddressLstFun = function ({ dispatch, state }) {
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        componentLst: ['addressModules', 'queryAddressLst'],
        result:(res)=>{
            if(res.status== 200) {
                addAddressLstInCacheFun({dispatch: dispatch}, {params: res.list})
            }
        }
    });
};


/**********************增加地址列表**************************/
//增加地址到缓存
const addAddressInCacheFun = function ({dispatch},{params}) {
    dispatch('ADDADDRESSINCACHE',{params:params});
};
//增加地址
export const addAddressFun = function ({ dispatch,state},{params}={}) {
   const params2 = validateAndSubmit({
        dispatch: dispatch,
        loadFlg:true,//loading状态
        getState: state,
        validates: [
            {'name': 'province'},
            {'name': 'city'},
            {'name': 'area'},
            {'name': 'address', 'rules': [{'rule': 'isEmpty', 'errorMsg': `地址不能为空`}]},
            {'name': 'is_default'},
            {'name': 'receiver' , 'rules': [{'rule': 'isEmpty', 'errorMsg': `姓名不能为空`}]},
            {'name': 'mobile', 'rules': [{'rule': 'isPhone', 'errorMsg': `请输入正确的手机号`},{'rule': 'isEmpty', 'errorMsg': `手机好不能为空`}]}
        ],
        moreParams:params,
        result:(res)=>{
            params2.seqid = res.seqid;
         if(res.status== 200)   {
             addAddressInCacheFun({dispatch:dispatch},{params:params2});
             backFun({dispatch:dispatch})
         }
        },
        componentLst: ['addressModules', 'addAddress']
    });
};



/**********************删除地址*******************************/
//从缓存里面删除地址
const deleteAddressInCacheFun = function ({ dispatch},{params}) {
    dispatch('DELETEADDRESSINCACHE',{params:params});
};
//删除地址
export const deleteAddressFun = function ({ dispatch,state},{params,isBack=false}) {
   const params2 = validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        moreParams:params,
        result:(res)=>{
            if(res.status == 200) {
                deleteAddressInCacheFun({dispatch:dispatch},{params:params2.seqid})
                isBack && history.go(-1);
            }
        },
        componentLst: ['addressModules', 'deleteAddress']
    });
};



/**********************修改地址*******************************/
//从缓存里面修改地址
const alterAddressInCacheFun = function ({ dispatch},{params}) {
    dispatch('ALTERADDRESSINCACHE',{params:params});
};
//修改地址
export const alterAddressFun = function ({ dispatch,state},{params}={}) {
    const params2 =  validateAndSubmit({
        dispatch: dispatch,
        loadFlg:true,//loading状态
        getState: state,
        validates: [
            {'name': 'seqid'},
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
            if(res.status== 200)  {
                alterAddressInCacheFun({dispatch:dispatch},{params:params2})
                backFun({dispatch:dispatch})
            }
        },
        componentLst: ['addressModules', 'alertAddress']
    });
};




/**********************设置默认收货地址*******************************/
const setDefaultAddressInCacheFun = function ({ dispatch},{params}) {
    dispatch('SETDEFAULTINCACHE',{params:params});
};

export const  setDefaultAddressFun = function ({ dispatch,state},{params}={}) {
  const params2 =  validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        loadFlg:true,//loading状态
        moreParams:params,
        result:(res)=>{
            if(res.status== 200)   setDefaultAddressInCacheFun({dispatch:dispatch},{params:params2.seqid})
        },
        componentLst: ['addressModules', 'setDeafultAddress']
    });
};

