<style scoped>
    header {
        width: 100%;
        background-color: white;
    }

    header em.banner-img {
        display: inline-block;
        width: 100vw;
        height: 100vw;
        background: url("../../images/proInfo-test01.jpg") 0/100% no-repeat transparent;
    }

    .padding40 {
        padding: 0 0.7407407407407407rem;
    }

    header p {
        width: 100%
    }

    header p.pro-info {
        font-size: 0.9629629629629629rem;
        margin-top: 0.9629629629629629rem;
        text-overflow: ellipsis;
    }

    header p.pro-price {
        display: inline-flex;
        display: -webkit-inline-flex;
        justify-content: space-between;
        margin-top: 1.3333333333333333rem;
    }

    header p.pro-price label span {
        display: inline-block;
    }

    header p.pro-price label:first-child span {
        color: #8a8a8a;
        text-decoration: line-through;
        font-size: 0.5555555555555556rem;
        margin-left: 0.6296296296296297rem;
    }

    header p.pro-price label:last-child span {
        font-size: 0.5555555555555556rem;
        padding: 0 0.66666666666rem;
        border-radius: .7777777777rem;;
        background-color: #ef1837;
        color: white;
        margin-left: 0.6481481481481481rem;
    }

    header p.pro-price label:first-child {
        font-size: 1.1111111111111112rem;
        color: #ef1837;
    }

    header p.pro-price label:last-child {
        font-size: 0.6296296296296297rem;
        color: #8A8A8A;
    }

    header p.pro-origin {
        display: inline-flex;
        display: -webkit-inline-flex;
        text-align: center;
        /*border-top: 1px solid #e4e4e4;*/
        padding: 0.18518518518518517rem 0;
        margin-top: 0.9259259259259259rem;
    }

    header p.pro-origin span {
        display: inline-block;
        width: 50%;
        font-size: 0.6666666666666666rem;
        line-height: 1.8518518518518519rem;
    }

    header p.pro-origin span:first-child {
        /*border-right: 1px solid #e4e4e4;*/
    }

    section {
        margin-top: 0.5925925925925926rem;
        background-color: white;
    }

    section h3 {
        font-size: 0.9629629629629629rem;
        line-height: 2.962962962962963rem;
    }

    section p.btn {
        padding: 1.1296296296296295rem 0.7407407407407407rem;
        text-align: center;
    }

    section p.btn a {
        display: inline-block;
        font-size: 0.8888888888888888rem;
        color: #ef1837;
        padding: 0.46296296296296297rem 1.1111111111111112rem;
        border: 1px solid #ef1837;
        border-radius: 1rem;
    }

    footer {
        background-color: white;
        margin-top: 0.5925925925925926rem;
    }

    ul.pro-info-tab {
        font-size: 1rem;
        text-align: left;
    }

    ul.pro-info-tab span {
        display: inline-block;
        margin-left: 2.111111111111111rem;
        color: #8f8f8f;
        font-size: 0.8888888888888888rem;
    }

    ul.pro-info-tab li {
        min-height: 3rem;
        padding: 0.8333333333333334rem;
        position: relative;
        background-color: white;
        /*border-top : 1px solid #e4e4e4;*/
    }
    ul.pro-info-tab li:last-child{
        /*border-bottom : 1px solid #e4e4e4;*/

    }
    ul.pro-info-tab li label {
        min-width: 8.333333333333334rem;
    }
    p.info-node{
        padding: 0.46296296296296297rem 1.1111111111111112rem;
        font-size:0.7407407407407407rem;
    }
</style>
<template>
    <div>
        <header>
            <em class="banner-img" :style="'background-image:url('+info.logo_url+')'"></em>
            <p class="pro-info padding40">
                {{info.packagename + ' ' + info.digest }}
            </p>
            <p class="pro-price padding40">
                <label>¥{{info.discount_sale * info.price | money }}
                    <span>价格：￥{{info.price  | money}}</span>
                </label>
                <label v-if="info.is_free_shipping">快递
                    <span>包邮</span>
                </label>
            </p>
            <p class="pro-origin vux-1px-t">
                <span class="vux-1px-r">付款人数{{info.pay_count}}</span>
                <span>{{info.province + info.city}}</span>
            </p>
        </header>
        <section>
            <h3 class="padding40">产品评价（{{info.comment_count}}）</h3>
            <Rated
                    is-info="true"
                    :reset-sco="resetSco"
                    :lst="lst"
            >
            </Rated>
            <p class="btn" v-if="info.comment_count">
                <a class="query-rated" @click.prevent="goUrl">查看所有评价</a>
            </p>
        </section>
        <footer>
            <tab :line-width=2 active-color='#ef1837' :index.sync="index">
                <tab-item class="vux-center" :selected="demo2 === item" v-for="item in list2" @click="demo2 = item">
                    {{item}}
                </tab-item>
            </tab>
            <swiper :index.sync="index" :show-dots="false">
                <swiper-item>
                    <p class="info-node">{{info.note}}</p>
                </swiper-item>
                <swiper-item>
                    <ul class="pro-info-tab">
                        <li class="padding40 vux-1px-t" style="border:0;">
                            <label>商品代码</label>
                            <span>{{info.packagecode}}</span>
                        </li>
                        <li class="padding40 vux-1px-t">
                            <label>产品规格</label>
                            <span>{{info.unit}}</span>
                        </li>
                        <li class="padding40 vux-1px-t">
                            <label>品种名称</label>
                            <span>{{info.productname}}</span>
                        </li>
                    </ul>
                </swiper-item>
            </swiper>
        </footer>

    </div>
</template>
<script>
    import Rated  from './ProRatedLstTab.vue'
    import  tab from '../../../../vux/vux/src/components/tab/tab.vue'
    import  tabItem from '../../../../vux/vux/src/components/tab/tab-item.vue'
    import  swiper from '../../../../vux/vux/src/components/swiper/index.vue'
    import  swiperItem from '../../../../vux/vux/src/components/swiper-item/index.vue'
    import {goToFun} from '../../vuex/index/actions'
    import {
            queryProInfoFun,
            queryproCommentLstFun,
            addOderInCacheFun
    } from '../../actions/productAcrions'

    export default{
        props:['resetSco'],
        components: {
            Rated,
            tab,
            tabItem,
            swiper,
            swiperItem,
        },
        vuex:{
            actions:{
                goToFun,
                queryProInfoFun,
                queryproCommentLstFun,
                addOderInCacheFun
            }
        },
        data(){
            return {
                id: this.$route.params.id,
                list2: ['产品详情', '产品参数'],
                index: 0,
                info:'',
                lst:[]
            }
        },
        methods:{
            init(){
                let params = { productid:this.id};
                this.queryProInfoFun({params:params,result:(res)=>{
                  if(res.status = 200) {
                      this.info = res;
                      this.addOderInCacheFun(res)
                  }
                }})

                params = {"pageno":1, "productid":this.id};
                this.queryproCommentLstFun({params:params,result:(res)=>{
                    if(res.status == 200) {
                        this.lst = res.list;
                        this.resetSco();
                    }
                }})
            },
            goUrl(){
                const params ={name:'rated',params:{ id: this.id }};
                this.goToFun({params:params,obj:this})
            }
        },
        ready(){
            this.init();
        }
    }
</script>
