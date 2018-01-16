<template>
    <el-header class="menuLogo" height="50px">
        <span v-if="userInfoShow" class="menuLogoOne">
            Parrish
        </span>
        <span v-else class="menuLogoTwo">
            PM
        </span>
    </el-header>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .menuLogo {
        background: $LOGO_BACKGROUND_COLOR;
        display: flex;
        color: $LOGO_FONT_COLOR;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        border-right: 1px solid $LOGO_BOX_BORDER_RIGHT_COLOR;
        padding: 0;
        .menuLogoOne {
            font-size: 24px;
        }
        .menuLogoTwo {
            font-size: 24px;
        }
    }
</style>
<script>
    export default{
        computed : {
            userInfoShow : function(){
                return !this.$store.getters.isCollapse;
            }
        }, data(){
            return {}
        }
    }
</script>
