<style scoped>
    header {
        display: -webkit-flex; /* Safari */
        display: flex;
        justify-content:center;
        align-items:center;
        height: 2.4444444444444rem;
        width: 100%;
        background-color: white;
    }

    header input.search {
        height: 1.777777777777778rem;
        line-height: 1.777777777777778rem;
        font-size: 0.9444444444444444rem;
        text-indent: 1.4444444444444444rem;
        outline : none;
        border-radius: 48px;
        background-color:#fcfcfc;
        width: 85%;
    }
    div.query{
        display: inline-block;
        width: 90%;
    }
    div.search{
        width: 100%;
        position: relative;
        border-radius: 48px;
        border: 1px solid #ececec;
        background-color: white;
        display: inline-block;
        margin: auto;

    }
    div.search:after {
        color: #ef1837;
        position: absolute;
        right: 0.9444444444444444rem;
        line-height: 1.777777777777778rem;
        top:0;
    }

    a.cancle{
        font-size: 0.8888888888889rem;
        line-height: 1.777777777777778rem;
        display: inline-block;
        margin-left: .777777rem;

    }
    div.search-mask{
        position: absolute;
        height: 1.777777777777778rem;
        line-height: 1.777777777777778rem;
        z-index:5;
        text-align: center;
        color: #A9A9A9;
        border:0;
    }
    div.search.search-mask:after{
        color: #A9A9A9;
        content: '商品关键字 \e615';
        position:relative;

    }
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

    div.fixed{
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 5;
    }
</style>
<template>

    <div :class="isFixed?'fixed':''" style="background-color: white;">
        <header>
            <div class="query" >
                <div  class="search iconfont":style="isFixed ?'width: 85%;':''" >
                    <form   @submit.prevent="quary">
                        <div  class="search iconfont search-mask" @click="touch" v-show="!isFixed && autoFixed"></div>
                        <input v-if="showFlg" type="search" class="search" id="search_input" placeholder="商品关键字" autocomplete="off" :required="required" v-model="keys" v-el:input >
                    </form>
                </div>
                <a v-if="isFixed" class="cancle"  @click.prevent="cancel"> 取消</a>
            </div>
        </header>
        <div class="weui_cells weui_cells_access vux-search_show" id="search_show" v-if="isFixed && results[0]">
            <slot></slot>
            <div class="weui_cell" v-for="item in results" @click="handleResultClick(item)">
                <div class="weui_cell_bd weui_cell_primary">
                    <p>{{item.title}}</p>
                </div>
            </div>
        </div>
        <div class="notes" v-if="historyKeys && isFixed">
            <div  class="history-search" >
                <p class="title " >历史搜索记录 <span class="iconfont delete" @touchstart="deleteHistoryKeysFun" ></span></p>
                <ul class="history-items">
                    <li v-for="item in historyKeys"  @click.stop="search(item)" >{{item}}</li>
                </ul>
            </div>
        </div>
        <div>
</template>

<script>
    import PublicSearch from './../public/Public-search.vue';
    import {querySearchProLstFun,
            searchInCacheFun,
            deleteHistoryKeysFun,
            updateHistoryKeysFun} from './../../actions/productAcrions'
    import {historyKeys} from './../../getters/productGetter'
    import {goToFun} from '../../vuex/index/actions'
    export default {
        props: {
            required: {
                type: Boolean,
                default: true
            },
            placeholder: {
                type: String,
                default: 'Search'
            },
            cancelText: {
                type: String,
                default: 'cancel'
            },
            value: {
                type: String,
                default: ''
            },
            results: {
                type: Array,
                default () {
                    return []
                }
            },
            autoFixed: {
                type: Boolean,
                default: true
            },
            top: {
                type: String,
                default: '0px'
            },
            proParams:{},
        },
        vuex:{
            actions:{
                querySearchProLstFun,
                searchInCacheFun,
                goToFun,
                deleteHistoryKeysFun,
                updateHistoryKeysFun,
            },
            getters:{
                historyKeys
            }

        },
        methods: {
            quary(){
                if (!this.keys.trim()) return;
                this.keys = this.keys.trim();
                this.updateHistoryKeysFun(this.keys);
                this.search(this.keys)
            },
            search(key){

                this.isFixed = false;
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
                this.hideKeyboard(); //隐藏键盘
                this.querySearchProLstFun({params:params,result:(res)=>{
                    if(res.status == 200) {
                        this.proParams ? this.proParams = params : this.goToFun({params:{name:'proLst',params:{ keys:key}},obj:this})
                        this.searchInCacheFun(res.list)
                    }
                }})
            },
            clear () {
                this.keys = ''
                this.isFocus = true
                this.setFocus()
            },
            hideKeyboard(){
              this.showFlg =false;
                setTimeout(()=>{ this.showFlg =true;},10)
            },
            cancel () {
                this.keys = ''
                this.isCancel = true
                this.isFixed = false
                this.$emit('on-cancel')
            },
            handleResultClick (item) {
                this.$emit('result-click', item)
                this.isCancel = true
                this.isFixed = false
            },
            touch () {
                this.keys = ''
                this.isCancel = false
                this.isFixed = true
            },
            setFocus () {
                this.$els.input.focus()
            }
        },
        data () {
            return {
                isCancel: true,
                isFocus: false,
                isFixed: false,
                keys:'',
                showFlg:true,
            }
        },
        watch: {
            isFixed (val) {
                if (val === true) {
                    this.setFocus()
                    this.isFocus = true
                } else {
                }
            }
        }
    }
</script>
