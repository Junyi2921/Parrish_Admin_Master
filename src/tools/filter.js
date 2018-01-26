/**
 * Created by junyi on 2018/1/10.
 */
const roleInfo = [{
      key : "normal", name : "普通用户"
}];
const orderStateAll = [{
      key : "100", value : "待付款"
}];
const filter = {
      roleToName(role){
            for( var i = 0; i < roleInfo.length; i++ ){
                  if( roleInfo[i].key == role ){
                        return roleInfo[i].name;
                  }
            }
      }, orderStateCodeToName(orderState){
            for( let i = 0; i < orderStateAll.length; i++ ){
                  if( orderStateAll[i].key == orderState ){
                        return orderStateAll[i].value
                  }
            }
      }
};
export default filter;
