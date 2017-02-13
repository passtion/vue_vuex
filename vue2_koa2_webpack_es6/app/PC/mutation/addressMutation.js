export  default {
    ADDADRESSLSTINCACHE(state,{params}){
        state.queryAddressLst.result.list=params;
    },
    ADDADDRESSINCACHE(state,{params}){
        const list = state.queryAddressLst.result.list;
        (params.is_default == 1) && list.forEach((item)=> {
            if ( item.is_default == 1) item.is_default = 0;
        });
        state.queryAddressLst.result.list.push(params);
    },
    DELETEADDRESSINCACHE(state,{params}){
      let list = state.queryAddressLst.result.list;
        if (list.length ==1){
            state.queryAddressLst.result.list=[];
        }else {
            list.forEach((item ,i)=>{
                if(item.seqid == params) {
                    list.splice(i,1)
                }
            })
        }
    },
    ALTERADDRESSINCACHE(state,{params}){
        const list = state.queryAddressLst.result.list;
        list.forEach((item)=>{
            if(item.seqid == params.seqid) {
                for(let key in params) item[key] = params[key]
            }else {
                if(params.is_default == 1) item.is_default = 0;
            }
        })
    },
    SETDEFAULTINCACHE(state,{params}){
        const list = state.queryAddressLst.result.list;
        list.forEach((item)=>{
            if(item.seqid == params) {
               item.is_default = 1;
            }else{
                if(item.is_default==1) item.is_default = 0
            }
        })
    }

}

