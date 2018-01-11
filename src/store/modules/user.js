/**
 * Created by junyi on 2018/1/10.
 */
import userAPI from '@/api/user/user'
const userInfo = {
      state : {
            username : "", email : "", role : "", roleId : "", mobilePhoneNumber : "", userState : ""
      }, mutations : {
            SET_USERNAME : function(state, username){
                  state.username = username
            }, SET_EMAIL : function(state, email){
                  state.email = email
            }, SET_ROLE : function(state, role){
                  state.role = role
            }, SET_MOBILEPHONENUMBER : function(state, mobilePhoneNumber){
                  state.mobilePhoneNumber = mobilePhoneNumber
            }, SET_USERSTATE : function(state, userState){
                  state.userState = userState
            }, SET_ROLEID : function(state, roleId){
                  state.roleId = roleId
            }
      }, actions : {
            GetUserInfo : function({ commit }){
                  return new Promise( function(resolve, reject){
                        userAPI.getUserInfo().then( function(response){
                              const data = response.data;
                              commit( "SET_USERNAME", data.username );
                              commit( "SET_EMAIL", data.email );
                              commit( "SET_ROLE", data.role );
                              commit( "SET_MOBILEPHONENUMBER", data.mobilePhoneNumber );
                              commit( "SET_USERSTATE", data.state );
                              commit( "SET_ROLEID", data.roleId );
                              resolve( data );
                        } ).catch( function(error){
                              reject( error )
                        } )
                  } )
            }
      }, getters : {
            username : function(state){
                  return state.username;
            }, email : function(state){
                  return state.email;
            }, role : function(state){
                  return state.role;
            }, roleId : function(state){
                  return state.roleId;
            }, mobilePhoneNumber : function(state){
                  return state.mobilePhoneNumber;
            }, userState : function(state){
                  return state.userState;
            }
      }
};
export default userInfo;