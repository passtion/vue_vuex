<style scoped>

     ul.pro-list{
        overflow: hidden;
        width: 100%;
        padding: 0.555555555rem;
        background-color: #F4F4F4;
         padding-bottom: 2rem;
    }
     /*格子样式*/
     ul.pro-list li.checks-style{
        float: left;
        background-color: white;
        padding: 0.1388888888888889rem;
        width:49%;
        margin-bottom:0.5rem;
    }
     ul.pro-list li.checks-style:nth-child(2n+1){
        margin-right:0.37037037037037035rem;
    }
     ul.pro-list li.checks-style em.pro-img{
        display: inline-block;
        width: 100%;
        height:10.555555555555555rem;
        margin-bottom: 0.33333333333rem;
        background:url("../../images/index-test01.jpg") no-repeat 0/100% transparent;  ;
    }
     ul.pro-list li.checks-style p{
        padding: 0 0.8333333333333334rem 0 0.4722222222222222rem;
    }
     ul.pro-list li.checks-style p.pro-info{
        font-size: 0.555555555rem;
        color: #343434;
        line-height: 0.7037037rem;
        min-height:1.4074rem;
        word-break: break-all;
        word-wrap: break-word;
        white-space: normal;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        margin-bottom: 0.33333333rem;
    }
     ul.pro-list li.checks-style p.pro-bottom{
        position: relative;
    }
     ul.pro-list li.checks-style p.pro-bottom span{
        display:inline-block;
        font-size: 0.4rem;
        line-height: 1rem;
        color: #8a8a8a;
    }
     ul.pro-list li.checks-style p.pro-bottom span.pro-money {
        position: absolute;
        right: 0;
        font-size: 0.74074074rem;
        color: #ef1837;
        top: 0.1rem;
        right:0.8333333333333334rem;
    }
    /*行别样式*/

     ul.pro-list li.row-style {
         width: 100%;
         height: 6.9444444444rem;
         background-color: #ffffff;
         /*overflow: hidden;*/
     }

     ul.pro-list li.row-style:nth-child(n-1) {
         margin-top: .555555555555555555555rem;
     }

     ul.pro-list li.row-style em.pro-img{
         float: left;
         display: inline-block;
         width: 6.1111111111rem;
         height: 100%;
         margin-right:.83333333333rem;
         background:url("../../images/index-test03.jpg") no-repeat 0/100% transparent;  ;

     }

     ul.pro-list li.row-style p{
         float: left;
         width: 13.5rem;
         display: inline-block;
         font-size: .96296296rem;
         line-height: 1.14814815rem;

     }

     ul.pro-list li.row-style p.pro-info{
         margin-top: .74074074rem;
         word-break: break-all;
         word-wrap: break-word;
         white-space: normal;
         text-overflow: ellipsis;
         overflow: hidden;
         display: -webkit-box;
         -webkit-line-clamp:2;
         -webkit-box-orient: vertical;
         min-height: 2.2rem;
     }

     ul.pro-list li.row-style p.pro-fee{
         margin-top: .8rem;
         line-height: .92592593rem;
     }
      ul.pro-list li.row-style p.pro-fee span{
         display: inline-block;
          font-size: .5555555555555rem;
          color: white;
          line-height: .92592593rem;
          background-color: #ef1837;
          padding: 0 .25925926rem;
          border-radius: .62592593rem;
     }

     ul.pro-list li.row-style p.pro-bottom{
         display: inline-flex;
         display: -webkit-inline-flex;
         justify-content: space-between;
         margin-top: .48148148rem;
         line-height: 1.11111111111111rem;
     }

     ul.pro-list li.row-style p.pro-bottom span{
         display: inline-block;
         font-size: .555555555555555rem;
         color: #8a8a8a;

     }

     ul.pro-list li.row-style p.pro-bottom .pro-money{
        font-size: 1.11111111111111rem;
        color:#ef1837;
     }



     ul.pro-list li.row-style p.pro-bottom .pro-people{
        margin: auto;
     }
     ul.pro-list li.row-style p.pro-bottom .pro-bests{
         margin-right: 0.2rem;
     }
     ul.pro-list li.row-style p.pro-bottom .pro-bests:before{
         margin-right:.40740741rem;
     }
    /*订单的样式*/
     ul.pro-list li.wars {
         display: inline-flex;
         display: -webkit-inline-flex;
         justify-content: space-between;
         padding: 0.6851851851851852rem 0.46296296296296297rem 0.6851851851851852rem 0.7407407407407407rem;
         font-size: 0.8888888888888888rem;
         background-color: white;
         /*border-top:1px solid #e4e4e4;*/
         width: 100%;
     }
     ul.pro-list li.wars span.cases{
         display: inline-flex;
         display: -webkit-inline-flex;
         justify-content: space-between;
         text-align: center;
         width: 4.12962962962963rem;
         border: 1px solid #f3f3f3;
         border-radius: 66px;
         font-size: 0.6666666666666666rem;
         line-height: 0.8888888888888888rem;
         border-bottom: 0;
     }
     ul.pro-list li.wars span.cases em{
         display: inline-block;
         background-color: #e8e8e8;
         width: 1.2962962962962963rem;
         text-align: center;
     }
     ul.pro-list li.wars span.cases em.add{
         border-bottom-left-radius: 1.2222222222222223rem;
         border-top-left-radius: 1.2222222222222223rem;
     }
     ul.pro-list li.wars span.cases em.cut{
         border-bottom-right-radius: 1.2222222222222223rem;
         border-top-right-radius: 1.2222222222222223rem;
     }
     ul.pro-list li.wars span.cases em.ok{
         background-color: #ef1837;
         color: white;

     }
</style>
<template>
    <div v-if="isOrder=='isOrderLst'">
        <ul   class="pro-list " style="padding:0;" >
            <li class="row-style" style="margin:0;" v-for="item in lst"  >
                <em class="pro-img" :style="'background-image: url('+item.logo_url+')'" @click="goUrl(item.productid)"></em>
                <p class="pro-info">{{item.packagename}}</p>
                <p class="pro-fee" > </p>
                <p class="pro-bottom" style="margin-top:1.4rem;">
                    <span class="pro-money">￥{{item.real_price | money}}</span>
                    <span class="pro-bests ">x{{item.count}}</span>
                </p>
            </li>
        </ul>
    </div>
    <div v-if="isOrder =='proOrder'">
        <ul   class="pro-list" style="padding:0;"  >
            <!--<li class="row-style"  @click.prevent="goUrl(lst.productid)" >-->
            <li class="row-style"   >
                <em class="pro-img" :style="'background-image: url('+lst.logo_url+')'"></em>
                <p class="pro-info">{{lst.packagename+' '+ lst.digest}}</p>
                <p class="pro-fee" > </p>
                <p class="pro-bottom" style="margin-top:1.4rem;">
                    <span class="pro-money">￥{{lst.price * lst.discount_sale | money}}</span>
                    <span class="pro-bests ">x{{lst.orderNum}}</span>
                </p>
            </li>
            <li class="wars vux-1px-t">
                <label>购买数量</label>
                <span class="cases">
                    <em class="add ok"  @touchstart="add">+</em>
                    {{lst.orderNum}}
                    <em @touchstart="cut" class="cut {{lst.orderNum > 1 ?'ok':''}}">-</em></span>
            </li>
            <li class="wars" v-if="lst.is_free_shipping">
                <label>配送方式</label>
                <span>快递:&nbsp;&nbsp;包邮</span>
            </li>
        </ul>
    </div>
    <div v-if="!isOrder" class="box2">
        <ul v-if="isChecks"   class="pro-list" style="padding-top:0;" >

            <li class="row-style" v-for="item in lst" @click.prevent="goUrl(item.productid)" >
                <em class="pro-img" :style="'background-image: url('+item.logo_url+')'"></em>
                <p class="pro-info" >{{item.packagename+' '+ item.digest}} </p>
                <p class="pro-fee" ><span v-if="item.is_free_shipping">包邮</span> </p>
                <p class="pro-bottom">
                    <span class="pro-money">￥{{item.price * item.discount_sale | money }}</span>
                    <span class="pro-people">{{item.pay_count}}人付款</span>
                    <span class="pro-bests iconfont comment-icon">{{item.comment_count}}</span>
                </p>
            </li>
        </ul>
        <ul v-else class="pro-list"  style="padding-top:0;" >
            <li class="checks-style" v-for="item in lst" @click.prevent="goUrl(item.productid)" >
                <em class="pro-img" :style="'background-image: url('+item.logo_url+')'"></em>
                <p class="pro-info">{{item.packagename+' '+ item.digest}}</p>
                <p class="pro-bottom">
                    <span class="pro-people">{{item.pay_count}}人付款</span>
                    <span class="pro-money">￥{{item.price * item.discount_sale| money}}</span>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    import {goToFun} from '../../vuex/index/actions'
    export default{
       props:['isChecks','lst','isOrder'],
        vuex:{
          actions:{
              goToFun
          }
        },
        methods:{
            goUrl(id){
                const params ={name:'proInfo',params:{ id: id }};
                this.goToFun({params:params,obj:this})
            },
            add(){
                this.lst.orderNum +=1;
            },
            cut(){
                if (this.lst.orderNum == 1 ) return;
                this.lst.orderNum -=1;
            }
        },
        ready(){
//            alert(JSON.stringify(this.lst))
        }

    }
</script>
