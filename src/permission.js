/**
 * Created by junyi on 2018/1/10.
 */
import router from './router'
import cookieManager from "@/tools/cookie"
import store from "@/store/index"
router.beforeEach( function(to, from, next){
      if( cookieManager.getCookie( "session_token" ) ){
            //第一次或刷新后进入store中的role必定为空,所以当role存在的情况下必定已经动态addRoutes了,切已经把最新的route放到了store中
            if( store.getters.role ){
                  next();
            }else{
                  store.dispatch( "GetUserInfo" ).then( function(response){
                        // 去匹配不同权限对应的路由
                        store.dispatch( "GetRoutesUseRoleId", store.getters.role ).then( function(result){
                              //动态添加路由
                              router.addRoutes( store.getters.addRoutes );
                              next({ ...to, replace: true })
                        } );
                  } )
            }
      }else{
            //TODO 可加白名单
            next( '/login' )
      }
} );