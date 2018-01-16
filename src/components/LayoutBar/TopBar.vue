<template>
    <el-header class="topBar" height="50px">
        <div class="switchBtn" @click="toggleSwitch">
            <img src="/static/img/switch.svg">
        </div>
        <div class="other"></div>
        <div class="settingBtn" @click="setSomething">
            <img src="/static/img/set.svg">
        </div>
        <div class="offBtn" @click="logout">
            <img src="/static/img/off.svg">
        </div>
    </el-header>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .topBar {
        display: flex;
        background: $TOP_BAR_BACKGROUND_COLOR;
        padding: 0;
        .switchBtn, .settingBtn, .offBtn {
            cursor: pointer;
            display: flex;
            width: 50px;
            height: 50px;
            justify-content: center;
            align-items: center;
            img {
                width: 20px;
            }
        }
        .switchBtn:hover, .settingBtn:hover, .offBtn:hover {
            background: $TOP_BAR_ITEM_BACKGROUND_HOVER_COLOR;
        }
        .other {
            display: flex;
            flex: 1;
        }
    }
</style>
<script>
    import cookieManager from "@/tools/cookie"
    export default{
        data(){
            return {}
        }, methods : {
            //切换菜单打开和隐藏
            toggleSwitch : function(){
                let isCollapse = this.$store.getters.isCollapse;
                this.$store.commit( "CHANGE_COLLAPSE", !isCollapse );
            }, setSomething : function(){
            }, logout : function(){
                this.$confirm( '您确定要退出该系统么?', '提示', {
                    confirmButtonText : '确定', cancelButtonText : '取消', type : 'warning'
                } ).then( () =>{
                    this.$store.dispatch( "LogOut" ).then( function(result){
                        location.reload();
                    } ).catch( function(error){

                    } );
                } );
            }
        }
    }
</script>
