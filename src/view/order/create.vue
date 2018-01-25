<template>
    <div class="createOrder">
        <el-form ref="formData" :model="form" :rules="rules" label-width="80px" class="createOrderForm">
            <div class="createOrderBasicInfo">
                <div class="createOrderInfoHeader">
                    买家基本信息
                    <div class="createOrderInfoSubHeader">请填写买家基本信息</div>
                </div>
                <el-form-item label="买家账号" prop="name">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="店铺名称" prop="name">
                    <el-input v-model="form.storeName" :readonly="true" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="收货人" prop="name">
                    <el-input v-model="form.receiveName"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="name">
                    <el-input v-model="form.receiveMobile"></el-input>
                </el-form-item>
                <el-form-item label="配送区域" prop="name">
                    <el-cascader :options="staticCity" v-model="form.receiveCity" @change="chooseCity">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="name">
                    <el-input v-model="form.receiveAddress" type="textarea" :autosize="true"></el-input>
                </el-form-item>
            </div>
            <div class="createOrderOtherInfo">
                <div class="createOrderInfoHeader">
                    买家高级信息
                    <div class="createOrderInfoSubHeader">请填写买家高级信息</div>
                </div>
            </div>
            <div class="createOrderProductList">
                <div class="createOrderInfoHeader">
                    订单商品列表
                    <div class="createOrderInfoSubHeader">请选择订单的商品</div>
                </div>
                <div class="createOrderInfoMain">
                    <div class="createOrderProductTableTools">
                        <div class="createOrderProductTableToolItem">
                            <el-input v-model="searchInfo" placeholder="请输入内容商品名称等信息进行查询"
                                      style="margin-right: 10px"></el-input>
                            <el-button type="primary" icon="el-icon-search"
                                       @click="searchDialogList = true"></el-button>
                        </div>
                        <div class="createOrderProductTableToolItem">
                            <div class="createOrderProductTableToolItemSon">
                                <div class="createOrderProductTableToolItemSonHeader">已添加商品总价</div>
                                <div class="createOrderProductTableToolItemSonMain" v-html="form.totalPrice"></div>
                            </div>
                            <div class="createOrderProductTableToolItemSon">
                                <div class="createOrderProductTableToolItemSonHeader">已添加商品总数</div>
                                <div class="createOrderProductTableToolItemSonMain" v-html="form.totalNum"></div>
                            </div>
                        </div>
                        <div class="createOrderProductTableToolItem">
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
                                prop="productNum"
                                label="商品数量">
                            <template slot-scope="scope">
                                <el-input-number style="width: 100px" v-model="scope.row.productNum" size="mini"
                                                 controls-position="right" :min="1"></el-input-number>
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
        <div class="createOrderTools" ref="createOrderTools" :style="{'width':createToolsWidth+'px'}">
            <el-button type="info" @click="resetForm()">重置订单</el-button>
            <el-button type="success">提交订单</el-button>
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

    .createOrder {
        position: relative;
        display: flex;
        flex-direction: column;
        margin: 10px;
        .createOrderForm {
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 50px;
            .createOrderBasicInfo, .createOrderOtherInfo {
                display: flex;
                flex: 1;
                flex-direction: column;
                background: $CREATE_BACKGROUND;
                border: 1px solid $CREATE_BORDER_COLOR;
                padding: 20px;
            }
            .createOrderBasicInfo {
                margin-right: 10px;
            }
            .createOrderProductList {
                padding: 20px;
                display: flex;
                flex-direction: column;
                width: 100%;
                background: $CREATE_BACKGROUND;
                border: 1px solid $CREATE_BORDER_COLOR;
                margin-top: 10px;
                .createOrderInfoMain {
                    display: flex;
                    flex-direction: column;
                    .createOrderProductTableTools {
                        display: flex;
                        .createOrderProductTableToolItem {
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
                            .createOrderProductTableToolItemSon {
                                position: relative;
                                display: flex;
                                flex-direction: column;
                                flex: 1;
                                align-items: center;
                                border-right: 1px dashed $CREATE_PRODUCT_TABLE_TOOLS_BORDER_COLOR;
                                &:last-child {
                                    border-right: none;
                                }
                                .createOrderProductTableToolItemSonHeader {
                                    display: flex;
                                    width: 100%;
                                    font-size: 12px;
                                    transform: scale(0.80);
                                    color: $CREATE_SUB_HEADER_FONT_COLOR;
                                    justify-content: flex-start;
                                }
                                .createOrderProductTableToolItemSonMain {
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
            .createOrderInfoHeader {
                display: flex;
                align-items: flex-end;
                color: $CREATE_HEADER_FONT_COLOR;
                margin-bottom: 20px;
                .createOrderInfoSubHeader {
                    display: flex;
                    font-size: 12px;
                    transform: scale(0.90);
                    color: $CREATE_SUB_HEADER_FONT_COLOR;
                }
            }
        }
        .createOrderTools {
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
            z-index: 3000;
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                createToolsWidth : '', dialogImageUrl : '', searchDialogList : false, staticCity : [{
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
                }], productSelected : [], searchInfo : "", searchProductList : [], searchTableData : [{
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
                }], form : {
                    name : "",
                    storeName : "",
                    receiveName : "",
                    receiveMobile : "",
                    receiveCity : [],
                    receiveAddress : "",
                    tableData : [],
                    totalPrice : 0,
                    totalNum : 0
                }, rules : {
                    name : [{ required : true }]
                }
            }
        }, mounted(){
            this.createToolsWidth = this.$parent.$refs.appContainer.offsetWidth;
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
