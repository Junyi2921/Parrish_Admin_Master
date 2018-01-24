<template>
    <div ref="containerPie" class="containerPie"></div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .containerPie {
        display: flex;
        flex: 1;
        min-height: 400px;
        background: $CHART_BOX_BACKGROUND !important;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.02);
        padding: 10px;
    }
</style>
<script>
    import echarts from 'echarts'
    import 'echarts/theme/macarons'
    export default{
        props : {
            //标题
            title : {
                type : String, default : "这里显示表格的标题"
            }, //副标题
            subTitle : {
                type : String, default : "这里显示表格的副标题"
            }, //图例数据
            legendData : {
                type : Array, defalut : function(){
                    return ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6'];
                }
            }, //展示数据
            seriesData : {
                type : Array, default : function(){
                    return [{ value : 10, name : 'rose1' }, { value : 5, name : 'rose2' }, {
                        value : 15, name : 'rose3'
                    }, { value : 15, name : 'rose4' }, { value : 20, name : 'rose5' }, {
                        value : 35, name : 'rose6'
                    }];
                }
            }
        }, data(){
            return {
                myChart : null, height : ""
            }
        }, mounted(){
            let _this = this;
            this.height = this.$refs.containerPie.offsetHeight;
            _this._initChart()
        }, methods : {
            _initChart(){
                this.myChart = echarts.init( this.$refs.containerPie, 'macarons' ).setOption( {
                    title : {
                        text : this.title, subtext : this.subTitle
                    }, tooltip : {
                        trigger : 'item', triggerOn : "mousemove"
                    }, legend : {
                        x : 'center', y : 'bottom', data : this.legendData
                    }, toolbox : {
                        show : true, feature : {
                            restore : { show : true }, saveAsImage : { show : true }
                        }
                    }, calculable : true, series : [{
//                        name : '测试数据',
                        type : 'pie', radius : '70%', center : ['50%', '50%'], roseType : 'area', data : this.seriesData
                    }]
                } );
            }
        }
    }
</script>
