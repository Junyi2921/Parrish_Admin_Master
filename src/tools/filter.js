/**
 * Created by junyi on 2018/1/10.
 */
const roleInfo = [{
      key : "normal", name : "普通用户"
}];
const filter = {
      roleToName : function(role){
            for( var i = 0; i < roleInfo.length; i++ ){
                  if(roleInfo[i].key == role){
                        return roleInfo[i].name;
                  }
            }
      }
};
export default filter;
