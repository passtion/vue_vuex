export  default {
    ADDADDRESSINCACHE(state,param){
        state.queryAddressLst.list.push(param);
    },
    DELETEADDRESSINCACHE(state,seqid){
      const list = state.queryAddressLst.list;
        list.forEach((item ,i)=>{
            if(item.seqid == seqid) list.splice(i,1)
        })
    },
    ALTERADDRESSINCACHE(state,param){
        const list = state.queryAddressLst.list;
        list.map((item)=>{
            if(item.seqid == seqid) item = param
        })
    }
}

