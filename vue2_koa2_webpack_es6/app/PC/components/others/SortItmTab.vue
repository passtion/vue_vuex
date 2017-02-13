<style scoped>
    ul.sortItemTab {
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        flex-direction: row;

    }
    ul.sortItemTab li {
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 1.3888888888888888rem;
        height: 6.296296296296297rem;
        padding: 0.09259259259259259rem;
        /*border: 1px solid #f3f3f3;*/
        margin-left: 1.2962962962962963rem;
        box-sizing: border-box;
    }
    ul.sortItemTab li em.sort-img{
        height: 4.907407407407407rem;
        width: 4.907407407407407rem;
        border: 1px solid #f3f3f3;
        box-sizing: border-box;
        background: center/100% transparent no-repeat;
        text-align: center;
    }
    ul.sortItemTab li span.sort-title{
        font-size: 0.5555555555555556rem;
        line-height: 0.7407407407407407rem;
        text-align: center;
    }
</style>
<template>
    <div >
        <ul class="sortItemTab">
            <li v-for="item in list" @click.stop="search(item.typename)" class="vux-1px">
                <em class="sort-img" :style="'background-image:url('+item.logo_url+')'"></em>
                <span class="sort-title" >{{item.typename}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import {querySearchProLstFun,
            searchInCacheFun} from './../../actions/productAcrions'
    import {goToFun} from './../../vuex/index/actions'
    export default{
        props:['list'],
        vuex:{
            actions:{
                querySearchProLstFun,
                searchInCacheFun,
                goToFun
            }
        },
        methods:{
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
            }
        }

    }
</script>
