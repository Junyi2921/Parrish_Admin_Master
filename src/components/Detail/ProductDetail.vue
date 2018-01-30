<template>
    <div class="productDetail">
        <div class="productDetailState">
            <div class="productDetailInfoHeader">
                商品流程
                <div class="productDetailInfoSubHeader">商量流程信息</div>
            </div>
            <el-steps :active="productState" finish-status="success" simple>
                <el-step title="完善信息" icon="el-icon-edit"></el-step>
                <el-step title="等待审核" icon="el-icon-service"></el-step>
                <el-step title="上线" icon="el-icon-success"></el-step>
            </el-steps>
        </div>
        <el-form ref="formData" :model="form" :rules="rules" label-width="100px">
            <div class="productDetailInfo">
                <div class="productDetailBasicInfo">
                    <div class="productDetailInfoHeader">
                        商品基本信息
                        <div class="productDetailInfoSubHeader">请填写商品基本信息</div>
                    </div>
                    <el-form-item label="商品编号" prop="productCode">
                        <el-input v-model="form.productCode"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="productName">
                        <el-input v-model="form.productName"></el-input>
                    </el-form-item>
                    <el-form-item label="客户端名称" prop="productShowName">
                        <el-input v-model="form.productShowName"></el-input>
                    </el-form-item>
                    <el-form-item label="搜索关键字" class="productSearchKey">
                        <i class="item" slot="prefix">123</i>
                        <el-input placeholder="请输入关键字" v-model="keyValue">
                            <el-button slot="append" icon="el-icon-plus" size="mini" @click="addKey"></el-button>
                        </el-input>
                    </el-form-item>
                </div>
                <div class="productDetailExpertInfo">
                    <div class="productDetailInfoHeader">
                        商品高级信息
                        <div class="productDetailInfoSubHeader">请填写商品高级信息</div>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">

    .item {
        width: 50px;
        height: 50px;
        background: #000;
    }

    .productDetailInfoHeader {
        display: flex;
        align-items: flex-end;
        color: $PRODUCT_DETAIL_HEADER_FONT_COLOR;
        margin-bottom: 20px;
        .productDetailInfoSubHeader {
            display: flex;
            font-size: 12px;
            transform: scale(0.90);
            color: $PRODUCT_DETAIL_SUB_HEADER_FONT_COLOR;
        }
    }

    .productDetail {
        display: flex;
        flex-direction: column;
        margin: 10px;
        margin-bottom: 0;
        .productDetailState {
            display: flex;
            flex-direction: column;
            flex: 1;
            padding: 20px;
            background: $PRODUCT_DETAIL_BACKGROUND;
            border: 1px solid $PRODUCT_DETAIL_BORDER_COLOR;
        }
        .productDetailInfo {
            margin-top: 10px;
            display: flex;
            .productDetailBasicInfo, .productDetailExpertInfo {
                padding: 20px;
                display: flex;
                flex-direction: column;
                flex: 1;
                background: $PRODUCT_DETAIL_BACKGROUND;
                border: 1px solid $PRODUCT_DETAIL_BORDER_COLOR;
            }
            .productDetailBasicInfo {
                margin-right: 10px;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                keyValue : "", productState : 1, form : {
                    productCode : "PC201801300001", productName : "商品名称一", productShowName : "该商品用户端显示名称,并非业务字段,只是显示用。"
                }, rules : {
                    productCode : [{ required : true }],
                    productName : [{ required : true }],
                    productShowName : [{ required : true }],
                    productSearchKey : [{ required : true }]
                }
            }
        }, methods : {
            addKey(){
                console.log( this.keyValue );
            }
        }
    }
</script>
