<template>
    <div class="appWrapper">
        <div class="appMenu">
            <MenuLogo></MenuLogo>
            <MenuHeader></MenuHeader>
            <transition name="el-fade-in-linear">
                <Menu :routes="routerMap"></Menu>
            </transition>
        </div>
        <div class="appContainer" :class="{'sm':isCollapse}">
            <TopBar></TopBar>
            <NavBar></NavBar>
            <transition name="fade" mode="out-in">
                <!--<keep-alive>-->
                    <router-view class="layout"></router-view>
                <!--</keep-alive>-->
            </transition>
        </div>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    #app {
        height: 100%;
    }
</style>
<script>
    import Menu from "@/components/Menu/Menu"
    import MenuHeader from "@/components/Menu/MenuHeader"
    import MenuLogo from "@/components/Menu/MenuLogo"
    import TopBar from "@/components/LayoutBar/TopBar"
    import NavBar from "@/components/LayoutBar/NavBar"
    export default{
        computed : {
            isCollapse : function(){
                return this.$store.getters.isCollapse
            }, routerMap : function(){
                return this.$store.getters.routes
            }
        }, created(){
        }, data(){
            return {}
        }, components : {
            Menu, MenuHeader, MenuLogo, TopBar, NavBar
        }
    }
</script>