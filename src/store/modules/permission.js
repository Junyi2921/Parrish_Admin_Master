/**
 * Created by junyi on 2018/1/10.
 */
import permissionAPI from "@/api/permission/permission"
import { normalRouterMap, generalRouterMap } from '@/router/index'
const permissionInfo = {
      state : {
            routes : generalRouterMap,
            addRoutes:''
      }, mutations : {
            SET_ROUTES : function(state, routes){
                  state.addRoutes = routes;
                  state.routes = generalRouterMap.concat(routes)
            }
      }, actions : {
            GetRoutesUseRoleId : function({ commit }, role){
                  return new Promise( function(resolve, reject){
                        let newRouterMap;
                        //TODO 不同权限显示不同的路由,在这里去判断
                        if( role == "normal" ){
                              newRouterMap = normalRouterMap;
                        }
                        commit( "SET_ROUTES", newRouterMap );
                        resolve();
                  } )
            }
      }, getters : {
            routes : function(state){
                  return state.routes;
            },
            addRoutes:function(state){
                  return state.addRoutes
            }
      }
};
export default permissionInfo;