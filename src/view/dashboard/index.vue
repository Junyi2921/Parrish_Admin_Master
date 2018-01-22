<template>
    <div class="dashboardMain">
        <div class="dataLCD">
            <InformationBox v-for="(item,index) in informationBox" :key="informationBox+index" :start="item.start"
                            :end="item.end"
                            :decimal="item.decimal" :title="item.title"
                            :icon="item.icon" :iconBGC="item.iconBGC"></InformationBox>
        </div>
        <div class="echartList">
            <div class="echartListItem">
                <EchartsLineAndBar></EchartsLineAndBar>
            </div>
            <div class="echartListItem">
                <EchartsPie></EchartsPie>
            </div>
            <div class="echartListItem">
                <EchartsRadar></EchartsRadar>
            </div>
            <div class="echartListItem">
                <Calendar></Calendar>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .dashboardMain {
        display: flex;
        flex-direction: column;
        margin: 10px;
        .dataLCD {
            display: flex;
            .box {
                margin-right: 10px;
            }
            .box:last-child {
                margin: 0;
            }
        }
        .echartList {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            .echartListItem {
                display: flex;
                width: 50%;
                box-sizing: border-box;
                padding-right: 5px;
                padding-top: 10px;
            }
            .echartListItem:nth-child(even) {
                padding-left: 5px;
            }
        }
    }
</style>
<script>
    import InformationBox from "@/components/Information/Box"
    import EchartsLineAndBar from "@/components/Echarts/EchartsBar&Line"
    import EchartsPie from "@/components/Echarts/EchartsPie"
    import EchartsRadar from "@/components/Echarts/EchartsRadar"
    import Calendar from "@/components/Calendar/Calendar"
    export default{
        name : "dashboard", data(){
            return {
                informationBox : [{
                    title : "用户人数", icon : "/static/img/user.svg", iconBGC : "", start : 0, end : 1000, decimal : 1
                }, {
                    title : "今日进账",
                    icon : "/static/img/cash.svg",
                    iconBGC : "#18A55D",
                    start : 0,
                    end : 2000,
                    decimal : 1
                }, {
                    title : "完成任务",
                    icon : "/static/img/honor.svg",
                    iconBGC : "#F19B2C",
                    start : 0,
                    end : 3000,
                    decimal : 1
                }, {
                    title : "系统警告",
                    icon : "/static/img/opinion.svg",
                    iconBGC : "#DB4C3F",
                    start : 0,
                    end : 2921,
                    decimal : 1
                }]
            }
        }, components : {
            InformationBox, EchartsLineAndBar, EchartsPie, EchartsRadar, Calendar
        }
    }
</script>
