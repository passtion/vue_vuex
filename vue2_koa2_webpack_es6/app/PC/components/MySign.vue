<style lang="less" scoped>
    .inline-calendar-demo {
        background: rgba(255, 255, 255, 0.9);
    }

    div.month {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        height: 10.185185185185185rem;
        background-color: #ee2744;
        text-align: center;
        color: white;
    }

    div.month p {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 3.3333333333333335rem;
        height: 4.666666666666667rem;
    }

    div.month p label {
        line-height: 1em;
    }

    div.month p span {
        font-size: 0.8888888888888888rem;
        line-height: 1em;
    }

    div.month a {
        border-radius: 40px;
        line-height: 1.4814814814814814rem;
        color: #ee2744;
        background-color: white;
        margin-top: 1.2037037037037037rem;
        font-size: 0.6666666666666666rem;
        width: 3.5185185185185186rem;
        text-align: center;
        margin-left: auto;
        margin-right: auto;
    }
</style>
<template>
    <div>
        <div class="month">
            <p>
                <label>{{today}}</label>
                <span>{{mount | Month}}</span>
            </p>

            <a  v-if="todaySign" style="background-color:#e9546a;color:#ffffff;">已签到</a>
            <a v-else  @touchstart="signFun">签&nbsp;到</a>
        </div>
        <inline-calendar
                class="inline-calendar-demo"
                :show.sync="show"
                :value.sync="value"
                start-date="2016-04-01"
                end-date="2017-06-18"
                :range="range"
                :show-last-month="showLastMonth"
                :show-next-month="showNextMonth"
                :highlight-weekend="highlightWeekend"
                :return-six-rows="return6Rows"
                :hide-header="hideHeader"
                :hide-week-list="hideWeekList"
                :replace-text-list="replaceTextList"
                :weeks-list="weeksList"
                :custom-slot-fn="buildSlotFn"
                :disable-past="disablePast"
                :disable-future="disableFuture"
                :value-lst="getMySignLst"
                :is-click="isClick">
        </inline-calendar>
    </div>
</template>

<script>
    import InlineCalendar from '../../../vux/vux/src/components/inline-calendar/index.vue'
    import  {signListFun, signFun} from  './../actions/myManageActions';
    import  {getMySignLst} from  './../getters/myManageGetter';
    module.exports = {
        components: {
            InlineCalendar
        },
        data () {
            return {
                show: true,
                value: '',
                listValue: '',
                range: false,
                showLastMonth: true,
                showNextMonth: true,
                highlightWeekend: false,
                return6Rows: true,
                hideHeader: true,
                hideWeekList: false,
                replaceTextList: {'TODAY': '今'},
                replace: false,
                changeWeeksList: true,
                weeksList: ['日', '一', '二', '三', '四', '五', '六 '],
                useCustomFn: false,
                disablePast: false,
                disableFuture: false,
                isClick: false,//新增
                mount: new Date().getMonth(),
                today: new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate(),
                todaySign:JSON.stringify(this.getMySignLst).indexOf(new Date().format("yyyy-MM-dd")) > -1
            }
        },

        vuex: {
            actions: {
                signListFun,
                signFun
            },
            getters: {
                getMySignLst
            }
        },

        ready(){
            this.getMySignLst.leght<0 || this.signListFun();
            this.$watch('getMySignLst',(res)=>{
                if(!res) return;
                this.todaySign = JSON.stringify(this.getMySignLst).indexOf(new Date().format("yyyy-MM-dd")) > -1;
            })
        }
    }
</script>


