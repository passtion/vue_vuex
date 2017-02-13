<style scoped>
    p.collect {
        position: fixed;
        bottom:0;
        display: inline-flex;
        display: -webkit-inline-flex;
        justify-content: space-between;
        padding-left:0.7037037037037037rem;
        border-top:#ffffff;
        font-size:0.9629629629629629rem;
        line-height: 2.7777777777777777rem;
        background-color: white;
        width: 100%;
        z-index: 9;
    }

    p.collect span.price{
        color: #ef1837;
    }

    p.collect span.pro-count{
        align-self: center;
        font-size:0.6666666666666666rem ;
        color: #8a8a8a;
    }

    p.collect a.sure-btn{
        display: inline-block;
        text-align: center;
        background-color: #ef1837;
        color: white;
        width: 6rem;
        line-height:2.7777777777777777rem;

    }
</style>
<template>
    <div>
        <Address
            :choice-ads.sync="deliverid"
            >
        </Address>
        <Public-pro-lst
                :lst.sync="orderInfo"
                is-order="proOrder"
        >
        </Public-pro-lst>
        <p class="collect">
            <span>
                合计：<span class="price">¥{{orderInfo.discount_sale*orderInfo.price*orderInfo.orderNum | money}}</span>
            </span>
            <span class="pro-count">共{{orderInfo.orderNum}}件商品</span>
            <a class="sure-btn" @touchstart="submitOrder">提交订单</a>
        </p>
    </div>
</template>
<script>
    import Address from './others/AdressLst.vue'
    import PublicProLst from './public/Public-proLst.vue'
    import {sureOrder} from './../getters/productGetter'
    import {appid} from './../vuex/index/getters'
    import {
            queryProInfoFun,
            addOderInCacheFun,
            submitOrderFun
    } from './../actions/productAcrions'
    import {goToFun}  from './../vuex/index/actions'
    import {wxPay}  from './../js/wx-sdk'
    import {getOrderListFun,myOrderAddInCacheFun} from './../actions/myManageActions'
    export default{
        components:{
            Address,
            PublicProLst
        },
        data(){
          return{
              id: this.$route.params.id,
              deliverid:true,
              orderid:'',
              orderInfo:{
                  orderNum:1
              }
          }
        },
        vuex:{
            actions:{
                queryProInfoFun,
                addOderInCacheFun,
                submitOrderFun,
                goToFun,
                getOrderListFun,
                myOrderAddInCacheFun,
            },
            getters:{
                sureOrder,
                appid
            }
        },
        methods:{
          init(){
              let params = { productid:this.id};
              const list = {orderNum:1};
              //缓存没数据 请求商品详情
              this.sureOrder
                ? (()=>{
                  for(let key in  this.sureOrder){
                      list[key] =  this.sureOrder[key];
                  }
                  this.orderInfo =list;
              })()
                : this.queryProInfoFun({params:params,result:(res)=>{
                  if(res.status == 200) {
                      for(let key in res){
                          list[key] = res[key];
                      }
                      this.orderInfo =list;
                      this.addOderInCacheFun(res);

                  }
              }})
          },
          goOderInfo(orderid){
              const params = {
                  "pageno":1 ,
                  "type":'-1', // -1:全部, 0:待付款, 1:待发货, 2:待收货, 3:待评价
                  "orderid":orderid // 当订单号码不为空时，只会查询对应订单号码的信息
              };
              this.getOrderListFun({params:params,result:(res)=>{
                  if(res.status == 200) {
                      this.myOrderAddInCacheFun(res.list[0]);
                      this.go({name:'myOrderInfo'});
                  }
              }})
          },
          submitOrder(){
              const params = {orderid:this.orderid,ip:'',appId:this.appid,deliverid:this.deliverid,list:[{productid:this.orderInfo.productid, count:this.orderInfo.orderNum}]}
              this.submitOrderFun({params:params,result:(res)=>{
                  if(res.status == 200 ) {
                      res.success = (rel)=>{
                          if(rel.err_msg == "get_brand_wcpay_request:ok" ) this.go({name:'proPaySucc'});
                          else this.goOderInfo(res.orderid);
                      };
                      wxPay(res);
                  }
              }
              })
          },
            go(params){
                this.goToFun({params:params,obj:this});
            }
        },
        ready(){
            this.init();
        }

    }
</script>
