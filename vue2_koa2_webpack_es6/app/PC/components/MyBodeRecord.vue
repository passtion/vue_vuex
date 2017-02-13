<style scoped>
    header.bode{
        background-color: white;
        position: relative;
    }

    header.bode div.bode-info{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: space-around;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;

    }
    header.bode div.bode-info p{
        display: flex;
        display: -webkit-flex;
        padding:0 1.0185185185185186rem;
    }

    header.bode p.one-line{
        justify-content: space-between;
        color: white;
    }


    header.bode p.one-line span{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 0.6666666666666666rem;
        height: 1.8518518518518519rem;
    }
    header.bode p.one-line span.money{
        flex-direction: row;
        font-size: 1.1111111111111112rem;
        line-height: 1.8518518518518519rem;
    }
    header.bode p.one-line span.money:before{
        margin-right: 0.8148148148148148rem;
        font-size: 1.8148148148148149rem;
    }
    header.bode p.two-line{
        justify-content: center;
    }

    header.bode p.one-line span.yesday-earn:before{
        content: '昨日收益';
    }
    header.bode p.one-line span.total:before{
        content: '累计收益(元)';
    }

    header.bode p.two-line a{
        padding: 0.2962962962962963rem 0.7407407407407407rem;
        color: #e62e49;
        background-color: white;
        border-radius:30px;
        font-size: 0.6666666666666666rem;
    }
    header.bode p.two-line a:first-child{
        margin-right: 0.7407407407407407rem;
    }
    p.record-title{
        background-color: white;
        line-height: 2.4074074074074074rem;
        /*border-bottom: 1px solid #e4e4e4;*/
        padding: 0 0.7407407407407407rem;
    }
    .activity-img{min-height: 7rem}
</style>
<template>
    <div>
        <header class="bode">
            <img class="activity-img" src="../images/abode-banner.png" width="100%" >
            <div class="bode-info">
                <p class="one-line">
                    <span class="yesday-earn">+{{getUserInfo.commission_yesterday | money}}</span>
                    <span class="money iconfont earning-icon">{{getUserInfo.balance | money}}</span>
                    <span class="total">+{{getUserInfo.commission_total | money}}</span>
                </p>
                <p class="two-line">
                  <a  @touchstart="goUrl({name:'myWithdrawal'})">提现</a>
                  <a @touchstart="goUrl({name:'myWithdrawalRates'})">提现记录</a>
                </p>
            </div>
        </header>
        <p class="record-title vux-1px-t">收益记录</p>
        <scroller v-if="list[0]" style="padding-bottom: 2rem;" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="100vh" @pullup:loading="load" v-ref:scroller>
            <div class="box2">
                <Public-table
                        :list="list"
                        is-query="app_commission_list">
                </Public-table>
            </div>
        </scroller>
        <Public-no-info v-else>
        </Public-no-info>
    </div>
</template>

<script>
    import {getCommissionFun} from '../actions/myManageActions'
    import {goToFun} from './../vuex/index/actions'
    import {getUserInfo} from '../getters/myManageGetter'
    import PublicTable from './public/Public-table.vue'
    import PublicNoInfo from './public/Public-noInfo.vue'
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'


    export default{
        components:{
            PublicTable,
            Scroller,
            PublicNoInfo,
        },
        data(){
            return{
                params:{
                    pageno:1
                },
                list:[
//                        {"create_time":"收益时间", "commission":"收益"},
//                        {"create_time":"收益时间", "commission":"收益"},
//                        {"create_time":"收益时间", "commission":"收益"},
                ],
                pullupConfig2: {
                    content: '',
                    downContent: '松开进行加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...'
                },
            }
        },
        vuex:{
            actions:{
                getCommissionFun,
                goToFun,
            },
            getters:{
                getUserInfo
            }
        },
        methods:{
            init(){
                this.query((res)=>{
                    if(res.status == 200){
                        this.list =  res.list ? res.list :[] ;
                        const resetScro =()=>{
                            this.resetScorll();
                            this.$refs.scroller.goTop();
                            return (res.pageinfo.pagecount <= res.pageinfo.pageno) ? this.$broadcast('pullup:done', this.$refs.scroller.uuid) :'';
                        }
                     setTimeout(resetScro,10)
                    }
                })
            },
            query(result){
                this.getCommissionFun({params:this.params,result:result})
            },
            goUrl(params){
                this.goToFun({params:params,obj:this})
            },
            resetScorll(){
                this.$refs.scroller.reset()
            },
            load (uuid) {
                this.params.pageno += 1;
                this.query((res)=> {
                    if (res.status == 200) {
                        let reset = 'pullup:reset';
                        this.list=(this.list.concat(res.list));
                        !!( res.pageinfo.pageno < res.pageinfo.pagecount) ?  '' : reset='pullup:done';
                        this.$broadcast(reset, uuid);
                        (reset=='pullup:done') && this.resetScorll();
                    }
                });
            }
        },
        ready(){
            this.init();
        }

    }
</script>
