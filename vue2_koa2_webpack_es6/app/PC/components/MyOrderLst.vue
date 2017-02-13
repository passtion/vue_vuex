
<template>
    <div>
        <div class="nav">
            <tab active-color='#ef1837'>
                <tab-item :selected="params.type ==-1" @click="clickTab(-1)">全部</tab-item>
                <tab-item :selected="params.type == 0" @click="clickTab(0)">待付款</tab-item>
                <tab-item :selected="params.type == 1" @click="clickTab(1)">待发货</tab-item>
                <tab-item :selected="params.type == 2" @click="clickTab(2)">待收货</tab-item>
                <tab-item :selected="params.type == 3" @click="clickTab(3)">待评价</tab-item>
            </tab>
        </div>
        <scroller v-if="orderLst[0]" lock-x scrollbar-y use-pullup :pullup-config="pullupConfig2" height="92vh" @pullup:loading="load" v-ref:scroller>
          <div>
            <Lst-item v-for="item in orderLst"
                    :item="item"
                    :show-tab="showTab"
            >
            </Lst-item>
              <div style="padding-bottom:3rem;">
              </div>
           </div>
        </scroller>
        <Public-no-info v-else>
        </Public-no-info>
        <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="操作提示" @on-confirm="tabFun">
            <p style="text-align:center;">{{text}}</p>
        </confirm>
    </div>
</template>
<script>
    import LstItem from './others/MyOrderLstItem.vue'
    import tab from './../../../vux/vux/src/components/tab/tab.vue'
    import tabItem from './../../../vux/vux/src/components/tab/tab-item.vue'
    import  Confirm from './../../../vux/vux/src/components/confirm/index.vue'
    import PublicNoInfo from './public/Public-noInfo.vue'
    import Scroller from '../../../vux/vux/src/components/scroller/index.vue'
    import {getOrderListFun} from './../actions/myManageActions'
    import {cancelOrderFun,sureProrFun} from './../actions/productAcrions'

    export default{
        components:{
            LstItem,
            tab,
            tabItem,
            Scroller,
            Confirm,
            PublicNoInfo,
        },
        data(){
            return{
                choiceOrderid:'',
                tabFun:this.deleteOrder,
                show:false,
                text:'确定要删除该订单吗?',
                params: {
                    "pageno":1,
                    "type":this.$route.params.type, // -1:全部, 0:待付款, 1:待发货, 2:待收货, 3:待评价
                    "orderid":""
                },
                pullupConfig2: {
                    content: '',
                    downContent: '松开进行加载',
                    upContent: '上拉加载更多',
                    loadingContent: '加载中...'
                },
                orderLst: []
            }
        },
        vuex:{
            actions:{
                getOrderListFun,
                cancelOrderFun,
                sureProrFun,
            }
        },
        methods:{
            init(){
                this.query((res)=>{if(res.status == 200) {
                        this.orderLst = res.list;
                    const resetScro = ()=>{
                        this.resetScorll();
                        this.$refs.scroller.goTop();
                       return (res.pageinfo.pagecount <= res.pageinfo.pageno) ? this.$broadcast('pullup:done', this.$refs.scroller.uuid) :'';
                    }
                   setTimeout(resetScro,10)
                }});

            },
            surePro(){
                this.sureProrFun({params:{orderid:this.choiceOrderid},result:(res)=>{
                    this.orderLst[0] && this.orderLst.forEach((item,i)=>{
                        (item.orderid == this.choiceOrderid) && this.orderLst.splice(i,1);
                        this.resetScorll();
                    })
                }})
            },
            deleteOrder(){
                this.cancelOrderFun({params:{orderid:this.choiceOrderid},result:(res)=>{
                    this.orderLst[0] && this.orderLst.forEach((item,i)=>{
                        (item.orderid == this.choiceOrderid) && this.orderLst.splice(i,1);
                        this.resetScorll();
                    })
                }})
            },
            showTab(res){
                if(res.type== "sure") {
                    this.text ="是否确定收货？"
                    this.tabFun = this.surePro;
                }else{
                    this.text ="确定要删除该订单吗？"
                    this.tabFun = this.deleteOrder;
                }
                this.show = true;
                this.choiceOrderid = res.orderid;
            },
            clickTab(type){
                if(type == this.params.type) return;
                this.params.pageno =1 ;
                this.params.type =`${type}`;
                this.init();
            },
            query(result){
                this.getOrderListFun({params:this.params,result})
            },
            resetScorll(){
                this.$refs.scroller.reset()
            },
            load(uuid) {
                this.params.pageno += 1;
                this.query((res)=>{
                        if(res.status == 200) {
                            let reset = 'pullup:reset';
                            !!( res.pageinfo.pageno < res.pageinfo.pagecount) ?  '' : reset='pullup:done';
                            this.$broadcast(reset, uuid);
                            this.orderLst=(this.orderLst.concat(res.list));
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
