<template>
    <div class="box">
        <div class="boxIcon" :style=" { background : iconBGC } ">
            <img :src="icon">
        </div>
        <div class="boxMain">
            <div class="boxMainContent">
                <countup :start="start" :end="end" :decimal="decimal" :duration="duration"></countup>
            </div>
            <div class="boxMainTitle" v-html="title"></div>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .box {
        cursor: pointer;
        display: flex;
        flex: 1;
        background: $INFORMATION_BOX_BACKGROUND_COLOR;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.02);
        .boxIcon {
            display: flex;
            padding: 20px;
            background: $INFORMATION_BOX_ICON_BACKGROUND;
            img {
                width: 60px;
                height: 60px;
            }
        }
        .boxMain {
            display: flex;
            flex: 1;
            flex-direction: column;
            padding: 5px 10px;
            justify-content: center;
            align-items: center;
            .boxMainTitle {
                color: $INFORMATION_BOX_TITLE_FONT_COLOR;
                font-size: 14px;
                margin-top: 5px;
                font-weight: bolder;
            }
            .boxMainContent {
                color: $INFORMATION_BOX_CONTENT_FONT_COLOR;
                font-size: 34px;
                font-weight: bolder;
            }
        }
    }
</style>
<script>
    import countup from '@/components/Tools/Countup'
    export default{
        props : {
            start : {
                type : Number
            }, end : {
                type : Number
            }, decimal : {
                type : Number
            }, duration : {
                type : Number
            }, title : {
                type : String, default : "----"
            }, icon : {
                type : String, default : "/static/img/user.svg"
            }, iconBGC : {
                type : String
            }
        }, data(){
            return {}
        }, components : {
            countup
        }
    }
</script>
