import '../../tool/lib/DateTool'
export  default {
    ALERTINFOINCACHE(state,{params}){
        for(let key in params){
            state.queryUserInfo.result[key]=params[key];
        }

    },
    MYORDERADDINCACHE(state,{params}){
            state.myOderInfo=params;
    },
    WITHDRAWINCACHE(state,{params}){
            state.queryUserInfo.result.balance -=params;
    },
    SIGNTODAY(state){
        const today = new Date().format("yyyy-MM-dd");
        let list = state.signList.result.list;
        list ? list.push({sign_time:`${today} 00:00:00.0`}): (state.signList.result.list=[{sign_time:`${today} 00:00:00.0`}]);
    },

}

