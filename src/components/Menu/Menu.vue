<template>
    <el-menu
            :default-active="routeName"
            :unique-opened="uniqueOpened"
            :collapse="isCollapse"
            class="systemMenu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#2F323E"
            text-color="#68687E"
            active-text-color="#F2453D"
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
    .systemMenu {
        border-right: none;
    }
</style>
<script>
    export default{
        computed : {
            isCollapse : function(){
                return this.$store.getters.isCollapse
            }, routeName : function(){
                return this.$route.name;
            }
        }, props : {
            routes : {
                type : Array
            }
        }, data(){
            return {
                uniqueOpened : true, routerInfo : true
            }
        }, mounted(){
//            this.$nextTick( function(){
//                this.routeName = this.$route.name;
//            } );
        }, methods : {
            handleOpen(key, keyPath) {
                console.log( key, keyPath );
            }, handleClose(key, keyPath) {
                console.log( key, keyPath );
            }
        }
    }
</script>
