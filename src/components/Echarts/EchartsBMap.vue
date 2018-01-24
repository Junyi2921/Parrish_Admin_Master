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
    import echarts from 'echarts'
    import 'echarts/map/js/china'
    import 'echarts/theme/macarons'
    export default{
        data(){
            return {
                myChart : null, height : "", data : [{
                    name : '天津', value : 300
                }], geoCoordMap : {
                    '天津' : [117.2, 39.13]
                }
            }
        }, mounted(){
            let _this = this;
            this.height = this.$refs.containerBMap.offsetHeight;
            _this._initChart()
        }, methods : {
            convertData(data){
                var res = [];
                for( var i = 0; i < data.length; i++ ){
                    var geoCoord = this.geoCoordMap[data[i].name];
                    if( geoCoord ){
                        res.push( {
                            name : data[i].name, value : geoCoord.concat( data[i].value )
                        } );
                    }
                }
                return res;
            }, _initChart(){
                this.myChart = echarts.init( this.$refs.containerBMap, 'macarons' ).setOption( {
                    backgroundColor : '#404a59', title : {
                        text : '这里显示地图的标题', subtext : '这里显示地图副标题',
                    }, tooltip : {
                        trigger : 'item'
                    }, legend : {
                        orient : 'vertical', y : 'bottom', x : 'right', data : ['类型一'], textStyle : {
                            color : '#4AB7BD'
                        }
                    }, geo : {
                        map : 'china', label : {
                            emphasis : {
                                show : false
                            }
                        }
                    }, series : [{
                        name : '类型一',
                        type : 'scatter',
                        coordinateSystem : 'geo',
                        data : this.convertData( this.data ),
                        symbolSize : function(val){
                            return val[2] / 10;
                        },
                        itemStyle : {
                            normal : {
                                color : '#4AB7BD'
                            }
                        }
                    }]
                } );
            }
        }
    }
</script>
