<template>
    <div ref="containerBMap" class="containerBMap"></div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .containerBMap {
        display: flex;
        flex: 1;
        min-height: 400px;
        background: $CHART_BOX_BACKGROUND !important;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.02);
        padding: 10px;
    }
</style>
<script>

    export default{
        data(){
            return {
                myChart : null, height : ""
            }
        }, mounted(){
            let _this = this;
            this.height = this.$refs.containerBMap.offsetHeight;
            _this._initChart()
        }, methods : {
            _initChart(){

            }
        }
    }
</script>
