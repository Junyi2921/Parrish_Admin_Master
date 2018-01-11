<template>
    <el-header height="90px" class="menu_header" v-loading="loading" element-loading-spinner="el-icon-loading"
               element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="header_img" @click="getUserInfo()">
            <img src="/static/img/logo.jpg">
        </div>
        <div class="system_userinfo">
            <div class="userName" v-html="username"></div>
            <div class="userRole">
                <span class="stateBox" v-if="user_state == -1">已删除</span>
                <span class="stateBox" v-if="user_state == 0">禁用</span>
                <span class="stateBox" v-if="user_state == 1">在线</span>
                {{user_role | roleToName('user_role')}}
            </div>
        </div>
    </el-header>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .menu_header {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 10px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.2);
        .header_img {
            width: 60px;
            height: 60px;
            background: #ffffff;
            border-radius: 60px;
            overflow: hidden;
            border: 3px solid rgba(0, 0, 0, .5);
            img {
                width: 100%;
            }
        }
        .system_userinfo {
            display: flex;
            flex: 1;
            height: 60px;
            margin-left: 10px;
            flex-direction: column;
            .stateBox {
                background: #35A03F;
                color: #ffffff;
                padding: 2px 5px;
                border-radius: 3px;
                margin-right: 5px;
            }
            .userName, .userRole {
                display: flex;
                flex: 1;
                color: #ffffff;
                justify-content: start;
                align-items: center;
                cursor: pointer;
            }
            .userRole {
                font-size: 12px;
            }
        }
    }
</style>
<script>
    export default{
        computed : {
            username : function(){
                return this.$store.getters.username
            }, user_role : function(){
                return this.$store.getters.role
            }, user_state : function(){
                return this.$store.getters.userState
            }
        }, data(){
            return {
                loading : false
            }
        }, methods : {
            getUserInfo(){
                let _this = this;
                _this.loading = true;
                this.$store.dispatch( "GetUserInfo" ).then( function(result){
                    _this.loading = false;
                } ).catch( function(error){
                    _this.loading = false;
                } );
            }
        }
    }
</script>
