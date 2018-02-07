<template>
    <div class="productDetail" ref="productDetail">
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
        <el-form ref="formData" :model="form" :rules="rules" label-width="100px" style="margin-bottom: 60px">
            <div class="productDetailInfo">
                <div class="productDetailBasicInfo">
                    <div class="productDetailInfoHeader">
                        商品基本信息
                        <div class="productDetailInfoSubHeader">请填写商品基本信息</div>
                    </div>
                    <el-form-item label="商品编号" prop="productCode">
                        <el-input v-model="form.productCode" placeholder="自动生成商品编号"></el-input>
                    </el-form-item>
                    <el-form-item label="商品类型" prop="productType">
                        <el-select v-model="form.productType" filterable placeholder="请选择商品类型">
                            <el-option
                                    v-for="item in responseData.typeOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="productName">
                        <el-input v-model="form.productName" placeholder="请输入商品名称"></el-input>
                    </el-form-item>
                    <el-form-item label="客户端名称" prop="productShowName">
                        <el-input v-model="form.productShowName" placeholder="请输入客户端显示名称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位" prop="productUnit">
                        <el-input v-model="form.productUnit" placeholder="请输入商品单位"></el-input>
                    </el-form-item>

                    <el-form-item label="商品价格" prop="productPrice">
                        <el-input v-model="form.productPrice" placeholder="请输入商品价格">
                            <template slot="append">/ {{form.productUnit}}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="商品型号" prop="productModel">
                        <el-input v-model="form.productModel" placeholder="请输入商品型号"></el-input>
                    </el-form-item>
                    <el-form-item label="商品品牌" prop="productBrand">
                        <el-select v-model="form.productBrand" filterable placeholder="请选择商品品牌">
                            <el-option
                                    v-for="item in responseData.brandOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品分类" prop="productCategory">
                        <el-transfer
                                filterable
                                :filter-method="filterMethod"
                                :titles="['全部分类', '已选分类']"
                                filter-placeholder="请选择商品分类"
                                v-model="form.productCategory"
                                :data="responseData.categoryOption">
                        </el-transfer>
                    </el-form-item>
                </div>
                <div class="productDetailExpertInfo">
                    <div class="productDetailInfoHeader">
                        商品高级信息
                        <div class="productDetailInfoSubHeader">请填写商品高级信息</div>
                    </div>
                    <el-form-item label="搜索关键字" class="productSearchKey">
                        <InputTags v-model="form.productSearchKey"></InputTags>
                    </el-form-item>
                </div>
                <div class="productDetailMainPics">
                    <div class="productDetailInfoHeader">
                        商品主图信息
                        <div class="productDetailInfoSubHeader">请上传商品资源信息</div>
                    </div>
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :multiple="true"
                            list-type="picture-card"
                            :file-list="form.productMainPicList"
                            :limit="10"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :disabled="true">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="productDetailSupportPics">
                    <div class="productDetailInfoHeader">
                        商品辅助图片信息
                        <div class="productDetailInfoSubHeader">请上传商品资源信息</div>
                    </div>
                    <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :multiple="true"
                            list-type="picture-card"
                            :file-list="form.productSupportPicList"
                            :limit="10"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                </div>
                <div class="productDetailDesc">
                    <div class="productDetailInfoHeader">
                        商品详细信息
                        <div class="productDetailInfoSubHeader">请编辑商品详细信息</div>
                    </div>
                    <Tinymce v-model="form.productDesc"></Tinymce>
                </div>
            </div>
        </el-form>

        <div class="productDetailTools" ref="productDetailTools" :style="{'width':createToolsWidth+'px'}"
             v-if="productType != 'read'">
            <div class="productDetailToolsItems">
                <div class="productDetailToolsItem">
                    <div class="productDetailToolsItemTitle">商品状态</div>
                    {{form.productState | productStateCodeToName('form.productState')}}
                </div>
            </div>
            <div class="productDetailToolsItems">
                <el-button type="info" @click="resetForm()">重置</el-button>
                <el-button type="success">提交审核</el-button>
                <el-button type="warning">商品下线</el-button>
                <el-button type="danger">删除商品</el-button>
            </div>
        </div>

        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
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
        padding-bottom: 10px;
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
            flex-wrap: wrap;
            .productDetailBasicInfo, .productDetailExpertInfo, .productDetailMainPics, .productDetailSupportPics, .productDetailDesc {
                padding: 20px;
                display: flex;
                flex-direction: column;
                background: $PRODUCT_DETAIL_BACKGROUND;
                border: 1px solid $PRODUCT_DETAIL_BORDER_COLOR;
            }
            .productDetailBasicInfo {
                min-width: 600px;
                flex: 3;
                margin-right: 10px;
            }
            .productDetailExpertInfo {
                flex: 1.8;
            }
            .productDetailMainPics, .productDetailSupportPics, .productDetailDesc {
                width: 100%;
                margin-top: 10px;
            }
        }

    }

    .productDetailTools {
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
        .productDetailToolsItems {
            display: flex;
            flex: 1;
            &:last-child {
                justify-content: flex-end;
            }
            .productDetailToolsItem {
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
                .productDetailToolsItemTitle {
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

    .productDetailToolsRead {
        @extend .productDetailTools;
        position: relative;
        box-shadow: none;
        border-top: none;
        width: 100% !important;
        background: $CREATE_ORDER_DETAIL_TOOLS_READ_BACKGROUND;
        margin-bottom: 10px;
        border: 1px solid $CREATE_BORDER_COLOR;
        .productDetailToolsItems {
            justify-content: flex-start !important;
        }
    }
</style>
<script>
    import InputTags from "@/components/Other/InputTags"
    import Tinymce from '@/components/Editor/Tinymce/Tinymce'
    export default{
        props : {
            productType : {
                type : String
            }
        }, mounted(){
            this.createToolsWidth = this.$refs.productDetail.offsetWidth + 20;
        }, data(){
            return {
                createToolsWidth : '',
                dialogImageUrl : '',
                dialogVisible : false,
                keyValue : "",
                productState : 1,
                filterMethod(query, item) {
                    return item.searchKey.indexOf( query ) > -1;
                },
                responseData : {
                    brandOption : [{
                        value : "brand01", label : "商品品牌01"
                    }, {
                        value : "brand02", label : "商品品牌02"
                    }], categoryOption : [{
                        label : "商品分类01", key : "category01", searchKey : 'c1'
                    }, {
                        label : "商品分类02", key : "category02", searchKey : 'c2'
                    }], typeOption : [{
                        label : "采购商品", value : 'wholesale'
                    }, {
                        label : "零售商品", value : 'retail'
                    }]
                },
                form : {
                    productCode : "PC201801300001",
                    productName : "商品名称一",
                    productShowName : "该商品用户端显示名称,并非业务字段,只是显示用。",
                    productSearchKey : [],
                    productModel : "",
                    productBrand : "",
                    productCategory : [],
                    productUnit : "",
                    productType : "",
                    productPrice : "",
                    productState : "waitAuth",
                    productMainPicList : [{
                        name : 'default.png', url : 'http://parrish-wn.oss-cn-beijing.aliyuncs.com/IMG_0181.png'
                    }, {
                        name : 'logo.jpg', url : 'http://parrish-wn.oss-cn-beijing.aliyuncs.com/logo.jpg'
                    }],
                    productSupportPicList : [{
                        name : 'default.png', url : 'http://parrish-wn.oss-cn-beijing.aliyuncs.com/IMG_0181.png'
                    }, {
                        name : 'logo.jpg', url : 'http://parrish-wn.oss-cn-beijing.aliyuncs.com/logo.jpg'
                    }],
                    productDesc : "&nbsp;商品详情案例"
                },
                rules : {
                    productCode : [{ required : true, message : '请重新创建商品', trigger : 'blur' }],
                    productName : [{ required : true, message : '请输入商品名称', trigger : 'blur' }],
                    productShowName : [{ required : true, message : '请输入客户端显示商品名称', trigger : 'blur' }],
                    productSearchKey : [{ required : true, message : '请设置商品搜索关键字', trigger : 'blur' }],
                    productModel : [{ required : true, message : '请输入商品型号', trigger : 'blur' }],
                    productBrand : [{ required : true, message : '请选择商品品牌', trigger : 'change' }],
                    productCategory : [{ required : true, message : '请选择商品分类', trigger : 'change' }],
                    productUnit : [{ required : true, message : '请输入商品单位', trigger : 'blur' }],
                    productType : [{ required : true, message : '请选择商品类型', trigger : 'change' }],
                    productPrice : [{ required : true, message : '请输入商品价格', trigger : 'blur' }]
                }
            }
        }, methods : {
            addKey(){
                console.log( this.keyValue );
            }, handleRemove(file, fileList) {
                console.log( file, fileList );
            }, handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }, resetForm(){
                this.$refs['formData'].resetFields();
                this.form = {
                    productCode : "PC201801300001",
                    productName : "",
                    productShowName : "",
                    productSearchKey : [],
                    productModel : "",
                    productBrand : "",
                    productCategory : [],
                    productUnit : "",
                    productType : "",
                    productPrice : "",
                    productState : "waitAuth",
                    productMainPicList : [],
                    productSupportPicList : [],
                    productDesc : ""
                };
            }
        }, components : {
            InputTags, Tinymce
        }, watch : {
            'form.productSearchKey' : {
                handler(newVal, oldVal){
                    console.log( newVal );
                }, deep : true
            }
        }
    }
</script>
