/**
 * Created by junyi on 2018/1/8.
 */
import request from '@/tools/request'
const loginAPI = {
      loginSystemUseUsername : function(username, password){
            return request( {
                  url : '/login', method : 'POST', data : {
                        username : username, password : password,
                  }
            } );
      }, getSMSCodeUseMobile : function(mobile){
            return request( {
                  url : '/requestSmsCode', method : 'POST', data : {
                        mobilePhoneNumber : mobile.toString()
                  }
            } )
      }, verifySmsCodeUseMobile : function(mobile, SMSCode){
            return request( {
                  url : "/verifySmsCode/" + SMSCode, method : "POST", data : {
                        mobilePhoneNumber : mobile.toString()
                  }
            } )
      }
};
export default loginAPI;