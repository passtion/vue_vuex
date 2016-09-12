import validateAndSubmit from '../js/validateAndSubmit';
import * as types from '../constants/taskIndexActionTypes';
/**
 * 查询项目列表
 * @param dispatch
 * @param state
 */
export const taskIndexQueryLstFun = ({ dispatch,state})=>{
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        componentLst: ['taskIndexCmp', 'taskIndexTabCmp']
    });
};
/**
 * 增加项目
 * @param dispatch
 * @param state
 */
export const taskIndexAddProjFun = ({ dispatch,state},params)=>{
    validateAndSubmit({
        dispatch: dispatch,
        getState: state,
        moreParams:params,
        componentLst: ['taskIndexCmp', 'taskIndexTabCmp','taskIndexAddCmp']
    });
};
/**
 * 更改显示或者隐藏
 * @param dispatch
 * @param state
 * @param params
 */
export const taskIndexShowOrHiAddFun = ({ dispatch,state},params) =>{
    dispatch(types.TASKINDEXADDPROJFLAG,params)
};



