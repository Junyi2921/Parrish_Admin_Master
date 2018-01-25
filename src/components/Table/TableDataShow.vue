<template>
    <div class="tableDataShowBox" ref="tableDataShow">
        <div class="boxTitle">
            <img src="/static/img/tableDataShow.svg">
            <div class="boxTitleFont">
                <div class="boxTitleFontBox" v-html="title"></div>
                <div class="boxSubTitleFont" v-html="subTitle"></div>
            </div>
            <div class="boxTitleBtn">
                <img src="/static/img/more.svg" @click="goMore">
            </div>
        </div>
        <div class="boxMain" :style="{'height':height}">
            <el-table :data="tableData">
                <el-table-column label="日期" header-align="center" align="center">
                    <template slot-scope="scope">
                        <span>{{ scope.row.date }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="内容" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-popover trigger="hover" placement="top">
                            <p>标题: {{ scope.row.title }}</p>
                            <p>内容: {{ scope.row.content }}</p>
                            <div slot="reference" class="name-wrapper">
                                {{ scope.row.title }}
                            </div>
                        </el-popover>
                    </template>
                </el-table-column>
                <el-table-column label="职位" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag type="info" v-html="scope.row.job"></el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="状态" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.level == 1">状态一</el-tag>
                        <el-tag type="info" v-if="scope.row.level == 2">状态二</el-tag>
                        <el-tag type="warning" v-if="scope.row.level == 3">状态三</el-tag>
                        <el-tag type="danger" v-if="scope.row.level == 4">状态四</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .tableDataShowBox {
        position: relative;
        display: flex;
        width: 100%;
        flex-direction: column;
        background: $BOX_BACKGROUND;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.02);
        overflow: auto;
        min-height:400px;
        .boxTitle {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            z-index: 800;
            display: flex;
            height: 60px;
            border-bottom: 1px solid $BOX_TITLE_BORDER_COLOR;
            box-sizing: border-box;
            padding: 0 10px;
            align-items: center;
            background: $BOX_BACKGROUND;
            img {
                display: flex;
                height: 35px;
                margin-right: 10px;
            }
            .boxTitleFont {
                flex: 1;
                display: flex;
                flex-direction: column;
                .boxTitleFontBox {
                    color: $BOX_TITLE_FONT_COLOR;
                }
                .boxSubTitleFont {
                    font-size: 12px;
                    color: $BOX_SUBTITLE_FONT_COLOR;
                }
            }
            .boxTitleBtn {
                display: flex;
                width: 30px;
                height: 30px;
                img {
                    width: 100%;
                }
            }
        }
        .boxMain {
            margin-top: 60px;
            overflow: auto;
            padding: 10px;
        }
    }
</style>
<script>
    export default{
        props : {
            path : '', title : {
                type : String, default : "这里显示的是标题"
            }, subTitle : {
                type : String, default : "这里显示的是副标题"
            }, path : "/", tableData : {
                type : Array, default : function(){
                    return [{
                        date : '2018/01/23', title : '我是事件标题', content : '我是事件详情', job : "CEO", level : 1
                    }, {
                        date : '2018/01/23', title : '我是事件标题', content : '我是事件详情', job : "CTO", level : 2
                    }, {
                        date : '2018/01/23', title : '我是事件标题', content : '我是事件详情', job : "COO", level : 3
                    }, {
                        date : '2018/01/23', title : '我是事件标题', content : '我是事件详情', job : "CFO", level : 4
                    }, {
                        date : '2018/01/23', title : '我是事件标题', content : '我是事件详情', job : "CEO", level : 1
                    }, {
                        date : '2018/01/23', title : '我是事件标题', content : '我是事件详情', job : "CTO", level : 2
                    }, {
                        date : '2018/01/23', title : '我是事件标题', content : '我是事件详情', job : "COO", level : 3
                    }, {
                        date : '2018/01/23', title : '我是事件标题', content : '我是事件详情', job : "CFO", level : 4
                    }];
                }
            }
        }, data(){
            return {
                height : ""
            }
        }, mounted(){
            this.height = this.$refs.tableDataShow.offsetHeight - 60 + 'px';
        }, methods : {
            goMore(){
                this.$router.push( this.path );
            }
        }
    }
</script>
