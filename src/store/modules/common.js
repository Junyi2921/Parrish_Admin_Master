/**
 * Created by junyi on 2018/1/12.
 */

const commonInfo = {
      state : {
            isCollapse : false
      }, mutations : {
            CHANGE_COLLAPSE : function(state, isCollapse){
                  state.isCollapse = isCollapse
            }
      }, actions : {}, getters : {
            isCollapse : function(state){
                  return state.isCollapse;
            }
      }
};
export default commonInfo;