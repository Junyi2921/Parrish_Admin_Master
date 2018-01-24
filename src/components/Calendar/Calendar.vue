<template>
    <div ref="containerCalendar" class="containerCalendar">
        <div class="calendarTools">
            <div class="today" @click="goToday">
                <img src="/static/img/today.svg">
            </div>
            <div class="calenderChange">
                <i class="el-icon-d-arrow-left calenderChangeBtn" @click="prevYear"></i>
                <i class="el-icon-caret-left calenderChangeBtn" @click="prevMonth"></i>
                <el-select class='showDate' v-model="year" placeholder="请选择年份" size="mini" @change="changeYear">
                    <el-option
                            v-for="item in yearList"
                            :key="item"
                            :value="item">
                    </el-option>
                </el-select>
                <el-select class='showDate' v-model="month" placeholder="请选择月份" size="mini" @change="changeMonth">
                    <el-option
                            v-for="item in monthList"
                            :key="item"
                            :value="item">
                    </el-option>
                </el-select>
                <i class="el-icon-caret-right calenderChangeBtn" @click="nextMonth"></i>
                <i class="el-icon-d-arrow-right calenderChangeBtn" @click="nextYear"></i>
            </div>
        </div>
        <div class="calendarMain">
            <div class="calendarMainStaticInfo">
                <div class="calendarMainStaticInfoItem">Mon.</div>
                <div class="calendarMainStaticInfoItem">Tue.</div>
                <div class="calendarMainStaticInfoItem">Wed.</div>
                <div class="calendarMainStaticInfoItem">Thu.</div>
                <div class="calendarMainStaticInfoItem">Fri.</div>
                <div class="calendarMainStaticInfoItem">Sat.</div>
                <div class="calendarMainStaticInfoItem">Sun.</div>
            </div>
            <div class="calendarMainDays">
                <div ref="calendarMainDaysItem" class="calendarMainDaysItem" v-for="item in staticMonthDays"
                     :class="[item.type == 'prev'?'calendarMainDaysItemNoChoose':'',item.type == 'next'?'calendarMainDaysItemNoChoose':'']"
                     :style="{'height': daysHeight}">
                    <span class="calendarMainDaysItemValue" :class="[item.today?'calendarMainDaysItemValueToday':'']"
                          v-html="item.value"></span>
                    <div class="calendarMainDaysItemEventList">
                        <div class="calendarMainDaysItemEvent simpleEvent" v-if="item.level == 'simple'"></div>
                        <div class="calendarMainDaysItemEvent mediumEvent" v-if="item.level == 'medium'"></div>
                        <div class="calendarMainDaysItemEvent importantEvent" v-if="item.level == 'important'"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style rel="stylesheet/scss" lang="scss">
    .simpleEvent {
        background: $CALENDER_SIMPLE_EVENT_BACKGROUND;
    }

    .mediumEvent {
        background: $CALENDER_MEDIUM_EVENT_BACKGROUND;
    }

    .importantEvent {
        background: $CALENDER_IMPORTANT_EVENT_BACKGROUND;
    }

    .containerCalendar {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-height: 400px;
        background: $CHART_BOX_BACKGROUND !important;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 0 2px 0 rgba(0, 0, 0, 0.02);
        padding: 10px;
        .calendarTools {
            display: flex;
            height: 50px;
            background: $CALENDAR_BACKGROUND;
            .today {
                display: flex;
                justify-content: center;
                align-items: center;
                background: $CALENDER_TODAY_BTN_BACKGROUND;
                width: 40px;
                height: 40px;
                border-radius: 100%;
                img {
                    height: 60%;
                }
            }
            .calenderChange {
                display: flex;
                flex: 1;
                justify-content: center;
                align-items: center;
                .showDate {
                    width: 100px;
                }
                .calenderChangeBtn {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 30px;
                    height: 30px;
                }
            }
        }
        .calendarMain {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            border: 1px solid $CALENDER_BORDER_COLOR;
            .calendarMainStaticInfo {
                display: flex;
                height: 50px;
                background: $CALENDAR_BACKGROUND;
                border-bottom: 1px solid $CALENDER_BORDER_COLOR;
                .calendarMainStaticInfoItem {
                    display: flex;
                    flex: 1;
                    border-right: 1px solid $CALENDER_BORDER_COLOR;
                    justify-content: center;
                    align-items: center;
                    color: $CALENDER_STATIC_INFO_FONT_COLOR;;
                }
                .calendarMainStaticInfoItem:last-child {
                    border-right: none;
                }
            }
            .calendarMainDays {
                display: flex;
                flex-wrap: wrap;
                background: $CALENDAR_BACKGROUND;
                .calendarMainDaysItem {
                    display: flex;
                    flex-direction: column;
                    width: 14.2%;
                    color: $CALENDER_NORMAL_INFO_DAYS_COLOR;
                    justify-content: center;
                    align-items: center;
                    box-sizing: border-box;
                    cursor: pointer;
                    .calendarMainDaysItemEventList {
                        display: flex;
                        margin-top: 2px;
                        .calendarMainDaysItemEvent {
                            width: 10px;
                            height: 10px;
                            border-radius: 10px;
                            margin-right: 2px;
                        }
                        .calendarMainDaysItemEvent:last-child {
                            margin-right: 0;
                        }
                    }
                    .calendarMainDaysItemValue {
                        width: 40px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        border-radius: 100%;
                    }
                    .calendarMainDaysItemValueToday {
                        background: $CALENDER_HOVER_BACKGROUND;
                        color: #ffffff;
                    }
                    /*.calendarMainDaysItemValue:hover{
                        background: $CALENDER_HOVER_BACKGROUND;
                        color: #ffffff;
                    }*/
                }
                .calendarMainDaysItem:hover {
                    color: $CALENDER_HOVER_BACKGROUND;
                }
                .calendarMainDaysItemNoChoose {
                    color: $CALENDER_NORMAL_INFO_DAYS_NOCHOOSE_COLOR;
                    cursor: not-allowed;
                }
            }
        }
    }
</style>
<script>
    //    let today = new Date();//当前日期
    //    let currentYear = today.getFullYear();//当前年份
    //    let currentMonth = today.getMonth() + 1;//当前月份
    //    let currentDay = today.getDate();//当前日期
    //    let firstDay = new Date( currentYear, currentMonth - 1, 1 );//获取当月的第一天
    //    let currentMonthFirstDayOfWeek = firstDay.getDay();//获取当月第一天是周几
    export default{
        props : {
            eventData : {
                type : Array
            }
        }, data(){
            return {
                myChart : null,
                height : "",
                minYear : 1900,
                minMonth : 1,
                yearList : [],
                monthList : [],
                year : '',
                month : '',
                day : '',
                staticMonthDays : '',
                daysHeight : '',
                today : {
                    year : new Date().getFullYear(), month : new Date().getMonth() + 1, day : new Date().getDate()
                }
            }
        }, mounted(){
            for( var i = 0; i < 1099; i++ ){
                this.yearList.push( this.minYear );
                this.minYear++;
            }
            for( var i = 0; i < 12; i++ ){
                this.monthList.push( this.minMonth );
                this.minMonth++;
            }
            let _this = this;
            this.height = this.$refs.containerCalendar.offsetHeight;
            this.year = new Date().getFullYear();
            this.month = new Date().getMonth() + 1;
            this.day = new Date().getDate();
            _this._initChart();
            this.$nextTick( function(){
                this.daysHeight = this.$refs.calendarMainDaysItem[0].offsetWidth - 15 + 'px'
            } )
        }, watch : {
            year(){
                this._initChart();
            }, month(newVal, oldVal){
                if( newVal <= 0 ){
                    this.month = 12;
                }else if( newVal >= 13 ){
                    this.month = 1;
                }
                this._initChart();
            }
        }, methods : {
            goToday(){
                this.year = this.today.year;
                this.month = this.today.month;
            }, changeYear(value){
                this.year = value;
            }, changeMonth(value){
                this.month = value;
            }, prevYear(){
                this.year--;
            }, prevMonth(){
                this.month--;
            }, nextYear(){
                this.year++;
            }, nextMonth(){
                this.month++;
            }, //计算闰年
            isLeap(year) {
                return year % 4 == 0 ? (year % 100 != 0 ? 1 : (year % 400 == 0 ? 1 : 0)) : 0;
            }, //获取当前月份第一天是周几
            getCurrentMonthFirstDayOfWeek(){
                return new Date( this.year, this.month - 1, 1 ).getDay()
            }, //获取当前这个月第一天之前有几天
            getBeforeDaysNum(){
                if( this.getCurrentMonthFirstDayOfWeek() == 0 ){
                    return 6
                }else{
                    return this.getCurrentMonthFirstDayOfWeek() - 1;
                }
            }, //获取当前月份最后一天之后有几天
            getAfterDaysNum(){
                return 42 - this.getStaticMonth( this.year )[this.month - 1] - this.getBeforeDaysNum();
            }, /**
             * 获取当前年份月份集合
             * @param currentYear
             * @returns {number[]}
             */
            getStaticMonth(currentYear){
                return [31, 28 + this.isLeap( currentYear ), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
            }, //获取当月1号之前的日子
            getPrevMonthDays(currentYear, currentMonth, deforeDayNum){
                let prevMonthAllDays, prevMonthDays = [];
                if( currentMonth == 1 ){
                    prevMonthAllDays = this.getStaticMonth( currentYear - 1 )[11];
                }else{
                    prevMonthAllDays = this.getStaticMonth( currentYear )[currentMonth - 2];
                }
                for( var i = 0; i < deforeDayNum; i++ ){
                    let beforeObj = {
                        value : prevMonthAllDays, type : "prev"
                    };
                    prevMonthDays.unshift( beforeObj );
                    prevMonthAllDays--;
                }
                return prevMonthDays;
            }, //获取当月最后一天之后的日子
            getNextMonthDays(afterDayNum){
                let nextMonthDays = [];
                for( var i = 0; i < afterDayNum; i++ ){
                    let afterObj = {
                        value : i + 1, type : "next"
                    };
                    nextMonthDays.push( afterObj )
                }
                return nextMonthDays;
            }, _initChart(){
                let prevMonthDays = this.getPrevMonthDays( this.year, this.month, this.getBeforeDaysNum() );
                let nextMonthDays = this.getNextMonthDays( this.getAfterDaysNum() );
                let basicNum = [];
                for( var i = 0; i < this.getStaticMonth( this.year )[this.month - 1]; i++ ){
                    let basicObj = {
                        value : i + 1, type : "basic", level : ''
                    };
                    if( this.today.year == this.year && this.today.month == this.month && this.today.day == basicObj.value ){
                        basicObj.today = true
                    }
                    //TODO 这里是从外部传向子组件的数据
                    for( let j = 0; j < this.eventData.length; j++ ){
                        if( this.eventData[j].day - 1 == i ){
                            basicObj.level = this.eventData[j].level
                        }
                    }
                    basicNum.push( basicObj );
                }
                this.staticMonthDays = prevMonthDays.concat( basicNum, nextMonthDays );
//                this.staticMonthDays[10].level = 'medium';
//                this.staticMonthDays[12].level = 'simple';
//                this.staticMonthDays[14].level = 'important';
            }
        }
    }
</script>
