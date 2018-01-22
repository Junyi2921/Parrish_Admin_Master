<template>
    <div ref="containerRadar" class="containerRadar"></div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .containerRadar {
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
                    return ['数据一', '数据二'];
                }
            }, //雷达图最大值及纬度名称
            radarData : {
                type : Array, default : function(){
                    return [{ name : '纬度一', max : 100 }, { name : '纬度二', max : 100 }, {
                        name : '纬度三', max : 100
                    }, { name : '纬度四', max : 100 }, { name : '纬度五', max : 100 }, { name : '纬度六', max : 100 }];
                }
            }, //雷达图数据
            seriesData : {
                type : Array, default : function(){
                    return [{
                        value : [43, 20, 70, 85, 5, 20], name : '数据一'
                    }, {
                        value : [50, 15, 55, 90, 79, 60], name : '数据二'
                    }];
                }
            }
        }, data(){
            return {
                myChart : null, height : ""
            }
        }, mounted(){
            let _this = this;
            this.height = this.$refs.containerRadar.offsetHeight;
            _this._initChart()
        }, methods : {
            _initChart(){
                this.myChart = echarts.init( this.$refs.containerRadar, 'macarons' ).setOption( {
                    title : {
                        text : this.title, subtext : this.subTitle
                    }, tooltip : {
                        trigger : 'item', triggerOn : "mousemove"
                    }, legend : {
                        data : this.legendData, x : 'center', y : 'bottom',
                    }, toolbox : {
                        show : true, feature : {
                            restore : { show : true }, saveAsImage : { show : true }
                        }
                    }, radar : {
                        //shape: 'circle',
                        indicator : this.radarData
                    }, series : [{
                        name : '数据一 vs 数据二', type : 'radar', areaStyle : { normal : {} }, data : this.seriesData
                    }]
                } );
            }
        }
    }
</script>
