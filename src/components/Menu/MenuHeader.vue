<template>
    <div class="menu_header" :style="{'width':isCollapse}" v-loading="loading"
         element-loading-spinner="el-icon-loading"
         element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="header_img" @click="getUserInfo()">
            <img src="/static/img/logo.jpg">
        </div>
        <div class="system_userinfo" v-if="userInfoShow">
            <div class="userName" v-html="username"></div>
            <div class="userRole">
                <span class="stateBox" v-if="user_state == -1">已删除</span>
                <span class="stateBox" v-if="user_state == 0">禁用</span>
                <span class="stateBox" v-if="user_state == 1">在线</span>
                {{user_role | roleToName('user_role')}}
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .menu_header {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 90px;
        border-top: 1px solid $HEADER_BOX_BORDER_BOTTOM_COLOR;
        border-bottom: 1px solid $HEADER_BOX_BORDER_BOTTOM_COLOR;
        .header_img {
            width: 50px;
            height: 50px;
            border-radius: 50px;
            overflow: hidden;
            border: 3px solid $HEADER_IMG_BORDER_COLOR;
            img {
                width: 100%;
            }
        }
        .system_userinfo {
            display: flex;
            height: 60px;
            margin-left: 5px;
            margin-right: 5px;
            flex-direction: column;
            .stateBox {
                background: $HEADER_STATE_BOX_BACKGROUND_COLOR;
                color: $HEADER_STATE_FONT_COLOR;
                padding: 2px 5px;
                border-radius: 3px;
                margin-right: 5px;
            }
            .userName, .userRole {
                display: flex;
                flex: 1;
                color: $HEADER_FONT_COLOR;
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
            userInfoShow:function(){
                return !this.$store.getters.isCollapse
            },
            isCollapse : function(){
                if( !this.$store.getters.isCollapse ){
                    return "200px"
                }else{
                    return "66px"
                }
            }, username : function(){
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
