<template>
    <el-container class="appWrapper">
        <el-aside class="appMenu" width="200px">
            <MenuLogo></MenuLogo>
            <MenuHeader></MenuHeader>
            <Menu :routes="routerMap"></Menu>
        </el-aside>
        <el-container class="appContainer">
            <transition name="fade" mode="out-in">
                <keep-alive>
                    <router-view></router-view>
                </keep-alive>
            </transition>
        </el-container>
    </el-container>
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
    export default{
        computed:{
            routerMap:function(){
                return this.$store.getters.routes
            }
        },created(){

        },
        data(){
            return {}
        }, components : {
            Menu, MenuHeader,MenuLogo
        }
    }
</script>