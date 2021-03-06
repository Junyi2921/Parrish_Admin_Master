/**
 * Created by junyi on 2018/1/10.
 */
import router from './router'
import cookieManager from "@/tools/cookie"
import store from "@/store/index"
import SStorage from "@/storage/tabView"
//白名单列表
const whiteList = ['/login'];
router.beforeEach( function(to, from, next){
      if( cookieManager.getCookie( "session_token" ) ){
            //第一次或刷新后进入store中的role必定为空,所以当role存在的情况下必定已经动态addRoutes了,切已经把最新的route放到了store中
            if( store.getters.role ){
                  let tab = {
                        path : to.path, name : to.meta.name, icon : to.meta.icon, toPath : to.path, display : true
                  };
                  // tabsView内容
                  store.dispatch( "ChangeTabs", tab ).then( function(result){
                        SStorage.addTab( result );
                  } );
                  next();
            }else{
                  store.dispatch( "GetUserInfo" ).then( function(response){
                        // 去匹配不同权限对应的路由
                        store.dispatch( "GetRoutesUseRoleId", store.getters.role ).then( function(result){
                              //动态添加路由
                              router.addRoutes( store.getters.addRoutes );
                              next( { ...to, replace : true } )
                        } );
                  } )
            }
      }else{
            if( whiteList.indexOf( to.path ) !== -1 ){ // 在免登录白名单，直接进入
                  next();
            }else{
                  next( '/login' ); // 否则全部重定向到登录页
            }
      }
} );