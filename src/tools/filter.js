/**
 * Created by junyi on 2018/1/10.
 */
const roleInfo = [{
      key : "normal", name : "普通用户"
}];
const orderStateAll = [{
      key : "100", value : "待付款"
}];
const productStateAll = [{
      key : "waitAuth", value : "待审核"
}, {
      key : "online", value : "已上线"
}, {
      key : "offline", value : "已下线"
}, {
      key : "delete", value : "已删除"
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
      }, productStateCodeToName(productState){
            for( let i = 0; i < productStateAll.length; i++ ){
                  if( productStateAll[i].key == productState ){
                        return productStateAll[i].value
                  }
            }
      }
};
export default filter;
