import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/index'
import Layout from "@/view/layout/index"
import Dashboard from '@/view/dashboard/index'
import OrderCreate from "@/view/order/create"
import OrderList from "@/view/order/list"
import Table from "@/view/table/table"
Vue.use( Router );
//通用且不需要权限即可访问的路由
export const generalRouterMap = [{
      path : '/login',
      name : 'Login',
      component : Login,
      meta : { name : '登录', icon : "" },
      menuShow : false,
      subMenu : false,
}, {
      path : '/',
      component : Layout,
      redirect : 'dashboard',
      name : "dashboard",
      meta : { name : '系统概况', icon : "" },
      menuShow : true,
      subMenu : false,
      children : [{
            path : 'dashboard', component : Dashboard, name : 'dashboard', meta : { name : '系统概况', icon : "" }
      }]
}];
export const normalRouterMap = [{
      path : '/order',
      component : Layout,
      redirect : '/order/list',
      name : "orderList",
      meta : { name : '订单管理', icon : "" },
      menuShow : true,
      subMenu : true,
      children : [{
            path : 'create', component : OrderCreate, name : 'orderCreate', meta : { name : '创建订单', icon : "" }
      },{
            path : 'list', component : OrderList, name : 'orderList', meta : { name : '订单列表', icon : "" }
      }]
}, {
      path : '/table',
      component : Layout,
      redirect : '/table/showTable',
      name : "table",
      meta : { name : '表格', icon : "" },
      menuShow : true,
      subMenu : true,
      children : [{
            path : 'showTable', component : Table, name : "showTable", meta : { name : '显示表格', icon : "" }
      }, {
            path : 'showTableIcon', component : OrderList, name : 'showTableIcon', meta : { name : '图标表格', icon : "" }
      }]
}];
export default new Router( {
      routes : generalRouterMap
} );
