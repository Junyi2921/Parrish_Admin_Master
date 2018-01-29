<template>
    <div class="orderDetail" ref="orderDetail">
        <div class="orderDetailToolsRead" ref="orderDetailTools" :style="{'width':createToolsWidth+'px'}"
             v-if="orderType == 'READ'">
            <div class="orderDetailToolsItems">
                <div class="orderDetailToolsItem">
                    <div class="orderDetailToolsItemTitle">订单状态</div>
                    {{orderStateCode | orderStateCodeToName('orderStateCode')}}
                </div>
                <div class="orderDetailToolsItem">
                    <div class="orderDetailToolsItemTitle">订单总金额</div>
                    ¥{{form.totalPrice}}
                </div>
                <div class="orderDetailToolsItem">
                    <div class="orderDetailToolsItemTitle">订单商品总数</div>
                    {{form.totalNum }}
                </div>
            </div>
        </div>
        <el-form ref="formData" :model="form" :rules="rules" label-width="80px" class="orderDetailForm">
            <div class="orderDetailBasicInfo">
                <div class="orderDetailInfoHeader">
                    买家基本信息
                    <div class="orderDetailInfoSubHeader" v-if="orderType == 'CREATE'">请填写买家基本信息</div>
                </div>
                <el-form-item label="买家账号" prop="name">
                    <el-input v-model="form.name" :disabled="orderBasicDisabled()"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称" prop="name">
                    <el-input v-model="form.storeName" :disabled="orderBasicDisabled()"></el-input>
                </el-form-item>
                <el-form-item label="收货人" prop="name">
                    <el-input v-model="form.receiveName" :disabled="orderBasicDisabled()"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="name">
                    <el-input v-model="form.receiveMobile" :disabled="orderBasicDisabled()"></el-input>
                </el-form-item>
                <el-form-item label="配送区域" prop="name">
                    <el-cascader :options="staticCity" v-model="form.receiveCity" @change="chooseCity"
                                 :disabled="orderBasicDisabled()">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="name">
                    <el-input v-model="form.receiveAddress" type="textarea" :autosize="true"
                              :disabled="orderBasicDisabled()"></el-input>
                </el-form-item>
            </div>
            <div class="orderDetailOtherInfo">
                <div class="orderDetailInfoHeader">
                    买家高级信息
                    <div class="orderDetailInfoSubHeader" v-if="orderType == 'CREATE' ||orderType == 'EDIT'">请填写买家高级信息
                    </div>
                </div>
            </div>
            <div class="orderDetailProductList">
                <div class="orderDetailInfoHeader">
                    订单商品列表
                    <div class="orderDetailInfoSubHeader" v-if="orderType == 'CREATE' ||orderType == 'EDIT'">请选择订单的商品
                    </div>
                </div>
                <div class="orderDetailInfoMain">
                    <div class="orderDetailProductTableTools" v-if="orderType == 'CREATE' ||orderType == 'EDIT'">
                        <div class="orderDetailProductTableToolItem">
                            <el-input v-model="searchInfo" placeholder="请输入内容商品名称等信息进行查询"
                                      style="margin-right: 10px"></el-input>
                            <el-button type="primary" icon="el-icon-search"
                                       @click="searchDialogList = true"></el-button>
                        </div>
                        <div class="orderDetailProductTableToolItem">
                            <div class="orderDetailProductTableToolItemSon">
                                <div class="orderDetailProductTableToolItemSonHeader">已添加商品总价</div>
                                <div class="orderDetailProductTableToolItemSonMain" v-html="form.totalPrice"></div>
                            </div>
                            <div class="orderDetailProductTableToolItemSon">
                                <div class="orderDetailProductTableToolItemSonHeader">已添加商品总数</div>
                                <div class="orderDetailProductTableToolItemSonMain" v-html="form.totalNum"></div>
                            </div>
                        </div>
                        <div class="orderDetailProductTableToolItem">
                            <el-button type="danger" icon="el-icon-delete"
                                       @click="deleteProductWithSelected"></el-button>
                        </div>
                    </div>
                    <el-table
                            ref="selectedProduct"
                            :data="form.tableData"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="selectedProduct">
                        <el-table-column
                                type="selection"
                                width="55" v-if="orderType == 'CREATE' ||orderType == 'EDIT'">
                        </el-table-column>
                        <el-table-column
                                prop="productName"
                                label="商品名称">
                        </el-table-column>
                        <el-table-column
                                prop="productBrand"
                                label="商品品牌">
                            <template slot-scope="scope">
                                <el-tag type="warning"
                                        close-transition>{{scope.row.productBrand}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="productCategory"
                                label="商品分类">
                            <template slot-scope="scope">
                                <el-tag type="info"
                                        close-transition>{{scope.row.productCategory}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="productPrice"
                                label="商品价格">
                            <template slot-scope="scope">
                                <el-tag type="danger"
                                        close-transition>¥ {{scope.row.productPrice}}
                                </el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="productNum"
                                label="商品数量">
                            <template slot-scope="scope">
                                <el-tag type="primary" close-transition v-if="orderType == 'READ'">
                                    {{scope.row.productNum}}
                                </el-tag>
                                <el-input-number style="width: 100px" v-model="scope.row.productNum" size="mini"
                                                 controls-position="right" :min="1"
                                                 v-if="orderType == 'CREATE'"></el-input-number>
                            </template>
                        </el-table-column>
                        <el-table-column
                                prop="productDesc"
                                label="商品描述"
                                show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </el-form>

        <div class="orderDetailTools" ref="orderDetailTools" :style="{'width':createToolsWidth+'px'}"
             v-if="orderType == 'CREATE' || orderType == 'EDIT'">
            <div class="orderDetailToolsItems">
                <div class="orderDetailToolsItem">
                    <div class="orderDetailToolsItemTitle">订单状态</div>
                    {{orderStateCode | orderStateCodeToName('orderStateCode')}}
                </div>
                <div class="orderDetailToolsItem">
                    <div class="orderDetailToolsItemTitle">订单总金额</div>
                    ¥{{form.totalPrice}}
                </div>
                <div class="orderDetailToolsItem">
                    <div class="orderDetailToolsItemTitle">订单商品总数</div>
                    {{form.totalNum }}
                </div>
            </div>
            <div class="orderDetailToolsItems">
                <el-button type="info" @click="resetForm()">重置订单</el-button>
                <el-button type="success">提交订单</el-button>
            </div>
        </div>


        <el-dialog title="搜索结果" :visible.sync="searchDialogList" width="80%">
            <div class="searchDialogTools">
                <el-input v-model="searchInfo" placeholder="请输入内容商品名称等信息进行查询"
                          style="margin-right: 10px"></el-input>
                <el-button type="primary" icon="el-icon-search"></el-button>
            </div>
            <el-table :data="searchTableData" @selection-change="selectedSearchProduct">>
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="productName"
                        label="商品名称">
                </el-table-column>
                <el-table-column
                        prop="productBrand"
                        label="商品品牌">
                    <template slot-scope="scope">
                        <el-tag type="warning"
                                close-transition>{{scope.row.productBrand}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="productCategory"
                        label="商品分类">
                    <template slot-scope="scope">
                        <el-tag type="info"
                                close-transition>{{scope.row.productCategory}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="productPrice"
                        label="商品价格">
                    <template slot-scope="scope">
                        <el-tag type="primary"
                                close-transition>{{scope.row.productPrice}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="productDesc"
                        label="商品描述"
                        show-overflow-tooltip>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="searchDialogList = false">取 消</el-button>
                <el-button type="primary" @click="addProductWithSelected">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .searchDialogTools {
        display: flex;
        background: $CREATE_PRODUCT_TABLE_TOOLS_BACKGROUND;
        border: 1px solid $CREATE_PRODUCT_TABLE_TOOLS_BORDER_COLOR;
        border-radius: 3px;
        padding: 10px;
    }

    .orderDetail {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 10px;
        .orderDetailForm {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 50px;
            .orderDetailBasicInfo, .orderDetailOtherInfo {
                display: flex;
                flex: 1;
                flex-direction: column;
                background: $CREATE_BACKGROUND;
                border: 1px solid $CREATE_BORDER_COLOR;
                padding: 20px;
            }
            .orderDetailBasicInfo {
                margin-right: 10px;
            }
            .orderDetailProductList {
                padding: 20px;
                display: flex;
                flex-direction: column;
                width: 100%;
                background: $CREATE_BACKGROUND;
                border: 1px solid $CREATE_BORDER_COLOR;
                margin-top: 10px;
                .orderDetailInfoMain {
                    display: flex;
                    flex-direction: column;
                    .orderDetailProductTableTools {
                        display: flex;
                        .orderDetailProductTableToolItem {
                            display: flex;
                            flex: 1;
                            background: $CREATE_PRODUCT_TABLE_TOOLS_BACKGROUND;
                            border: 1px solid $CREATE_PRODUCT_TABLE_TOOLS_BORDER_COLOR;
                            border-radius: 3px;
                            margin-bottom: 10px;
                            padding: 10px;
                            margin-right: 10px;
                            &:last-child {
                                flex: none;
                                margin-right: 0;
                            }
                            .orderDetailProductTableToolItemSon {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                flex: 1;
                                align-items: center;
                                border-right: 1px dashed $CREATE_PRODUCT_TABLE_TOOLS_BORDER_COLOR;
                                &:last-child {
                                    border-right: none;
                                }
                                .orderDetailProductTableToolItemSonHeader {
                                    display: flex;
                                    width: 100%;
                                    font-size: 12px;
                                    transform: scale(0.80);
                                    color: $CREATE_SUB_HEADER_FONT_COLOR;
                                    justify-content: flex-start;
                                }
                                .orderDetailProductTableToolItemSonMain {
                                    position: absolute;
                                    right: 10px;
                                    bottom: 0;
                                    display: flex;
                                    font-size: 18px;
                                    font-weight: bolder;
                                    justify-content: flex-end;
                                    color: #46A0FC;
                                }
                            }
                        }

                    }
                }
            }
            .orderDetailInfoHeader {
                display: flex;
                align-items: flex-end;
                color: $CREATE_HEADER_FONT_COLOR;
                margin-bottom: 20px;
                .orderDetailInfoSubHeader {
                    display: flex;
                    font-size: 12px;
                    transform: scale(0.90);
                    color: $CREATE_SUB_HEADER_FONT_COLOR;
                }
            }
        }

        .orderDetailTools {
            justify-content: flex-end;
            box-sizing: border-box;
            padding: 10px;
            position: fixed;
            right: 0;
            bottom: 0;
            display: flex;
            width: 100%;
            background: $CREATE_PRODUCT_TOOLS_BACKGROUND;
            border-top: 1px solid $CREATE_PRODUCT_TABLE_TOOLS_BORDER_COLOR;
            box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 0 5px 0 rgba(0, 0, 0, 0.04);
            z-index: 1500;
            .orderDetailToolsItems {
                display: flex;
                flex: 1;
                &:last-child {
                    justify-content: flex-end;
                }
                .orderDetailToolsItem {
                    display: flex;
                    position: relative;
                    justify-content: flex-end;
                    align-items: flex-end;
                    width: 150px;
                    font-size: 20px;
                    padding: 0 20px;
                    border-right: 1px dashed $CREATE_ORDER_DETAIL_TOOLS_BORDER;
                    &:last-child {
                        border-right: none;
                    }
                    color: #909399;
                    .orderDetailToolsItemTitle {
                        position: absolute;
                        top: 0;
                        left: 10px;
                        font-size: 12px;
                        transform: scale(0.80);
                        color: $CREATE_ORDER_DETAIL_TOOLS_TITLE;
                    }
                }
            }
        }
        .orderDetailToolsRead {
            @extend .orderDetailTools;
            position: relative;
            box-shadow: none;
            border-top: none;
            width: 100% !important;
            background: $CREATE_ORDER_DETAIL_TOOLS_READ_BACKGROUND;
            margin-bottom: 10px;
            border: 1px solid $CREATE_BORDER_COLOR;
            .orderDetailToolsItems {
                justify-content: flex-start !important;
            }
        }
    }
</style>
<script>
    export default{
        props : {
            orderType : {
                type : String, default : "CREATE"
            }
        }, computed : {}, data(){
            return {
                orderBasicDisabled(){
                    if( this.orderType == "READ" ){
                        return true;
                    }else if( this.orderType == "EDIT" || this.orderType == "CREATE" ){
                        return false;
                    }
                },
                createToolsWidth : '',
                dialogImageUrl : '',
                staticCity : [{
                    value : "022", label : "天津", children : [{
                        value : "001", label : "天津市", children : [{
                            value : "001", label : "南开区"
                        }, {
                            value : "002", label : "和平区"
                        }, {
                            value : "003", label : "红桥区"
                        }, {
                            value : "004", label : "河西区"
                        }, {
                            value : "005", label : "河北区"
                        }, {
                            value : "006", label : "河东区"
                        }, {
                            value : "007", label : "西青区"
                        }]
                    }]
                }],
                productSelected : [],
                searchDialogList : false,
                searchInfo : "",
                searchProductList : [],
                searchTableData : [{
                    productCode : "P000001",
                    productName : '商品名称01',
                    productBrand : '商品品牌',
                    productCategory : '分类一/分类二/分类三',
                    productPrice : 100.00,
                    productDesc : "商品描述",
                    productNum : 1,
                }, {
                    productCode : "P000002",
                    productName : '商品名称02',
                    productBrand : '商品品牌',
                    productCategory : '分类一/分类二/分类三',
                    productPrice : 100.00,
                    productDesc : "商品描述",
                    productNum : 1
                }, {
                    productCode : "P000003",
                    productName : '商品名称03',
                    productBrand : '商品品牌',
                    productCategory : '分类一/分类二/分类三',
                    productPrice : 100.00,
                    productDesc : "商品描述",
                    productNum : 1
                }, {
                    productCode : "P000011",
                    productName : '商品名称11',
                    productBrand : '商品品牌',
                    productCategory : '分类一/分类二/分类三',
                    productPrice : 100.00,
                    productDesc : "商品描述",
                    productNum : 1
                }, {
                    productCode : "P000012",
                    productName : '商品名称12',
                    productBrand : '商品品牌',
                    productCategory : '分类一/分类二/分类三',
                    productPrice : 100.00,
                    productDesc : "商品描述",
                    productNum : 1
                }],
                orderStateCode : "100",
                form : {
                    name : "",
                    storeName : "",
                    receiveName : "",
                    receiveMobile : "",
                    receiveCity : [],
                    receiveAddress : "",
                    tableData : [],
                    totalPrice : 0,
                    totalNum : 0
                },
                rules : {
                    name : [{ required : true }]
                }
            }
        }, mounted(){
            this.createToolsWidth = this.$refs.orderDetail.offsetWidth;
            this.form.tableData = [{
                productCode : "P000001",
                productName : '商品名称01',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000002",
                productName : '商品名称02',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000003",
                productName : '商品名称03',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000004",
                productName : '商品名称04',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000005",
                productName : '商品名称05',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000006",
                productName : '商品名称06',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000007",
                productName : '商品名称07',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000008",
                productName : '商品名称08',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000009",
                productName : '商品名称09',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }, {
                productCode : "P000010",
                productName : '商品名称10',
                productBrand : '商品品牌',
                productCategory : '分类一/分类二/分类三',
                productPrice : 100.00,
                productDesc : "商品描述",
                productNum : 1
            }];
        }, watch : {
            'form.tableData' : {
                handler(newVal, oldVal){
                    this.form.totalPrice = 0;
                    this.form.totalNum = 0;
                    for( let i = 0; i < newVal.length; i++ ){
                        this.form.totalPrice = this.form.totalPrice + newVal[i].productPrice * newVal[i].productNum;
                        this.form.totalNum = this.form.totalNum + newVal[i].productNum;
                    }
                }, deep : true
            }
        }, methods : {
            resetForm(){
                this.$refs['formData'].resetFields();
                this.form = {
                    name : "",
                    storeName : "",
                    receiveName : "",
                    receiveMobile : "",
                    receiveCity : [],
                    receiveAddress : "",
                    tableData : [],
                    totalPrice : 0,
                    totalNum : 0
                }
            }, deleteProductWithSelected(){
                let newArray = [];
                for( let i = 0; i < this.form.tableData.length; i++ ){
                    let flag = false;
                    for( let j = 0; j < this.productSelected.length; j++ ){
                        if( this.form.tableData[i].productCode == this.productSelected[j].productCode ){
                            flag = true;
                            break;
                        }
                    }
                    if( !flag ){
                        newArray.push( this.form.tableData[i] )
                    }
                }
                this.form.tableData = newArray;
            }, chooseCity(val){
                console.log( val );
            }, selectedProduct(val){
                this.productSelected = val;
                console.log( val );
            }, selectedSearchProduct(val){
                this.searchProductList = val;
            }, addProductWithSelected(){
                for( let i = 0; i < this.searchProductList.length; i++ ){
                    let flag = false;
                    for( let j = 0; j < this.form.tableData.length; j++ ){
                        if( this.searchProductList[i].productCode == this.form.tableData[j].productCode ){
                            flag = true;
                            this.form.tableData[j].productNum++;
                            break;
                        }
                    }
                    if( !flag ){
                        this.form.tableData.push( this.searchProductList[i] );
                    }
                }
                this.searchTableData = [];
                this.searchDialogList = false;
            }
        }
    }
</script>
