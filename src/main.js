//全局公共样式
import '@/commons/style/common.scss'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import store from '@/store/index'
import filters from '@/tools/filter'
import './permission'
//全局添加自定义过滤器
Object.keys( filters ).forEach( function(key){
      Vue.filter( key, filters[key] )
} );
Vue.config.productionTip = false;
// 设置Element-ui默认尺寸
Vue.use( ElementUI, {
      size : 'medium'//中等
} );
new Vue( {
      el : '#app', router, store, template : '<App/>', components : { App }
} );
