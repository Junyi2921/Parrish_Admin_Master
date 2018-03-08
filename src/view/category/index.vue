<template>
    <div class="categoryManagement" ref="categoryManagement">
        <div class="categoryManagementInfo">
            <div class="categoryManagementInfoHeader">
                分类管理
                <div class="categoryManagementInfoSubHeader">商量分类信息</div>
            </div>
            <el-input class="categorySearch"
                      placeholder="输入关键字进行过滤"
                      v-model="filterText">
            </el-input>
            <!--:render-content="renderContent"-->
            <el-tree
                    empty-text="暂无分类设置"
                    :data="categoryData"
                    default-expand-all
                    :expand-on-click-node="false"
                    :filter-node-method="filterNode"
                    ref="tree2">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                     <span ref="customShowLabel">
                         <span v-if="!data.editor" class="customShowLabel"
                               @dblclick="dbShowLabel(node,data) ">
                             {{node.label}}
                         </span>
                         <span v-if="data.editor" class="customEditorLabel">
                             <el-input v-focus @blur="() => editorBlur(node,data)" v-model="data.newLabel"
                                       ref="newLabel"></el-input>
                         </span>
                     </span>
                    <span>
                        <el-button type="text" @click="() => editor(data)">
                          编辑
                        </el-button>
                        <el-button type="text" @click="() => append(data)">
                          添加
                        </el-button>
                        <el-button type="text" @click="() => remove(node, data)">
                          删除
                        </el-button>
                    </span>
                </span>
            </el-tree>
            <el-dialog :title="dialogObj.title" :visible.sync="dialogObj.visible" width="50%"
                       :before-close="handleClose">
                <div v-if="dialogObj.type == 'editor'">
                    <span>编辑</span>
                </div>
                <div v-if="dialogObj.type == 'delete'">
                    <el-alert :closable="false" title="您真的要删除该分类吗?" type="warning"
                              description="删除该'分类'之前,请确认该'分类'下无'商品'。">
                    </el-alert>
                </div>
                <span slot="footer" class="dialog-footer" v-if="dialogObj.type == 'editor'">
                            <el-button @click="dialogObj.visible = false">取 消</el-button>
                            <el-button type="primary" @click="() => editorSubmit()">确 定</el-button>
                        </span>
                <span slot="footer" class="dialog-footer" v-if="dialogObj.type == 'delete'">
                            <el-button @click="dialogObj.visible = false">取 消</el-button>
                            <el-button type="primary" @click="() => removeItem()">确 定</el-button>
                        </span>
            </el-dialog>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .el-tree-node__content {
        height: auto !important;
        margin-bottom: 5px;
    }

    .categoryManagement {
        display: flex;
        flex-direction: column;
        margin: 10px;
        margin-bottom: 0;
        padding-bottom: 10px;
        .categoryManagementInfo {
            display: flex;
            flex-direction: column;
            /*width: 60%;*/
            flex: 1;
            padding: 20px;
            background: $CATEGORY_MANAGEMENT_BACKGROUND;
            border: 1px solid $CATEGORY_MANAGEMENT_BORDER_COLOR;
            .categorySearch {
                margin-bottom: 10px;
            }
        }
    }

    .categoryManagementInfoHeader {
        display: flex;
        align-items: flex-end;
        color: $CATEGORY_MANAGEMENT_HEADER_FONT_COLOR;
        margin-bottom: 20px;
        .categoryManagementInfoSubHeader {
            display: flex;
            font-size: 12px;
            transform: scale(0.90);
            color: $CATEGORY_MANAGEMENT_SUB_HEADER_FONT_COLOR;
        }
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }

    .customShowLabel {

    }

    .customEditorLabel {

    }
</style>
<script>
    let id = 10000;
    export default{
        data(){
            return {
                dialogObj : {
                    node : "", data : "", visible : false, type : "editor", title : ""
                }, filterText : '', categoryData : [{
                    id : 1, label : '一级 1', children : [{
                        id : 4, label : '二级 1-1', children : [{
                            id : 9, label : '三级 1-1-1'
                        }, {
                            id : 10, label : '三级 1-1-2'
                        }]
                    }]
                }, {
                    id : 2, label : '一级 2', children : [{
                        id : 5, label : '二级 2-1'
                    }, {
                        id : 6, label : '二级 2-2'
                    }]
                }, {
                    id : 3, label : '一级 3', children : [{
                        id : 7, label : '二级 3-1'
                    }, {
                        id : 8, label : '二级 3-2'
                    }]
                }]
            }
        }, directives : {
            focus : {
                // 当绑定元素插入到 DOM 中。
                inserted : function(el){
                    // 聚焦元素
                    el.getElementsByTagName( 'input' )[0].select()
                }
            }
        }, methods : {
            editorBlur(node, data){
                this.$delete( data, 'editor' );
                console.log( "保存成功" )
            }, dbShowLabel(node, data){
                this.$set( data, 'editor', true );
                this.$set( data, 'newLabel', data.label );
            }, editor(data){
                console.log( data );
                this.dialogObj.title = "编辑分类信息";
                this.dialogObj.type = "editor";
                this.dialogObj.node = "";
                this.dialogObj.data = data;
                this.dialogObj.visible = true;
            }, editorSubmit(){
                console.log( this.dialogObj.data )
                this.dialogObj.visible = false;
            }, append(data) {
                const newChild = { id : id++, label : '新的商品分类', children : [] };
                if( !data.children ){
                    this.$set( data, 'children', [] );
                }
                data.children.push( newChild );
            }, remove(node, data) {
                this.dialogObj.title = "删除分类信息";
                this.dialogObj.type = "delete";
                this.dialogObj.node = node;
                this.dialogObj.data = data;
                this.dialogObj.visible = true;
            }, removeItem(){
                const parent = this.dialogObj.node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex( d => d.id === this.dialogObj.data.id );
                children.splice( index, 1 );
                this.dialogObj.visible = false;
            }, filterNode(value, data) {
                if( !value ) return true;
                return data.label.indexOf( value ) !== -1;
            }
        }, watch : {
            filterText(val) {
                this.$refs.tree2.filter( val );
            }
        }
    }
</script>
