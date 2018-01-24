<template>
    <div class="createOrder">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="createOrderForm">
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
                    <el-cascader :options="form.staticCity" v-model="form.receiveCity" @change="chooseCity">
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
                <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        :on-preview="previewImg"
                        :on-remove="removeImg">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible" size="tiny">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
        </el-form>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .createOrder {
        display: flex;
        flex-direction: column;
        margin: 10px;
        .createOrderForm {
            display: flex;
            .createOrderBasicInfo, .createOrderOtherInfo {
                display: flex;
                flex: 1;
                flex-direction: column;
                background: $CREATE_BACKGROUND;
                border: 1px solid $CREATE_BORDER_COLOR;
                padding: 20px;
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
            .createOrderBasicInfo {
                margin-right: 10px;
            }
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                dialogImageUrl : '', dialogVisible : false, form : {
                    name : "", storeName : "", receiveName : "", receiveMobile : "", receiveCity : [], staticCity : [{
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
                    }], receiveAddress : ""
                }, rules : {
                    name : [{ required : true }]
                }
            }
        }, methods : {
            chooseCity(val){
                console.log( val );
            }, previewImg(file){
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            }, removeImg(file, fileList){
                console.log( file, fileList );
            }
        }
    }
</script>
