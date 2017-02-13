<style>
    section {
        margin-bottom: 0.5555555555555556rem;
        background-color: white;
    }

    div.my-info{
        position: relative;
        width: 100%;
        height: auto;
        min-height: 9.555555555555555rem;
    }
    div.my-info .info{
        position: absolute;
        top: 0;
        color: white;
        font-size: 0.6666666666666666rem;
        text-align: center;
        width: 100%;
        height: 100%;
    }

    div.my-info .info p{
        width: 100%;
    }
    div.my-info .info p:first-child{
        margin-top: 0.5370370370370371rem;
    }
    .marin-29{
        margin-bottom: 0.6370370370370371rem;
    }
    .marin-7{
        margin-bottom: 0.2222222222222222rem;
    }
    em.head-img{
        display: inline-block;
        width: 2.537037037037037rem;
        height: 2.537037037037037rem;
        box-sizing: border-box;
        border:1px solid white;
        background: url("../../images/head-test.jpg") center no-repeat transparent;
        border-radius: 50%;
        position: relative;
    }

    em.head-img:after{
        position: absolute;
        right: 0;
        display: inline-block;
        height: 0.7407407407407407rem;
        width: 0.7407407407407407rem;
        background-color:white;
        border-radius: 50%;
        color: #ef1837;
    }

    .my-info .info p.vip-level{
        font-size: 0.9629629629629629rem;
        color: #484848;

    }
    .my-info .info p.vip-level:before{
        color:#ffcc00;

    }
    .my-info .info p.my-name{
        display: inline-flex;
        display: -webkit-inline-flex;
        justify-content: space-between;
        line-height: 1.4814814814814814rem;
    }
    .my-info .info p.my-name span.name{
        font-size: 0.9629629629629629rem;

    }

    .my-info .info p.my-name span.a{
        height: 1.4814814814814814rem;
        width: 3.7962962962962963rem;
        background-color:#ffb9c3;
        color: #ef1837;
        box-sizing: border-box;
    }
    .my-info .info p.my-name span.check-ins{
        border-bottom-right-radius: 0.7407407407407407rem;
        border-top-right-radius:0.7407407407407407rem;
        padding-left: 0.46296296296296297rem;
        text-align: left;
    }
    .my-info .info p.my-name span.account-manage{
        border-bottom-left-radius: 0.7407407407407407rem;
        border-top-left-radius:0.7407407407407407rem;
        padding-right: 0.46296296296296297rem;
        text-align: right;
    }

     p.order-p{
        display: inline-flex;
        display: -webkit-inline-flex;
        justify-content: space-between;
        padding: 0.7407407407407407rem;
        width: 100%;
        font-size: 0.9629629629629629rem;
        line-height: 0.9629629629629629;
        /*border-bottom: 1px solid #e4e4e4;*/
    }
    section.header .order-p span {
        font-size: 0.6666666666666666rem;
        color: #8a8a8a;

    }
    section.header .order-p span:after{
        content: '\e629';
        margin-left: 0.5555555555555556rem;
    }

    ul.float{
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        padding: .5925925925925926rem 0 0.25925925925925924rem 0;
        font-size: .6111111111111112rem;
    }

    ul.order-manage-lst li {
        position: relative;
    }

    ul.order-manage-lst li label{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        text-align: center;
        color: #8a8a8a;
    }

    ul.order-manage-lst li label:before{
        font-size: 1.1111111111111112rem;
        margin-bottom: 0.46296296296296297rem;
        display: inline-block;
        line-height: 1.1111111111111112rem;
    }
    ul.order-manage-lst li span{
        position: absolute;
        right: -0.3148148148148148rem;
        top:-0.3148148148148148rem;
        display: inline-block;
        height: 0.7555555555555556rem;
        width:  0.7555555555555556rem;
        box-sizing: border-box;
        font-size: 0.4433333333333333rem;
        /*border: 1px solid #ef1837;*/
        /*border-radius: 50%;*/
        color: #ef1837;
        text-align: center;
        line-height: 0.7555555555555556rem;
    }

    ul.account li {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        text-align: center;
        color:  #8a8a8a;
    }
    ul.account li label{
        font-size: 1.1111111111111112rem;
        line-height: 1.1111111111111112rem;
        color: #ef1837;
        min-height:1.1111111111111112rem ;
        margin-bottom: 0.8333333333333334rem;
    }

    section.my-assets ul.public-table small:nth-child(n+2) li {
        font-size: 0.7777777777777778rem;
    }
    section.my-assets ul.public-table small:first-child li span:after{
        content: '\e605';
    }
    section.my-assets ul.public-table li span{
        font-size: 0.5555555555555556rem;
        color: #ef1837;
    }
    .bx{
        padding-bottom: 3rem;
    }
    .info p span.comBtn{
        color: #ef1837;
        padding:0.2222222222222222rem 0.7962962962962963rem;
        background-color: white;
        border-radius: 0.5555555555555556rem;
    }
</style>
<template>
    <div class="bx">
        <section class="header">
            <div class="my-info">
                <img width="100%"   src="../../images/my-banner.jpg" >
                <div class="info">
                    <p class="marin-29" >佣金收益：￥{{userInfo.commission | money}}</p>
                    <p class="marin-29" @click="goUrl({name:'bodeRecord'})"><span class="comBtn">收益记录</span></p>
                    <p class="my-name marin-7">
                        <span class="a check-ins" @click="goUrl({name:'mySign'})" >会员签到</span>
                        <span class="name">{{userInfo.username}}</span>
                        <span class="a account-manage" @click="goUrl({name:'myInfo'})">账户管理</span>
                    </p>
                    <p class="marin-29">

                        <em class="head-img iconfont vip-icon" :style="'background-image:url('+userInfo.logo_url+')'"></em>
                    </p>
                    <p class="vip-level iconfont vipLevel-icon">
                        {{userInfo.jobid | VIPlevel}}
                    </p>
                    <p  style="color:#8a8a8a; margin-top: 0.48148148148148145rem;">经验值：{{userInfo.exp | zero}}</p>
                </div>
            </div>
            <p class="order-p vux-1px-b ">
                <label>我的订单</label>
                <span class="iconfont" @click="goUrl({name:'myOrderLst',params:{type:-1}})">查看所有订单</span>
            </p>
            <ul class="float order-manage-lst">
                <li @click="goUrl({name:'myOrderLst',params:{type:0}})">
                    <label class="iconfont awaitPay-icon">待付款</label>
                    <span  class="vux-1px-radius">{{orderSum.pending_pay}}</span>
                </li>
                <li @click="goUrl({name:'myOrderLst',params:{type:1}})">
                    <label class="iconfont awaitSend-icon">待发货</label>
                    <span class="vux-1px-radius">{{orderSum.pending_deliver}}</span>
                </li>
                <li @click="goUrl({name:'myOrderLst',params:{type:2}})">
                    <label class="iconfont awaitGet-icon">待收货</label>
                    <span class="vux-1px-radius">{{orderSum.pending_confirm}}</span>
                </li>
                <li @click="goUrl({name:'myOrderLst',params:{type:3}})">
                    <label class="iconfont awaitComment-icon">待评价</label>
                    <span class="vux-1px-radius">{{orderSum.pending_comment}}</span>
                </li>
            </ul>
        </section>
        <section>
            <p class="order-p">
                <label>我的资产</label>
            </p>
            <ul class="float account">
                <li>
                    <label>{{userInfo.coupons | zero}}</label>
                    <span>优惠劵</span>
                </li>
               <li>
                    <label>￥{{userInfo.balance | money }}</label>
                    <span>账户余额</span>
                </li>
               <li>
                    <label>￥{{userInfo.wx_wallet | money}}</label>
                    <span>微信钱包</span>
                </li>
               <li>
                    <label>{{userInfo.integral | zero}}</label>
                    <span>积分</span>
                </li>
            </ul>
        </section>
        <section class="my-assets">
            <Public-table
                    :list="myAssetsLst"
            >

            </Public-table>
        </section>
        <section class="other-manage">
            <Public-table
                    :list="manageLst"
            >
            </Public-table>
        </section>
        <div style="padding-bottom: 2.3rem:">
         </div>
    </div>
</template>
<script>
    import PublicTable from '../public/Public-table.vue';
    import {queryUserInfoFun,membersCountFun,getorderSummaryFun} from '../../actions/myManageActions'
    import {getUserInfo} from '../../getters/myManageGetter'
    import {goToFun} from '../../vuex/index/actions'
    export default{
        props:['resetScorll'],
        components:{
            PublicTable
        },
        vuex:{
          actions:{
              queryUserInfoFun,
              membersCountFun,
              goToFun,
              getorderSummaryFun,
          },
            getters:{
                userInfo:getUserInfo
            }
        },
        data(){
            return{
                myAssetsLst:[
                        {key:'我的会员',value:0,url:{name:''}},
                        {key:'一级会员',value:0,url:{name:'myVipManage',params:{level:1}}},
                        {key:'二级会员',value:0,url:{name:'myVipManage',params:{level:2}}},
                        {key:'三级会员',value:0,url:{name:'myVipManage',params:{level:3}}}
                        ],
                manageLst:[
                    {key:'地址管理',value:'',url:{name:'AddressManage'}},
                    {key:'我要推广',value:'',url:{name:'populManage'}},
                    {key:'中奖记录',value:'',url:{name:'winRecord'}}
                    ],
                orderSum:{

                }
            }
        },
        methods:{
            init(){
                this.membersCountFun({result:(res)=>{
                    if(res.status == 200){
                        res.level_0_count = res.level_1_count+res.level_2_count+res.level_3_count;
                        this.myAssetsLst.forEach((item,i)=>{
                            item.value = res[`level_${i}_count`]
                        })
                        this.resetScorll();
                    }
                }})
                this.queryUserInfoFun();
                this.getorderSummaryFun({result:(res)=>{
                    if(res.status == 200){
                        this.orderSum = res;
                    }
                }

                })
            },
            goUrl(params){
                this.goToFun({params:params,obj:this})
            },
        },
        ready(){
            this.init()
        }


    }
</script>
