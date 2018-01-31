<template>
    <div>
        <div class="tagsList">
            <span class="item" v-for="(item,index) in tags">
                {{item}}
                <i class="el-icon-circle-close-outline" style="color:#ffffff" @click="delItem(index)"></i>
            </span>
            <input type="text" v-model="value" @keyup.enter="enter" @keyup.tab="enter" @keyup.delete="deleteTags(value)"
                   placeholder="请输入搜索关键字并回车保存"/>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss" scoped>
    .tagsList {
        min-height: 26px;
        -webkit-appearance: none;
        background-color: #fff;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: flex;
        flex-wrap: wrap;
        font-size: inherit;
        line-height: 1;
        outline: 0;
        padding: 0 15px;
        padding-bottom: 5px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        .item {
            background: #5EB2ED;
            color: #ffffff;
            padding: 5px;
            margin-right: 10px;
            margin-top: 5px;
            border-radius: 3px;
        }
        input {
            display: flex;
            flex: 1;
            border: none;
            outline: none;
            width: 100%;
            height: 90%;
            font-size: inherit;
            -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
            transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
            color: #606266;
            margin-top: 8.5px;
        }
    }
</style>
<script>
    export default{
        data(){
            return {
                value : "", oldVal : "", tags : []
            }
        }, watch : {
            value(newVal, oldVal){
                this.oldVal = oldVal;
            }, tags(){
//                console.log( this.tags );
            }
        }, methods : {
            enter(){
                if( this.value != "" ){
                    this.tags.push( this.value );
                    this.value = "";
                }
            }, deleteTags(val){
                let _this = this;
                if( _this.oldVal == '' ){
                    _this.tags.pop();
                }
                if( val == "" ){
                    _this.oldVal = '';
                }
            }, delItem(index){
                this.tags.splice( index, 1 )
            }
        }
    }
</script>
