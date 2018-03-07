import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/index'
import Layout from "@/view/layout/index"
import Dashboard from '@/view/dashboard/index'
import OrderCreate from "@/view/order/create"
import OrderList from "@/view/order/list"
import OrderEdit from '@/view/order/edit'
import ProductList from '@/view/product/list'
import ProductCreate from '@/view/product/create'
import ProductEdit from '@/view/product/edit'
import CategoryManagement from '@/view/category/index'
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
      }, {
            path : 'edit', component : OrderEdit, name : 'OrderEdit', meta : { name : '编辑订单', icon : "" }
      }, {
            path : 'list', component : OrderList, name : 'orderList', meta : { name : '订单列表', icon : "" }
      }]
}, {
      path : '/product',
      component : Layout,
      redirect : '/product/list',
      name : "product",
      meta : { name : '商品管理', icon : "" },
      menuShow : true,
      subMenu : true,
      children : [{
            path : 'list', component : ProductList, name : "productList", meta : { name : '商品列表', icon : "" }
      }, {
            path : 'create', component : ProductCreate, name : 'productCreate', meta : { name : '创建商品', icon : "" }
      }, {
            path : 'edit', component : ProductEdit, name : 'productEdit', meta : { name : '编辑商品', icon : "" }
      }]
}, {
      path : '/category',
      component : Layout,
      redirect : '/category/management',
      name : "category",
      meta : { name : '分类管理', icon : "" },
      menuShow : true,
      subMenu : false,
      children : [{
            path : 'management',
            component : CategoryManagement,
            name : "CategoryManagement",
            meta : { name : '分类管理', icon : "" }
      }]
}];
export default new Router( {
      routes : generalRouterMap
} );
