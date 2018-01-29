<template>
    <div class="tableDataListFilterBoxItem" :value="value">
        <div class="tableDataListFilterBoxItemCheckbox">
            <el-checkbox-group v-model="myChooseChecked" size="mini" fill="#696869" border="false">
                <el-checkbox-button v-for="item in checkedList" :label="item.value" :key="item.value">
                    {{item.label}}
                </el-checkbox-button>
            </el-checkbox-group>
        </div>
        <div class="tableDataListFilterBoxItemTitle">
            {{checkBoxTitle}}
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
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
</style>
<script>
    export default{
        props : {
            value : {
                type : [Array, String]
            }, chooseChecked : {
                type : Array
            }, checkBoxTitle : {
                type : String
            }, checkedList : {
                type : Array
            }
        }, data(){
            return {
                myChooseChecked : this.value
            }
        }, watch : {
            value(val){
                this.myChooseChecked = val;
            }, myChooseChecked(val){
                this.$emit( 'input', val );
            }
        }
    }
</script>
