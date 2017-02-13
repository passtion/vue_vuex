/**
 * Created by pengfeng on 2016/11/14.
 */
import {localCache} from './../../tool/lib/CacheTool';

export  default {
    SEARCHINCACHEFUN(state,{params}){
        state.searchProLst.list=params;
    },
    UPDATEHISTORYKEYS(state,{params}){
        let list =  state.searchProLst.historyKeys;
        const container = [params];
        list ?  (()=>{
            list.forEach((item,i)=>{ (item == params) && (list.splice(i,1))})
            list.unshift(params);
        })() : state.searchProLst.historyKeys = container;
        localCache('historyKeys',state.searchProLst.historyKeys)
    },
    DELETEHISTORYKEYS(state){
        state.searchProLst.historyKeys  = false;
        localStorage.removeItem('historyKeys');
    },
    ADDORDER(state,{params}){
        state.sureOrder = params;
    }
}

