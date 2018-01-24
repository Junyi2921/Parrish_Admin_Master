<template>
    <div class="tableDataList">
        <div class="tableDataListTools">
            <el-input class="otherStyle" v-model="searchName" placeholder="您可以按照名称/电话等信息搜索"></el-input>
            <el-select class="selectStyle" v-model="chooseProductType" clearable placeholder="商品类型">
                <el-option
                        v-for="item in productType"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-select class="selectStyle" v-model="chooseProductBrand" clearable placeholder="商品品牌">
                <el-option
                        v-for="item in productBrand"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker class="otherStyle"
                            v-model="chooseTime"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search"></el-button>
            <el-button type="primary" icon="el-icon-edit"></el-button>
            <el-button type="success" icon="el-icon-download"></el-button>
        </div>
        <div class="tableDataListFilterBox">
            <div class="tableDataListFilterBoxIcon">
                <img src="/static/img/filter.svg">
            </div>
            <div class="tableDataListFilterBoxList">
                <div class="tableDataListFilterBoxItem">
                    <div class="tableDataListFilterBoxItemCheckbox">
                        <el-checkbox-group v-model="choosePayment" size="mini" fill="#696869" border="false">
                            <el-checkbox-button v-for="item in paymentList" :label="item.value" :key="item.value">
                                {{item.label}}
                            </el-checkbox-button>
                        </el-checkbox-group>
                    </div>
                    <div class="tableDataListFilterBoxItemTitle">
                        付款状态
                    </div>
                </div>
                <div class="tableDataListFilterBoxItem">
                    <div class="tableDataListFilterBoxItemCheckbox">
                        <el-checkbox-group v-model="chooseOrderType" size="mini" fill="#696869" border="false">
                            <el-checkbox-button v-for="item in orderTypeList" :label="item.value" :key="item.value">
                                {{item.label}}
                            </el-checkbox-button>
                        </el-checkbox-group>
                    </div>
                    <div class="tableDataListFilterBoxItemTitle">
                        订单状态
                    </div>
                </div>
            </div>
        </div>
        <div class="tableDataListMain">
            <el-table
                    :data="tableData"
                    header-cell-class-name="headerClass"
                    border
                    style="width: 100%">
                <el-table-column
                        fixed
                        type="index"
                        width="50"
                        header-align="center"
                        align="center">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="orderCode"
                        label="订单号"
                        width="150"
                        header-align="center"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="收货人"
                        width="120"
                        header-align="center"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="storeName"
                        label="店铺名称"
                        header-align="center"
                        align="center"
                        min-width="130">
                    <template slot-scope="scope">
                        <el-tag
                                type="primary"
                                close-transition>{{scope.row.storeName}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="mobile"
                        label="联系电话"
                        width="120"
                        header-align="center"
                        align="center">
                </el-table-column>
                <el-table-column
                        prop="type"
                        label="类型"
                        width="120"
                        header-align="center"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.type === '采购' ? 'primary' : 'success'"
                                close-transition>{{scope.row.type}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="pay"
                        label="付款"
                        width="120"
                        header-align="center"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.pay === '已付款' ? 'success' : 'danger'"
                                close-transition>{{scope.row.pay}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="orderState"
                        label="状态"
                        width="120"
                        header-align="center"
                        align="center">
                    <template slot-scope="scope">
                        <el-tag
                                :type="scope.row.orderState === '待发货' ? 'info' : 'danger'"
                                close-transition>{{scope.row.orderState}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="createTime"
                        label="下单时间"
                        width="120"
                        header-align="center"
                        align="center">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100"
                        header-align="center"
                        align="center">
                    <template slot-scope="scope">
                        <el-button @click="getItem(scope.row)" type="text" size="small">查看</el-button>
                        <!--<el-button type="text" size="small">编辑</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="10"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="400">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .selectStyle {
        display: flex;
        width: 120px;
    }

    .otherStyle {
        display: flex;
        flex: 1;
    }

    .tableDataList {
        display: flex;
        flex-direction: column;
        margin: 10px;
        .tableDataListTools {
            display: flex;
            div {
                margin-right: 10px;
            }
            div:last-child {
                margin-right: 0;
            }
        }
        .tableDataListFilterBox {
            display: flex;
            height: 60px;
            background: #ffffff;
            margin-top: 10px;
            border: 1px solid $BOX_BORDER_COLOR;
            border-bottom: none;
            .tableDataListFilterBoxIcon {
                display: flex;
                width: 50px;
                height: 100%;
                justify-content: center;
                align-items: center;
                border-right: 1px dashed $BOX_BORDER_COLOR;
                box-sizing: border-box;
                img {
                    width: 50%;
                }
            }
            .tableDataListFilterBoxList {
                display: flex;
                .tableDataListFilterBoxItem {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 0 20px;
                    margin-top: 5px;
                    .tableDataListFilterBoxItemCheckbox {
                        display: flex;
                    }
                    .tableDataListFilterBoxItemTitle {
                        display: flex;
                        height: 20px;
                        justify-content: center;
                        align-items: center;
                        font-size: 12px;
                        transform: scale(0.80);
                        color: $BOX_SUBTITLE_FONT_COLOR;
                    }
                }
            }
        }
        .tableDataListMain {
            display: flex;
            flex-direction: column;
            .headerClass {
                background: $BOX_HEADER_BACKGROUND;
            }
            .pagination {
                display: flex;
                justify-content: center;
                align-items: center;
                background: #ffffff;
                border: 1px solid $BOX_BORDER_COLOR;
                border-top: none;
                padding: 10px 0;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                createDialog : false, currentPage : 1, choosePayment : [], paymentList : [{
                    label : "已付款", value : "paid"
                }, {
                    label : "未付款", value : "notPaid"
                }], chooseOrderType : [], orderTypeList : [{
                    label : "待付款", value : "100"
                }, {
                    label : "待发货", value : "200"
                }, {
                    label : "已发货", value : "300"
                }, {
                    label : "待评价", value : "400"
                }, {
                    label : "已完成", value : "500"
                }], searchName : "", chooseProductType : "", productType : [{
                    label : "全部", value : "all"
                }, {
                    label : "采购", value : "wholesale"
                }, {
                    label : "零售", value : "retail"
                }], chooseProductBrand : "", productBrand : [{
                    label : "全部", value : "all"
                }, {
                    label : "品牌一", value : "brand1"
                }, {
                    label : "品牌二", value : "brand2"
                }], chooseTime : "", tableData : [{
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }, {
                    orderCode : '201801230001',
                    name : 'Parrish',
                    storeName : 'JunyiStyle',
                    mobile : '13000000000',
                    type : '采购',
                    pay : '已付款',
                    orderState : "待发货",
                    createTime : "2018-02-03"
                }]
            }
        }, methods : {
            handleSizeChange(val){
                console.log( val );
            }, handleCurrentChange(val){
                console.log( val );
            }, getItem(val){
                console.log( val );
            }
        }, components : {
        }, mounted(){
            console.log( this.$route.name );
        }
    }
</script>
