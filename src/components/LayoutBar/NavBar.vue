<template>
    <transition-group tag="div" class="navBar" name="breadcrumb">
        <div v-for="(item,index) in tabs" class="tab" :key="item.name" :class="{ 'active' : item.display }"
             @click="changeTab(item.path)">
            <div class="tabName" v-html="item.name"></div>
            <i class="el-icon-circle-close-outline" @click.stop="delTab(index)"></i>
        </div>
    </transition-group>
</template>
<style rel="stylesheet/scss" lang="scss">
    .navBar {
        display: flex;
        width: 100%;
        overflow: auto;
        height: 40px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
        border-bottom: 1px solid #d8dce5;
        align-items: center;
        background: $NAV_BAR_TAB_BACKGROUND_COLOR;
        .tab {
            flex: none;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 25px;
            padding: 0 15px;
            font-size: 14px;
            font-weight: 300;
            margin-left: 10px;
            border: 1px solid $NAV_BAR_TAB_BORDER_COLOR;
            color: $NAV_BAR_TAB_FONT_COLOR;
            background: $NAV_BAR_TAB_BACKGROUND_COLOR;
            &.active {
                border-color: $NAV_BAR_TAB_BORDER_HOVER_COLOR;
                color: $NAV_BAR_TAB_FONT_ACTIVE_COLOR;
                background: $NAV_BAR_TAB_BORDER_ACTIVE_COLOR;
            }
            .tabName {
                margin-right: 10px;
            }
        }
        .tab:hover {
            border-color: $NAV_BAR_TAB_BORDER_HOVER_COLOR;
            color: $NAV_BAR_TAB_BORDER_HOVER_COLOR;
            &.active {
                color: $NAV_BAR_TAB_FONT_ACTIVE_COLOR;
            }
        }
    }
</style>
<script>
    import SStorage from "@/storage/tabView";
    export default{
        computed : {
            tabs : function(){
                return this.$store.getters.tabs
            }
        }, data(){
            return {}
        }, methods : {
            delTab : function(index){
                let _this = this;
                _this.$store.dispatch( "DelTabForIndex", index ).then( function(result){
                    if( result.path ){
                        _this.$router.push( result.path );
                    }
                    SStorage.addTab( result.tabs );
                } )
            }, changeTab : function(path){
                this.$router.push( path );
            }
        }
    }
</script>
