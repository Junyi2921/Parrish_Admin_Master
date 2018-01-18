/**
 * Created by junyi on 2018/1/15.
 */
import SStorage from "@/storage/tabView"
let newIndex;
const tabInfo = {
      state : {
            tabs : SStorage.getTabs()
      }, mutations : {
            SET_TABS : function(state, tab){
                  let tabs = state.tabs, index, repeat = false;
                  if( !tabs ){
                        tabs = [];
                  }
                  for( var i = 0; i < tabs.length; i++ ){
                        tabs[i].display = false;
                        if( tabs[i].path == tab.path ){
                              repeat = true;
                        }
                        if( tabs[i].path == tab.toPath ){
                              tabs[i].display = true;
                        }
                  }
                  if( !repeat ){
                        tabs.push( tab );
                  }
                  state.tabs = tabs
            }, DEL_TAB : function(state, index){
                  let tabs = state.tabs;
                  const chooseDisplay = tabs[index].display;
                  tabs.splice( index, 1 );
                  if( !chooseDisplay ){
                        state.tabs = tabs;
                        return false;
                  }
                  if( index == 0 && tabs.length > 0 ){
                        newIndex = index + 1;
                        tabs[newIndex].display = true;
                  }else if( index > 0 ){
                        newIndex = index - 1;
                        tabs[newIndex].display = true;
                  }
                  state.tabs = tabs;
                  return true;
            }
      }, actions : {
            ChangeTabs : function({ commit, state }, tab){
                  return new Promise( function(resolve, reject){
                        commit( "SET_TABS", tab );
                        resolve( state.tabs );
                  } )
            }, DelTabForIndex : function({ commit, state }, index){
                  return new Promise( function(resolve, reject){
                        commit( "DEL_TAB", index );
                        const obj = {};
                        obj.tabs = state.tabs;
                        if( newIndex >= 0 ){
                              obj.path = state.tabs[newIndex].path
                        }else{
                              obj.path = '/';
                        }
                        resolve( obj );
                  } )
            }
      }, getters : {
            tabs : function(state){
                  return state.tabs;
            }
      }
};
export default tabInfo;
