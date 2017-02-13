/**
 * Created by girl on 16/8/16.
 */
import validateAndSubmit from  '../../js/validateAndSubmit';

export default {
        SUBMITE :function(state,{familyNameLst=[],result={},loadFlg=false,otpFlag=false,type=false}){
        validateAndSubmit.undidObj(state,familyNameLst,result,loadFlg,otpFlag,type);
    },
    ADDOPENIDINCACHE(state,param){
        for(let key in param){
            state[key] = param[key];
        }
    },
    SHOWPUBLICERROR(state,param){
        state.publicError = param;
    },
    HIDEPUBLICERROR(state){
        state.publicError.show = false;
    },
    UPDATE_LOADING (state, status) {
        state.isLoading = status
    },
    UPDATE_DIRECTION (state, direction) {
        state.direction = direction
    }
};
