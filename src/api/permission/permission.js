/**
 * Created by junyi on 2018/1/10.
 */
import request from '@/tools/request'
const permissionAPI = {
      getRoutesUseRoleId : function(roleId){
            return request( {
                  url : '/classes/Permission/' + roleId, method : 'GET'
            } );
      }
};
export default permissionAPI;