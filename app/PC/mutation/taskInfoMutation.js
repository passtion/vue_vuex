export default {
    // mutation 的第一个参数是当前的 state
    // 你可以在函数里修改 state
    ARCHIVEFLAG (state,param) {
        state.taskInfoTabCmp.taskInfoArchiveCmp.slidingFlag = param;
    },
    POPCHANGEFLAG(state,{flag,params}) {
        state.taskInfoTabCmp.taskInfoPopCmp[flag] = params;
    },
    ADDIOBINCACHE(state,params){
        const taskLst =state.taskInfoTabCmp.result.result[params.taskStateId],
              length =  taskLst.length;
        taskLst.push( params);
    },
    ADDJOBARTERIDINCACHE(state,{type,id}){
        const taskLst =state.taskInfoTabCmp.result.result[type],
              length =  taskLst.length;
        taskLst[length-1].id=id;
    },
    SHOWORHIDEERROR(state,params){
        state.taskInfoTabCmp.toolErrorCmp.result.message = params;
    },
    ARLTERTILTLEINCAHCE(state,{id,title,type}){
        const taskLst =state.taskInfoTabCmp.result.result[type];
            taskLst.forEach((item)=>(item.id == id ) && (item.title=title));
    },
    ALRTERSTATUINCAHCE(state,{id,type,oldType}){
        const oldLst =state.taskInfoTabCmp.result.result[oldType],
              newLst = state.taskInfoTabCmp.result.result[type];
        oldLst.forEach((item,i)=>{
            if(item.id == id ) {
                item.taskStateId=type;
                (newLst.push(item));
                oldLst.splice(i,1)
            }
        });
    },
    ARLTERCONTENTINCAHCE(state,{id,type,content}){
        const newLst = state.taskInfoTabCmp.result.result[type];
        newLst.forEach((item,i)=>(item.id == id )&&(item.content=content));
    },
    ALTERPRIORITINCACHE(state,{id,priorityId,type}){
        const newLst = state.taskInfoTabCmp.result.result[type];
        newLst.forEach((item,i)=>(item.id == id )&&(item.priorityId=priorityId));
    }
};
