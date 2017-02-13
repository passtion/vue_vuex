<style scoped>

    ul.public-table {
        font-size: 0.7777777777777778rem;
    }
    ul.public-table li .column{
        display: flex;
        display: -webkit-flex;
        flex-direction:column;
        justify-content: space-between;
    }
    ul.public-table li {
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        min-height: 2.4074074074074074rem;
        font-size: 0.9629629629629629rem;
        line-height: 1em;
        padding: 0.9259259259259259rem 0.7407407407407407rem;
        width: 100%;
        justify-content: space-between;
        /*border-bottom: 1px solid #e4e4e4;*/
        position: relative;
    }
    ul.public-table small:last-child li{
        border-bottom: 0;
    }
    ul.public-table li span{
        color: #8f8f8f;
    }
    ul.public-table li span.go:after{
        content: '\e629';
        display: inline-block;
        margin-left: 0.37037037037037035rem;
        color: #8a8a8a;
    }

    ul.public-table li .postRight{
        position: absolute;
        right: 0.7407407407407407rem;
        top:0.463rem;
    }
    ul.public-table li .head-img{
        display: inline-block;
        width: 1.8518518518518519rem;
        height: 1.8518518518518519rem;
        box-sizing: border-box;
        border:1px solid white;
        background: url("../../images/head-test.jpg") center/110% no-repeat transparent;
        border-radius: 50%;
    }
    /*换行显示*/
    ul.public-table li p.line{
        width: 100%;
        color: #8a8a8a;
        margin-top: 1rem;
    }
    ul.public-table li .font36{
        font-size: 0.6666666666666666rem;
    }ul.public-table li .font60{
        font-size: 1.1111111111111112rem;;
    }


    ul.public-table li.white{
        background-color: white;
    }
    ul.public-table small:first-child li.marginTo40{
        border: 0;
        margin-top:  0;
    }
    ul.public-table li.marginTo40{
        border: 0;
        margin-top: 0.7407407407407407rem;
    }
    ul.public-table li .colorred{
        color: #ef1837;
    }
    ul.public-table li .indent{
        text-indent: 2.888888888888889rem;
    }
    ul.public-table li .posLeft{
        position: absolute;
        left: 0.7407407407407407rem;
        top:0.463rem;
    }
    ul.public-table li .btn{
        line-height: 1.5185185185185186rem;
        box-sizing: border-box;
        width:4.2592592592592595rem;
        border:1px solid #e4e4e4;
        border-radius: 0.7592592592592593rem;
        font-size: 0.7407407407407407rem;
        text-align: center;
    }
    ul.public-table li .redBtn{
        color: #ef1837;
        border-color: #ef1837;

    }
    ul.public-table li .height132{
         height: 2.4444444444444446rem;;
    }

    ul.public-table li .line-h132{
         line-height: 2.4444444444444446rem;;
    }

</style>
<template>
    <ul v-if="isQuery == 'orderItem'" class="public-table">
            <li class="vux-1px-t " v-if="list.pay_price">
                <label class="font36">共{{list.total_count}}件商品</label>
                <span class="font36">合计: &nbsp;&nbsp;<small class="colorred">¥{{list.pay_price | money}}</small><small>&nbsp;&nbsp;(含运费¥{{list.deliver_price}})</small></span>
            </li>
        <li class="vux-1px-t " v-if="list.btnNo != 0">
            <label  class="btn" @click.stop="list.btnCli2(list.param2)" v-if="list.btnNo == 2 "> {{list.btnName2}} </label>
            <label   v-else>&nbsp;</label>
            <span class="btn redBtn" @click.stop="list.btnCli1(list.param1)">{{list.btnName1}}</span>
        </li>
    </ul>
    <!-- 接口请求 -->
    <ul v-if="isQuery == 'app_members_list'" class="public-table">
        <small v-for="item in list">
            <li class="white vux-1px-b">
                <label  class="indent"> <em class="head-img posLeft" :style="'background-image:url('+item.logo_url+')'"></em> {{item.username}}</label>
                <span class="font36" >{{item.create_time | dateTime}}</span>
            </li>
        </small>
    </ul>
    <ul v-if="isQuery == 'app_prize_list'" class="public-table">
        <small v-for="item in list">
            <li class="white marginTo40 vux-1px-b">
                <label>{{item.prize_name}}</label>
                <span class="font36">{{item.create_time | dateTime}}</span>
                <p class="line font36">{{item.note}}</p>
            </li>
        </small>
    </ul>
    <ul v-if="isQuery == 'integralRecord'" class="public-table">
        <small v-for="item in list">
            <li class="white marginTo40 vux-1px-b">
                <p class="column height132">
                    <label class="colorred">+{{item.integal}}</label>
                    <span class="font36">{{item.event_name}}</span>
                </p>
                <p class=" font36 line-h132" style="color:#686868;">{{ item.create_time | dateTime}}</p>
            </li>
        </small>
    </ul>
    <ul v-if="isQuery == 'app_commission_list'" class="public-table">
        <small v-for="item in list">
            <li class="white vux-1px-b">
                <label>{{item.commission}}</label>
                <span class="font36">{{item.create_time | dateTime}}</span>
            </li>
        </small>
    </ul>
    <ul v-if="isQuery == 'withdrawReLst'" class="public-table">
        <small v-for="item in list">

            <li v-else class="vux-1px-b" >
                <label class="font60" >{{item.create_time | dateTime}}</label>
                <span  class="colorred font60">-{{item.amount | money}}</span>
                <span  class="colorred font60">{{item.process_result | process }}</span>
            </li>
        </small>
    </ul>
    <!-- 拼接样式 -->
    <ul v-if="!isQuery" class="public-table">
        <small v-for="item in list">
            <li v-if="item.url" @click.prevent="go(item.url)" class="vux-1px-b">
                <label>{{item.key}}</label>
                <span class="go iconfont">{{item.value}}</span>
            </li>
            <li v-else :style="item.style ? item.style:''" class="vux-1px-b">
                <label :style="item.styleKey ? item.styleKey:''">{{item.key}}</label>
                <span  v-if="item.type=='img'" class="head-img postRight" :style=" item.styleValue ? item.styleValue:'background-image:url('+item.value+')'"  ></span>
                <span v-else :style="item.styleValue ? item.styleValue:''">{{item.value}}</span>
            </li>
        </small>
    </ul>
</template>
<script>
    import {goToFun} from'../../vuex/index/actions'
    export default{
        //list:[{key,value,url,type}]
        //type : img,
        props: ['list','isQuery'],
        vuex: {
            actions: {
                goToFun,
            }
        },
        methods: {
            go(params){
                this.goToFun({params: params, obj: this})
            }
        }

    }
</script>
