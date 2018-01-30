<template>
    <div class="tableDataList">
        <div class="tableDataListTools">
            <el-input class="otherStyle" v-model="searchName" placeholder="您可以按照名称/电话等信息搜索"></el-input>
            <el-select class="selectStyle" v-model="chooseOrderType" clearable placeholder="订单类型">
                <el-option v-for="item in orderType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-select class="selectStyle" v-model="chooseOrderState" clearable placeholder="订单状态">
                <el-option v-for="item in orderState" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker class="otherStyle" v-model="chooseTime" type="daterange" range-separator="至"
                            start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search"></el-button>
            <el-button type="primary" icon="el-icon-edit" @click="goCreateView"></el-button>
            <el-button type="success" icon="el-icon-download" @click="setExcelAndDownload"></el-button>
        </div>
        <div class="tableDataListFilterBox">
            <div class="tableDataListFilterBoxIcon">
                <img src="/static/img/filter.svg">
            </div>
            <div class="tableDataListFilterBoxList">
                <CheckBoxItem checkBoxTitle="付款状态" :checkedList="paymentList"
                              v-model="choosePaymentItems"></CheckBoxItem>
                <CheckBoxItem checkBoxTitle="订单状态" :checkedList="orderTypeList"
                              v-model="chooseOrderTypeItems"></CheckBoxItem>
            </div>
        </div>

        <div class="tableDataListMain">
            <el-table :data="tableData" header-cell-class-name="headerClass" border style="width: 100%">
                <el-table-column fixed type="index" width="50" header-align="center" align="center"></el-table-column>
                <el-table-column fixed prop="orderCode" label="订单号" width="150" header-align="center"
                                 align="center"></el-table-column>
                <el-table-column prop="name" label="收货人" width="120" header-align="center"
                                 align="center"></el-table-column>
                <el-table-column prop="storeName" label="店铺名称" header-align="center" align="center" min-width="130">
                    <template slot-scope="scope">
                        <el-tag type="primary" close-transition>{{scope.row.storeName}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="联系电话" width="120" header-align="center"
                                 align="center"></el-table-column>
                <el-table-column prop="type" label="类型" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.type === '采购' ? 'primary' : 'success'" close-transition>
                            {{scope.row.type}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="pay" label="付款" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.pay === '已付款' ? 'success' : 'danger'" close-transition>
                            {{scope.row.pay}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="orderState" label="状态" width="120" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="scope.row.orderState === '待发货' ? 'info' : 'danger'" close-transition>
                            {{scope.row.orderState}}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="下单时间" width="120" header-align="center"
                                 align="center"></el-table-column>
                <el-table-column fixed="right" label="操作" width="100" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button @click="getItem(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
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

        <el-dialog title="订单详情" :visible.sync="orderDetailReadVisible" width="80%">
            <OrderRead></OrderRead>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="orderDetailVisible = false">取 消</el-button>
                    <el-button type="primary" @click="orderDetailVisible = false">确 定</el-button>
                 </span>
        </el-dialog>
    </div>
</template>

<style rel="stylesheet/scss" lang="scss">
    @import "../../commons/style/tableDataList.scss";
</style>

<script>
    import OrderRead from '@/view/order/read'
    import ExportToExcel from '@/tools/exportToExcel.js'
    import CheckBoxItem from '@/components/Checkbox/CheckBox'
    export default {
        data() {
            return {
                orderDetailReadVisible : false, currentPage : 1, choosePaymentItems : [], paymentList : [{
                    label : "已付款", value : "paid"
                }, {
                    label : "未付款", value : "notPaid"
                }], chooseOrderTypeItems : [], orderTypeList : [{
                    label : "待付款", value : "100"
                }, {
                    label : "待发货", value : "200"
                }, {
                    label : "已发货", value : "300"
                }, {
                    label : "待评价", value : "400"
                }, {
                    label : "已完成", value : "500"
                }], searchName : "", chooseOrderType : "", orderType : [{
                    label : "全部", value : "all"
                }, {
                    label : "采购", value : "wholesale"
                }, {
                    label : "零售", value : "retail"
                }], chooseOrderState : "", orderState : [{
                    label : "全部", value : "all"
                }, {
                    label : "待发货", value : "100"
                }, {
                    label : "待付款", value : "200"
                }], chooseTime : "", tableData : ''
            }
        }, methods : {
            changeChecked(val) {
                console.log( val );
            }, setExcelAndDownload() {
                let tHeader = ['订单号', '收货人'];
                let filterVal = ['orderCode', 'name'];
                let dataList = this.tableData;
                ExportToExcel.exportJSON( tHeader, filterVal, dataList, '订单列表' );
            }, handleSizeChange(val) {
                console.log( val );
            }, handleCurrentChange(val) {
                console.log( val );
            }, getItem(val) {
                console.log( val );
                this.orderDetailReadVisible = true;
            }, goCreateView() {
                this.$router.push( '/order/create' );
            }, editItem(val) {
                this.$router.push( '/order/edit' );
            }
        }, components : {
            OrderRead, CheckBoxItem
        }, mounted() {
            this.tableData = [{
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
            }];
        }, watch : {
            choosePaymentItems(val) {
                console.log( val );
            }, chooseOrderTypeItems(val) {
                console.log( val );
            }
        }
    }
</script>
