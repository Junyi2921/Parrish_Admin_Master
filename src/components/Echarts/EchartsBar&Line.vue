<template>
    <div ref="containerBar" class="containerBar"></div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .containerBar {
        display: flex;
        flex: 1;
        min-height: 400px;
        background: $CHART_BOX_BACKGROUND !important;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.02);
        padding: 10px;
        margin-top: 10px;
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
            }, //x轴数据类型
            xAxisType : {
                type : String, default : "category"
                //    'value' 数值轴，适用于连续数据。
                //    'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                //    'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                //    'log' 对数轴。适用于对数数据。
            }, //x轴显示数据
            xAxisData : {
                type : Array, default : function(){
                    return ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }
            }, //y轴数据类型
            yAxisType : {
                type : String, default : "value"
                //    'value' 数值轴，适用于连续数据。
                //    'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
                //    'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
                //    'log' 对数轴。适用于对数数据。
            }, //y轴显示数据
            yAxisData : {
                type : Array, default : function(){
                    return []
                }
            }, //图例数据
            legendData : {
                type : Array, default : function(){
                    return ["数据一", "数据二"]
                }
            }, //展示数据
            seriesList : {
                type : Array, default : function(){
                    let seriesList = [{
                        name : '数据一',
                        type : 'bar',
                        data : [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                        markPoint : {
                            data : [{ type : 'max', name : '最大值' }, { type : 'min', name : '最小值' }]
                        },
                        markLine : {
                            data : [{ type : 'average', name : '平均值' }]
                        }
                    }, {
                        name : '数据二',
                        type : 'bar',
                        data : [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                        markPoint : {
                            data : [{ name : '年最高', value : 182.2, xAxis : 7, yAxis : 183 }, {
                                name : '年最低', value : 2.3, xAxis : 11, yAxis : 3
                            }]
                        },
                        markLine : {
                            data : [{ type : 'average', name : '平均值' }]
                        }
                    }];
                    return seriesList;
                }
            }
        }, data(){
            return {
                myChart : null, height : ""
            }
        }, mounted(){
            let _this = this;
            this.height = this.$refs.containerBar.offsetHeight;
            _this._initChart()
        }, methods : {
            _initChart(){
                this.myChart = echarts.init( this.$refs.containerBar, 'macarons' ).setOption( {
                    title : {
                        text : this.title, subtext : this.subTitle
                    }, tooltip : {
                        trigger : 'axis', triggerOn : "mousemove"
                    }, legend : {
                        data : this.legendData, bottom : 10
                    }, toolbox : {
                        show : true, feature : {
//                            dataView : { show : true, readOnly : false },
                            magicType : { show : true, type : ['line', 'bar'] },
                            restore : { show : true },
                            saveAsImage : { show : true }
                        }
                    }, calculable : true, xAxis : [{
                        type : this.xAxisType, data : this.xAxisData
                    }], yAxis : [{
                        type : this.yAxisType, data : this.yAxisData
                    }], series : this.seriesList
                } );
            }
        }
    }
</script>
