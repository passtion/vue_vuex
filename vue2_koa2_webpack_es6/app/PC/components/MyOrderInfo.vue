<style scoped>
    ul.orderTitle{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        padding: 0.7407407407407407rem;
        height: 4.2592592592592595rem;
        border-bottom: 1px solid #f3f3f3;
        background-color: white;
        margin-bottom: 0.5555555555555556rem;
    }

    ul.orderTitle li{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        height: 100%;

    }
    ul.orderTitle li:first-child{
        justify-content: space-between;
        font-size: 0.8888888888888888rem;
    }

    ul.orderTitle li:last-child{
        justify-content: center;
        font-size: 0.6666666666666666rem;
        color: #ef1837;

    }
    p.collect {
        position: absolute;
        bottom:0;
        border-top:#ffffff;
        background-color: white;
        width: 100%;
        z-index: 9;
    }

    div.orderTab {
        background-color: white;
    }
    /*div.orderTab ul.public-table small li{*/
       /*border: 0;*/
    /*}*/

    /*div.orderTab ul.public-table small:last-child li{*/
        /*border-top: 1px solid #e4e4e4;*/
    /*}*/

    p.integral {
        padding: 0.8518518518518519rem 0.7777777777777778rem;
        width: 100%;
        text-align: left;
        font-size: 0.9629629629629629rem;
        line-height: 1.1111111111111112rem;
        margin-top:0.5555555555555556rem;
        background-color: white;

    }
    .borderTB{
        border-top:1px solid #f3f3f3;
        border-bottom:1px solid #f3f3f3;
    }
    p.integral span{
        font-size: 0.6666666666666666rem;
        margin-right: 0.8888888888888888rem;
        color: white;
        background-color:#ef1837;
        border-radius: 30px;
        display: inline-block;
        padding: 0 0.48148148148148145rem;
    }

</style>
<template>
    <div>
        <ul class="orderTitle ">
            <li>
                <span>订单号：{{getMyOrderInfo.orderid}}</span>
                <span>下单时间：{{getMyOrderInfo.create_time}}</span>
            </li>
            <li>
                {{getMyOrderInfo.status | orderStatus}}
            </li>

        </ul>
        <div class="borderTB">
            <Address
                :order-info="getMyOrderInfo"
                choice-ads ="true"
        >
        </Address>
        </div>
        <div class="orderTab borderTB">
            <Public-pro-lst
                    is-order="isOrderLst"
                    :lst="getMyOrderInfo.items">
            </Public-pro-lst>
            <Public-table
                    :list="buyInfoLst"
            >
            </Public-table>
        </div>

       <p class="integral borderTB">
           <span>积分</span> 可积分{{getMyOrderInfo.integal}}点
       </p>
        <p style="height:4.6rem;">
        </p>
        <p class="collect">
            <Public-table
                    is-query="orderItem"
                    :list="infoLst"
            >
            </Public-table>
        </p>
        <confirm :show.sync="show" confirm-text="确定" cancel-text="取消" title="操作提示" @on-confirm="deleteOrder">
            <p style="text-align:center;">确定要删除该订单吗?</p>
        </confirm>
    </div>
</template>
<script>
    import {wxPay}  from './../js/wx-sdk'
    import {submitOrderFun,cancelOrderFun} from './../actions/productAcrions'
    import Address from './others/AdressLst.vue'
    import PublicProLst from './public/Public-proLst.vue'
    import PublicTable from './public/Public-table.vue'
    import  Confirm from '../../../vux/vux/src/components/confirm/index.vue'
    import {appid} from './../vuex/index/getters'
    import  Scroller from '../../../vux/vux/src/components/scroller/index.vue'
    import {goToFun,showError}  from './../vuex/index/actions'
    import {getMyOrderInfo}  from './../getters/myManageGetter'
    const style1 = "font-size: 0.8888888888888888rem;border:0;"
    const style2 = "border-top: 1px solid #e4e4e4;"
    const style3 = "border-bottom: 0;"
    const styleValue = " color: #ef1837;"
    export default{
        components:{
            Address,
            Scroller,
            PublicProLst,
            Confirm,
            PublicTable
        },
        data(){
          return{
              infoLst:this.info(),
              tabFun:this.deleteOrder,
              show:false,
              text:'确定要删除该订单吗',
              buyInfoLst:[
                      {key:`共${this.getMyOrderInfo.total_count}件商品`,value:`¥ ${this.getMyOrderInfo.items[0].real_price  * this.getMyOrderInfo.items[0].count}`,style:(style1+style2)},
                      {key:'运费(快递)',value:`¥ ${this.getMyOrderInfo.deliver_price}`,style:style1},
                      {key:'订单总价',value:`¥ ${this.getMyOrderInfo.total_price}`,style:style1},
                      {key:'需付款',value:`¥ ${this.getMyOrderInfo.pay_price}`,styleValue:styleValue,style:style3}
              ]
          }
        },
        vuex:{
            getters:{
                getMyOrderInfo,
                appid
            },
            actions:{
                goToFun,
                showError,
                cancelOrderFun,
                submitOrderFun
            }
        },
        methods:{
            go(params){
                this.goToFun({params:params,obj:this});
            },
            deleteOrder(){
                this.cancelOrderFun({params:{orderid:this.getMyOrderInfo.orderid},result:(res)=>{
                    if(res.status==200){
                            history.go(-1);
                        }
                    }})
            },
            surePro(){
                this.sureProrFun({params:{orderid:this.cancelOrderid},result:(res)=>{
                    this.orderLst[0] && this.orderLst.forEach((item,i)=>{
                        (item.orderid == this.choiceOrderid) && (item.status=3);
                    })
                }})
            },
            showTab(type){
                if(type== "sure") {
                    this.text ="是否确定收货？"
                    this.tabFun = this.surePro;
                }
                this.show = true;
            },
            submitOrder(){
                const params = {orderid:this.getMyOrderInfo.orderid,ip:'',appId:this.appid,deliverid:'',list:[{productid:'', count:''}]}
                this.submitOrderFun({params:params,result:(res)=>{
                    if(res.status == 200 ) {
                        res.success = (rel)=>{
                            if(rel.err_msg == "get_brand_wcpay_request:ok" ) this.go({name:'proPaySucc'});
                            else{
                                const errorMsg = {show:true,msg:rel.err_msg,status:''}
                                this.showError(errorMsg);
                            }

                        };
                        wxPay(res);
                    }
                }
            })
            },
            info(){
                const json = {};
                const nom = this.getMyOrderInfo.comment_status ? 1 : 2;
                switch (parseInt(this.getMyOrderInfo.status)){
                    case 0:json.btnNo=2; json.btnName1 = '付款'; json.btnCli1=this.submitOrder;json.param1={};json.btnName2 = '取消'; json.btnCli2=this.showTab;json.param2='cancel';   break;
                    case 1:json.btnNo=0; break;
                    case 2:json.btnNo=1; json.btnName1 = '确认收货'; json.btnCli1=this.showTab;json.param1='sure'; break;
                    case 3:json.btnNo=nom; json.btnName1 = '评价'; json.btnCli1=this.go;json.param1={name:'myRated',params:{productid:this.getMyOrderInfo.items[0].productid,orderid:this.getMyOrderInfo.orderid}}; json[`btnName${nom}`] = '再次购买'; json[`btnCli${nom}`]=this.go;json[`param${nom}`]={name:'sureOrder',params:{id:this.getMyOrderInfo.items[0].productid}}; break;
                    case 4:json.btnNo=0; break;
                }
                return json;
            }
        }

    }
</script>
