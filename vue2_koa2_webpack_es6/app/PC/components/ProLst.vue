<style>
    .satnav {
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding: 0 .518518rem;
        font-size: .77777777778rem;
        height: 2.77777778rem;
        background-color: white;
        margin-top: .37037037rem;
    }
    .satnav span{
        display: inline-block;
        line-height: 3;
    }
    .change-style:before{
        margin-right:.55555555555555rem ;
    }

    .change-style .border{
        display: inline-block;
        border-left: 1px solid #e4e4e4;
        height: 1.666666666666rem;
        vertical-align: middle;
    }

    .siftings:after{
        margin-left:.55555555555555rem ;
    }

    div.satnav span.choice{
        color: #ef1837;
    }
</style>
<template>
    <div>
        <search

                :pro-params.sync="queryParams"></search>
        <div class="satnav">
            <span class="high-to-down" :class="queryParams.price_order_flag == 1 ?'choice':''" @click.stop="clickChoice({e:$event})">价格由高到低</span>
            <span class="down-to-high" :class="queryParams.price_order_flag == 2 ?'choice':''" @click.stop="clickChoice({e:$event,value:2})">价格由低到高</span>
            <span class="priority-sales" :class="queryParams.sales_order_flag ?'choice':''" @click.stop="clickChoice({e:$event,key:'sales_order_flag'})">销量优先</span>
            <span class="change-style row-icon iconfont" @click.prevent="changeStyle"> <em class="border"></em></span>
            <span class="siftings siftings-icon iconfont" @click.prevent="showLeft">筛选</span>
        </div>
        <scroller v-if="list[0]" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="86vh" @pullup:loading="load" :top-flag="topFlag" v-ref:scroller>
            <Public-pro-lst
                    :is-checks="isChecks"
                    :lst="list"
            >
            </Public-pro-lst>
        </scroller>
        <Public-no-info v-else>
        </Public-no-info>
        <pro-lst-locality
                :show-flg="leftShow"
                :hiden-fun="hideLeft"
                :query-params.sync="queryParams"
                :query-fun="qry"
        >
        </pro-lst-locality>

    </div>
</template>
<script>
    import PublicProLst from './public/Public-proLst.vue'
    import search from './public/Public-search2.vue'
    import proLstLocality from './others/proLstLocality.vue'
    import Scroller from '../../../vux/vux/src/components/scroller/index.vue'
    import PublicNoInfo from './public/Public-noInfo.vue'
    import {searchList} from './../getters/productGetter'
    import {querySearchProLstFun,searchInCacheFun} from './../actions/productAcrions'
    export default{
        components:{
            PublicProLst,
            search,
            Scroller,
            proLstLocality,
            PublicNoInfo
        },
        vuex:{
            actions:{
                querySearchProLstFun,
                searchInCacheFun
            },
            getters:{
                searchList
            }
        },
        data(){
            return{
                thisPage:true,
                leftShow:false,
                isChecks:true,
                topFlag:true,
                pullupConfig2: {
                    content: '',
                    downContent: '松开进行加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...'
                },
                list:this.searchList,
                queryParams:{
                    pageno:1, //当前页码
                    keys:this.$route.params.keys,
                    price_order_flag:"",// 0:不排序, 1:价格由高到低, 2:价格由低到高
                    sales_order_flag:"",// 0:不排序, 1:销量由高到低
                    price_l:"",
                    price_h:"",
                    is_free_shipping:"", // 0:否, 1:是
                    province:"",
                    city:""
                }
            }
        },
        methods:{
            init(){
                !!this.searchList[0] || this.qry();
            },
            qry(){
                this.querySearchProLstFun({params:this.queryParams,result:(res)=>{
                    if(res.status == 200){
                        this.list = res.list;
                        this.searchInCacheFun(res.list);
                        this.leftShow && this.hideLeft();
                        const resetScro =()=>{
                            this.resetScorll();
                            this.$refs.scroller.goTop();
                            return (res.pageinfo.pagecount <= res.pageinfo.pageno) ? this.$broadcast('pullup:done', this.$refs.scroller.uuid) :'';
                        }
                        setTimeout(resetScro,10)
                    }
                }})
            },
            clickChoice({e,key='price_order_flag',value=1}={}){
                this.queryParams[key] = (e.target.classList.toString()).indexOf('choice')>-1 ? 0 : value;
                this.queryParams.pageno = 1 ;
                this.qry();
            },
            showLeft(){
                this.leftShow =true;
            },
            hideLeft(){
                this.leftShow=false;
            },
            changeStyle(){
                this.isChecks = !this.isChecks;
                this.resetScorll();
            },
            resetScorll(){
                this.$refs.scroller.reset()
            },
            scrollUuid(){
                return this.$refs.scroller.uuid;
            },
            load (uuid) {
                this.queryParams.pageno += 1;
                this.querySearchProLstFun({
                    params:this.queryParams,
                    loadFlg:false,
                    result:(res)=>{
                        if(res.status == 200) {
                            let reset = 'pullup:reset';
                            res.list && (this.list=(this.list.concat(res.list)));
                            !!( res.pageinfo.pageno < res.pageinfo.pagecount) ?  '' : reset='pullup:done';
                            this.$broadcast(reset, uuid);
                            (reset=='pullup:done') && this.resetScorll();
                        }
                    }});

            }
        },
        watch:{
            searchList(value){
                if(value!==this.list){
                    this.list = value;
                }
            },
        },
        ready(){
            this.init();
        }

    }
</script>
