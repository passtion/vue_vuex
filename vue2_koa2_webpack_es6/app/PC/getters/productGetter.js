/**
 * Created by pengfeng on 2016/11/14.
 */
//获得搜索的产品列表
export const searchList = state =>  state.productModules.searchProLst.list;

//获得历史搜索列表
export const historyKeys = state =>  state.productModules.searchProLst.historyKeys;

//获得确认的订单
export const sureOrder = state =>  state.productModules.sureOrder;

//获得分类的
export const sortLst = state =>  state.productModules.sortLst.result;

