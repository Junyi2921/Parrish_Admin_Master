import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/index'
import Layout from "@/view/layout/index"
import Dashboard from '@/view/dashboard/index'
import Icon from "@/view/icon/icon"
import Table from "@/view/table/table"

Vue.use(Router);
//通用且不需要权限即可访问的路由
export const generalRouterMap = [{
	path: '/login',
	name: 'Login',
	component: Login,
	meta: {name: '登录', icon: ""},
	menuShow: false,
	subMenu: false,
}, {
      path : '/',
      component : Layout,
      redirect : 'dashboard',
      name : "dashboard",
      meta : { name : '首页', icon : "" },
      menuShow : true,
      subMenu : false,
      children : [{
            path : 'dashboard', component : Dashboard, name : 'dashboard', meta : { name : '首页', icon : "" }
      }]
}, {
      path : '/icon',
      component : Layout,
      redirect : '/icon/index',
      name : "icon",
      meta : { name : '图标', icon : "" },
      menuShow : true,
      subMenu : false,
      children : [{
            path : 'index', component : Icon, name : 'icon', meta : { name : '图标', icon : "" }
      }]
}];
export const normalRouterMap = [{
	path: '/table',
	component: Layout,
	redirect: '/table/showTable',
	name: "table",
	meta: {name: '表格', icon: ""},
	menuShow: true,
	subMenu: true,
	children: [{
		path: 'showTable', component: Table, name: "showTable", meta: {name: '显示表格', icon: ""}
	}, {
		path: 'showTableIcon', component: Icon, name: 'showTableIcon', meta: {name: '图标表格', icon: ""}
	}]
}];
export default new Router({
	routes: generalRouterMap
});
