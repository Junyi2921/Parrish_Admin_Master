/**
 * Created by junyi on 2018/1/8.
 */
import loginAPI from "@/api/login/login"
import cookieManager from "@/tools/cookie"
const loginInfo = {
      state : {
            token : cookieManager.getCookie( 'session_token' )
      }, mutations : {
            SET_TOKEN : function(state, token){
                  state.token = token
            }
      }, actions : {
            /**
             * 验证用户短信验证码并登录系统接口
             * @param commit
             * @param getters
             * @param 用户form表单中提交的信息
             * @returns {登录成功后的用户信息}
             * @constructor
             */
            LoginSystemByUsername({ commit, getters }, userInfo){
                  let verifySMS = new Promise( function(resolve, reject){
                        //验证短信验证码是否匹配(从sessionStorage中获取mobile后验证验证)
                        loginAPI.verifySmsCodeUseMobile( sessionStorage.getItem( "M" ), userInfo.smscode ).then( function(response){
                              resolve( response )
                        } ).catch( function(error){
                              reject( error )
                        } )
                  } );
                  return verifySMS.then( function(response){
                        return new Promise( function(resolve, reject){
                              loginAPI.loginSystemUseUsername( userInfo.username, userInfo.password ).then( function(response){
                                    const data = response.data;
                                    commit( 'SET_TOKEN', data.sessionToken );
                                    let expireDays = 168 * 60 * 60;
                                    cookieManager.setCookie( "session_token", data.sessionToken, expireDays );
                                    resolve();
                              } ).catch( function(error){
                                    reject( error )
                              } )
                        } )
                  } );
            }, /**
             * 根据用户账号密码获取手机号并发送验证码
             * @param commit
             * @param userInfo
             * @returns {}
             * @constructor
             */
            GetMobileToGetSMSCode({ commit }, userInfo){
                  let mobilePhoneNumber = new Promise( function(resolve, reject){
                        //使用用户的账号密码登录获取用户手机号
                        loginAPI.loginSystemUseUsername( userInfo.username, userInfo.password ).then( function(response){
                              const mobilePhone = response.data.mobilePhoneNumber;
                              sessionStorage.setItem( "M", mobilePhone );
                              resolve( mobilePhone )
                        } ).catch( function(error){
                              reject( error )
                        } );
                  } );
                  return mobilePhoneNumber.then( function(response){
                        return new Promise( function(resolve, reject){
                              loginAPI.getSMSCodeUseMobile( response ).then( function(response){
                                    const data = response.data;
                                    resolve();
                              } ).catch( function(error){
                                    reject( error )
                              } );
                        } )
                  } );
            }, LogOut({ commit }){
                  return new Promise( function(resolve, reject){
                        cookieManager.delCookie( "session_token" );
                        commit( "SET_TOKEN", "" );
                        commit( "SET_ROLE", "" );
                        commit( "SET_ROLEID", "" );
                        resolve();
                  } )
            }
      }, getters : {
            token : function(state){
                  return state.token;
            }
      }
};
export default loginInfo;