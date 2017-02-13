<style scoped>
    div.drawal{
        margin: 0.7407407407407407rem;
        padding:0 0.16666666666666666rem;
        border:1px solid #f3f3f3;
        background-color: white;
    }
    div.drawal p {
        padding: 0 0.5740740740740741rem;
    }

    div.drawal p.title {
        padding-top: 0.7407407407407407rem;
        font-size: 0.9629629629629629rem;
    }
    div.drawal p.money {
        padding: 1.7592592592592593rem 0 1.6111111111111112rem 0;
        text-align: center;

    }
    div.drawal p.money span{
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 0.8888888888888888rem;
        color: #ef1837;
        height: 2.8333333333333335rem;


    }
    div.drawal p.money span:before{
        margin-bottom: 0.6481481481481481rem;
        font-size: 1.3333333333333333rem;
    }

    div.drawal p.input-money{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        height: 2.5rem;
        font-size: 0.6666666666666666rem;
        /*border-top: 1px solid #e4e4e4;*/
    }
    div.drawal p.input-money input{
        line-height: 2rem;
    }

    div.drawal p.input-money a {
        height: 1.1111111111111112rem;
        padding: 0.2962962962962963rem 0.5555555555555556rem;
        color: white;
        background-color: #ef1837;
        text-align: center;
        margin-top: 0.6666666666666666rem;
        -webkit-border-radius :0.6481481481481481rem;
        -moz-border-radius :0.6481481481481481rem;
        border-radius :0.6481481481481481rem;
    }


    /*color="#e4e4e4"*/
</style>

<template>
    <div>
        <div class="drawal">
            <p class="title">提现金额</p>
            <p class="money">
                <span class="iconfont money-icon">{{getUserInfo.balance | money}}</span>
            </p>
            <p class="input-money vux-1px-t">
                <input type="number" name="amount" v-model="amount" placeholder="请输入提现金额">
                <input type="hidden"  name="maxMoney"  :value="getUserInfo.balance">
                <a @touchstart="click(false)">全部提现</a>
            </p>
        </div>

        <Public-btn
                btn-name="提&nbsp;&nbsp;现"
                :click="click">
        </Public-btn>
    </div>
</template>
<script>
    import PublicBtn from './public/Public-btn.vue';
    import {WithdrawFun,WithDrawInCacheFun} from './../actions/myManageActions';
    import {showError} from './../vuex/index/actions';
    import {getUserInfo} from './../getters/myManageGetter';
    export default{
        components: {
            PublicBtn
        },
        vuex: {
            actions: {
                WithdrawFun,
                WithDrawInCacheFun,
                showError,
            },
            getters: {
                getUserInfo
            },
        },
        data(){
            return {
                    amount:''
            }
        },
        methods: {
            click(type=true){
                this.WithdrawFun({type:type,maxMoney:this.getUserInfo.balance || 0,result:(res)=>{
                    if(res.status == 200){
                        type ? this.WithDrawInCacheFun(this.amount) : this.WithDrawInCacheFun(this.getUserInfo.balance)
                    }
                        const errorMsg = {show:true,msg:res.info,status:''}
                        this.showError(errorMsg);
                }})
            }
        }
    }
</script>
