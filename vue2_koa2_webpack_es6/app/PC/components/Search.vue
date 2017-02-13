<style>
    .notes{
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        align-content: center;
    }

    .notes div.history-search{
     width: 21.6481481rem;
     height: auto;

   }

    div.history-search p{
        color: #ef1837;
        font-size: 1rem;

    }

    p.title {
        position: relative;
        margin:1.074074074rem 0  1.14814815rem 0;
    }

    p.title span {
        position: absolute;
        display: inline-block;
        right: 0;
        top: 0;
    }


    ul.history-items{
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        flex-direction: row;
        padding: 0 2.2777777777777777rem;
    }

    ul.history-items li{
        display: inline-block;
        font-size: 0.7777777777777778rem;
        height: 1.6666666666666667rem;
        line-height: 1.6666666666666667rem;
        border-radius:60px;
        margin-right: 0.9444444444444444rem;
        margin-bottom: .7037037rem;
        padding: 0 .5rem;
        background-color:#e8e8e8;
    }

</style>

<template>
    <div style="background-color:white;">
        <Public-search
                is-query="true"
                :search-fun="search"
                v-ref:search></Public-search>
        <div class="notes ">
            <div v-if="historyKeys" class="history-search" >
                <p class="title " >历史搜索记录 <span class="iconfont delete" @touchstart="deleteHistoryKeysFun" ></span></p>
                <ul class="history-items">
                    <li v-for="item in historyKeys"  @touchstart="search(item)" >{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import PublicSearch from './public/Public-search.vue';
    import {querySearchProLstFun,
            searchInCacheFun,
            deleteHistoryKeysFun} from './../actions/productAcrions'
    import {historyKeys} from './../getters/productGetter'
    import {goToFun} from '../vuex/index/actions'
    export default{
        components:{
            PublicSearch
        },
        vuex:{
            actions:{
                querySearchProLstFun,
                searchInCacheFun,
                goToFun,
                deleteHistoryKeysFun,
            },
            getters:{
                historyKeys
            }

        },
        methods:{
            quary(){
                this.updateHistoryKeysFun(this.keys);
                this.searchFun(this.keys)
            },
            search(key){
                const params = {
                    pageno:1, //当前页码
                    keys:key,
                    price_order_flag:"",// 0:不排序, 1:价格由高到低, 2:价格由低到高
                    sales_order_flag:"",// 0:不排序, 1:销量由高到低
                    price_l:"",
                    price_h:"",
                    is_free_shipping:"", // 0:否, 1:是
                    province:"",
                    city:""
                }
                this.querySearchProLstFun({params:params,result:(res)=>{
                    if(res.status == 200) {
                        this.goToFun({params:{name:'proLst',params:{ keys:key}},obj:this})
                        this.searchInCacheFun(res.list)
                    }
                }})
            },
            openKeyboard(){
                this.$refs.search.setFocus();
            },
            closeKeyBoard(){
                this.$refs.search.cancel();
            }
        }

    }
</script>
