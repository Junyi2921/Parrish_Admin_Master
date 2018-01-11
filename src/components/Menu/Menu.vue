<template>
    <el-menu
            :default-active="defaultActive"
            :unique-opened="uniqueOpened"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="routerInfo">
        <template v-for="(item,index) in routes" v-if="item.menuShow">
            <el-submenu :index="item.name" v-if="item.subMenu" :key="item.name">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span v-html="item.meta.name"></span>
                </template>
                <el-menu-item-group>
                    <el-menu-item v-for="(subItem,subIndex) in item.children"
                                  v-html="subItem.meta.name"
                                  :index="subItem.name"
                                  :route="item.path+'/'+subItem.path" :key="subItem.name"></el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-menu-item :index="item.name" :route="item.path" v-if="!item.subMenu" :key="item.name">
                <i class="el-icon-menu"></i>
                <span slot="title" v-html="item.meta.name"></span>
            </el-menu-item>
        </template>
    </el-menu>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .el-menu-vertical-demo {
        border-right: none;
    }
</style>
<script>
    export default{
        props : {
            routes : {
                type : Array
            }
        }, data(){
            return {
                uniqueOpened : true, routerInfo : true, defaultActive : this.routes[1].name
            }
        }, created(){
            console.log( this.defaultActive );
        }, methods : {
            handleOpen(key, keyPath) {
                console.log( key, keyPath );
            }, handleClose(key, keyPath) {
                console.log( key, keyPath );
            }
        }
    }
</script>
