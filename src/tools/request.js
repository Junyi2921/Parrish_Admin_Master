/**
 * Created by junyi on 2018/1/5.
 */
import axios from 'axios';
import { Message } from 'element-ui';
import cookieManager from "@/tools/cookie"
const instance = axios.create( {
      //TODO 可把baseURL设置为配置类型,在config文件中设置
      baseURL : "https://leancloud.cn:443/1.1", // api的base_url
      timeout : 3000,// request timeout
      headers : {
            "X-LC-Id" : "UVh7wpSRFtr1fXQ59ETzQT8c-gzGzoHsz",
            "X-LC-Key" : "OpAIW3WhHnwFKbr9rnCGyM68",
            "Content-Type" : "application/json"
      }
} );
// 创建一个请求拦截器,在发出请求前执行一些内容
instance.interceptors.request.use( function(config){
      //TODO 这里是先获取cookie中的token,然后在request.headers中加入.之后要修改成,在这个地方获取store中的token,因为在页面发送请求之前,会现在路由端拦截并判断用户的cookie中是否拥有,若不存在则会跳转到'白名单'或登录页,若存在要判断用户store中是否存在(刷新或关闭浏览器store中的内容会清空)token,存在则验证通过,不存在则用cookie中的token发送请求获取用户权限后继续操作
      let sessionToken = cookieManager.getCookie( "session_token" );
      if( sessionToken ){
            config.headers['X-LC-Session'] = sessionToken
      }
      return config;
}, function(error){
      console.error( error );
      return Promise.reject( error );
} );
// 创建一个相应拦截器,在接受到请求后主动做一些内容
instance.interceptors.response.use( function(response){
      return response;
}, function(error){
      const errorMsg = error.response.data;
      Message( {
            message : errorMsg.error, type : 'error', duration : 5 * 1000
      } );
      return Promise.reject( error );
} );
export default instance;