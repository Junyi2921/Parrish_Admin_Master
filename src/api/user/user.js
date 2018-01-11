/**
 * Created by junyi on 2018/1/10.
 */
import request from '@/tools/request'
const userAPI = {
      getUserInfo : function(){
            return request( {
                  url : '/users/me', method : 'GET'
            } );
      }
};
export default userAPI;