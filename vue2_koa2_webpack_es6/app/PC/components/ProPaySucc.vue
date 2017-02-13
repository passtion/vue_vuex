<style scoped>
    header {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content:center;
        height: 7.037037037037037rem;
        width: 100%;
        text-align: center;
        background-color: white;
    }
    header p{
        display:flex;
        display:-webkit-flex;
        flex-direction: column;
        justify-content:space-between;
        color: #ef1837;
        font-size: 1.037037037037037rem;
        height: 4.925925925925926rem;
    }
    header p:before{
        font-size: 2.925925925925926rem;
        line-height: 2.925925925925926rem;
    }

    .pro-list.like-pro h3:before {
        position: absolute;
        left: 0;
        content: ' ';
        display: inline-block;
        height: 100%;
        width: 100%;
        background:url('../images/decorate03.png') 0/100%  no-repeat transparent ;

    }
    section.pro-list{
        display: flex;
        display: -webkit-flex; /* Safari */
        flex-direction:column;
        flex-wrap: wrap;
        justify-content:space-between;
    }

    section.pro-list h3 {
        text-align: center;
        font-size: 1rem;
        position: relative;
        color:#ef1837;
        line-height: 3rem;
        font-weight: 400;
    }
</style>
<template>
    <div>
        <header>
            <p class="iconfont paySucc-icon">支付成功</p>
        </header>
        <section  class="pro-list like-pro">
            <h3>热卖推荐</h3>
            <Public-pro-lst
                    :lst="list"
            ></Public-pro-lst>
        </section>
    </div>
</template>

<script>
    import PublicProLst from './public/Public-proLst.vue'
    import {goToFun}  from './../vuex/index/actions'
    import {queryLikeProFun}  from './../actions/productAcrions'
    export default{
        components:{
            PublicProLst
        },
        vuex:{
            actions:{
                goToFun,
                queryLikeProFun
            }
        },
        data(){
            return{
                list:[]
            }
        },
        methods:{
            init(){
                this.queryLikeProFun({
                    params:{"pageno":1},
                    result:(res)=>{
                        if(res.status == 200) {
                            this.list = res.list.slice(0,4);
                        }
                    }});
            },
            go(){
                const params = {};
                this.goToFun({params:params,obj:this});
            }
        },
        ready(){
            this.init();
        }
    }
</script>
