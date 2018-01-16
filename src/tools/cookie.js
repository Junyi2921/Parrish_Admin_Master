/**
 * Created by junyi on 2018/1/9.
 */

var cookie = {
      //获取cookie
      getCookie : function(name){
            var arr, reg = new RegExp( "(^| )" + name + "=([^;]*)(;|$)" );
            if( arr = document.cookie.match( reg ) )
                  return (arr[2]);
            else
                  return null;
      }, //设置cookie
      setCookie : function(c_name, value, expiredays){
            var exdate = new Date();
            exdate.setDate( exdate.getDate() + expiredays );
            document.cookie = c_name + "=" + escape( value ) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
      }, //删除cookie
      delCookie : function(name){
            var exp = new Date();
            exp.setTime( exp.getTime() - 1 );
            var cval = this.getCookie( name );
            if( cval != null )
                  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
      }
};
export default cookie;