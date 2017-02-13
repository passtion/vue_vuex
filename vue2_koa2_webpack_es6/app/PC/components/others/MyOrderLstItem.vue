<style scoped>

    div.order-item{
        background-color: white;
        margin-top: 0.5555555555555556rem;
    }
</style>
<template>
    <div class="order-item" @click.stop="goInfo">

        <Public-table
                :list="title"
        >
        </Public-table>
        <Public-pro-lst
                is-order="isOrderLst"
                :lst="item.items"
        >
        </Public-pro-lst>
        <Public-table
                is-query="orderItem"
                :list="infoLst"
        >
        </Public-table>
    </div>
</template>
<script>
    import PublicProLst from './../public/Public-proLst.vue'
    import PublicTable from './../public/Public-table.vue'
    import {goToFun} from '../../vuex/index/actions'
    import {appid} from './../../vuex/index/getters'
    import {myOrderAddInCacheFun} from'../../actions/myManageActions'
    import {wxPay}  from './../../js/wx-sdk'
    import {submitOrderFun} from './../../actions/productAcrions'
    import {getOrderType} from '../../js/public'
    const styleValue = " color: #ef1837;"
    export default{
        props:['item','showTab'],
        components:{
            PublicProLst,
            PublicTable,
        },
        data(){
            return{
                title:[{key:this.item.orderid,value:getOrderType(this.item.status),styleValue:styleValue}],
                infoLst:this.info()
            }
        },
        vuex:{
            actions:{
                goToFun,
                myOrderAddInCacheFun,
                submitOrderFun,

            },
            getters:{
                appid
            }
        },
        methods:{
            goInfo(){
                this.myOrderAddInCacheFun(this.item);
                this.go({name:'myOrderInfo'})
            },
            go(params){
                this.goToFun({params:params,obj:this});
            },
            submitOrder(){
                const params = {orderid:this.item.orderid,ip:'',appId:this.appid,deliverid:'',list:[{productid:'', count:''}]}
                this.submitOrderFun({params:params,result:(res)=>{
                    if(res.status == 200 ) {
                        res.success = (rel)=>{
                            if(rel.err_msg == "get_brand_wcpay_request:ok" ) this.go({name:'proPaySucc'});
                        };
                        wxPay(res);
                    }
                }
                })
            },
            info(){
                const json = {};
                json.total_count = this.item.total_count;
                json.pay_price = this.item.pay_price;
                json.deliver_price = this.item.deliver_price;
                const nom = this.item.comment_status ? 1 : 2;
                switch (parseInt(this.item.status)){
                    case 0:json.btnNo=2; json.btnName1 = '付款'; json.btnCli1=this.submitOrder;json.param1={}; json.btnName2 = '取消'; json.btnCli2=this.showTab;json.param2={orderid:this.item.orderid,type:'cancel'}; break;
                    case 1:json.btnNo=0; break;
                    case 2:json.btnNo=1; json.btnName1 = '确认收货'; json.btnCli1=this.showTab;json.param1={orderid:this.item.orderid,type:'sure'}; break;
                    case 3:json.btnNo=nom; json.btnName1 = '评价'; json.btnCli1=this.go;json.param1={name:'myRated',params:{productid:this.item.items[0].productid,orderid:this.item.orderid}}; json[`btnName${nom}`] = '再次购买'; json[`btnCli${nom}`]=this.go;json[`param${nom}`]={name:'sureOrder',params:{id:this.item.items[0].productid}}; break;
                    case 4:json.btnNo=0; break;
                }
                return json;
            }
        }

    }
</script>
